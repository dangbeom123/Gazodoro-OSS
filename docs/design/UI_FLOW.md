# Gazodoro UI Flow

## Purpose

This document records what Codex could access from the Figma Make reference for the Gazodoro web app. It is an observation report only. No implementation files outside `docs/design` were changed.

## Figma Reference

Figma Make prototype:
<https://www.figma.com/make/vUfMf6irVAKkG3CzBPHWUR/App-Development-Request?t=NLHqfDOecb1sQ9ck-1>

Observed Figma metadata:

- Title: `App Development Request`
- Product type: Figma Make
- File key: `vUfMf6irVAKkG3CzBPHWUR`
- Published: `2026-05-13 05:59:07 UTC`
- Modified: `2026-05-20 06:42:52 UTC`
- HTTP access check: success, returned `200`
- Figma connector access: success, returned Make source manifest and asset manifest

## Captured Reference Images

The Figma screenshot node tool does not support Make files, so I could not export individual Figma Make screens through the normal Figma screenshot API.

I attempted browser-based capture with Microsoft Edge headless, but the environment did not produce a screenshot file. As a fallback, I saved the official Figma metadata thumbnail:

- `figma_make_00_overview_thumbnail.png`

Note: this thumbnail is the official preview image exposed by Figma metadata. It is not a reliable full-screen capture of each app state.

## Visible Source Structure

The Figma Make source manifest exposes a React/Vite-style app with the following relevant files:

- `src/app/App.tsx`
- `src/app/components/WelcomeScreen.tsx`
- `src/app/components/PrivacyScreen.tsx`
- `src/app/components/CameraSetupScreen.tsx`
- `src/app/components/CircularTimer.tsx`
- `src/app/components/EngagementIndicator.tsx`
- `src/app/components/FeedbackMessage.tsx`
- `src/app/components/FocusAnalytics.tsx`
- `src/app/components/GoalBox.tsx`
- `src/app/components/SessionRatingModal.tsx`
- `src/app/components/ThemeSelector.tsx`
- `src/app/components/SessionCompleteModal.tsx`
- `src/app/components/SettingsPage.tsx`
- `src/app/components/figma/ImageWithFallback.tsx`

The manifest also exposes many `src/app/components/ui/*` files that look like shadcn-style primitives, including button, card, dialog, sheet, switch, tabs, slider, tooltip, select, progress, and related UI building blocks.

## Visible Style Structure

The Figma Make source manifest exposes these style files:

- `src/styles/tailwind.css`
- `src/styles/index.css`
- `src/styles/fonts.css`
- `src/styles/theme.css`
- `src/styles/globals.css`
- `default_shadcn_theme.css`

From this, I can infer that the design is intended to be recreated with real HTML/CSS/JS or React-style components rather than by embedding screenshots.

## Asset Manifest

The Figma Make project exposes multiple PNG image assets through the Make manifest. I saw 12 image resource entries:

- `0e860664fe64c1d195daac99ec71bdb1bfd59664.png`
- `4e14a01b30c99c09494040a8c1e9f6ef40294ed5.png`
- `4e938c35ee7a12d32bd0df133a4f8b0de3152319.png`
- `7dff0fa2b0e50e8d93c9e66e301ed07942a856d2.png`
- `7f730bc07bee2c318c8c88f8f92790aca1cc9fb8.png`
- `8fc7b3897e356c8020e5e8319e6f8449fd803f32.png`
- `bd49e0d19f973582e7e00527345f81a80a5c0ab1.png`
- `c3895ba5dcfd3e5690be1b2f41ead9314e06b41e.png`
- `c493fef31d9e761ba85bc6a434ce6ecd88a28fa9.png`
- `da35e8f11832f10abd71296c74206c727dcf4299.png`
- `ef9b4d6129aed5f75c122d99b123bd7de1687a02.png`
- `fc232c9f4ed9ab94f39505cb349c1bfc0e5277f4.png`

## Observed App Flow

### 1. Welcome

Likely entry screen:

- Component: `WelcomeScreen`
- Role: first-run introduction to Gazodoro
- Expected action: user starts onboarding or moves into permission setup

### 2. Privacy Explanation

Second onboarding step:

- Component: `PrivacyScreen`
- Role: explain camera/privacy expectations before using attention tracking
- Expected action: user acknowledges privacy messaging and continues

### 3. Camera Setup

Camera permission/setup step:

- Component: `CameraSetupScreen`
- Role: configure or request camera access before focus tracking begins
- Expected action: user grants camera access or proceeds with the available camera state

### 4. Main Focus Session

Primary app experience:

- Component: `CircularTimer`
- Component: `GoalBox`
- Component: `EngagementIndicator`
- Component: `FeedbackMessage`
- Component: `FocusAnalytics`

Likely screen responsibilities:

- Show a circular Pomodoro-style countdown timer.
- Let the user set or review the session goal.
- Display real-time attention or engagement status.
- Show feedback messages during the session.
- Surface focus analytics, probably during or after a session.

### 5. Session Completion

Completion flow:

- Component: `SessionCompleteModal`
- Role: summarize that the focus session is done
- Expected action: user reviews result and proceeds to rating or next session

### 6. Session Rating

Post-session feedback:

- Component: `SessionRatingModal`
- Role: collect user rating or reflection after session completion
- Expected action: user rates the session and dismisses modal

### 7. Settings And Theme

Secondary app surfaces:

- Component: `SettingsPage`
- Component: `ThemeSelector`

Likely responsibilities:

- Configure app preferences.
- Choose visual theme or appearance mode.

## Implementation Notes For Later

When recreating this design in the repo, the safest source order is:

1. Use the Figma Make source/component manifest for flow and state structure.
2. Use `theme.css`, `globals.css`, `tailwind.css`, and `default_shadcn_theme.css` for color, typography, spacing, shadows, and component defaults.
3. Recreate the UI as real HTML/CSS/JavaScript elements.
4. Use the PNG assets only where they represent actual design imagery.
5. After implementation, run the app locally and capture each state for visual comparison.

## Current Access Limitations

I can access the Figma Make project and source manifest, but I cannot honestly claim full pixel-perfect access to every rendered screen yet because:

- Figma screenshot export is not supported for Make files by the available screenshot tool.
- Edge headless did not produce usable per-screen captures in this environment.
- The saved thumbnail is only a metadata preview, not a complete set of app screens.
- Runtime-only states, transitions, hover states, and camera-dependent states still need local preview or manual screenshots to verify perfectly.

Best next step for visual accuracy: implement or run a previewable version, then capture each key app state locally and compare against Figma/source expectations. If Figma Make visual states remain inaccessible from automation, manual screenshots from the prototype would still be useful for the final visual pass.
