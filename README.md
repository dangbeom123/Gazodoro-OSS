# GazoTYPO

GazoTYPO is an adaptive Pomodoro web application for knowledge workers who perform long, deep reading tasks on a computer.

Gazodoro is an adaptive Pomodoro web prototype for knowledge workers who do long, focused reading on a computer.

The app combines a simple focus/break timer, optional webcam-based engagement signals, required baseline readiness input, and short post-session surveys. Gazodoro uses these lightweight signals to auto-adjust the next focus and break cycle while keeping the user in control through manual overrides.

## Key Features

- Focus, short break, and long break timer modes
- Optional webcam-based engagement tracking
- Required baseline survey before the first focus session
- Post-session survey for focus level and fatigue level
- Rule-based adaptive focus and break duration adjustment
- Auto-applied recommendations with a short explanation
- Manual override for adaptive focus and break durations
- Standard Mode fallback when webcam access is denied or unavailable
- Local-only debug session data for surveys, gaze logs, and adaptive decisions

## How To Run Locally

- Onboarding and optional webcam permission setup
- Core Pomodoro timer: start, pause/resume, reset, stop
- Automatic focus/break session transition
- Optional webcam-based engagement detection
- Engagement status indicator: Stable / Low / Unavailable
- Post-session self-report survey
- Adaptive recommendation for next focus/break session
- Settings and privacy controls

From the project root, run:

```powershell
py -m http.server 4174 --bind localhost
```

Then open:

```text
http://localhost:4174/
```

Use `localhost`, not `127.0.0.1`, because WebGazer may reject non-HTTPS pages that are not recognized as local development.

## Browser Requirements

- Chrome or Microsoft Edge is recommended.
- Webcam features require camera permission.
- Run the app through a local server instead of opening `index.html` directly.
- Webcam/WebGazer behavior may vary depending on lighting, camera quality, browser permission settings, and local network restrictions.

## Privacy Note

Webcam support is optional. If camera access is denied or unavailable, Gazodoro still works as a standard Pomodoro timer with survey-based adaptation.

Privacy rules:

- Raw webcam video and images are not stored.
- Webcam processing is intended to stay local in the browser.
- Survey results and debug logs are stored only in browser memory during the current session.
- Low engagement is treated as a supportive recovery signal, not as a judgment of effort or productivity.

## Branch Workflow

- `main`: stable demo/milestone branch
- `develop`: integration branch
- `feature/*`: individual feature branches
- `docs/*`: documentation branches
- `hotfix/*`: bug fix branches

Recommended workflow:

1. Create feature branches from the latest `main`.
2. Keep each branch scoped to one feature or document update.
3. Test locally before merging.
4. Avoid mixing unrelated UI, logic, and documentation changes in one branch.

## Known Limitations

- Gazodoro is a prototype, not a production-ready productivity tool.
- Webcam engagement is only a rough signal and does not directly measure concentration, productivity, or fatigue.
- Gaze detection may be inaccurate in low light, with poor camera quality, or when the user reads physical material beside the screen.
- Adaptive logic is rule-based and may need tuning after usability testing.
- Data is currently stored in memory only; refreshing the page clears local session results.
- There is no backend, account system, or cloud sync.
- WebGazer requires a local server and may not work correctly from `file://` or some `127.0.0.1` setups.

## Team Members / Roles

- Hai Dang: product direction, requirements, and acceptance decisions
- Lam: adaptive Pomodoro behavior, user scenario, and feature refinement
- Chris: documentation refinement, survey wording, and adaptive logic clarification

## Screenshots

Design references are available in [`docs/design`](docs/design/), including onboarding, timer, camera mode, break states, settings, and survey-related screens.

Useful files:

- [`docs/design/1. Onboarding Screen.png`](docs/design/1.%20Onboarding%20Screen.png)
- [`docs/design/2. Main timer screen.png`](docs/design/2.%20Main%20timer%20screen.png)
- [`docs/design/2.3 Main timer screen - camera mode.png`](docs/design/2.3%20Main%20timer%20screen%20-%20camera%20mode.png)
- [`docs/design/UI_FLOW.md`](docs/design/UI_FLOW.md)
