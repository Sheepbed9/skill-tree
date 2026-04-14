'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  Panel,
  addEdge,
  reconnectEdge,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type Connection,
  type OnSelectionChangeParams,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import {
  skillLibrary,
  flattenLibrary,
  type LibrarySkill,
  type LibraryDomain,
} from './skillLibrary';
import SkillNode, { type SkillNodeData } from './SkillNode';
import { supabase } from './supabase';

// ─── Layout constants ────────────────────────────────────────────────────
const DOMAIN_GAP = 300; // horizontal gap between domain bounding boxes
const R1 = 230; // distance from domain center to first-layer children
const R_STEP = 180; // additional radius per deeper layer
const MIN_ARC = 140; // minimum arc-length (px) between siblings at the same depth

// ─── Collision-free radial layout ────────────────────────────────────────
// Each subtree gets an angular wedge proportional to its leaf count.
// Within a single tree, wedges never overlap → guaranteed no collisions.
function layoutAllDomains(nodes: Node[], edges: Edge[]): Node[] {
  const childMap = new Map<string, string[]>();
  const parentMap = new Map<string, string>();
  edges.forEach((e) => {
    if (!childMap.has(e.source)) childMap.set(e.source, []);
    childMap.get(e.source)!.push(e.target);
    parentMap.set(e.target, e.source);
  });

  const roots = nodes.filter((n) => !parentMap.has(n.id));
  const positions = new Map<string, { x: number; y: number }>();

  // Memoised leaf count per node
  const leafCache = new Map<string, number>();
  function leafCount(id: string): number {
    if (leafCache.has(id)) return leafCache.get(id)!;
    const ch = childMap.get(id) ?? [];
    const n = ch.length === 0 ? 1 : ch.reduce((s, c) => s + leafCount(c), 0);
    leafCache.set(id, n);
    return n;
  }

  // Place children of `id` in a radial fan around the root centre (cx, cy).
  // All positions are relative to the root — guarantees non-overlapping rings.
  function placeChildren(
    id: string,
    cx: number,
    cy: number,
    startAngle: number,
    endAngle: number,
    depth: number,
  ) {
    const children = childMap.get(id) ?? [];
    if (children.length === 0) return;

    const totalLeaves = children.reduce((s, c) => s + leafCount(c), 0);
    const sweep = endAngle - startAngle;
    const baseRadius = depth === 1 ? R1 : R1 + (depth - 1) * R_STEP;
    // Push radius outward if siblings would be closer than MIN_ARC
    const neededRadius = (totalLeaves * MIN_ARC) / Math.abs(sweep);
    const radius = Math.max(baseRadius, neededRadius);

    let angle = startAngle;
    children.forEach((childId) => {
      const leaves = leafCount(childId);
      const childSweep = (leaves / totalLeaves) * sweep;
      const midAngle = angle + childSweep / 2;

      positions.set(childId, {
        x: cx + Math.cos(midAngle) * radius,
        y: cy + Math.sin(midAngle) * radius,
      });

      placeChildren(childId, cx, cy, angle, angle + childSweep, depth + 1);
      angle += childSweep;
    });
  }

  // Layout each tree at origin first, then shift to avoid cross-domain overlap
  type TreeInfo = { rootId: string; allIds: string[]; minX: number; maxX: number };
  const trees: TreeInfo[] = [];

  roots.forEach((root) => {
    positions.set(root.id, { x: 0, y: 0 });
    // Full circle starting from bottom (PI/2 in screen coords where Y↓)
    placeChildren(root.id, 0, 0, Math.PI / 2, Math.PI / 2 + 2 * Math.PI, 1);

    // Collect all node ids in this tree + bounding box
    const allIds = [root.id];
    let minX = 0, maxX = 0;
    const queue = [...(childMap.get(root.id) ?? [])];
    const visited = new Set<string>([root.id]);
    while (queue.length) {
      const nid = queue.shift()!;
      if (visited.has(nid)) continue;
      visited.add(nid);
      allIds.push(nid);
      const pos = positions.get(nid);
      if (pos) {
        if (pos.x < minX) minX = pos.x;
        if (pos.x > maxX) maxX = pos.x;
      }
      queue.push(...(childMap.get(nid) ?? []));
    }
    trees.push({ rootId: root.id, allIds, minX, maxX });
  });

  // Shift each tree so they sit side by side without overlapping
  let offsetX = 0;
  trees.forEach((tree, i) => {
    const shift = offsetX - tree.minX;
    tree.allIds.forEach((id) => {
      const pos = positions.get(id)!;
      positions.set(id, { x: pos.x + shift, y: pos.y });
    });
    offsetX += tree.maxX - tree.minX + (i < trees.length - 1 ? DOMAIN_GAP : 0);
  });

  return nodes.map((n) => {
    const p = positions.get(n.id);
    return p ? { ...n, position: p } : n;
  });
}

const nodeTypes = { skill: SkillNode };

// ─── Persistence (Supabase + localStorage fallback) ─────────────────────
const STORAGE_KEY = 'skilltree:v1';
const SUPABASE_ROW_ID = 'default'; // single tree for now; multi-user in Phase 3

type PersistedState = {
  nodes: Node[];
  edges: Edge[];
  placedMap: Record<string, string>;
  nextId: number;
};

// localStorage helpers — kept as fallback / migration source
function loadLocalState(): PersistedState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedState;
    if (!Array.isArray(parsed.nodes) || !Array.isArray(parsed.edges)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function clearLocalState() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

// Supabase persistence
async function loadSupabaseState(): Promise<PersistedState | null> {
  try {
    const { data, error } = await supabase
      .from('skill_trees')
      .select('data')
      .eq('id', SUPABASE_ROW_ID)
      .single();
    if (error || !data) return null;
    const parsed = data.data as PersistedState;
    if (!Array.isArray(parsed.nodes) || !Array.isArray(parsed.edges)) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function saveSupabaseState(state: PersistedState) {
  try {
    await supabase
      .from('skill_trees')
      .upsert({ id: SUPABASE_ROW_ID, data: state, updated_at: new Date().toISOString() });
  } catch {
    // Silently ignore — will retry on next state change
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────

function parseScore(raw: string): number | undefined | 'invalid' {
  const t = raw.trim();
  if (t === '') return undefined;
  const n = Number(t);
  if (Number.isNaN(n) || n < 0 || n > 10 || (n * 2) % 1 !== 0) return 'invalid';
  return n;
}

function findByPath(path: string[]): {
  domain: LibraryDomain;
  skill?: LibrarySkill;
  inheritedIcon?: string;
} | null {
  const domain = skillLibrary.find((d) => d.name === path[0]);
  if (!domain) return null;
  if (path.length === 1) return { domain, inheritedIcon: domain.icon };

  let current: LibrarySkill | undefined;
  let children: LibrarySkill[] | undefined = domain.skills;
  let inheritedIcon = domain.icon;
  for (let i = 1; i < path.length; i++) {
    current = children?.find((s) => s.name === path[i]);
    if (!current) return null;
    inheritedIcon = current.icon ?? inheritedIcon;
    children = current.children;
  }
  return { domain, skill: current, inheritedIcon };
}

// ─── Component ───────────────────────────────────────────────────────────

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [nextId, setNextId] = useState(1);

  const [placedMap, setPlacedMap] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customIcon, setCustomIcon] = useState('');
  const [customScore, setCustomScore] = useState('');
  const [customParent, setCustomParent] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const edgeReconnectSuccessful = useRef(true);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── Load from Supabase on mount (fall back to localStorage for migration)
  useEffect(() => {
    let cancelled = false;
    async function load() {
      // Try Supabase first
      const cloud = await loadSupabaseState();
      if (cancelled) return;
      if (cloud) {
        setNodes(cloud.nodes);
        setEdges(cloud.edges);
        setPlacedMap(cloud.placedMap);
        setNextId(cloud.nextId);
        setHydrated(true);
        return;
      }
      // Fall back to localStorage (migrates existing data)
      const local = loadLocalState();
      if (cancelled) return;
      if (local) {
        setNodes(local.nodes);
        setEdges(local.edges);
        setPlacedMap(local.placedMap);
        setNextId(local.nextId);
        // Migrate to Supabase and clear localStorage
        await saveSupabaseState(local);
        clearLocalState();
      }
      setHydrated(true);
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Save to Supabase whenever state changes (debounced 1s) ─────────
  useEffect(() => {
    if (!hydrated) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveSupabaseState({ nodes, edges, placedMap, nextId });
    }, 1000);
  }, [hydrated, nodes, edges, placedMap, nextId]);

  const flat = useMemo(() => flattenLibrary(), []);
  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return flat.filter((item) => item.name.toLowerCase().includes(q)).slice(0, 30);
  }, [search, flat]);

  // Node dragging is disabled via nodesDraggable={false} on ReactFlow.
  // onNodesChange from useNodesState handles selection changes.

  // ─── Edge connect + reroute ──────────────────────────────────────────
  const onConnect = useCallback(
    (c: Connection) => {
      const newEdges = addEdge({ ...c, style: { stroke: '#64748b', strokeWidth: 2 } }, edges);
      setEdges(newEdges);
      setNodes(layoutAllDomains(nodes, newEdges));
    },
    [edges, nodes, setEdges, setNodes],
  );

  // ─── Edge click: select/deselect on click ───────────────────────────
  const onEdgeClick = useCallback(
    (_event: React.MouseEvent, edge: Edge) => {
      setEdges((eds) =>
        eds.map((e) =>
          e.id === edge.id
            ? {
                ...e,
                selected: !e.selected,
                style: !e.selected
                  ? { stroke: '#fde68a', strokeWidth: 3 }
                  : { stroke: '#64748b', strokeWidth: 2 },
              }
            : {
                ...e,
                selected: false,
                style: { stroke: '#64748b', strokeWidth: 2 },
              },
        ),
      );
    },
    [setEdges],
  );

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeReconnectSuccessful.current = true;
      const newEdges = reconnectEdge(oldEdge, newConnection, edges);
      setEdges(newEdges);
      setNodes(layoutAllDomains(nodes, newEdges));
    },
    [edges, nodes, setEdges, setNodes],
  );

  const onReconnectEnd = useCallback(
    (_event: MouseEvent | TouchEvent, edge: Edge) => {
      if (!edgeReconnectSuccessful.current) {
        // User dropped the edge in empty space → delete it and re-layout.
        const newEdges = edges.filter((e) => e.id !== edge.id);
        setEdges(newEdges);
        setNodes(layoutAllDomains(nodes, newEdges));
      }
      edgeReconnectSuccessful.current = true;
    },
    [edges, nodes, setEdges, setNodes],
  );

  // ─── Selection tracking (for the edit panel) ─────────────────────────
  const onSelectionChange = useCallback((params: OnSelectionChangeParams) => {
    const selNodes = params.nodes ?? [];
    setSelectedNodeId(selNodes.length === 1 ? selNodes[0].id : null);
  }, []);

  // ─── Add a node (+ edge if it has a parent) and re-layout ────────────
  const addNode = useCallback(
    (parentId: string | null, data: SkillNodeData): string => {
      const id = `n-${nextId}`;
      setNextId((n) => n + 1);
      const newNode: Node = {
        id,
        type: 'skill',
        position: { x: 0, y: 0 },
        data,
      };
      const newEdges =
        parentId !== null
          ? edges.concat({
              id: `e-${parentId}-${id}`,
              source: parentId,
              target: id,
              style: { stroke: '#64748b', strokeWidth: 2 },
            })
          : edges;
      const newNodes = nodes.concat(newNode);
      setNodes(layoutAllDomains(newNodes, newEdges));
      setEdges(newEdges);
      return id;
    },
    [nextId, edges, nodes, setNodes, setEdges],
  );

  const pathKey = (path: string[]) => path.join(' › ');

  // ─── Library add (auto-chains missing ancestors) ─────────────────────
  const addLibraryItem = useCallback(
    (path: string[]) => {
      const key = pathKey(path);
      if (placedMap[key]) return;

      // Walk from the root of the path forward, adding any missing ancestors
      // so clicking a deep search result "just works".
      const newPlaced: Record<string, string> = {};
      const expandKeys: string[] = [];

      for (let depth = 1; depth <= path.length; depth++) {
        const sub = path.slice(0, depth);
        const subKey = pathKey(sub);
        if (placedMap[subKey] || newPlaced[subKey]) continue;

        const found = findByPath(sub);
        if (!found) return;

        if (depth === 1) {
          // Domain → new standalone tree root
          const id = addNode(null, {
            label: found.domain.name,
            icon: found.domain.icon,
            tier: 'domain',
          });
          newPlaced[subKey] = id;
          expandKeys.push(found.domain.name);
        } else {
          const parentKey = pathKey(sub.slice(0, -1));
          const parentId = placedMap[parentKey] ?? newPlaced[parentKey];
          if (!parentId) return; // shouldn't happen
          const id = addNode(parentId, {
            label: found.skill!.name,
            icon: found.inheritedIcon,
            tier: 'skill',
          });
          newPlaced[subKey] = id;
        }
      }

      setPlacedMap((p) => ({ ...p, ...newPlaced }));
      if (expandKeys.length) {
        setExpanded((e) => {
          const next = { ...e };
          expandKeys.forEach((k) => (next[k] = true));
          return next;
        });
      }
    },
    [placedMap, addNode],
  );

  // ─── Custom skill: inline form in sidebar ────────────────────────────
  const handleSubmitCustomSkill = () => {
    if (!customName.trim() || !customParent) return;
    const score = parseScore(customScore);
    if (score === 'invalid') return;
    addNode(customParent, {
      label: customName.trim(),
      icon: customIcon.trim() || undefined,
      score: score as number | undefined,
      tier: 'skill',
    });
    setCustomName('');
    setCustomIcon('');
    setCustomScore('');
    setCustomParent('');
    setShowCustomForm(false);
  };

  // ─── Delete ──────────────────────────────────────────────────────────
  const handleDeleteSelected = () => {
    const selectedIds = new Set(nodes.filter((n) => n.selected).map((n) => n.id));
    const selectedEdgeIds = new Set(edges.filter((e) => e.selected).map((e) => e.id));
    if (selectedIds.size === 0 && selectedEdgeIds.size === 0) return;
    const newNodes = nodes.filter((n) => !selectedIds.has(n.id));
    const newEdges = edges.filter(
      (e) =>
        !selectedEdgeIds.has(e.id) &&
        !selectedIds.has(e.source) &&
        !selectedIds.has(e.target),
    );
    setPlacedMap((prev) => {
      const next: Record<string, string> = {};
      for (const [k, id] of Object.entries(prev)) {
        if (!selectedIds.has(id)) next[k] = id;
      }
      return next;
    });
    setNodes(layoutAllDomains(newNodes, newEdges));
    setEdges(newEdges);
    setSelectedNodeId(null);
  };

  const handleReset = () => {
    if (!window.confirm('Wipe the canvas? This clears your saved tree.')) return;
    clearLocalState();
    setNodes([]);
    setEdges([]);
    setPlacedMap({});
    setExpanded({});
    setNextId(1);
    setSelectedNodeId(null);
  };

  // ─── Edit-panel helpers ──────────────────────────────────────────────
  const selectedNode = useMemo(
    () => (selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) ?? null : null),
    [nodes, selectedNodeId],
  );

  const updateSelectedData = (updates: Partial<SkillNodeData>) => {
    if (!selectedNodeId) return;
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNodeId
          ? { ...n, data: { ...(n.data as SkillNodeData), ...updates } }
          : n,
      ),
    );
  };

  // ─── Prerequisite engine: "What should I learn next?" ────────────────
  type Recommendation = {
    id: string;
    label: string;
    icon?: string;
    parentLabel: string;
    parentScore: number;
    status: string;
  };

  const recommendations = useMemo((): Recommendation[] => {
    if (!showRecommendations) return [];

    // Build parent→children map and node lookup
    const parentOf = new Map<string, string>();
    edges.forEach((e) => parentOf.set(e.target, e.source));

    const nodeMap = new Map<string, Node>();
    nodes.forEach((n) => nodeMap.set(n.id, n));

    const recs: Recommendation[] = [];

    for (const node of nodes) {
      const d = node.data as SkillNodeData;
      const score = d.score ?? 0;

      // Skip nodes that already have meaningful progress
      if (score >= 3) continue;

      // Check if the parent exists and has score >= 3
      const parentId = parentOf.get(node.id);
      if (!parentId) continue; // root/domain nodes — no prerequisite
      const parent = nodeMap.get(parentId);
      if (!parent) continue;
      const pd = parent.data as SkillNodeData;
      const parentScore = pd.score ?? 0;
      if (parentScore < 3) continue; // parent not ready

      recs.push({
        id: node.id,
        label: d.label,
        icon: d.icon,
        parentLabel: pd.label,
        parentScore,
        status: d.status ?? 'active',
      });
    }

    // Sort: parent score desc (strongest prerequisites first), then alphabetical
    recs.sort((a, b) => b.parentScore - a.parentScore || a.label.localeCompare(b.label));
    return recs;
  }, [showRecommendations, nodes, edges]);

  // ─── Recursive sidebar tree ──────────────────────────────────────────
  const renderSkillTree = (
    skill: LibrarySkill,
    ancestors: string[],
    inheritedIcon: string | undefined,
    depth: number,
  ) => {
    const path = [...ancestors, skill.name];
    const key = pathKey(path);
    const placed = !!placedMap[key];
    // With auto-chain, clicking any skill auto-adds missing ancestors,
    // so the only disable condition is "already placed".
    const parentActuallyPlaced = true;
    const isExpanded = expanded[key] ?? false;
    const hasChildren = !!skill.children?.length;
    const effectiveIcon = skill.icon ?? inheritedIcon;

    return (
      <div key={key} style={{ marginLeft: depth * 10 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
          {hasChildren ? (
            <button
              onClick={() => setExpanded((e) => ({ ...e, [key]: !isExpanded }))}
              style={chevronStyle}
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? '▾' : '▸'}
            </button>
          ) : (
            <div style={{ width: 26, flexShrink: 0 }} />
          )}
          <button
            onClick={() => addLibraryItem(path)}
            disabled={placed || !parentActuallyPlaced}
            title={
              placed
                ? 'Already on canvas'
                : !parentActuallyPlaced
                  ? 'Add its parent first'
                  : 'Add to canvas'
            }
            style={skillBtnStyle(placed, !parentActuallyPlaced)}
          >
            {effectiveIcon && <span style={{ marginRight: 6 }}>{effectiveIcon}</span>}
            {placed ? `✓ ${skill.name}` : skill.name}
          </button>
        </div>
        {isExpanded &&
          skill.children?.map((child) =>
            renderSkillTree(child, path, effectiveIcon, depth + 1),
          )}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', background: '#020617' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 340,
          background: '#0f172a',
          color: '#e2e8f0',
          borderRight: '1px solid #1e293b',
          padding: 16,
          overflowY: 'auto',
          flexShrink: 0,
        }}
      >
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Skill Library</h2>

        <button
          onClick={() => setShowCustomForm((v) => !v)}
          style={{
            width: '100%',
            padding: '10px 14px',
            marginBottom: showCustomForm ? 8 : 14,
            background: showCustomForm ? '#1e40af' : '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          {showCustomForm ? '— Cancel' : '+ Create custom skill'}
        </button>

        {showCustomForm && (
          <div
            style={{
              marginBottom: 14,
              padding: 12,
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: 6,
            }}
          >
            <label style={editLabelStyle}>Name *</label>
            <input
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g. Meditation"
              style={editInputStyle}
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleSubmitCustomSkill()}
            />
            <label style={editLabelStyle}>Icon (emoji)</label>
            <input
              value={customIcon}
              onChange={(e) => setCustomIcon(e.target.value)}
              placeholder="e.g. 🧘"
              style={editInputStyle}
            />
            <label style={editLabelStyle}>Score (0–10, 0.5 steps)</label>
            <input
              value={customScore}
              onChange={(e) => setCustomScore(e.target.value)}
              placeholder="blank = no score"
              style={editInputStyle}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmitCustomSkill()}
            />
            {customScore && parseScore(customScore) === 'invalid' && (
              <div style={{ fontSize: 11, color: '#f87171', marginBottom: 8 }}>
                Must be 0–10 in 0.5 increments
              </div>
            )}
            <label style={editLabelStyle}>Connect to *</label>
            <select
              value={customParent}
              onChange={(e) => setCustomParent(e.target.value)}
              style={{
                ...editInputStyle,
                appearance: 'auto',
              }}
            >
              <option value="">— Select a parent node —</option>
              {nodes.map((n) => (
                <option key={n.id} value={n.id}>
                  {(n.data as SkillNodeData).icon ? `${(n.data as SkillNodeData).icon} ` : ''}
                  {(n.data as SkillNodeData).label}
                </option>
              ))}
            </select>
            {nodes.length === 0 && (
              <div style={{ fontSize: 11, color: '#f59e0b', marginBottom: 8 }}>
                Add a domain from the library first, then connect your custom skill to it.
              </div>
            )}
            <button
              onClick={handleSubmitCustomSkill}
              disabled={!customName.trim() || !customParent || parseScore(customScore) === 'invalid'}
              style={{
                width: '100%',
                padding: '8px 14px',
                background: !customName.trim() || !customParent || parseScore(customScore) === 'invalid' ? '#334155' : '#16a34a',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                fontWeight: 700,
                fontSize: 13,
                cursor: !customName.trim() || !customParent || parseScore(customScore) === 'invalid' ? 'not-allowed' : 'pointer',
              }}
            >
              Add to canvas
            </button>
          </div>
        )}

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search skills…"
          style={{
            width: '100%',
            padding: '8px 10px',
            marginBottom: 12,
            background: '#020617',
            color: '#e2e8f0',
            border: '1px solid #334155',
            borderRadius: 6,
            fontSize: 13,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />

        {search.trim() && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: '#64748b', marginBottom: 6 }}>
              {searchResults.length} result{searchResults.length === 1 ? '' : 's'}
            </div>
            {searchResults.map((item) => {
              const key = item.path.join(' › ');
              const placed = !!placedMap[key];
              return (
                <button
                  key={key}
                  onClick={() => addLibraryItem(item.path)}
                  disabled={placed}
                  style={{
                    ...searchResultStyle,
                    opacity: placed ? 0.5 : 1,
                    cursor: placed ? 'default' : 'pointer',
                  }}
                  title={item.path.join(' › ')}
                >
                  <div style={{ fontWeight: 600, fontSize: 13 }}>
                    {item.icon && <span style={{ marginRight: 6 }}>{item.icon}</span>}
                    {placed ? `✓ ${item.name}` : item.name}
                  </div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>
                    {item.path.slice(0, -1).join(' › ') || 'domain'}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {!search.trim() && (
          <>
            <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 12, lineHeight: 1.5 }}>
              Click a domain to start its tree. Each domain becomes its own center.
            </p>
            {skillLibrary.map((domain) => {
              const key = domain.name;
              const placed = !!placedMap[key];
              const isExpanded = expanded[key] ?? false;
              return (
                <div key={key} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <button
                      onClick={() => setExpanded((e) => ({ ...e, [key]: !isExpanded }))}
                      style={chevronStyle}
                      aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      {isExpanded ? '▾' : '▸'}
                    </button>
                    <button
                      onClick={() => addLibraryItem([domain.name])}
                      disabled={placed}
                      style={domainBtnStyle(placed)}
                    >
                      {domain.icon && <span style={{ marginRight: 6 }}>{domain.icon}</span>}
                      {placed ? `✓ ${domain.name}` : domain.name}
                    </button>
                  </div>
                  {isExpanded && (
                    <div style={{ marginTop: 4 }}>
                      {domain.skills.map((skill) =>
                        renderSkillTree(skill, [domain.name], domain.icon, 1),
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </aside>

      {/* Canvas */}
      <div style={{ flex: 1, height: '100vh', position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onReconnect={onReconnect}
          onReconnectStart={onReconnectStart}
          onReconnectEnd={onReconnectEnd}
          onEdgeClick={onEdgeClick}
          onSelectionChange={onSelectionChange}
          nodesDraggable={false}
          edgesReconnectable
          selectionOnDrag
          panOnDrag={[1, 2]}
          fitView
          defaultEdgeOptions={{
            style: { stroke: '#64748b', strokeWidth: 2 },
            interactionWidth: 20,
          }}
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="#1e293b" />
          <Controls />
          <Panel position="top-left">
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleDeleteSelected} style={btnStyle('#dc2626')}>
                Delete selected
              </button>
              <button onClick={handleReset} style={btnStyle('#475569')}>
                Reset
              </button>
              <button
                onClick={() => setShowRecommendations((v) => !v)}
                style={btnStyle(showRecommendations ? '#7c3aed' : '#2563eb')}
              >
                {showRecommendations ? '✕ Close' : '🧭 What should I learn next?'}
              </button>
            </div>
          </Panel>
          <Panel position="bottom-right">
            <div
              style={{
                fontSize: 11,
                color: '#94a3b8',
                background: 'rgba(15,23,42,0.85)',
                padding: '6px 10px',
                borderRadius: 4,
                border: '1px solid #1e293b',
              }}
            >
              Left-drag: box select · Right/middle-drag: pan · Click edge to select/reroute
            </div>
          </Panel>
        </ReactFlow>

        {/* Edit panel (appears when one node is selected) */}
        {selectedNode && (
          <div
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 260,
              background: '#0f172a',
              color: '#e2e8f0',
              border: '1px solid #334155',
              borderRadius: 8,
              padding: 16,
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              zIndex: 5,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Edit Skill</h3>
              <button
                onClick={() => setSelectedNodeId(null)}
                style={{
                  background: 'transparent',
                  color: '#94a3b8',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 18,
                  lineHeight: 1,
                }}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <label style={editLabelStyle}>Name</label>
            <input
              value={(selectedNode.data as SkillNodeData).label}
              onChange={(e) => updateSelectedData({ label: e.target.value })}
              style={editInputStyle}
            />

            <label style={editLabelStyle}>Icon (emoji)</label>
            <input
              value={(selectedNode.data as SkillNodeData).icon ?? ''}
              onChange={(e) => updateSelectedData({ icon: e.target.value || undefined })}
              style={editInputStyle}
              placeholder="e.g. 🏃"
            />

            <label style={editLabelStyle}>Score (0–10, 0.5 steps)</label>
            <input
              type="number"
              min={0}
              max={10}
              step={0.5}
              value={(selectedNode.data as SkillNodeData).score ?? ''}
              onChange={(e) => {
                const v = e.target.value;
                if (v === '') {
                  updateSelectedData({ score: undefined });
                  return;
                }
                const n = Number(v);
                if (Number.isNaN(n) || n < 0 || n > 10 || (n * 2) % 1 !== 0) return;
                updateSelectedData({ score: n });
              }}
              style={editInputStyle}
              placeholder="(blank = no score)"
            />
            <button
              onClick={() => updateSelectedData({ score: undefined })}
              style={{
                width: '100%',
                padding: '6px 10px',
                background: '#1e293b',
                color: '#94a3b8',
                border: '1px solid #334155',
                borderRadius: 4,
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              Clear score
            </button>

            <label style={{ ...editLabelStyle, marginTop: 12 }}>Status</label>
            <div style={{ display: 'flex', gap: 6 }}>
              {(['active', 'goal', 'planned'] as const).map((s) => {
                const current = (selectedNode.data as SkillNodeData).status ?? 'active';
                const colors: Record<string, { bg: string; border: string }> = {
                  active: { bg: '#3b82f6', border: '#60a5fa' },
                  goal: { bg: '#ef4444', border: '#f87171' },
                  planned: { bg: '#64748b', border: '#94a3b8' },
                };
                const isActive = current === s;
                return (
                  <button
                    key={s}
                    onClick={() => updateSelectedData({ status: s })}
                    style={{
                      flex: 1,
                      padding: '6px 0',
                      background: isActive ? colors[s].bg : '#0f172a',
                      color: isActive ? 'white' : '#94a3b8',
                      border: `2px solid ${isActive ? colors[s].border : '#334155'}`,
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Recommendations panel */}
        {showRecommendations && (
          <div
            style={{
              position: 'absolute',
              top: 60,
              left: 16,
              width: 340,
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              background: '#0f172a',
              color: '#e2e8f0',
              border: '1px solid #334155',
              borderRadius: 8,
              padding: 16,
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              zIndex: 5,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>
                🧭 Recommended Next Skills
              </h3>
              <button
                onClick={() => setShowRecommendations(false)}
                style={{
                  background: 'transparent',
                  color: '#94a3b8',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 18,
                  lineHeight: 1,
                }}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 12, lineHeight: 1.5 }}>
              Skills where you have strong enough prerequisites (parent score ≥ 3) but haven&apos;t started yet.
            </p>

            {nodes.length === 0 ? (
              <div style={{ fontSize: 12, color: '#64748b', padding: '12px 0' }}>
                Add some skills to the canvas first.
              </div>
            ) : recommendations.length === 0 ? (
              <div style={{ fontSize: 12, color: '#64748b', padding: '12px 0' }}>
                No recommendations right now. Score some skills ≥ 3 to unlock suggestions for their children.
              </div>
            ) : (
              <>
                <div style={{ fontSize: 11, color: '#64748b', marginBottom: 8 }}>
                  {recommendations.length} skill{recommendations.length === 1 ? '' : 's'} ready to learn
                </div>
                {recommendations.map((rec) => (
                  <button
                    key={rec.id}
                    onClick={() => {
                      setSelectedNodeId(rec.id);
                      setShowRecommendations(false);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 12px',
                      marginBottom: 6,
                      background: '#1e293b',
                      color: '#e2e8f0',
                      border: '1px solid #334155',
                      borderRadius: 6,
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: 13 }}>
                      {rec.icon && <span style={{ marginRight: 6 }}>{rec.icon}</span>}
                      {rec.label}
                    </div>
                    <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>
                      Prerequisite: {rec.parentLabel} ({rec.parentScore}/10)
                    </div>
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Inline styles ───────────────────────────────────────────────────────

const btnStyle = (bg: string) =>
  ({
    padding: '8px 14px',
    background: bg,
    color: 'white',
    border: 'none',
    borderRadius: 6,
    fontWeight: 600,
    cursor: 'pointer',
  }) as const;

const chevronStyle = {
  width: 26,
  height: 26,
  background: '#1e293b',
  color: '#e2e8f0',
  border: '1px solid #334155',
  borderRadius: 4,
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 700,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
} as const;

const domainBtnStyle = (placed: boolean) =>
  ({
    flex: 1,
    textAlign: 'left' as const,
    padding: '8px 10px',
    background: placed ? '#334155' : '#fde68a',
    color: placed ? '#94a3b8' : '#0f172a',
    border: `1px solid ${placed ? '#475569' : '#d97706'}`,
    borderRadius: 4,
    fontWeight: 700,
    fontSize: 13,
    cursor: placed ? 'default' : 'pointer',
  }) as const;

const skillBtnStyle = (placed: boolean, disabled: boolean) =>
  ({
    flex: 1,
    textAlign: 'left' as const,
    padding: '5px 8px',
    background: placed ? '#1e293b' : disabled ? '#0b1220' : '#1e293b',
    color: placed ? '#94a3b8' : disabled ? '#475569' : '#e2e8f0',
    border: '1px solid #334155',
    borderRadius: 4,
    cursor: placed || disabled ? 'not-allowed' : 'pointer',
    fontSize: 12,
  }) as const;

const searchResultStyle = {
  display: 'block',
  width: '100%',
  textAlign: 'left' as const,
  padding: '6px 10px',
  marginBottom: 4,
  background: '#1e293b',
  color: '#e2e8f0',
  border: '1px solid #334155',
  borderRadius: 4,
} as const;

const editLabelStyle = {
  display: 'block',
  fontSize: 11,
  color: '#94a3b8',
  marginBottom: 4,
  fontWeight: 600,
} as const;

const editInputStyle = {
  display: 'block',
  width: '100%',
  padding: '6px 10px',
  marginBottom: 10,
  background: '#020617',
  color: '#e2e8f0',
  border: '1px solid #334155',
  borderRadius: 4,
  fontSize: 12,
  outline: 'none',
  boxSizing: 'border-box' as const,
} as const;
