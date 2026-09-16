# Gridiron Reborn 3D

A clean-room, browser-based 3D arcade football remake built after auditing the supplied Retro Bowl web export. The project intentionally does **not** include the original game's compiled code, textures, audio, team database, names, or other proprietary assets.

## What is playable now

- Procedural 3D stadium and full football field
- 11-v-11 live play simulation
- Quick pass, deep pass, run, screen, punt, and field goal calls
- QB control, click-to-throw passing, receiver routes, catches, interceptions, ball-carrier control, jukes, blocking, pursuit, tackles, downs, first downs, touchdowns, clock, quarters, and scoring
- Smart teammate blocking that prioritizes the biggest threats instead of blindly clustering
- CPU defensive coverage/pursuit and opponent-drive simulation
- Career save in browser storage
- Roster progression to Level 100, rebirths, team stars up to 10★, facilities, credits, training and rehab
- Practice mode
- Responsive HUD and career UI

## Controls

- `Space`: snap
- `WASD` / arrow keys: move controlled player
- `Shift`: sprint
- `R`: juke
- `Q` / `E`: change highlighted receiver
- Mouse/touch on the field: throw to that point while controlling the QB

## Run locally

The game uses ES modules, so serve it over HTTP:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Architecture

- `src/game.js` — 3D world, football state machine, physics-lite simulation, scoring
- `src/ai.js` — route running, coverage, pursuit, smart blocking
- `src/career.js` — persistent roster/progression/rebirth/facilities
- `src/ui.js` — HUD, menus, career rendering
- `docs/SOURCE_AUDIT.md` — audited systems/resources from the supplied source export
- `docs/ROADMAP.md` — next phases toward full feature parity and beyond

## Legal / asset policy

This repository is a clean-room rewrite. Do not copy the original game's proprietary art, audio, source code, team data, or branding into this project without the necessary rights.
