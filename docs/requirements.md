# SkillTree — Requirements

## Background

**Reference:** A hand-drawn mind map with "Life" at the center, branching into categories (Exercise, Grooming, Work, Trading, etc.), each with sub-skills, proficiency ratings (e.g. 3/10), and goals.

**What this app does:** Digitizes and extends that concept with interactivity, persistence, a prerequisite engine, and a skill library side panel.

### Skill Tree Data Model — Infinite Nesting

Skills can branch infinitely deep. There is no limit to how many levels a skill can have. This is called a **recursive tree structure** — each node can have children, and each child can have its own children, and so on.

```
Life
└── Exercise                        ← domain (depth 1)
    └── Running                     ← skill (depth 2)
        └── 10KM                    ← sub-skill (depth 3)
            └── 21KM                ← sub-sub-skill (depth 4)
                └── 42KM            ← can keep going indefinitely
```

This applies to both user-created nodes and library nodes dragged from the side panel.

---

## User Stories

> A user story describes a feature from the perspective of the person using it.
> Format: "As a [user], I want to [do something], so that [reason]."

### Phase 1 — Core Tracker (Local)

| # | User Story | Priority |
|---|---|---|
| 1 | As a user, I want to see my skill tree as an interactive node map so I can visualize all my skills at once | Must have |
| 2 | As a user, I want to drag and reposition nodes so I can organize my tree the way I like | Must have |
| 3 | As a user, I want to add new skill categories (e.g. Exercise, Work) so I can structure my life areas | Must have |
| 4 | As a user, I want to add sub-skills under any node, to any depth, so I can break skills down as granularly as I need | Must have |
| 4a | As a user, I want to use a side panel to browse a skill library organized by domain so I don't have to create everything from scratch | Must have |
| 4b | As a user, I want to drag a domain from the side panel onto the canvas and have its default sub-skills automatically populate | Must have |
| 4c | As a user, I want to add my own custom skills that aren't in the library | Must have |
| 5 | As a user, I want to rate my proficiency in each skill (1–10) so I can track where I am now | Must have |
| 6 | As a user, I want to set a goal rating for each skill so I know what I'm aiming for | Must have |
| 7 | As a user, I want nodes to be color-coded by status (active, goal, planned) so I can see progress at a glance | Must have |
| 8 | As a user, I want my skill tree to be saved so it persists when I close the app | Must have |
| 9 | As a user, I want to delete skills or categories I no longer need | Must have |

### Phase 2 — Prerequisite Engine

| # | User Story | Priority |
|---|---|---|
| 10 | As a user, I want to define that Skill Z requires Skill X and Y first so I can map dependencies | Must have |
| 11 | As a user, I want to see which skills I'm eligible to learn next based on my current skills | Must have |
| 12 | As a user, I want newly unlocked skills to be visually highlighted so I notice them | Should have |
| 13 | As a user, I want to see a "skill path" — the full chain of prerequisites to reach a target skill | Nice to have |

### Phase 3 — Multi-User & Shareable

| # | User Story | Priority |
|---|---|---|
| 14 | As a user, I want to create an account so my skill tree is saved to the cloud | Must have |
| 15 | As a user, I want to share my skill tree via a public link so others can view it | Must have |
| 16 | As a new user, I want to input my existing skills so the app can suggest what I can learn next | Must have |
| 17 | As a user, I want to browse a library of skills others have defined so I can discover new ones | Nice to have |

---

## Feature → Technical Layer Mapping

> This table shows which part of the tech stack each feature needs.

| Feature | Frontend | Backend | Database |
|---|---|---|---|
| View skill tree as node map | ✅ | | |
| Drag and reposition nodes | ✅ | | |
| Side panel — browse skill library by domain | ✅ | ✅ | ✅ |
| Drag domain from panel → auto-populate children on canvas | ✅ | ✅ | ✅ |
| Infinite nesting — add children to any node at any depth | ✅ | ✅ | ✅ |
| Add / edit / delete skills and categories | ✅ | ✅ | ✅ |
| Rate skills (1–10) | ✅ | ✅ | ✅ |
| Set goal ratings | ✅ | ✅ | ✅ |
| Color-code nodes by status | ✅ | | ✅ |
| Persist data (save on close) | | ✅ | ✅ |
| Define prerequisites between skills | ✅ | ✅ | ✅ |
| "Unlock" suggestions based on prerequisites | | ✅ | ✅ |
| User accounts (login / signup) | ✅ | ✅ | ✅ |
| Share skill tree via public link | ✅ | ✅ | ✅ |
| Skill library (shared across users) | ✅ | ✅ | ✅ |

---

## What Each Layer Does (Plain English)

| Layer | Plain English | Technology used |
|---|---|---|
| **Frontend** | Everything the user sees and clicks in the browser | Next.js + React Flow |
| **Backend** | Rules and logic that run on a server — e.g. "does this user meet the prerequisites?" | Next.js API Routes |
| **Database** | Where data lives permanently — survives closing the app or browser | JSON file (Phase 1) → Supabase → AWS RDS |

---

## Node Color Reference (from original mind map)

| Color | Meaning |
|---|---|
| Blue fill | Current / active skill |
| Red outline | Goal / target to reach |
| Grey fill | Planned / not yet started |
| Green (centre) | Root node (Life) |
