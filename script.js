const app = document.querySelector("#app");

const defaultDurations = {
  focus: 25,
  short: 5,
  long: 15,
};

const durations = { ...defaultDurations };
const disengagementThresholdSeconds = 15;
const sustainedDisengagementThresholdSeconds = 30;

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
  webgazerStatus: "Camera ready. Tracking will start with your next Focus session.",
  webgazerActive: false,
  webgazerDebugVisible: false,
  webgazerBeginStatus: "not-started",
  webgazerBeginError: "",
  webgazerBeginStack: "",
  developerDiagnostics: false,
  calibrationClickCount: 0,
  calibrationProgress: [],
  gazeSession: null,
  latestGazeLog: null,
  latestGazeLogUrl: "",
  latestGazeLogFileName: "",
  lastGazeSampleAt: 0,
  debugSession: {
    baselines: [],
    surveys: [],
    adaptiveDecisions: [],
  },
  baselineComplete: false,
  baselineVisible: false,
  pendingStartAfterBaseline: false,
  baselineDraft: {
    readinessLevel: null,
    fatigueLevel: null,
  },
  referenceReadinessScore: null,
  consecutiveFocusIncreases: 0,
  latestWebcamMetrics: null,
  latestAdaptiveDecision: null,
  overrideDraft: {
    focus: durations.focus,
    break: durations.short,
  },
  latestSurveyResult: null,
  surveyVisible: false,
  pendingBreakMode: "",
  surveyDraft: {
    focusLevel: null,
    fatigueLevel: null,
    comment: "",
  },
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

const webgazerFaceMeshSolutionPath = "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619";

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
  stopWebGazerLogging("standard-mode");
  stopCamera();
  state.webcamEnabled = false;
  state.cameraPermission = "standard";
  state.cameraError = "";
  setView("dashboard");
}

function enterTrackingSetup() {
  state.webcamEnabled = true;
  state.cameraPermission = "granted";
  state.webgazerStatus = "Camera ready. Tracking will start with your next Focus session.";
  setView("trackingSetup");
}

function finishTrackingSetup() {
  stopCamera();
  state.webcamEnabled = true;
  state.cameraPermission = "granted";
  state.webgazerStatus = "Camera ready. Tracking will start with your next Focus session.";
  setView("dashboard");
}

function setMode(mode) {
  if (state.mode === "focus") finalizeGazeLog("manual-mode-change");
  stopTimer();
  state.mode = mode;
  state.transitionMessage = `${modeNames[mode]} selected. Timer reset.`;
  resetRemainingSeconds();
  render();
}

function changeDuration(delta) {
  if (state.mode === "focus") finalizeGazeLog("duration-change");
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
  if (state.mode === "focus" && !state.baselineComplete) {
    openBaselineSurvey(true);
    render();
    return;
  }
  if (state.timerId) return;
  state.isRunning = true;
  if (state.mode === "focus") startWebGazerLogging();
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
  pauseWebGazerLogging();
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
  if (state.mode === "focus") finalizeGazeLog("reset");
  stopTimer();
  closeSurvey();
  closeBaselineSurvey();
  resetRemainingSeconds();
  state.transitionMessage = `${modeNames[state.mode]} reset to ${durations[state.mode]} minutes.`;
  render();
}

function transitionToNextMode() {
  if (state.mode === "focus") {
    finalizeGazeLog("focus-complete");
    state.sessionCount += 1;
    if (state.sessionsLeft > 0) state.sessionsLeft -= 1;

    const nextMode = state.sessionCount % 4 === 0 ? "long" : "short";
    stopTimer();
    openPostSessionSurvey(nextMode);
    return;
  }

  const completedBreak = modeNames[state.mode];
  state.mode = "focus";
  resetRemainingSeconds();
  state.transitionMessage = `${completedBreak} complete. Starting the next focus session.`;
  if (state.isRunning) startWebGazerLogging();
}

function openPostSessionSurvey(nextMode) {
  state.pendingBreakMode = nextMode;
  state.surveyVisible = true;
  state.surveyDraft = {
    focusLevel: null,
    fatigueLevel: null,
    comment: "",
  };
  state.transitionMessage = "Focus complete. Share a quick reflection before your break starts.";
}

function closeSurvey() {
  state.surveyVisible = false;
  state.pendingBreakMode = "";
  state.surveyDraft = {
    focusLevel: null,
    fatigueLevel: null,
    comment: "",
  };
}

function openBaselineSurvey(startAfterSubmit = false) {
  state.baselineVisible = true;
  state.pendingStartAfterBaseline = startAfterSubmit;
  state.baselineDraft = {
    readinessLevel: null,
    fatigueLevel: null,
  };
  state.transitionMessage = "Set your starting point before the first focus session.";
}

function closeBaselineSurvey() {
  state.baselineVisible = false;
  state.pendingStartAfterBaseline = false;
  state.baselineDraft = {
    readinessLevel: null,
    fatigueLevel: null,
  };
}

function setSurveyRating(field, value) {
  state.surveyDraft[field] = Number(value);
  render();
}

function setBaselineRating(field, value) {
  state.baselineDraft[field] = Number(value);
  render();
}

function submitBaselineSurvey() {
  if (!state.baselineDraft.readinessLevel || !state.baselineDraft.fatigueLevel) return;

  const shouldStart = state.pendingStartAfterBaseline || state.mode === "focus";
  const readinessScore = calculateReadinessScore(
    state.baselineDraft.readinessLevel,
    state.baselineDraft.fatigueLevel
  );
  const baseline = {
    id: `baseline-${Date.now()}`,
    completedAt: new Date().toISOString(),
    readinessLevel: state.baselineDraft.readinessLevel,
    fatigueLevel: state.baselineDraft.fatigueLevel,
    readinessScore,
  };

  state.referenceReadinessScore = readinessScore;
  state.baselineComplete = true;
  state.debugSession.baselines.push(baseline);
  closeBaselineSurvey();
  state.transitionMessage = "Baseline saved. Starting your first focus session.";

  if (shouldStart) {
    startTimer();
    render();
  } else {
    render();
  }
}

function submitPostSessionSurvey() {
  if (!state.surveyDraft.focusLevel || !state.surveyDraft.fatigueLevel) return;

  const survey = storeSurveyResult({
    skipped: false,
    focusLevel: state.surveyDraft.focusLevel,
    fatigueLevel: state.surveyDraft.fatigueLevel,
    comment: state.surveyDraft.comment.trim(),
  });
  applyAdaptiveDecision(survey);
  startPendingBreak("Survey saved. Starting your break.");
}

function skipPostSessionSurvey() {
  const survey = storeSurveyResult({
    skipped: true,
    focusLevel: null,
    fatigueLevel: null,
    comment: "",
  });
  applyAdaptiveDecision(survey);
  startPendingBreak("Survey skipped. Starting your break.");
}

function storeSurveyResult(result) {
  const readinessScore = result.skipped
    ? null
    : calculateReadinessScore(result.focusLevel, result.fatigueLevel);
  const readinessChangePercent = readinessScore == null || state.referenceReadinessScore == null
    ? null
    : calculateReadinessChange(readinessScore, state.referenceReadinessScore);
  const surveyResult = {
    id: `survey-${Date.now()}`,
    sessionNumber: state.sessionCount,
    completedAt: new Date().toISOString(),
    focusDurationMinutes: durations.focus,
    nextBreakMode: state.pendingBreakMode,
    nextBreakDurationMinutes: durations[state.pendingBreakMode] || durations.short,
    readinessScore,
    readinessState: readinessScore == null ? "Unavailable" : classifyReadiness(readinessScore),
    readinessChangePercent,
    readinessChangeState: readinessChangePercent == null
      ? "Unavailable"
      : classifyReadinessChange(readinessChangePercent),
    fatigueState: result.skipped ? "Unavailable" : classifyFatigue(result.fatigueLevel),
    ...result,
  };

  state.latestSurveyResult = surveyResult;
  state.debugSession.surveys.push(surveyResult);
  return surveyResult;
}

function startPendingBreak(message) {
  const nextMode = state.pendingBreakMode || "short";
  closeSurvey();
  state.mode = nextMode;
  resetRemainingSeconds();
  state.transitionMessage = nextMode === "long"
    ? `${message} Long break after 4 focus sessions.`
    : `${message} Short break.`;
  startTimer();
  render();
}

function setOverrideDraft(field, value) {
  const numericValue = Math.max(1, Math.min(99, Number(value) || 1));
  state.overrideDraft[field] = numericValue;
}

function applyAdaptiveOverride() {
  if (!state.latestAdaptiveDecision) return;
  const breakMode = state.latestAdaptiveDecision.breakMode;
  const customFocus = Math.max(1, Math.min(99, Number(state.overrideDraft.focus) || durations.focus));
  const customBreak = Math.max(1, Math.min(99, Number(state.overrideDraft.break) || durations[breakMode]));
  durations.focus = customFocus;
  durations[breakMode] = customBreak;
  state.latestAdaptiveDecision.nextFocusDuration = customFocus;
  state.latestAdaptiveDecision.nextBreakDuration = customBreak;
  state.latestAdaptiveDecision.focusDelta = customFocus - state.latestAdaptiveDecision.previousFocusDuration;
  state.latestAdaptiveDecision.breakDelta = customBreak - state.latestAdaptiveDecision.previousBreakDuration;
  state.latestAdaptiveDecision.reason = "Custom durations were applied by the user.";
  syncRemainingAfterDurationOverride(breakMode);
  state.transitionMessage = "Custom adaptive durations applied.";
  render();
}

function resetAdaptiveDefaults() {
  if (!state.latestAdaptiveDecision) return;
  const breakMode = state.latestAdaptiveDecision.breakMode;
  durations.focus = defaultDurations.focus;
  durations[breakMode] = defaultDurations[breakMode];
  state.latestAdaptiveDecision.nextFocusDuration = durations.focus;
  state.latestAdaptiveDecision.nextBreakDuration = durations[breakMode];
  state.latestAdaptiveDecision.focusDelta = durations.focus - state.latestAdaptiveDecision.previousFocusDuration;
  state.latestAdaptiveDecision.breakDelta = durations[breakMode] - state.latestAdaptiveDecision.previousBreakDuration;
  state.latestAdaptiveDecision.reason = "Timer durations were reset to defaults by the user.";
  state.overrideDraft = {
    focus: durations.focus,
    break: durations[breakMode],
  };
  syncRemainingAfterDurationOverride(breakMode);
  state.transitionMessage = "Timer durations reset to defaults.";
  render();
}

function keepAdaptiveRecommendation() {
  if (!state.latestAdaptiveDecision) return;
  state.overrideDraft = {
    focus: durations.focus,
    break: durations[state.latestAdaptiveDecision.breakMode],
  };
  state.transitionMessage = "Adaptive recommendation kept.";
  render();
}

function syncRemainingAfterDurationOverride(breakMode) {
  if (state.mode === "focus" || state.mode === breakMode) {
    resetRemainingSeconds();
  }
}

function calculateReadinessScore(primaryLevel, fatigueLevel) {
  return Math.round(((primaryLevel + (6 - fatigueLevel)) / 10) * 100);
}

function calculateReadinessChange(currentScore, referenceScore) {
  if (!referenceScore) return null;
  return Math.round(((currentScore - referenceScore) / referenceScore) * 100);
}

function classifyReadiness(score) {
  if (score >= 80) return "High";
  if (score >= 60) return "Medium";
  return "Low";
}

function classifyFatigue(score) {
  if (score <= 2) return "Low";
  if (score === 3) return "Moderate";
  return "High";
}

function classifyReadinessChange(change) {
  if (change >= 10) return "Improved";
  if (change <= -30) return "Significant Decline";
  if (change <= -15) return "Slight Decline";
  return "Stable";
}

function applyAdaptiveDecision(survey) {
  const decision = buildAdaptiveDecision(survey, state.latestWebcamMetrics);
  state.latestAdaptiveDecision = decision;
  state.debugSession.adaptiveDecisions.push(decision);

  durations.focus = decision.nextFocusDuration;
  durations[decision.breakMode] = decision.nextBreakDuration;
  state.overrideDraft = {
    focus: decision.nextFocusDuration,
    break: decision.nextBreakDuration,
  };

  if (decision.focusDelta > 0) {
    state.consecutiveFocusIncreases += 1;
  } else {
    state.consecutiveFocusIncreases = 0;
  }

  if (!survey.skipped && survey.readinessScore != null) {
    state.referenceReadinessScore = survey.readinessScore;
  }
}

function buildAdaptiveDecision(survey, webcamMetrics) {
  const currentFocusDuration = durations.focus;
  const breakMode = state.pendingBreakMode || "short";
  const currentBreakDuration = durations[breakMode] || durations.short;
  const webcamAvailable = Boolean(webcamMetrics && webcamMetrics.state !== "Unavailable");
  const surveyAvailable = Boolean(survey && !survey.skipped);
  const rule = chooseAdaptiveRule(survey, webcamMetrics, surveyAvailable, webcamAvailable);

  let focusDelta = Math.max(-5, Math.min(5, rule.focusDelta));
  let breakDelta = Math.max(0, Math.min(5, rule.breakDelta));

  if (focusDelta > 0 && state.consecutiveFocusIncreases >= 3) {
    focusDelta = 0;
    rule.reason = `${rule.reason} Focus stays the same because it already increased three cycles in a row.`;
  }

  const nextFocusDuration = Math.max(10, currentFocusDuration + focusDelta);
  const nextBreakDuration = Math.max(5, currentBreakDuration + breakDelta);

  return {
    id: `adaptive-${Date.now()}`,
    createdAt: new Date().toISOString(),
    sessionNumber: state.sessionCount,
    sourceDataAvailability: surveyAvailable && webcamAvailable
      ? "full"
      : surveyAvailable
        ? "survey-only"
        : webcamAvailable
          ? "webcam-only"
          : "none",
    ruleKey: rule.key,
    reason: rule.reason,
    breakMode,
    previousFocusDuration: currentFocusDuration,
    previousBreakDuration: currentBreakDuration,
    nextFocusDuration,
    nextBreakDuration,
    focusDelta: nextFocusDuration - currentFocusDuration,
    breakDelta: nextBreakDuration - currentBreakDuration,
    surveySnapshot: survey,
    webcamSnapshot: webcamMetrics || createUnavailableWebcamMetrics(),
  };
}

function chooseAdaptiveRule(survey, webcamMetrics, surveyAvailable, webcamAvailable) {
  const webcamState = webcamAvailable ? webcamMetrics.state : "Unavailable";
  const lowEngagementEvent = Boolean(webcamMetrics && webcamMetrics.lowEngagementEvent);

  if (surveyAvailable && webcamAvailable) {
    if (survey.fatigueLevel >= 4 && (webcamState === "High" || webcamState === "Medium")) {
      return { key: "fatigue-engaged", focusDelta: 0, breakDelta: 5, reason: "Fatigue was high while engagement stayed visible, so recovery time increased." };
    }
    if (survey.fatigueLevel >= 4 && webcamState === "Low") {
      return { key: "fatigue-low-engagement", focusDelta: -5, breakDelta: 5, reason: "Fatigue was high and visual engagement was low." };
    }
    if (survey.readinessChangePercent != null && survey.readinessChangePercent <= -30) {
      return { key: "significant-readiness-decline", focusDelta: -5, breakDelta: 5, reason: "Readiness dropped significantly compared with the previous reference." };
    }
    if (lowEngagementEvent) {
      return { key: "sustained-low-engagement", focusDelta: -5, breakDelta: 3, reason: "You looked away from the screen for at least 30 continuous seconds." };
    }
    if (webcamState === "High" && survey.readinessState === "High" && survey.fatigueLevel <= 2) {
      return { key: "high-engagement-high-readiness", focusDelta: 5, breakDelta: 0, reason: "Engagement and readiness were both high with low fatigue." };
    }
    if (webcamState === "High" && survey.readinessChangePercent != null && survey.readinessChangePercent >= 10 && survey.fatigueLevel <= 3) {
      return { key: "improved-readiness-high-engagement", focusDelta: 5, breakDelta: 0, reason: "Readiness improved while engagement remained high." };
    }
    if (survey.readinessChangeState === "Slight Decline") {
      return { key: "slight-readiness-decline", focusDelta: 0, breakDelta: 3, reason: "Readiness declined slightly, so recovery time increased." };
    }
    if (webcamState === "Medium" && survey.readinessChangeState === "Stable") {
      return { key: "stable-medium-engagement", focusDelta: 0, breakDelta: 0, reason: "Your session looked stable." };
    }
    return { key: "no-strong-signal", focusDelta: 0, breakDelta: 0, reason: "No strong adaptive signal was detected." };
  }

  if (surveyAvailable) {
    if (survey.fatigueLevel >= 4) {
      return { key: "survey-fatigue", focusDelta: 0, breakDelta: 5, reason: "Fatigue was high, so recovery time increased." };
    }
    if (survey.readinessChangePercent != null && survey.readinessChangePercent <= -30) {
      return { key: "survey-significant-decline", focusDelta: -5, breakDelta: 5, reason: "Readiness dropped significantly." };
    }
    if (survey.readinessChangePercent != null && survey.readinessChangePercent <= -15) {
      return { key: "survey-slight-decline", focusDelta: 0, breakDelta: 3, reason: "Readiness declined slightly." };
    }
    if (survey.readinessChangePercent != null && survey.readinessChangePercent >= 10 && survey.fatigueLevel <= 2) {
      return { key: "survey-improved-readiness", focusDelta: 5, breakDelta: 0, reason: "Readiness improved and fatigue was low." };
    }
    return { key: "survey-stable", focusDelta: 0, breakDelta: 0, reason: "Survey feedback looked stable." };
  }

  if (webcamAvailable) {
    if (lowEngagementEvent) {
      return { key: "webcam-sustained-low", focusDelta: 0, breakDelta: 3, reason: "Webcam signals suggested sustained disengagement. Focus duration was not increased without survey feedback." };
    }
    if (webcamState === "Low") {
      return { key: "webcam-low", focusDelta: 0, breakDelta: 3, reason: "Webcam signals suggested low engagement. Focus duration was not increased without survey feedback." };
    }
    return { key: "webcam-stable", focusDelta: 0, breakDelta: 0, reason: "Webcam signals looked stable, but survey feedback was skipped." };
  }

  return { key: "no-data", focusDelta: 0, breakDelta: 0, reason: "No reliable adaptive input was available." };
}

function createUnavailableWebcamMetrics() {
  return {
    state: "Unavailable",
    score: null,
    screenPresenceRatio: null,
    disengagementCount: 0,
    sustainedDisengagementSeconds: 0,
    lowEngagementEvent: false,
    sampleCount: 0,
    validSampleCount: 0,
    invalidSampleCount: 0,
  };
}

function calculateWebcamMetrics(log) {
  if (!log || !Array.isArray(log.samples) || log.samples.length < 5) {
    return createUnavailableWebcamMetrics();
  }

  const samples = log.samples;
  const presentSamples = samples.filter((sample) => sample.screenPresent).length;
  const screenPresenceRatio = Math.round((presentSamples / samples.length) * 100);
  let disengagementCount = 0;
  let currentDisengagementSeconds = 0;
  let sustainedDisengagementSeconds = 0;

  samples.forEach((sample) => {
    if (sample.screenPresent) {
      if (currentDisengagementSeconds >= disengagementThresholdSeconds) {
        disengagementCount += 1;
      }
      sustainedDisengagementSeconds = Math.max(sustainedDisengagementSeconds, currentDisengagementSeconds);
      currentDisengagementSeconds = 0;
      return;
    }

    currentDisengagementSeconds += 1;
  });

  if (currentDisengagementSeconds >= disengagementThresholdSeconds) {
    disengagementCount += 1;
  }
  sustainedDisengagementSeconds = Math.max(sustainedDisengagementSeconds, currentDisengagementSeconds);

  const disengagementPenaltyScore = Math.max(0, 100 - (disengagementCount * 10));
  const score = Math.round((screenPresenceRatio * 0.8) + (disengagementPenaltyScore * 0.2));

  return {
    state: classifyWebcamEngagement(score),
    score,
    screenPresenceRatio,
    disengagementPenaltyScore,
    disengagementCount,
    sustainedDisengagementSeconds,
    lowEngagementEvent: sustainedDisengagementSeconds >= sustainedDisengagementThresholdSeconds,
    sampleCount: samples.length,
    validSampleCount: log.debug.validSampleCount,
    invalidSampleCount: log.debug.invalidSampleCount,
  };
}

function classifyWebcamEngagement(score) {
  if (score >= 85) return "High";
  if (score >= 65) return "Medium";
  return "Low";
}

function isScreenPresent(data) {
  if (!data || !Number.isFinite(data.x) || !Number.isFinite(data.y)) return false;
  const width = window.innerWidth || document.documentElement.clientWidth || 0;
  const height = window.innerHeight || document.documentElement.clientHeight || 0;
  const marginX = width * 0.08;
  const marginY = height * 0.08;
  return data.x >= -marginX
    && data.x <= width + marginX
    && data.y >= -marginY
    && data.y <= height + marginY;
}

function canUseWebGazer() {
  return Boolean(window.webgazer && typeof window.webgazer.setGazeListener === "function");
}

function configureWebGazerAssetPath() {
  if (!window.webgazer || !window.webgazer.params) return;
  const currentPath = window.webgazer.params.faceMeshSolutionPath || "";
  if (currentPath === webgazerFaceMeshSolutionPath) return;
  window.webgazer.params.faceMeshSolutionPath = webgazerFaceMeshSolutionPath;
}

function startWebGazerLogging() {
  if (!state.webcamEnabled || state.mode !== "focus") {
    state.webgazerStatus = "Camera ready. Tracking will start with your next Focus session.";
    return;
  }

  if (!canUseWebGazer()) {
    state.webgazerStatus = "Tracking unavailable in this browser. The timer will keep working.";
    return;
  }

  if (!state.gazeSession) {
    state.gazeSession = {
      id: `gazodoro-${new Date().toISOString()}`,
      startedAt: Date.now(),
      mode: "focus",
      samples: [],
      callbackCount: 0,
      validSampleCount: 0,
      invalidSampleCount: 0,
      lastCallbackAt: null,
      lastRawDataWasNull: null,
      endedAt: null,
      endReason: null,
    };
    state.lastGazeSampleAt = 0;
  }

  window.saveDataAcrossSessions = false;
  state.webgazerActive = true;
  state.webgazerStatus = "Tracking active. Keep your face centered.";

  try {
    const webgazer = window.webgazer;
    configureWebGazerAssetPath();
    if (typeof webgazer.saveDataAcrossSessions === "function") {
      webgazer.saveDataAcrossSessions(false);
    }
    if (typeof webgazer.showVideoPreview === "function") webgazer.showVideoPreview(state.webgazerDebugVisible);
    if (typeof webgazer.showPredictionPoints === "function") webgazer.showPredictionPoints(state.webgazerDebugVisible);
    if (typeof webgazer.showFaceOverlay === "function") webgazer.showFaceOverlay(state.webgazerDebugVisible);
    if (typeof webgazer.showFaceFeedbackBox === "function") webgazer.showFaceFeedbackBox(state.webgazerDebugVisible);

    webgazer.setGazeListener((data) => {
      if (!state.webgazerActive || !state.gazeSession || state.mode !== "focus" || !state.isRunning) return;

      const now = Date.now();
      state.gazeSession.callbackCount += 1;
      state.gazeSession.lastCallbackAt = now;
      state.gazeSession.lastRawDataWasNull = data == null;

      if (now - state.lastGazeSampleAt < 1000) return;
      state.lastGazeSampleAt = now;

      const valid = Boolean(data && Number.isFinite(data.x) && Number.isFinite(data.y));
      const screenPresent = isScreenPresent(data);
      if (valid) {
        state.gazeSession.validSampleCount += 1;
        state.webgazerStatus = "Tracking active. Keep your face centered.";
      } else {
        state.gazeSession.invalidSampleCount += 1;
        state.webgazerStatus = "Face not detected. Adjust lighting or center your face.";
      }

      state.gazeSession.samples.push({
        elapsedMs: now - state.gazeSession.startedAt,
        x: valid ? Math.round(data.x) : null,
        y: valid ? Math.round(data.y) : null,
        valid,
        screenPresent,
        viewportWidth: window.innerWidth || null,
        viewportHeight: window.innerHeight || null,
      });
    });

    if (typeof webgazer.begin === "function") {
      state.webgazerBeginStatus = "starting";
      state.webgazerBeginError = "";
      state.webgazerBeginStack = "";
      const beginResult = webgazer.begin();
      if (beginResult && typeof beginResult.then === "function") {
        beginResult
          .then(() => {
            state.webgazerBeginStatus = "resolved";
            if (state.webgazerActive) {
              state.webgazerStatus = "Tracking active. Keep your face centered.";
              render();
            }
          })
          .catch((error) => {
            state.webgazerBeginStatus = "rejected";
            state.webgazerBeginError = error && error.message ? error.message : "Unknown WebGazer begin error.";
            state.webgazerBeginStack = error && error.stack ? error.stack : "";
            console.error("WebGazer begin failed", error);
            state.webgazerActive = false;
            state.webgazerStatus = friendlyTrackingError(error);
            render();
          });
      } else {
        state.webgazerBeginStatus = "called";
      }
    }
  } catch (error) {
    state.webgazerActive = false;
    state.webgazerBeginStatus = "threw";
    state.webgazerBeginError = error && error.message ? error.message : "Unknown WebGazer start error.";
    state.webgazerBeginStack = error && error.stack ? error.stack : "";
    console.error("WebGazer start failed", error);
    state.webgazerStatus = friendlyTrackingError(error);
  }
}

function friendlyTrackingError(error) {
  const message = error && error.message ? error.message : "";
  if (message.includes("Failed to fetch")) {
    return "Tracking setup could not load. Check your connection and keep using the timer.";
  }
  if (!canUseWebGazer()) {
    return "Tracking is not supported in this browser. Standard timer mode is still available.";
  }
  return "Tracking unavailable right now. The timer will keep working.";
}

function pauseWebGazerLogging() {
  if (!state.webgazerActive) return;
  state.webgazerActive = false;
  if (state.gazeSession) {
    state.webgazerStatus = "Tracking paused.";
  }
}

function stopWebGazerLogging(reason = "stopped") {
  if (canUseWebGazer()) {
    try {
      window.webgazer.setGazeListener(null);
      if (typeof window.webgazer.pause === "function") window.webgazer.pause();
    } catch {
      // Timer stability matters more than WebGazer cleanup in this prototype.
    }
  }
  state.webgazerActive = false;
  if (!state.gazeSession) {
    state.webgazerStatus = "Camera ready. Tracking will start with your next Focus session.";
    return;
  }
  state.webgazerStatus = "Tracking stopped.";
}

function finalizeGazeLog(reason) {
  if (!state.gazeSession) {
    stopWebGazerLogging(reason);
    if (reason === "focus-complete") {
      state.latestWebcamMetrics = createUnavailableWebcamMetrics();
    }
    return;
  }

  const endedAt = Date.now();
  const log = {
    app: "Gazodoro",
    type: "webgazer-focus-session-log",
    version: 1,
    sessionId: state.gazeSession.id,
    startedAt: new Date(state.gazeSession.startedAt).toISOString(),
    endedAt: new Date(endedAt).toISOString(),
    durationMs: endedAt - state.gazeSession.startedAt,
    endReason: reason,
    sampleIntervalMs: 1000,
    debug: {
      beginStatus: state.webgazerBeginStatus,
      beginError: state.webgazerBeginError,
      beginStack: state.webgazerBeginStack,
      callbackCount: state.gazeSession.callbackCount,
      validSampleCount: state.gazeSession.validSampleCount,
      invalidSampleCount: state.gazeSession.invalidSampleCount,
      lastCallbackAt: state.gazeSession.lastCallbackAt
        ? new Date(state.gazeSession.lastCallbackAt).toISOString()
        : null,
      lastRawDataWasNull: state.gazeSession.lastRawDataWasNull,
    },
    privacy: {
      localOnly: true,
      rawImagesStored: false,
      rawVideoStored: false,
      uploadedToServer: false,
    },
    samples: state.gazeSession.samples,
  };
  const metrics = calculateWebcamMetrics(log);
  log.metrics = metrics;

  stopWebGazerLogging(reason);
  state.latestGazeLog = log;
  state.latestWebcamMetrics = reason === "focus-complete" ? metrics : createUnavailableWebcamMetrics();
  state.latestGazeLogFileName = `gazodoro-session-log-${new Date(endedAt).toISOString().replace(/[:.]/g, "-")}.csv`;
  state.gazeSession = null;

  if (state.latestGazeLogUrl) URL.revokeObjectURL(state.latestGazeLogUrl);
  state.latestGazeLogUrl = URL.createObjectURL(new Blob([toGazeLogCsv(log)], {
    type: "text/csv",
  }));
  state.webgazerStatus = "Focus session saved locally.";
}

function downloadLatestGazeLog() {
  if (!state.latestGazeLog || !state.latestGazeLogUrl) return;
  const link = document.createElement("a");
  link.href = state.latestGazeLogUrl;
  link.download = state.latestGazeLogFileName || "gazodoro-session-log.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function recordCalibrationPoint(target) {
  const rect = target.getBoundingClientRect();
  const x = Math.round(rect.left + rect.width / 2);
  const y = Math.round(rect.top + rect.height / 2);
  const pointId = target.dataset.calibrationPoint;
  state.calibrationClickCount += 1;
  if (pointId && !state.calibrationProgress.includes(pointId)) {
    state.calibrationProgress.push(pointId);
  }

  if (canUseWebGazer() && typeof window.webgazer.recordScreenPosition === "function") {
    try {
      window.webgazer.recordScreenPosition(x, y, "click");
      state.webgazerStatus = "Calibration point saved.";
    } catch {
      state.webgazerStatus = "Calibration point skipped. You can continue.";
    }
  } else {
    state.webgazerStatus = "Camera ready. Tracking will start with your next Focus session.";
  }

  render();
}

function toGazeLogCsv(log) {
  const rows = [[
    "sessionId",
    "startedAt",
    "endedAt",
    "durationMs",
    "endReason",
    "sampleIntervalMs",
    "beginStatus",
    "beginError",
    "beginStack",
    "callbackCount",
    "validSampleCount",
    "invalidSampleCount",
    "lastCallbackAt",
    "lastRawDataWasNull",
    "localOnly",
    "rawImagesStored",
    "rawVideoStored",
    "uploadedToServer",
    "elapsedMs",
    "x",
    "y",
    "valid",
  ]];

  if (!log.samples.length) {
    rows.push([
      log.sessionId,
      log.startedAt,
      log.endedAt,
      log.durationMs,
      log.endReason,
      log.sampleIntervalMs,
      log.debug.beginStatus,
      log.debug.beginError,
      log.debug.beginStack,
      log.debug.callbackCount,
      log.debug.validSampleCount,
      log.debug.invalidSampleCount,
      log.debug.lastCallbackAt,
      log.debug.lastRawDataWasNull,
      log.privacy.localOnly,
      log.privacy.rawImagesStored,
      log.privacy.rawVideoStored,
      log.privacy.uploadedToServer,
      "",
      "",
      "",
      "",
    ]);
  } else {
    log.samples.forEach((sample) => {
      rows.push([
        log.sessionId,
        log.startedAt,
        log.endedAt,
        log.durationMs,
        log.endReason,
        log.sampleIntervalMs,
        log.debug.beginStatus,
        log.debug.beginError,
        log.debug.beginStack,
        log.debug.callbackCount,
        log.debug.validSampleCount,
        log.debug.invalidSampleCount,
        log.debug.lastCallbackAt,
        log.debug.lastRawDataWasNull,
        log.privacy.localOnly,
        log.privacy.rawImagesStored,
        log.privacy.rawVideoStored,
        log.privacy.uploadedToServer,
        sample.elapsedMs,
        sample.x,
        sample.y,
        sample.valid,
      ]);
    });
  }

  return rows.map((row) => row.map(csvCell).join(",")).join("\n");
}

function csvCell(value) {
  if (value === null || value === undefined) return "";
  const text = String(value);
  if (/[",\n\r]/.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
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
    if (state.mode === "focus") finalizeGazeLog("camera-disabled");
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
    trackingSetup: renderTrackingSetup,
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
            <button class="primary-button" data-action="trackingSetup">Set up tracking</button>
            <button class="secondary-button" data-action="standardMode">Continue without camera</button>
          </div>
        </div>
        <p class="tip">Tip! Is your face centered? Is the lighting okay?</p>
      </div>
    </section>
  `;
}

function renderTrackingSetup() {
  const completed = state.calibrationProgress.length;
  const setupReady = completed >= 5;

  return `
    <section class="center-screen">
      <div class="tracking-setup-screen">
        <h1 class="section-title" style="text-align:center">Tracking setup</h1>
        <div class="panel tracking-setup-panel">
          <div>
            <label class="field-label">Camera check</label>
            <div class="preview-box">
              ${state.stream ? '<video id="cameraPreview" muted playsinline></video>' : '<div class="spinner" aria-label="Loading camera preview"></div>'}
            </div>
            <p class="tip">Keep your face centered with steady lighting.</p>
          </div>
          <div class="tracking-checklist">
            <div class="tracking-status-badge">${setupReady ? "Ready to focus" : "Quick calibration"}</div>
            <h2>Look at each point and tap it once</h2>
            <p>This helps the timer understand your screen position before focus begins.</p>
            ${renderSetupCalibrationTargets()}
            <div class="setup-progress" aria-label="Calibration progress">
              <span style="width:${completed * 20}%"></span>
            </div>
            <p class="tip">${completed}/5 points complete</p>
            <button class="primary-button" data-action="finishTrackingSetup">
              ${setupReady ? "Continue to dashboard" : "Continue anyway"}
            </button>
            <button class="secondary-button" data-action="standardMode">Use Standard Mode</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderDashboard() {
  const cameraClass = state.webcamEnabled ? "camera" : "";
  const cameraLabel = state.webcamEnabled ? "Camera mode" : "No-camera mode";
  const feedback = state.webcamEnabled
    ? "Tracking stays local to this browser. No webcam images or video are saved."
    : "Standard Mode active. Webcam detection is off, but timer controls remain available.";
  const trackingStateClass = state.webgazerActive ? "active" : state.webcamEnabled ? "ready" : "off";
  const trackingTitle = state.webcamEnabled
    ? state.webgazerActive ? "Tracking active" : "Camera ready"
    : "Standard Mode";

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
          <p>${renderEngagementStatusText()}</p>
        </article>
        <article class="timer-card">
          <h3>Privacy</h3>
          <p>${feedback}</p>
        </article>
        <article class="timer-card transition-card">
          <h3>Cycle transition</h3>
          <p>${state.transitionMessage}</p>
        </article>
        <article class="timer-card">
          <h3>Tracking</h3>
          <div class="tracking-pill ${trackingStateClass}"><span></span>${trackingTitle}</div>
          <p>${state.webcamEnabled ? state.webgazerStatus : "Webcam detection is off."}</p>
        </article>
        ${state.latestAdaptiveDecision ? renderAdaptiveDecisionCard() : ""}
      </div>
      <div class="bottom-controls">
        <button class="round-button" data-action="resetShell" aria-label="Reset timer">${icons.reset}</button>
        <button class="main-play" data-action="toggleRunning" aria-label="${state.isRunning ? "Pause timer" : "Start timer"}">${state.isRunning ? icons.pause : icons.play}</button>
      </div>
      <div class="aux-controls">
        <button class="round-button" data-action="statsShortcut" aria-label="Open statistics">${icons.chart}</button>
        <button class="round-button" data-action="settings" aria-label="Open settings">${icons.gear}</button>
      </div>
      ${state.surveyVisible ? renderPostSessionSurvey() : ""}
      ${state.baselineVisible ? renderBaselineSurvey() : ""}
    </section>
  `;
}

function renderEngagementStatusText() {
  const metrics = state.latestWebcamMetrics;
  if (!state.webcamEnabled) return "Unavailable in Standard Mode.";
  if (!metrics || metrics.state === "Unavailable") return "Waiting for a completed focus session.";
  return `${metrics.state} engagement, ${metrics.screenPresenceRatio}% screen presence.`;
}

function renderPostSessionSurvey() {
  const focusReady = Boolean(state.surveyDraft.focusLevel);
  const fatigueReady = Boolean(state.surveyDraft.fatigueLevel);
  const canSubmit = focusReady && fatigueReady;

  return `
    <div class="modal-backdrop" role="presentation">
      <section class="survey-modal" role="dialog" aria-modal="true" aria-labelledby="surveyTitle">
        <div class="survey-check" aria-hidden="true">OK</div>
        <p class="survey-kicker">${state.sessionCount} ${state.sessionCount === 1 ? "session" : "sessions"} completed today</p>
        <h2 id="surveyTitle">Session complete</h2>
        <form id="postSessionSurvey" class="survey-form">
          ${renderSurveyScale(
            "focusLevel",
            "How focused were you during this session?",
            ["Can't focus", "Poor", "Fair", "Good", "Highly focused"]
          )}
          ${renderSurveyScale(
            "fatigueLevel",
            "How tired do you feel right now?",
            ["Not tired", "Slightly", "Moderate", "Tired", "Very tired"]
          )}
          <label class="survey-comment">
            <span>Optional note</span>
            <textarea id="surveyComment" rows="3" maxlength="220" placeholder="Anything you noticed?">${escapeHtml(state.surveyDraft.comment)}</textarea>
          </label>
          <div class="survey-actions">
            <button class="primary-button" type="submit" ${canSubmit ? "" : "disabled"}>Submit</button>
            <button class="secondary-button" type="button" data-action="skipSurvey">Skip</button>
          </div>
        </form>
      </section>
    </div>
  `;
}

function renderBaselineSurvey() {
  const readinessReady = Boolean(state.baselineDraft.readinessLevel);
  const fatigueReady = Boolean(state.baselineDraft.fatigueLevel);
  const canSubmit = readinessReady && fatigueReady;

  return `
    <div class="modal-backdrop" role="presentation">
      <section class="survey-modal" role="dialog" aria-modal="true" aria-labelledby="baselineTitle">
        <div class="survey-check baseline" aria-hidden="true">1</div>
        <p class="survey-kicker">Required before your first focus session</p>
        <h2 id="baselineTitle">Set your baseline</h2>
        <form id="baselineSurvey" class="survey-form">
          ${renderBaselineScale(
            "readinessLevel",
            "How ready do you feel to start focused reading right now?",
            ["Not ready", "Low", "Okay", "Ready", "Very ready"]
          )}
          ${renderBaselineScale(
            "fatigueLevel",
            "How mentally or visually tired do you feel right now?",
            ["Not tired", "Slightly", "Moderate", "Tired", "Very tired"]
          )}
          <div class="survey-actions">
            <button class="primary-button" type="submit" ${canSubmit ? "" : "disabled"}>Start focus</button>
          </div>
        </form>
      </section>
    </div>
  `;
}

function renderSurveyScale(field, question, labels) {
  return `
    <fieldset class="survey-scale">
      <legend>${question}</legend>
      <div class="rating-grid" role="radiogroup" aria-label="${question}">
        ${labels.map((label, index) => {
          const value = index + 1;
          const selected = state.surveyDraft[field] === value;
          return `
            <button
              class="rating-option ${selected ? "selected" : ""}"
              type="button"
              data-survey-field="${field}"
              data-survey-value="${value}"
              role="radio"
              aria-checked="${selected}"
            >
              <strong>${value}</strong>
              <span>${label}</span>
            </button>
          `;
        }).join("")}
      </div>
    </fieldset>
  `;
}

function renderBaselineScale(field, question, labels) {
  return `
    <fieldset class="survey-scale">
      <legend>${question}</legend>
      <div class="rating-grid" role="radiogroup" aria-label="${question}">
        ${labels.map((label, index) => {
          const value = index + 1;
          const selected = state.baselineDraft[field] === value;
          return `
            <button
              class="rating-option ${selected ? "selected" : ""}"
              type="button"
              data-baseline-field="${field}"
              data-baseline-value="${value}"
              role="radio"
              aria-checked="${selected}"
            >
              <strong>${value}</strong>
              <span>${label}</span>
            </button>
          `;
        }).join("")}
      </div>
    </fieldset>
  `;
}

function renderAdaptiveDecisionCard() {
  const decision = state.latestAdaptiveDecision;
  const breakLabel = modeNames[decision.breakMode] || "Break";

  return `
    <article class="timer-card adaptive-card">
      <h3>Adaptive result</h3>
      <p>${escapeHtml(decision.reason)}</p>
      <div class="adaptive-summary">
        <div><span>Next focus</span><strong>${decision.previousFocusDuration} -> ${decision.nextFocusDuration}m</strong></div>
        <div><span>${breakLabel}</span><strong>${decision.previousBreakDuration} -> ${decision.nextBreakDuration}m</strong></div>
      </div>
      <div class="override-grid">
        <label>
          <span>Focus</span>
          <input id="overrideFocus" class="number-input compact" type="number" min="1" max="99" value="${state.overrideDraft.focus}" />
        </label>
        <label>
          <span>Break</span>
          <input id="overrideBreak" class="number-input compact" type="number" min="1" max="99" value="${state.overrideDraft.break}" />
        </label>
      </div>
      <div class="adaptive-actions">
        <button class="download-log-button compact" data-action="applyAdaptiveOverride">Apply custom</button>
        <button class="download-log-button compact" data-action="resetAdaptiveDefaults">Reset defaults</button>
        <button class="ghost-button compact" data-action="keepAdaptiveRecommendation">Keep</button>
      </div>
    </article>
  `;
}

function renderSetupCalibrationTargets() {
  const positions = [
    "middle-center",
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ];

  return `
    <div class="setup-target-grid" aria-label="Tracking setup points">
      ${positions.map((position, index) => `
        <button class="setup-target ${position} ${state.calibrationProgress.includes(String(index + 1)) ? "done" : ""}" data-calibration-point="${index + 1}" aria-label="Tracking point ${index + 1}">
          <span>${state.calibrationProgress.includes(String(index + 1)) ? "OK" : index + 1}</span>
        </button>
      `).join("")}
    </div>
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
  const hasLog = Boolean(state.latestGazeLog);
  const latestSurvey = state.latestSurveyResult;
  const diagnostics = state.latestGazeLog
    ? state.latestGazeLog.debug
    : state.gazeSession
      ? {
          beginStatus: state.webgazerBeginStatus,
          beginError: state.webgazerBeginError,
          callbackCount: state.gazeSession.callbackCount,
          validSampleCount: state.gazeSession.validSampleCount,
          invalidSampleCount: state.gazeSession.invalidSampleCount,
          lastCallbackAt: state.gazeSession.lastCallbackAt
            ? new Date(state.gazeSession.lastCallbackAt).toISOString()
            : null,
        }
      : null;

  return `
    <div class="panel">
      <div class="setting-copy">
        <h2>Statistics & Analytics</h2>
        <p>Session data stays local to this browser until you export it.</p>
      </div>
      <div class="setting-item">
        <div class="setting-copy">
          <h2>Latest session data</h2>
          <p>${hasLog ? "A local focus session file is ready to export." : "Complete or reset a Focus session to create an export."}</p>
        </div>
        <button class="download-log-button compact" data-action="downloadGazeLog" ${hasLog ? "" : "disabled"}>
          Export latest session data
        </button>
      </div>
      <div class="setting-item">
        <div class="setting-copy">
          <h2>Developer diagnostics</h2>
          <p>Hidden by default for normal use.</p>
        </div>
        <button class="toggle ${state.developerDiagnostics ? "on" : ""}" data-action="toggleDiagnostics" aria-label="Toggle developer diagnostics"></button>
      </div>
      <div class="setting-item">
        <div class="setting-copy">
          <h2>Post-session surveys</h2>
          <p>${state.debugSession.surveys.length} stored in this local debug session.</p>
        </div>
      </div>
      ${latestSurvey ? renderLatestSurveySummary(latestSurvey) : ""}
      ${state.developerDiagnostics ? renderDiagnosticsPanel(diagnostics) : ""}
    </div>
  `;
}

function renderLatestSurveySummary(survey) {
  const summary = survey.skipped
    ? "Latest survey was skipped."
    : `Focus ${survey.focusLevel}/5, fatigue ${survey.fatigueLevel}/5${survey.comment ? `, note: ${escapeHtml(survey.comment)}` : ""}.`;

  return `
    <div class="diagnostics-panel">
      <div><span>Latest survey</span><strong>Session ${survey.sessionNumber}</strong></div>
      <p>${summary}</p>
    </div>
  `;
}

function renderDiagnosticsPanel(diagnostics) {
  if (!diagnostics) {
    return `
      <div class="diagnostics-panel">
        <p>No tracking diagnostics are available yet.</p>
      </div>
    `;
  }

  return `
    <div class="diagnostics-panel">
      <div><span>Begin</span><strong>${escapeHtml(diagnostics.beginStatus || "not-started")}</strong></div>
      <div><span>Callbacks</span><strong>${diagnostics.callbackCount || 0}</strong></div>
      <div><span>Valid</span><strong>${diagnostics.validSampleCount || 0}</strong></div>
      <div><span>Invalid/null</span><strong>${diagnostics.invalidSampleCount || 0}</strong></div>
      ${diagnostics.beginError ? `<p>${escapeHtml(diagnostics.beginError)}</p>` : ""}
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

  const surveyForm = document.querySelector("#postSessionSurvey");
  if (surveyForm) surveyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitPostSessionSurvey();
  });

  const baselineForm = document.querySelector("#baselineSurvey");
  if (baselineForm) baselineForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitBaselineSurvey();
  });

  document.querySelectorAll("[data-survey-field]").forEach((node) => {
    node.addEventListener("click", () => setSurveyRating(node.dataset.surveyField, node.dataset.surveyValue));
  });

  document.querySelectorAll("[data-baseline-field]").forEach((node) => {
    node.addEventListener("click", () => setBaselineRating(node.dataset.baselineField, node.dataset.baselineValue));
  });

  const surveyComment = document.querySelector("#surveyComment");
  if (surveyComment) surveyComment.addEventListener("input", (event) => {
    state.surveyDraft.comment = event.target.value;
  });

  const overrideFocus = document.querySelector("#overrideFocus");
  if (overrideFocus) overrideFocus.addEventListener("input", (event) => {
    setOverrideDraft("focus", event.target.value);
  });

  const overrideBreak = document.querySelector("#overrideBreak");
  if (overrideBreak) overrideBreak.addEventListener("input", (event) => {
    setOverrideDraft("break", event.target.value);
  });

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

  document.querySelectorAll("[data-calibration-point]").forEach((node) => {
    node.addEventListener("click", (event) => recordCalibrationPoint(event.currentTarget));
  });
}

function handleAction(event) {
  const action = event.currentTarget.dataset.action;
  if (action === "privacy") setView("privacy");
  if (action === "enableCamera") requestCamera();
  if (action === "standardMode") continueStandardMode();
  if (action === "trackingSetup") enterTrackingSetup();
  if (action === "finishTrackingSetup") finishTrackingSetup();
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
  if (action === "downloadGazeLog") downloadLatestGazeLog();
  if (action === "skipSurvey") skipPostSessionSurvey();
  if (action === "applyAdaptiveOverride") applyAdaptiveOverride();
  if (action === "resetAdaptiveDefaults") resetAdaptiveDefaults();
  if (action === "keepAdaptiveRecommendation") keepAdaptiveRecommendation();
  if (action === "toggleDiagnostics") {
    state.developerDiagnostics = !state.developerDiagnostics;
    render();
  }
}

render();
