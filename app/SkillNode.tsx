'use client';

import { Handle, Position, type NodeProps } from '@xyflow/react';

// What the node carries as its data payload
export type SkillNodeData = {
  label: string;
  icon?: string;
  score?: number; // 0–10, optional
  tier: 'root' | 'domain' | 'skill';
  status?: 'active' | 'goal' | 'planned'; // default = 'active'
  description?: string;
  prerequisites?: string[];
  goalRating?: number;
};

// Theme per tier — inspired by Diablo / Horizon skill trees
const tierTheme = {
  root: {
    bg: 'radial-gradient(circle at 30% 30%, #4ade80, #15803d)',
    border: '#22c55e',
    glow: 'rgba(34, 197, 94, 0.6)',
    size: 110,
  },
  domain: {
    bg: 'radial-gradient(circle at 30% 30%, #fcd34d, #b45309)',
    border: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.55)',
    size: 95,
  },
  skill: {
    bg: 'radial-gradient(circle at 30% 30%, #60a5fa, #1e3a8a)',
    border: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.5)',
    size: 80,
  },
} as const;

// Status overrides — applied on top of tier theme
const statusOverrides: Record<string, { bg: string; border: string; glow: string }> = {
  goal: {
    bg: 'radial-gradient(circle at 30% 30%, #f87171, #991b1b)',
    border: '#ef4444',
    glow: 'rgba(239, 68, 68, 0.55)',
  },
  planned: {
    bg: 'radial-gradient(circle at 30% 30%, #94a3b8, #475569)',
    border: '#64748b',
    glow: 'rgba(100, 116, 139, 0.4)',
  },
};

export default function SkillNode({ data, selected }: NodeProps) {
  const d = data as SkillNodeData;
  const tier = tierTheme[d.tier];
  const status = d.status ?? 'active';
  const over = statusOverrides[status];
  // Active uses tier colors; goal/planned override
  const bg = over?.bg ?? tier.bg;
  const border = over?.border ?? tier.border;
  const glow = over?.glow ?? tier.glow;
  const hasScore = typeof d.score === 'number';
  const pct = hasScore ? (d.score! / 10) * 100 : 0;

  // Brighten fully-scored nodes; planned nodes are dimmer
  const intensityBoost = hasScore ? d.score! / 10 : 0.5;
  const dimFactor = status === 'planned' ? 0.6 : 1;
  const shadow = `0 0 ${(16 + intensityBoost * 18) * dimFactor}px ${glow}`;

  // Build tooltip text
  const tipLines: string[] = [d.label];
  if (d.description) tipLines.push(d.description);
  tipLines.push(`Status: ${status}`);
  if (hasScore) tipLines.push(`Score: ${d.score} / 10`);
  if (d.goalRating != null) tipLines.push(`Goal: ${d.goalRating} / 10`);
  if (d.prerequisites?.length) tipLines.push(`Requires: ${d.prerequisites.join(', ')}`);
  const tooltip = tipLines.join('\n');

  return (
    <div
      title={tooltip}
      style={{
        width: tier.size,
        height: tier.size,
        borderRadius: '50%',
        background: bg,
        border: `3px solid ${selected ? '#fde68a' : border}`,
        boxShadow: selected
          ? `${shadow}, 0 0 0 4px rgba(253, 230, 138, 0.35)`
          : shadow,
        opacity: status === 'planned' ? 0.7 : 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f8fafc',
        textShadow: '0 1px 3px rgba(0,0,0,0.8)',
        position: 'relative',
        padding: 6,
        transition: 'box-shadow 120ms ease, border-color 120ms ease',
      }}
    >
      {/* Connection handles — invisible but let users draw edges */}
      <Handle type="target" position={Position.Top} style={{ background: '#475569', width: 8, height: 8 }} />
      <Handle type="source" position={Position.Bottom} style={{ background: '#475569', width: 8, height: 8 }} />

      {d.icon && (
        <div style={{ fontSize: d.tier === 'root' ? 28 : 22, lineHeight: 1 }}>{d.icon}</div>
      )}
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          textAlign: 'center',
          marginTop: 2,
          maxWidth: tier.size - 14,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        title={d.label}
      >
        {d.label}
      </div>

      {/* Score ring at the bottom of the node */}
      {hasScore && (
        <>
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: tier.size - 24,
              height: 6,
              background: 'rgba(15, 23, 42, 0.6)',
              borderRadius: 999,
              overflow: 'hidden',
              border: '1px solid rgba(248, 250, 252, 0.2)',
            }}
          >
            <div
              style={{
                width: `${pct}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #fef08a, #f97316)',
                boxShadow: '0 0 6px rgba(249, 115, 22, 0.8)',
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: -18,
              fontSize: 10,
              fontWeight: 600,
              color: '#fcd34d',
              textShadow: '0 1px 2px rgba(0,0,0,0.9)',
            }}
          >
            {d.score} / 10
          </div>
        </>
      )}
    </div>
  );
}
