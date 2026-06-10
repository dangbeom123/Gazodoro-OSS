# Gazodoro

Gazodoro is an adaptive Pomodoro web application for knowledge workers who perform long, deep reading tasks on a computer.

## Product Goal

Gazodoro helps users maintain focus and manage fatigue during long-form reading by combining a Pomodoro timer, optional webcam-based engagement signals, and post-session feedback.

## Target Users

- University students
- Researchers
- Professionals who read papers, reports, or study materials for extended periods

## Core Features

- Onboarding and optional webcam permission setup
- Core Pomodoro timer: start, pause/resume, reset, stop
- Automatic focus/break session transition
- Optional webcam-based engagement detection
- Engagement status indicator: Stable / Low / Unavailable
- Post-session self-report survey
- Adaptive recommendation for next focus/break session
- Settings and privacy controls

## Tech Stack

- HTML
- CSS
- JavaScript
- Git / GitHub

## Documentation

- `docs/PRD.md`: Product requirements document
- `docs/design/UI_FLOW.md`: UI flow and screen implementation guide

## Branch Workflow

- `main`: stable demo/milestone branch
- `develop`: integration branch
- `feature/*`: individual feature branches
- `docs/*`: documentation branches
- `fix/*`: bug fix branches

## Known Limitations

- Gazodoro is a prototype, not a production-ready productivity tool.
- Webcam engagement is only a rough signal and does not directly measure concentration, productivity, or fatigue.
- Gaze detection may be inaccurate in low light, with poor camera quality, or when the user reads physical material beside the screen.
- Adaptive logic is rule-based and may need tuning after usability testing.
- Data is currently stored in memory only; refreshing the page clears local session results.
- There is no backend, account system, or cloud sync.
- WebGazer requires a local server and may not work correctly from `file://` or some `127.0.0.1` setups.

## Screenshots

Design references are available in [`docs/design`](docs/design/), including onboarding, timer, camera mode, break states, settings, and survey-related screens.

Useful files:

- [`docs/design/1. Onboarding Screen.png`](docs/design/1.%20Onboarding%20Screen.png)
- [`docs/design/2. Main timer screen.png`](docs/design/2.%20Main%20timer%20screen.png)
- [`docs/design/2.3 Main timer screen - camera mode.png`](docs/design/2.3%20Main%20timer%20screen%20-%20camera%20mode.png)
- [`docs/design/UI_FLOW.md`](docs/design/UI_FLOW.md)
