# Gazodoro

Gazodoro is an adaptive Pomodoro prototype for people who do long, focused reading on a computer.

It combines a simple focus timer, optional webcam-based engagement signals, and a short post-focus survey to adjust the next focus and break cycle. The goal is to help readers stay in flow when they are doing well and recover earlier when fatigue starts building up.

![Gazodoro design preview](docs/design/figma_make_00_overview_thumbnail.png)

## Why Gazodoro?

Traditional Pomodoro timers use fixed intervals, usually 25 minutes of work followed by a short break. That structure is useful, but it can feel rigid during deep reading:

- a break may interrupt you just as you enter a good reading flow
- a fixed timer may let you continue even when your attention and visual comfort are dropping
- manually deciding when to adjust the timer adds extra effort during already demanding work

Gazodoro explores a gentler adaptive approach: keep the timer simple, use lightweight signals, and adjust the next session without asking the user to constantly manage the system.

## Key Features

- Focus and break timer for deep reading sessions
- Optional webcam-based engagement signal
- Short post-focus survey for focus and fatigue
- Adaptive next-session focus and break durations
- Automatic adjustment with manual override
- Fallback mode when webcam access or survey input is unavailable
- Privacy-aware design: raw webcam video or images should not be stored

## How It Works

1. Start a focus session.
2. If enabled, Gazodoro estimates screen engagement using webcam-based signals.
3. When the focus session ends, answer or skip a short survey about focus and fatigue.
4. Gazodoro combines the available signals.
5. The next focus and break durations are auto-adjusted, with an explanation and manual override.

Adaptive changes affect the next session only. Gazodoro does not automatically extend or shorten the current focus session while you are reading.

## Adaptive Logic

Gazodoro uses two input modalities:

- **Webcam engagement:** estimates whether the user appears visually engaged with the screen.
- **Survey readiness:** captures self-reported focus and fatigue after a focus session.

These signals are combined through rule-based scoring. High engagement does not always mean the next session should be longer; if the user reports high fatigue, Gazodoro prioritizes recovery.

For the full decision model, see [Adaptive Logic](docs/gazodoro_adaptive_logic.md).

## Privacy And Control

Webcam support is optional. Gazodoro should continue to work as a normal Pomodoro timer if camera access is denied or unavailable.

The adaptive system is designed around user control:

- users can skip surveys
- users can disable webcam-based engagement detection
- users can manually override adjusted durations
- low engagement should be treated as a supportive signal, not a judgment

## Run Locally

This is a static HTML/CSS/JavaScript prototype.

From the project root, run:

```powershell
python -m http.server 4173
```

Then open:

```text
http://localhost:4173/
```

Chrome or Microsoft Edge is recommended for webcam-related features.

Note: use a local server instead of opening `index.html` directly. Browser camera features and local development checks may not work correctly from a plain file URL.

## Documentation

- [Product Requirements Document](docs/PRD.md)
- [Adaptive Logic](docs/gazodoro_adaptive_logic.md)
- [UI Flow And Design Notes](docs/design/UI_FLOW.md)

## Project Status

Gazodoro is currently a prototype. The product direction, adaptive logic, and interface flow are still being refined through design and implementation testing.

