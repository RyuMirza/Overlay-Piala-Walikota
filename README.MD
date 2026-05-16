# PUBGM Esport Overlays - Browser Edition

A clean, lightweight, serverless full-browser overlay package for PUBG Mobile Esports broadcasting.

## Features
- **100% Full Browser:** No backend server required (No Node.js, no SPX-GC). Uses browser `localStorage` to synchronize data instantly between the dashboard and the overlays.
- **Real-Time Sync:** Changes made in the dashboard apply instantly to the overlays without any lag or polling delay.
- **Easy to Use:** Just open the files in OBS or any standard browser.

## How to Use
1. **Open Dashboard:** Open `dashboard.html` in your browser, or add it as a Custom Browser Dock in OBS Studio (`View` -> `Docks` -> `Custom Browser Docks`).
2. **Add Overlays:** Add the overlay files (e.g., `live-ticker.html`, `eliminated.html`, `map-overlay.html`) into your OBS as **Browser Sources**. 
3. **Important:** If you use OBS, the Dashboard **MUST** be opened as an OBS Custom Dock so it shares the same local storage as the OBS Browser Sources.
4. **Control:** Use the Dashboard to manage team names, player status (alive/dead), kills, and trigger elimination alerts!

## Files Included
- `dashboard.html`: The operator control panel.
- `live-ticker.html`: Top right live standings ticker.
- `eliminated.html`: Big alert triggered when a team is eliminated.
- `map-overlay.html`: Sidebars showing all team alive statuses over the game map.
- `table-result.html`: Post-match match results table.
- `overall-standings.html`: Post-match overall tournament standings.

## Customizing Logos
Place your team logos in the `team_logos` folder as `.png` files.
