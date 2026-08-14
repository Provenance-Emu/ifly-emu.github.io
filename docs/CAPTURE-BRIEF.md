# iFly — Screenshot & Video Capture Brief

For an agent driving the iOS/tvOS Simulator. Everything here is what
`ifly-emu.com` needs to replace its full screenshot set.

**Why a full replacement:** the app UI has changed substantially since the
current set was taken, and four shipped assets turned out to be **iCube**
(GameCube/Wii) screenshots sitting on the iFly site — including the iPad
gallery on the homepage, whose title bar literally reads "iCube Library".

---

## 0. Setup — do this first, it applies to every shot

**Clean the status bar.** Every capture must have an identical, neutral
status bar. Without this the gallery looks ragged and real timestamps leak.

```bash
xcrun simctl status_bar booted override \
  --time "9:41" --batteryState charged --batteryLevel 100 \
  --cellularMode active --cellularBars 4 --wifiMode active --wifiBars 3
```

**Rules that apply to all shots:**

- **Native resolution, no scaling.** Capture with
  `xcrun simctl io booted screenshot <file>.png`. Do not resize or crop —
  the website build handles that.
- **PNG for stills.** No JPEG, no HEIC.
- **No personal data.** The current RetroAchievements screenshot shows the
  account `AbraxasEMU`. Use a neutral demo account, or blur/replace the
  username. Same for any WebDAV paths, IPs, or real filenames.
- **Dreamcast content only.** This is the whole point — every game visible
  in every shot must be a Dreamcast/NAOMI title. No GameCube, no Wii, no
  `.dol`/`.wad` files anywhere on screen.
- **Populated library.** Empty states look like an abandoned project. Aim
  for 12+ titles with real box art, plus Recently Played and Favourites
  filled in.
- **Keep the same game and same scene** across the shader/filter variants
  so they read as a genuine before/after rather than unrelated shots.

Good titles to have installed (all already appear in existing assets, so
they are known-working): Sonic Adventure, SoulCalibur, Dead or Alive 2,
Marvel vs. Capcom 2, Sturmwind, Last Hope – Pink Bullets, Malvado,
Rush Rush Rally Racing, 240p Test Suite, and a NAOMI arcade ROM.

---

## 1. iPhone — portrait

**Device:** iPhone 17 Pro Max (or whatever gives 1320 × 2868). Portrait.

| # | Filename | What must be on screen |
|---|---|---|
| 1 | `iphone-library.png` | Home/library, **default theme (orange)**. Recently Played, Favourites, Dreamcast BIOS and All Games sections all populated |
| 2 | `iphone-library-theme.png` | Same screen, a **different theme** (Sega Blue or Atomiswave) — this is the "it themes" shot |
| 3 | `iphone-search.png` | Search active, query returning **Dreamcast** results (e.g. "so" → Sonic Adventure, SoulCalibur). ⚠️ *Replaces an iCube screenshot* |
| 4 | `iphone-settings-themes.png` | Settings → Appearance with the theme picker open, showing the Dream / Sega Blue / Naomi / Atomiswave / Sonic list |
| 5 | `iphone-achievements.png` | Settings → RetroAchievements, signed in, Hardcore Mode visible. **Neutral username** |
| 6 | `iphone-gameplay-touch.png` | Mid-gameplay, on-screen touch controls, Dreamsicle (white) skin. Pick a visually busy moment |
| 7 | `iphone-gameplay-crt.png` | **Same game, same scene** as #6 with the CRT/scanline filter on — the shader money shot |
| 8 | `iphone-gameplay-3d.png` | A 3D title (Sonic Adventure or similar) in motion |
| 9 | `iphone-pause-saves.png` | Pause menu with the save-state grid showing **thumbnail previews** |
| 10 | `iphone-cheats.png` | Cheats panel for a **Dreamcast** game. ⚠️ *Replaces an iCube screenshot* |
| 11 | `iphone-skin-alt.png` | Gameplay with a different controller skin (the dark one) — shows skins are swappable |
| 12 | `iphone-import.png` | Import / file management / WebDAV screen. Optional but useful for the guide pages |

## 2. iPhone — landscape

**Device:** same. Landscape. Target 2868 × 1320.

| # | Filename | What must be on screen |
|---|---|---|
| 13 | `iphone-landscape-shell.png` | Gameplay in the console-shell landscape skin (the full Dreamcast-controller-shaped layout) |
| 14 | `iphone-landscape-crt.png` | Same, with CRT curvature/scanlines visible |

## 3. iPad — landscape

**Device:** iPad Pro 13" or iPad Air 11". Landscape. ⚠️ **All four of these
matter most — the current iPad gallery is the wrong app entirely.**

| # | Filename | What must be on screen |
|---|---|---|
| 15 | `ipad-library.png` | Library grid in landscape, populated, default theme. ⚠️ *Replaces an iCube screenshot* |
| 16 | `ipad-search.png` | Search with **Dreamcast** results. ⚠️ *Replaces an iCube screenshot* |
| 17 | `ipad-gameplay-touch.png` | Gameplay with landscape touch controls |
| 18 | `ipad-gameplay-crt.png` | Same scene with the CRT filter — iPad shows the curvature best |
| 19 | `ipad-arcade-naomi.png` | A **NAOMI arcade** game running, ideally with the performance HUD visible and the arcade button layout (coin/service/test). Used on `/guide/arcade/` |
| 20 | `ipad-settings.png` | Settings in the iPad split layout |

## 4. Apple TV

**Device:** Apple TV 4K simulator. **1920 × 1080** (the current set is
inconsistent — two assets are only 640 × 360, which look soft).

| # | Filename | What must be on screen |
|---|---|---|
| 21 | `tvos-library.png` | Library with focus on a tile, box art visible |
| 22 | `tvos-gameplay.png` | A game running full-screen |
| 23 | `tvos-cheats.png` | The cheats overlay |
| 24 | `tvos-settings-themes.png` | Settings → Appearance, theme list |
| 25 | `tvos-clock.png` | **The Dreamcast-spiral clock** — the screensaver/idle clock with the spiral as the minute hand. This is a signature visual and there is currently no capture of it anywhere |

---

## 5. Video

The current clip is **296 × 640**, which is roughly thumbnail resolution and
too soft to use — that slot is a visible "Gameplay video coming soon"
placeholder on the homepage right now.

```bash
xcrun simctl io booted recordVideo --codec h264 --mask ignore gameplay.mov
```

| # | Filename | Spec |
|---|---|---|
| V1 | `gameplay-hero.mov` | **iPhone landscape, native resolution** (2868 × 1320 or 1920 × 886+). 15–25 s. A visually strong Dreamcast game in continuous play — Sturmwind, Sonic Adventure, or Marvel vs. Capcom 2. Steady framing, no menu fumbling. **No audio needed.** This becomes the homepage hero video |
| V2 | `ui-tour.mov` | Optional. 10–15 s portrait: scroll the library, open a game, show the pause menu, resume. Sells the UI rather than the emulation |
| V3 | `shader-toggle.mov` | Optional but high-impact. 8–12 s: one game, cycling through shader/CRT presets live. Directly demonstrates the feature the site talks about most |

---

## 6. Delivery

Drop everything in one folder, original files, no renaming beyond the names
above, no pre-processing. The website build converts to WebP, resizes, and
generates the AltStore feed variants.

Flag anything you could not capture rather than substituting a lookalike —
a missing shot is easy to work around, a wrong-app shot is what caused this
whole exercise.
