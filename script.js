const app = document.querySelector("#app");

const durations = {
  focus: 25,
  short: 5,
  long: 15,
};

const state = {
  view: "welcome",
  settingsPanel: "menu",
  mode: "focus",
  webcamEnabled: false,
  cameraPermission: "unknown",
  cameraError: "",
  cameraDevices: [],
  selectedCameraId: "",
  stream: null,
  isRunning: false,
  timerId: null,
  remainingSeconds: durations.focus * 60,
  sessionCount: 0,
  transitionMessage: "Ready for your first focus session.",
  goal: "",
  sessionsLeft: 0,
  goalDraft: "",
  sessionsDraft: 4,
  goalOpen: true,
  volume: 50,
  soundNotification: true,
  appearance: "light",
};

const icons = {
  eye: '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="3"/></svg>',
  cup: '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h10v7a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z"/><path d="M16 10h2a3 3 0 0 1 0 6h-2"/><path d="M8 3v3M12 3v3M16 3v3"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11a8 8 0 0 0-14.7-4.4L3 9"/><path d="M3 4v5h5"/><path d="M4 13a8 8 0 0 0 14.7 4.4L21 15"/><path d="M21 20v-5h-5"/></svg>',
  shield: '<svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>',
  camera: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4 16 7h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l1.5-3Z"/><circle cx="12" cy="13" r="3"/></svg>',
  lock: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  play: '<svg viewBox="0 0 24 24" width="58" height="58" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="m8 5 11 7-11 7Z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" width="58" height="58" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M8 5v14M16 5v14"/></svg>',
  reset: '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 3v6h6"/></svg>',
  chart: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 17v-5"/><path d="M12 17V8"/><path d="M16 17v-8"/></svg>',
  gear: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1A2 2 0 1 1 4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.6V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1A2 2 0 1 1 19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.6 1h.1a2 2 0 0 1 0 4H21a1.7 1.7 0 0 0-1.6 1Z"/></svg>',
  sound: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4Z"/><path d="M15 9.5a4 4 0 0 1 0 5"/><path d="M18 7a8 8 0 0 1 0 10"/></svg>',
  clock: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  palette: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a10 10 0 1 1 10-10 3 3 0 0 1-3 3h-1.6a2 2 0 0 0-1.7 3.1A2.5 2.5 0 0 1 13.6 22Z"/><circle cx="7.5" cy="10" r=".8"/><circle cx="10.5" cy="6.8" r=".8"/><circle cx="15" cy="7.5" r=".8"/><circle cx="17.2" cy="11" r=".8"/></svg>',
  target: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>',
  back: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>',
};

const modeNames = {
  focus: "Focus",
  short: "Short break",
  long: "Long break",
};

function setView(view) {
  state.view = view;
  render();
}

function stopCamera() {
  if (!state.stream) return;
  state.stream.getTracks().forEach((track) => track.stop());
  state.stream = null;
}

async function requestCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    state.cameraPermission = "unavailable";
    state.cameraError = "Camera access is not available in this browser or context.";
    state.webcamEnabled = false;
    setView("privacy");
    return;
  }

  state.cameraError = "";
  state.cameraPermission = "requesting";
  render();

  try {
    stopCamera();
    const constraints = state.selectedCameraId
      ? { video: { deviceId: { exact: state.selectedCameraId } }, audio: false }
      : { video: true, audio: false };
    state.stream = await navigator.mediaDevices.getUserMedia(constraints);
    state.webcamEnabled = true;
    state.cameraPermission = "granted";
    await refreshCameraDevices();
    setView("cameraPreview");
  } catch (error) {
    state.webcamEnabled = false;
    state.cameraPermission = "denied";
    state.cameraError = friendlyCameraError(error);
    setView("privacy");
  }
}

async function refreshCameraDevices() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    state.cameraDevices = devices.filter((device) => device.kind === "videoinput");
    if (!state.selectedCameraId && state.cameraDevices[0]) {
      state.selectedCameraId = state.cameraDevices[0].deviceId;
    }
  } catch {
    state.cameraDevices = [];
  }
}

function friendlyCameraError(error) {
  if (!error) return "Camera permission was not granted.";
  if (error.name === "NotAllowedError") return "Camera permission was denied. Standard Mode is still available.";
  if (error.name === "NotFoundError") return "No camera was found. Continue in Standard Mode.";
  if (error.name === "NotReadableError") return "The camera is already in use or unavailable. Continue in Standard Mode.";
  return "Camera setup could not start. Continue in Standard Mode.";
}

function continueStandardMode() {
  stopCamera();
  state.webcamEnabled = false;
  state.cameraPermission = "standard";
  state.cameraError = "";
  setView("dashboard");
}

function enterDashboardWithCamera() {
  state.webcamEnabled = true;
  state.cameraPermission = "granted";
  setView("dashboard");
}

function setMode(mode) {
  stopTimer();
  state.mode = mode;
  state.transitionMessage = `${modeNames[mode]} selected. Timer reset.`;
  resetRemainingSeconds();
  render();
}

function changeDuration(delta) {
  stopTimer();
  durations[state.mode] = Math.max(1, Math.min(99, durations[state.mode] + delta));
  state.transitionMessage = `${modeNames[state.mode]} duration set to ${durations[state.mode]} minutes.`;
  resetRemainingSeconds();
  render();
}

function resetRemainingSeconds() {
  state.remainingSeconds = durations[state.mode] * 60;
}

function startTimer() {
  if (state.timerId) return;
  state.isRunning = true;
  state.timerId = window.setInterval(() => {
    state.remainingSeconds = Math.max(0, state.remainingSeconds - 1);
    if (state.remainingSeconds === 0) {
      transitionToNextMode();
    }
    render();
  }, 1000);
}

function stopTimer() {
  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
  state.isRunning = false;
}

function toggleTimer() {
  if (state.isRunning) {
    stopTimer();
    render();
    return;
  }
  startTimer();
  render();
}

function resetTimer() {
  stopTimer();
  resetRemainingSeconds();
  state.transitionMessage = `${modeNames[state.mode]} reset to ${durations[state.mode]} minutes.`;
  render();
}

function transitionToNextMode() {
  if (state.mode === "focus") {
    state.sessionCount += 1;
    if (state.sessionsLeft > 0) state.sessionsLeft -= 1;

    const nextMode = state.sessionCount % 4 === 0 ? "long" : "short";
    state.mode = nextMode;
    resetRemainingSeconds();
    state.transitionMessage = nextMode === "long"
      ? "Focus complete. Starting a long break after 4 focus sessions."
      : "Focus complete. Starting a short break.";
    return;
  }

  const completedBreak = modeNames[state.mode];
  state.mode = "focus";
  resetRemainingSeconds();
  state.transitionMessage = `${completedBreak} complete. Starting the next focus session.`;
}

function setGoal(event) {
  event.preventDefault();
  state.goal = state.goalDraft.trim();
  state.sessionsLeft = Math.max(0, Number(state.sessionsDraft) || 0);
  state.goalOpen = false;
  render();
}

function openSettings(panel = "menu") {
  state.settingsPanel = panel;
  setView("settings");
}

function toggleAppearance(value) {
  state.appearance = value;
  document.body.classList.toggle("dark", value === "dark");
  render();
}

async function toggleCameraFromSettings() {
  if (state.webcamEnabled) {
    stopCamera();
    state.webcamEnabled = false;
    state.cameraPermission = "standard";
    render();
    return;
  }
  await requestCamera();
  state.view = "settings";
  state.settingsPanel = "camera";
  render();
}

function attachVideo() {
  const video = document.querySelector("#cameraPreview");
  if (video && state.stream) {
    video.srcObject = state.stream;
    video.play().catch(() => {});
  }
}

function render() {
  const html = {
    welcome: renderWelcome,
    privacy: renderPrivacy,
    cameraPreview: renderCameraPreview,
    dashboard: renderDashboard,
    settings: renderSettings,
  }[state.view]();

  app.innerHTML = html + '<button class="help-button" aria-label="Help">?</button>';
  attachHandlers();
  attachVideo();
}

function renderWelcome() {
  return `
    <section class="center-screen">
      <div class="onboarding">
        <h1 class="hero-title">Welcome to <span>Gazodoro</span>!</h1>
        <p class="hero-copy">Unlike standard timers, Gazodoro interacts with you by gently tracking your gaze</p>
        <div class="feature-grid">
          ${featureCard(icons.eye, "Deep Focus")}
          ${featureCard(icons.cup, "Smart Breaks")}
          ${featureCard(icons.refresh, "Dynamic Rhythm")}
        </div>
        <button class="primary-button" data-action="privacy">Start!</button>
      </div>
    </section>
  `;
}

function renderPrivacy() {
  const notice = state.cameraError
    ? `<div class="warning-note">${icons.camera}<span>${state.cameraError}</span></div>`
    : `<div class="success-note">${icons.lock}<span>Your privacy is protected. Everything stays on your device.</span></div>`;
  const requesting = state.cameraPermission === "requesting";

  return `
    <section class="center-screen">
      <div class="privacy-screen">
        <div class="privacy-icon">${icons.shield}</div>
        <h1 class="privacy-title">Before we start...</h1>
        <h2 class="privacy-title">Your Privacy is <span>Our Priority</span></h2>
        <div class="panel privacy-panel">
          <ul class="privacy-list">
            <li>We need camera access to track your gaze, but we do not watch you.</li>
            <li>All processing happens <strong>100% locally</strong> on your device.</li>
            <li>No videos or images are ever stored or sent to the cloud.</li>
          </ul>
          ${notice}
        </div>
        <div class="button-row">
          <button class="primary-button" data-action="enableCamera" ${requesting ? "disabled" : ""}>
            ${requesting ? "Requesting camera..." : "Yes, enable camera"}
          </button>
          <button class="secondary-button" data-action="standardMode">No, continue without camera</button>
        </div>
        <p class="tip">You can change this anytime in settings</p>
      </div>
    </section>
  `;
}

function renderCameraPreview() {
  const options = state.cameraDevices.length
    ? state.cameraDevices.map((device, index) => (
        `<option value="${device.deviceId}" ${device.deviceId === state.selectedCameraId ? "selected" : ""}>${device.label || `Camera ${index + 1}`}</option>`
      )).join("")
    : '<option value="">Camera 1</option>';

  return `
    <section class="center-screen">
      <div class="camera-screen">
        <h1 class="section-title" style="text-align:center">Camera setup</h1>
        <div class="panel camera-layout">
          <div>
            <label class="field-label">Preview</label>
            <div class="preview-box">
              ${state.stream ? '<video id="cameraPreview" muted playsinline></video>' : '<div class="spinner" aria-label="Loading camera preview"></div>'}
            </div>
          </div>
          <div class="camera-actions">
            <div>
              <label class="field-label" for="cameraSelect">Select camera</label>
              <select class="select" id="cameraSelect">${options}</select>
            </div>
            <button class="primary-button" data-action="cameraDashboard">Continue with camera</button>
            <button class="secondary-button" data-action="standardMode">Continue without camera</button>
          </div>
        </div>
        <p class="tip">Tip! Is your face centered? Is the lighting okay?</p>
      </div>
    </section>
  `;
}

function renderDashboard() {
  const cameraClass = state.webcamEnabled ? "camera" : "";
  const cameraLabel = state.webcamEnabled ? "Camera mode" : "No-camera mode";
  const feedback = state.webcamEnabled
    ? "Camera preview is enabled. Engagement classification will be added later."
    : "Standard Mode active. Webcam detection is off, but timer controls remain available.";

  return `
    <section class="app-shell dashboard ${cameraClass}">
      ${renderGoalCard()}
      <div class="brand ${cameraClass}">
        <div class="brand-icon">${icons.eye}</div>
        <div>
          <h1>Gazodoro</h1>
          <p>Gaze-tracking productivity timer</p>
        </div>
      </div>
      <div class="metric-pill"><span>Sessions today</span><strong>${state.sessionCount}</strong></div>
      <div class="segment-control" role="tablist" aria-label="Timer mode">
        ${Object.keys(modeNames).map((mode) => (
          `<button class="segment-button ${state.mode === mode ? "active" : ""}" data-mode="${mode}" role="tab" aria-selected="${state.mode === mode}">${modeNames[mode]}</button>`
        )).join("")}
      </div>
      <div class="dashboard-main">
        <div class="timer-ring">
          <div class="timer-content">
            <div class="mode-label"><span class="status-dot"></span>${cameraLabel}</div>
            <div class="timer-value">${formatDuration(state.remainingSeconds)}</div>
          </div>
        </div>
        <div class="change-time">
          <h2>Change time</h2>
          <div class="step-row">
            <button class="step-button" data-action="increaseTime" aria-label="Increase time">+</button>
            <span class="time-chip">${durations[state.mode]} m</span>
          </div>
          <div class="step-row">
            <button class="step-button" data-action="decreaseTime" aria-label="Decrease time">-</button>
          </div>
        </div>
      </div>
      <div class="dashboard-feedback">
        <article class="timer-card">
          <h3>Engagement status</h3>
          <p>${state.webcamEnabled ? "Placeholder: ready for future gaze signal." : "Unavailable in Standard Mode."}</p>
        </article>
        <article class="timer-card">
          <h3>Feedback</h3>
          <p>${feedback}</p>
        </article>
        <article class="timer-card transition-card">
          <h3>Cycle transition</h3>
          <p>${state.transitionMessage}</p>
        </article>
      </div>
      <div class="bottom-controls">
        <button class="round-button" data-action="resetShell" aria-label="Reset timer">${icons.reset}</button>
        <button class="main-play" data-action="toggleRunning" aria-label="${state.isRunning ? "Pause timer" : "Start timer"}">${state.isRunning ? icons.pause : icons.play}</button>
      </div>
      <div class="aux-controls">
        <button class="round-button" data-action="statsShortcut" aria-label="Open statistics">${icons.chart}</button>
        <button class="round-button" data-action="settings" aria-label="Open settings">${icons.gear}</button>
      </div>
    </section>
  `;
}

function renderGoalCard() {
  if (state.goalOpen) {
    return `
      <aside class="goal-card">
        <h2>Set Your Goal</h2>
        <form class="goal-form" id="goalForm">
          <input class="text-input" id="goalInput" value="${escapeHtml(state.goalDraft)}" placeholder="What's your goal today?" />
          <label for="sessionsInput">Number of sessions</label>
          <input class="number-input" id="sessionsInput" type="number" min="0" max="12" value="${state.sessionsDraft}" />
          <button class="wide-button" type="submit">Set Goal</button>
        </form>
      </aside>
    `;
  }

  return `
    <aside class="goal-card">
      <h2>${icons.target} Today's Goal</h2>
      <div class="goal-summary">
        <p>${escapeHtml(state.goal) || "No goal set yet"}</p>
        <div class="goal-line"><span>Sessions left</span><strong>${state.sessionsLeft}</strong></div>
        <button class="ghost-button" data-action="editGoal">Edit Goal</button>
      </div>
    </aside>
  `;
}

function renderSettings() {
  if (state.settingsPanel !== "menu") return renderSettingsDetail();
  const items = [
    ["camera", icons.camera, "Camera"],
    ["sound", icons.sound, "Sound"],
    ["statistics", icons.chart, "Statistics"],
    ["timer", icons.clock, "Timer"],
    ["appearance", icons.palette, "Appearance"],
  ];

  return `
    <section class="app-shell settings-screen">
      ${settingsHeader("Settings", "dashboard")}
      <div class="settings-list">
        ${items.map(([panel, icon, label]) => `
          <div class="setting-row">
            <button data-settings-panel="${panel}" aria-label="Open ${label} settings">
              <span class="setting-title">${icon}<span>${label}</span></span>
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderSettingsDetail() {
  const title = {
    camera: "Camera",
    sound: "Sound",
    statistics: "Statistics",
    timer: "Timer",
    appearance: "Appearance",
  }[state.settingsPanel];

  return `
    <section class="app-shell settings-screen">
      ${settingsHeader(title, "settingsMenu")}
      <div class="settings-detail">
        ${{
          camera: renderCameraSettings,
          sound: renderSoundSettings,
          statistics: renderStatisticsSettings,
          timer: renderTimerSettings,
          appearance: renderAppearanceSettings,
        }[state.settingsPanel]()}
      </div>
    </section>
  `;
}

function renderCameraSettings() {
  const options = state.cameraDevices.length
    ? state.cameraDevices.map((device, index) => (
        `<option value="${device.deviceId}" ${device.deviceId === state.selectedCameraId ? "selected" : ""}>${device.label || `Camera ${index + 1}`}</option>`
      )).join("")
    : '<option value="">Camera 1</option>';

  return `
    <div class="panel">
      <div class="setting-item">
        <div class="setting-copy">
          <h2>Camera On/Off</h2>
          <p>${state.webcamEnabled ? "Camera preview is available." : "Standard Mode is active."}</p>
        </div>
        <button class="toggle ${state.webcamEnabled ? "on" : ""}" data-action="toggleCameraSetting" aria-label="Toggle camera"></button>
      </div>
      ${state.webcamEnabled ? `
        <div class="setting-item">
          <div class="setting-copy"><h2>Select camera</h2></div>
          <select class="select" id="cameraSelect">${options}</select>
        </div>
      ` : ""}
      ${state.cameraError ? `<div class="warning-note">${icons.camera}<span>${state.cameraError}</span></div>` : ""}
    </div>
  `;
}

function renderSoundSettings() {
  return `
    <div class="panel">
      <div class="setting-item">
        <div class="setting-copy">
          <h2>Volume</h2>
          <p>Notification volume preview</p>
        </div>
        <div class="range-row">
          <span>0</span>
          <input id="volumeRange" type="range" min="0" max="100" value="${state.volume}" />
          <span>100</span>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-copy">
          <h2>Session end notification</h2>
          <p>I want to hear when session end</p>
        </div>
        <button class="toggle ${state.soundNotification ? "on" : ""}" data-action="toggleSound" aria-label="Toggle sound notification"></button>
      </div>
      <strong style="text-align:center">${state.volume}</strong>
    </div>
  `;
}

function renderStatisticsSettings() {
  return `
    <div class="panel">
      <div class="setting-copy">
        <h2>Statistics & Analytics</h2>
        <p>View your focus analytics and session history from the main dashboard.</p>
      </div>
      <button class="wide-button" data-action="statsShortcut">View Analytics</button>
    </div>
  `;
}

function renderTimerSettings() {
  return `
    <div class="panel">
      <div class="setting-copy">
        <h2>Timer Settings</h2>
        <p>Timer duration can be adjusted from the main dashboard using the +/- buttons.</p>
      </div>
    </div>
  `;
}

function renderAppearanceSettings() {
  return `
    <div class="panel">
      <div class="setting-copy">
        <h2>Dark/Light mode</h2>
      </div>
      <div class="segmented-setting" role="group" aria-label="Appearance mode">
        <button class="${state.appearance === "light" ? "active" : ""}" data-appearance="light">Light</button>
        <button class="${state.appearance === "dark" ? "active" : ""}" data-appearance="dark">Dark</button>
      </div>
    </div>
  `;
}

function settingsHeader(title, backTarget) {
  return `
    <header class="settings-header">
      <button class="settings-back" data-back="${backTarget}" aria-label="Back">${icons.back}</button>
      <h1>${title}</h1>
    </header>
  `;
}

function featureCard(icon, label) {
  return `
    <article class="feature-card">
      <div class="feature-icon">${icon}</div>
      <h2>${label}</h2>
    </article>
  `;
}

function formatDuration(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function attachHandlers() {
  document.querySelectorAll("[data-action]").forEach((node) => {
    node.addEventListener("click", handleAction);
  });

  document.querySelectorAll("[data-mode]").forEach((node) => {
    node.addEventListener("click", () => setMode(node.dataset.mode));
  });

  document.querySelectorAll("[data-settings-panel]").forEach((node) => {
    node.addEventListener("click", () => {
      state.settingsPanel = node.dataset.settingsPanel;
      render();
    });
  });

  document.querySelectorAll("[data-back]").forEach((node) => {
    node.addEventListener("click", () => {
      if (node.dataset.back === "dashboard") setView("dashboard");
      if (node.dataset.back === "settingsMenu") {
        state.settingsPanel = "menu";
        render();
      }
    });
  });

  document.querySelectorAll("[data-appearance]").forEach((node) => {
    node.addEventListener("click", () => toggleAppearance(node.dataset.appearance));
  });

  const goalForm = document.querySelector("#goalForm");
  if (goalForm) goalForm.addEventListener("submit", setGoal);

  const goalInput = document.querySelector("#goalInput");
  if (goalInput) goalInput.addEventListener("input", (event) => {
    state.goalDraft = event.target.value;
  });

  const sessionsInput = document.querySelector("#sessionsInput");
  if (sessionsInput) sessionsInput.addEventListener("input", (event) => {
    state.sessionsDraft = event.target.value;
  });

  const volumeRange = document.querySelector("#volumeRange");
  if (volumeRange) volumeRange.addEventListener("input", (event) => {
    state.volume = event.target.value;
    render();
  });

  const cameraSelect = document.querySelector("#cameraSelect");
  if (cameraSelect) cameraSelect.addEventListener("change", async (event) => {
    const previousView = state.view;
    const previousPanel = state.settingsPanel;
    state.selectedCameraId = event.target.value;
    if (state.webcamEnabled) {
      await requestCamera();
      if (previousView === "settings") {
        state.view = previousView;
        state.settingsPanel = previousPanel;
        render();
      }
    }
  });
}

function handleAction(event) {
  const action = event.currentTarget.dataset.action;
  if (action === "privacy") setView("privacy");
  if (action === "enableCamera") requestCamera();
  if (action === "standardMode") continueStandardMode();
  if (action === "cameraDashboard") enterDashboardWithCamera();
  if (action === "increaseTime") changeDuration(1);
  if (action === "decreaseTime") changeDuration(-1);
  if (action === "toggleRunning") {
    toggleTimer();
  }
  if (action === "resetShell") {
    resetTimer();
  }
  if (action === "settings") openSettings();
  if (action === "statsShortcut") {
    state.settingsPanel = "statistics";
    setView("settings");
  }
  if (action === "editGoal") {
    state.goalOpen = true;
    state.goalDraft = state.goal;
    state.sessionsDraft = state.sessionsLeft || 4;
    render();
  }
  if (action === "toggleCameraSetting") toggleCameraFromSettings();
  if (action === "toggleSound") {
    state.soundNotification = !state.soundNotification;
    render();
  }
}

render();
