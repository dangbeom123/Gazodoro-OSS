# Adaptive Logic for Gazodoro

## 1. Purpose

Gazodoro uses a rule-based adaptive logic to adjust the next Pomodoro cycle based on two input modalities:

1. **Webcam-based engagement signals** collected during the focus session
2. **Survey-based readiness signals** collected after the focus session

The system does not claim to measure concentration, productivity, or fatigue directly. Webcam signals estimate whether the user appears visually engaged with the screen. Survey signals capture the user's self-reported focus and fatigue.

Adaptive decisions are made **after a focus session ends** and are applied to the **next focus/break cycle**. The system does not extend or shorten the current focus session automatically while the user is working.

The adaptive logic is designed to:

- protect the user's focus flow
- reduce overwork when fatigue is high
- avoid overreacting to webcam noise
- keep the system explainable
- preserve user control through manual override

---

## 2. Core Behavior

### 2.1 When Adaptation Happens

Adaptation happens at the end of each focus session.

```text
Focus session ends
-> Post-focus survey appears
-> User submits or skips the survey
-> System calculates next focus and break durations
-> System auto-applies the new durations to the next cycle
-> User may manually override before starting the next focus session
```

The first focus session uses the default timer setting unless the user manually changes it.

### 2.2 Default Timer Settings

| Timer Type | Default Value |
| ---------- | ------------- |
| Focus      | 25 minutes    |
| Break      | 5 minutes     |

### 2.3 Auto-Apply With User Override

Gazodoro should auto-apply adaptive recommendations to reduce the user's cognitive load.

After the next cycle is calculated, the UI should show a short explanation, such as:

```text
Next session adjusted:
Focus: 25 -> 20 minutes
Break: 5 -> 10 minutes
Reason: fatigue was high and readiness declined.
```

The user should still be able to:

- keep the auto-applied recommendation
- customize the next focus/break duration manually
- reset to the default timer settings

---

## 3. Input Modality 1: Webcam Engagement

### 3.1 Purpose

Webcam engagement is a supporting signal for adaptive timer decisions. It estimates whether the user appears visually engaged with the screen during a focus session.

It must not be presented as a direct measurement of concentration or effort.

### 3.2 Webcam Metrics

| Metric | Description |
| ------ | ----------- |
| **Screen Presence Ratio** | Percentage of focus-session time where the user appears to be looking toward the screen. |
| **Disengagement Count** | Number of times the user looks away from the screen for longer than the configured short threshold. |
| **Sustained Disengagement Event** | A continuous period of looking away from the screen for **30 seconds or longer**. |

### 3.3 Webcam Engagement Score

Gazodoro converts webcam metrics into a normalized score from 0 to 100.

```text
Disengagement Penalty Score = max(0, 100 - (Disengagement Count * 10))

Webcam Engagement Score =
  (Screen Presence Ratio * 0.8) +
  (Disengagement Penalty Score * 0.2)
```

Example:

```text
Screen Presence Ratio = 90
Disengagement Count = 2

Disengagement Penalty Score = 100 - (2 * 10) = 80
Webcam Engagement Score = (90 * 0.8) + (80 * 0.2) = 88
```

### 3.4 Webcam Engagement State

| Webcam Engagement Score | State |
| ----------------------- | ----- |
| 85-100 | High Engagement |
| 65-84  | Medium Engagement |
| 0-64   | Low Engagement |

### 3.5 Sustained Disengagement Rule

If the user appears disengaged from the screen for **30 continuous seconds or longer**, Gazodoro records a **Low Engagement Event**.

This event does not automatically stop the current session. It only influences the next-cycle recommendation after the focus session ends.

```text
If sustainedDisengagementSeconds >= 30:
  lowEngagementEvent = true
```

---

## 4. Input Modality 2: Survey Readiness

### 4.1 Purpose

The survey captures the user's self-reported state after a focus session. It is used to balance webcam engagement with subjective focus and fatigue.

This matters because high engagement and high fatigue are not contradictory. A user may remain visually engaged while becoming tired. In that case, the system should protect recovery instead of increasing workload.

### 4.2 Survey Timing

The post-focus survey appears **after the focus session ends**.

It does not wait until the break session is completed.

### 4.3 Baseline Survey

The baseline survey appears once before the first focus session.

It creates the first reference readiness score. It does not change the first focus duration.

| Question | Scale |
| -------- | ----- |
| How ready do you feel to start a focused reading session right now? | 1 = Not ready, 5 = Very ready |
| How mentally or visually tired do you feel right now? | 1 = Not tired, 5 = Very tired |

### 4.4 Post-Focus Survey

The post-focus survey appears after each focus session.

| Question | Scale |
| -------- | ----- |
| How focused did you feel during this session? | 1 = Not focused, 5 = Very focused |
| How mentally or visually tired do you feel now? | 1 = Not tired, 5 = Very tired |

The user may skip the survey. If skipped, Gazodoro uses webcam data only and avoids strong adaptation.

### 4.5 Reading Readiness Score

Gazodoro calculates a **Reading Readiness Score** from 0 to 100.

For the baseline survey:

```text
Reading Readiness Score =
  ((Readiness Score + (6 - Fatigue Score)) / 10) * 100
```

For the post-focus survey:

```text
Reading Readiness Score =
  ((Focus Score + (6 - Fatigue Score)) / 10) * 100
```

Where:

- readiness/focus score ranges from 1 to 5
- fatigue score ranges from 1 to 5
- higher readiness score means the user is more ready to continue
- higher fatigue score means the user is more tired

### 4.6 Readiness State

| Reading Readiness Score | State |
| ----------------------- | ----- |
| 80-100 | High Readiness |
| 60-79  | Medium Readiness |
| 0-59   | Low Readiness |

### 4.7 Fatigue State

Fatigue is also interpreted directly because it is important enough to influence decisions by itself.

| Fatigue Score | State |
| ------------- | ----- |
| 1-2 | Low Fatigue |
| 3   | Moderate Fatigue |
| 4-5 | High Fatigue |

---

## 5. Readiness Change Logic

Gazodoro compares the current post-focus readiness score against a reference score.

- For the first cycle, the reference score is the baseline readiness score.
- For later cycles, the reference score is the previous post-focus readiness score.

```text
Readiness Change (%) =
  ((Current Readiness Score - Reference Readiness Score) / Reference Readiness Score) * 100
```

### 5.1 Readiness Change State

| Readiness Change | State |
| ---------------- | ----- |
| +10% or more | Improved |
| -14% to +9%  | Stable |
| -15% to -29% | Slight Decline |
| -30% or less | Significant Decline |

### 5.2 Reference Update Rule

After each post-focus survey submission, the current readiness score becomes the reference score for the next cycle.

If the user skips the survey, the previous reference score is kept.

---

## 6. Adaptive Decision Priority

Gazodoro must evaluate adaptive rules in priority order. This prevents unclear behavior when multiple signals are true at the same time.

Priority order:

1. **High fatigue protection**
2. **Significant readiness decline**
3. **Sustained low engagement**
4. **Strong engagement with good readiness**
5. **Stable or incomplete data**

The system should choose the first matching rule.

This means fatigue can override engagement. For example, if a user has high webcam engagement but also reports high fatigue, Gazodoro should prioritize recovery and avoid increasing the next focus duration.

---

## 7. Adaptive Decision Rules

### 7.1 Full Data Available

These rules apply when both webcam data and post-focus survey data are available.

| Priority | Condition | Next Focus Duration | Next Break Duration | Explanation |
| -------- | --------- | ------------------- | ------------------- | ----------- |
| 1 | Fatigue Score >= 4 and Webcam State is High or Medium | Same | +5 minutes | User appears engaged but tired, so recovery is prioritized. |
| 1 | Fatigue Score >= 4 and Webcam State is Low | -5 minutes | +5 minutes | User appears tired and less visually engaged. |
| 2 | Readiness Change <= -30% | -5 minutes | +5 minutes | User readiness dropped significantly. |
| 3 | Sustained Disengagement Event is true | -5 minutes | +3 minutes | User looked away for at least 30 continuous seconds. |
| 4 | Webcam State is High, Readiness State is High, and Fatigue Score <= 2 | +5 minutes | Same | User appears engaged and reports enough readiness to continue. |
| 4 | Webcam State is High, Readiness Change >= +10%, and Fatigue Score <= 3 | +5 minutes | Same | User readiness improved while engagement remained high. |
| 5 | Readiness Change is Slight Decline | Same | +3 minutes | User readiness declined mildly; increase recovery without shortening focus. |
| 5 | Webcam State is Medium and Readiness Change is Stable | Same | Same | User state appears stable. |
| 5 | No higher-priority rule matches | Same | Same | No strong reason to adapt. |

### 7.2 Survey Available, Webcam Unavailable

If webcam data is unavailable, Gazodoro adapts based on survey readiness only.

| Condition | Next Focus Duration | Next Break Duration |
| --------- | ------------------- | ------------------- |
| Fatigue Score >= 4 | Same | +5 minutes |
| Readiness Change <= -30% | -5 minutes | +5 minutes |
| Readiness Change between -15% and -29% | Same | +3 minutes |
| Readiness Change >= +10% and Fatigue Score <= 2 | +5 minutes | Same |
| Otherwise | Same | Same |

### 7.3 Webcam Available, Survey Skipped

If the user skips the survey, Gazodoro may use webcam data, but it should avoid strong adaptation because self-report is missing.

| Condition | Next Focus Duration | Next Break Duration |
| --------- | ------------------- | ------------------- |
| Sustained Disengagement Event is true | Same | +3 minutes |
| Webcam State is Low | Same | +3 minutes |
| Webcam State is High | Same | Same |
| Otherwise | Same | Same |

Without survey data, Gazodoro should not increase focus duration.

### 7.4 Both Modalities Unavailable

If both webcam and survey data are unavailable, Gazodoro keeps the current timer settings.

```text
Next Focus Duration = Current Focus Duration
Next Break Duration = Current Break Duration
```

---

## 8. Duration Adjustment Constraints

Gazodoro should not use a fixed maximum focus duration as the default design rule. Instead, it should use incremental changes and safety constraints.

### 8.1 Minimum Durations

| Timer Type | Minimum |
| ---------- | ------- |
| Focus      | 10 minutes |
| Break      | 5 minutes |

### 8.2 Per-Cycle Adjustment Limit

To avoid sudden changes, each cycle can only adjust timer duration by a small amount.

| Timer Type | Maximum Increase Per Cycle | Maximum Decrease Per Cycle |
| ---------- | -------------------------- | -------------------------- |
| Focus      | +5 minutes | -5 minutes |
| Break      | +5 minutes | 0 minutes |

Break duration should not automatically decrease through adaptive logic. The user may manually reduce it.

### 8.3 Consecutive Increase Guardrail

If Gazodoro increases focus duration for three consecutive cycles, it should require at least one stable cycle before increasing again.

```text
If consecutiveFocusIncreases >= 3:
  do not increase focus this cycle
  allow Same or Decrease only
```

This is not a hard maximum. It prevents runaway focus growth while still allowing longer sessions over time.

---

## 9. State Variables

The adaptive system should track these values.

| Variable | Description |
| -------- | ----------- |
| `currentFocusDuration` | Focus duration used in the completed session. |
| `currentBreakDuration` | Break duration currently configured. |
| `nextFocusDuration` | Focus duration calculated for the next cycle. |
| `nextBreakDuration` | Break duration calculated for the next cycle. |
| `screenPresenceRatio` | Percentage of session where user appears to look toward screen. |
| `disengagementCount` | Number of disengagement events during the session. |
| `sustainedDisengagementSeconds` | Longest continuous disengagement duration. |
| `lowEngagementEvent` | True if sustained disengagement reached 30 seconds or more. |
| `webcamEngagementScore` | Normalized webcam score from 0 to 100. |
| `webcamEngagementState` | High, Medium, Low, or Unavailable. |
| `focusScore` | Post-focus self-reported focus score from 1 to 5. |
| `fatigueScore` | Self-reported fatigue score from 1 to 5. |
| `currentReadinessScore` | Current reading readiness score from 0 to 100. |
| `referenceReadinessScore` | Previous readiness score used for comparison. |
| `readinessChangePercent` | Percent change from reference readiness score. |
| `consecutiveFocusIncreases` | Number of consecutive cycles where focus duration increased. |

---

## 10. Algorithm Summary

```text
At the end of each focus session:

1. Stop collecting webcam metrics for the completed focus session.

2. Calculate webcam engagement:
   - screen presence ratio
   - disengagement count
   - sustained disengagement event
   - webcam engagement score
   - webcam engagement state

3. Show the post-focus survey.

4. If survey is submitted:
   - calculate current readiness score
   - calculate readiness change
   - classify readiness state
   - classify fatigue state

5. Evaluate adaptive decision rules in priority order:
   - high fatigue protection
   - significant readiness decline
   - sustained low engagement
   - strong engagement with good readiness
   - stable or incomplete data

6. Apply duration constraints:
   - focus cannot go below 10 minutes
   - break cannot go below 5 minutes
   - focus can only change by 5 minutes per cycle
   - break can only increase by up to 5 minutes per cycle
   - after 3 consecutive focus increases, require one non-increase cycle

7. Auto-apply the calculated next focus and break durations.

8. Show a short explanation of the adjustment.

9. Allow the user to manually override before starting the next focus session.

10. If survey was submitted:
    - save current readiness score as the next reference score.
```

---

## 11. Example Scenarios

### Scenario 1: First Cycle Uses Baseline as Reference

- Baseline readiness score: 80
- Post-focus readiness score: 60
- Readiness change: -25%
- Fatigue score: 3
- Webcam state: Medium

Decision:

```text
Focus: same
Break: +3 minutes
Reason: readiness slightly declined.
```

### Scenario 2: High Engagement and Low Fatigue

- Webcam engagement score: 88
- Webcam state: High
- Focus score: 5
- Fatigue score: 1
- Readiness score: 100
- Readiness state: High

Decision:

```text
Focus: +5 minutes
Break: same
Reason: engagement and readiness were both high.
```

### Scenario 3: High Engagement but High Fatigue

- Webcam engagement score: 90
- Webcam state: High
- Focus score: 4
- Fatigue score: 5
- Readiness score: 50

Decision:

```text
Focus: same
Break: +5 minutes
Reason: user remained engaged but reported high fatigue.
```

### Scenario 4: Sustained Low Engagement

- Webcam state: Medium
- Sustained disengagement: 35 seconds
- Fatigue score: 2
- Readiness change: stable

Decision:

```text
Focus: -5 minutes
Break: +3 minutes
Reason: sustained disengagement reached 30 seconds.
```

### Scenario 5: Survey Skipped

- Survey: skipped
- Webcam state: Low
- Sustained disengagement: true

Decision:

```text
Focus: same
Break: +3 minutes
Reason: webcam suggested low engagement, but survey data was unavailable.
```

### Scenario 6: Both Modalities Unavailable

- Webcam: unavailable
- Survey: skipped

Decision:

```text
Focus: same
Break: same
Reason: no reliable adaptive input was available.
```

---

## 12. Design and Privacy Requirements

The adaptive system must follow these requirements:

| Requirement | Rule |
| ----------- | ---- |
| Explainability | Every auto-applied change should include a short reason. |
| User control | The user can manually override the next focus and break duration. |
| Webcam optionality | The app still works if webcam permission is denied. |
| Survey optionality | The app still works if the survey is skipped. |
| No punishment | Low engagement should be framed as support, not failure. |
| No raw video storage | Raw webcam images or video should not be stored. |
| Gentle feedback | The system should avoid interrupting the user during focus unless absolutely necessary. |

