# iFly capture run — 2026-08-14

> **Update:** these are now produced by an unattended harness in the app repo,
> `tools/screenshots/capture.py` + `shots.json`, not by hand:
>
> ```bash
> python3 capture.py --udid <sim-udid> --out <dir> [--only NAME ...]
> ```
>
> It reads the UI over the accessibility tree and captures through
> `GET /api/debug/screenshot`, so there is no screenshot-and-guess loop. The
> six iPhone UI shots run in one pass with no supervision. See the harness
> commit for what it takes to make such a run trustworthy — several early
> "successful" runs quietly captured the Pro upsell card instead of the
> requested screen.

Target: replace the full ifly-emu.com screenshot set (see capture brief).
Device so far: iPhone 17 Pro Max sim (iOS 26.5), **1320 × 2868 native**, PNG,
no scaling or cropping.

Output folder: `public/screenshots/2026-08/`

---

## Delivered (6 of 25)

| # | File | Contents |
|---|---|---|
| 1 | `iphone-library.png` | Recently Played + Favourites + Dreamcast BIOS + All Games, all populated, default (orange) theme |
| 2 | `iphone-library-theme.png` | Same screen, Sega Blue theme |
| 3 | `iphone-search.png` | Search "so" → Sonic Adventure + Soul Calibur ⚠️ *replaces an iCube shot* |
| 4 | `iphone-settings-themes.png` | Appearance, theme picker open: Default / Dream / Sega Blue / Naomi / Atomiswave / Sonic / Matrix / Chromcore |
| 10 | `iphone-cheats.png` | Dead or Alive 2 cheats, 22 entries, 1 enabled ⚠️ *replaces an iCube shot* |
| 12 | `iphone-import.png` | Add Games: QR, Wi-Fi URL, Import from Files, Continue from Another Device, Transfer History |

All are genuine iFly screens with real Dreamcast box art. No GameCube/Wii
content anywhere.

## Library used

15 real Dreamcast CDIs + 1 NAOMI ROM cloned into the app container; all 16
scanned with correct titles and artwork:

240p Test Suite · Border Down · Capcom vs. SNK (NAOMI) · Crazy Taxi 2 ·
Daytona USA · Dead or Alive 2 · Ecco the Dolphin · Jet Grind Radio ·
Marvel vs. Capcom 2 · Rayman 2 · Sega Rally 2 · Sonic Adventure ·
Soul Calibur · Street Fighter III 3rd Strike · Tony Hawk's Pro Skater 2 ·
Virtua Tennis

Recently Played populated by booting 6 titles; Crazy Taxi 2, Dead or Alive 2
and Marvel vs. Capcom 2 favourited.

---

## Not captured, and why

### Gameplay shots (6, 7, 8, 9, 11, 13, 14) + all video

Emulation **does** work in the simulator — Sonic Adventure's opening
cinematic, Crazy Taxi 2's attract demo and the Dreamcast BIOS swirl all
rendered correctly through the Metal path with the Dreamsicle skin.

What blocks it is **speed, not correctness**. In the simulator a disc boot
takes 2–5 minutes to reach a title screen, and every menu step needs a
press-and-hold (a normal-length tap falls between the guest's input polls at
that speed and is dropped entirely). Driving a game through
title → mode select → character select → play costs ~10 minutes per title,
per device class, and the result would still be a low-framerate capture —
exactly what makes the current 296×640 clip unusable.

**Recommendation: shoot these on a real device.** `tools/screenshots/`
already has `record-device.sh`, and the debug API works over the LAN, so the
same automation applies at full speed. That gets shots 6–9, 11, 13–14, 17–19,
22 and all three videos in a fraction of the time and at much better quality.

### 5 — `iphone-achievements.png`

RetroAchievements is signed out. Signing in needs real credentials; the brief
rules out the personal `AbraxasEMU` account and I can't create a neutral demo
account. **Needs a throwaway RA login from you** — then it's a 2-minute shot.

### iPad (15–20) and Apple TV (21–25)

Not started. Both are straightforward once the gameplay approach is settled;
the tvOS core slice is now built Release so the Apple TV shots are viable.

---

## Notes and observations

- **The Flycast xcframework was built `Debug`** at the start of this run —
  every slice, including the device ones. Rebuilt all four Release
  (`-O3`, thin LTO); `.build-config` now reads `Release`. Worth knowing that
  whatever was last shipped from this checkout had an unoptimised core.
- **The first Release rebuild half-failed** with `disk I/O error` on the
  build database: the volume was at 100% (10 GiB free). Cleared ~65 GB of
  DerivedData with your approval and it built clean.
- **iOS hides the status bar** in the library and in-game, so the 9:41
  override is a no-op for these shots. Nothing ragged to normalise.
- **`#12` shows a LAN IP** (`192.168.1.222:8080`) in text and in the QR code.
  RFC1918, so not identifying, but flagging rather than pre-processing.
- **Sega Blue renders a gold accent**, not blue. Looks deliberate; noting it
  in case the "it themes" shot was meant to read as blue.
- **Soul Calibur hangs** at `Accessing controller port #A1 VM.` — sat there
  4+ minutes with no progress, while Crazy Taxi 2 showed all four VMUs fine
  on its memory-card screen. Might be simulator-only, might be real. Not
  investigated; worth a look separately.
- **`/api/perf/live` reports `gameFps: 0`** the whole time, including while
  the renderer was demonstrably producing frames (`rendProcessMs` non-zero,
  visible animation). Either the field is wrong on this path or it isn't
  counting simulator vblanks. Also worth a separate look.

## Missing ROMs

Four titles the brief suggested aren't in the local set: **Sturmwind**,
**Last Hope – Pink Bullets**, **Malvado**, **Rush Rush Rally Racing**.
Substituting installed Dreamcast titles, per your call.
