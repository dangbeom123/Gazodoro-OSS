# **Product Requirements Document (PRD)**

## **1\. Basic Information**

**Project Title \- Team:**  
 \[Gazodoro\] \- Team 3 (나무)

**Version \- Date \- Changelog:**

- Version 0 \- 2026/04/03 \- Hai Dang created this PRD, wrote down Product Overview, Problem Statement, Goals, Target Users  
- Version 1 \- 2026/04/06 \- Hai Dang wrote down Market Research, Scope, Key Features, Functional Requirements  
- Version 2 \- 2026/04/06 \- Chris completed the Persona, User Journey and Risk/Constraints sections. Added some Security, Compatibility, Performance NFRs and some Success Metrics. Performance NFRs need more specificity regarding update intervals. A name is still needed for the Persona section. Discuss with team at a later stage.  
- Version 3 \- 2026/05/10 \- Hai Dang fixed Members’ Roles, completed the Non \- functional Requirements, Use Cases/ User Flow, Information Architecture / Wireframe, Milestones.  
- Version 4 \- 2026/05/11 : Lam wrote down more specific requirements for his part 7,8,10  
- Version 5 \- 2026/05/12 \- Hai Dang accepted Lam’s modification in session 7,8, rejected Lam’s modification in session 10 with message “The detail function of adaptive pomodoro need to be considered more, simply make these questions can increase users’ cognitive load”  
- Version 5.1 \- 2026/05/12 \- Chris corrected a typo in session 10 feature 2\. Suggestion to change post-session survey scale.  
- Version 6 \- 2026/05/13 \- Chris added some sample questions for the post-session survey in session 10 feature 3\. Clarified system behavior on session 13 main flow step 5\.

**Team Members / Roles:**

* Hai Dang – Project Manager  
* 조우현 \- UX Researcher, UI Designer  
* Lam \- UX Researcher, UI Designer  
* Chris \- Head Engineer  
* 변정현 \- Developer

## **2\. Product Overview**

### **2.1 Product Summary**

This product is a web application designed to support knowledge workers who perform long, deep reading tasks on a computer by providing an adaptive Pomodoro timer.

### **2.2 Background / Motivation**

Existing Pomodoro timer applications are generally designed for a broad range of users and rely on fixed time intervals (e.g., 25-minute work sessions). While simple, these fixed structures do not account for variations in users’ actual engagement and fatigue levels during tasks such as long-form reading.

As a result, users may either be interrupted while still focused or continue working despite decreased attention and increasing fatigue.

In addition, most existing tools require users to manually manage their sessions and make decisions about when to start, stop, or adjust their workflow. This creates additional cognitive effort, especially during tasks that already demand sustained concentration.

Therefore, there is a need for a more adaptive approach that can respond to users’ engagement patterns and reduce the need for constant manual control.

## **3\. Problem Statement**

Users currently face difficulties when performing long, deep reading tasks on a computer, especially when trying to maintain sustained attention over extended periods of time.  
The main problems include:

* Fixed Pomodoro intervals do not align with users’ actual engagement and fatigue levels, which can interrupt users while they are still focused or fail to provide breaks when attention has already declined.  
* Users have difficulty recognizing their own attention drop and visual fatigue during deep reading, leading them to continue working inefficiently without timely rest.  
* Users must manually manage their Pomodoro sessions, including deciding when to start, stop, or adjust timers, which adds extra cognitive effort during tasks that already require high concentration.

As a result, users experience disrupted reading flow, unnoticed fatigue, and reduced attention quality, which reduces overall productivity and user satisfaction.

## **4\. Goals**

The main goal of this product is to support knowledge workers in maintaining effective focus and managing fatigue during long, deep reading tasks on a computer through an adaptive Pomodoro interface.

Specific goals:

* To help users maintain sustained attention and reading flow during long-form reading tasks  
* To reduce cognitive effort required to manually manage Pomodoro sessions and decide when to take breaks  
* To improve usability and engagement by aligning work and break intervals with users’ session-by-session engagement patterns  
* To provide adaptive support and personalized feedback based on user engagement and post-focus self-report

## **5\. Target Users**

### **Primary Users**

Knowledge workers who regularly perform long, deep reading tasks on a computer, such as university students, researchers, and professionals who read academic papers, reports, or study materials for extended periods.

### **Secondary Users**

General computer users who engage in moderate reading or desk-based tasks, such as reviewing documents, reading online content, or light studying, and may benefit from basic Pomodoro support and simple adaptive features.

### **User Characteristics**

* Spend long periods reading on a screen (laptop/desktop) with minimal physical movement  
* Experience gradual attention decline and visual fatigue during extended reading sessions  
* Rely on self-discipline or external tools (e.g., Pomodoro timers) but find them insufficient or rigid for their actual working patterns

## **6\. Market Research**

### **Existing Solutions**

| Product / Solution | Strengths | Weaknesses |  |
| ----- | ----- | ----- | ----- |
| **Focus To-Do (Pomodoro App)** | • Provides a complete set of Pomodoro and task management features • Easy to start using immediately without setup • Combines timer and task tracking in one system | • Lacks personalization and adaptiveness (fixed timer) • Too many features → increases cognitive load • Requires users to actively manage sessions during focused work |  |
| **Physical Time Timer** | • Simple and intuitive, no learning required • Reduces digital distractions (no screen interaction) • Clear visual representation of time supports awareness | • Cannot pause or adapt to interruptions • Inflexible to changing user state (focus/fatigue) • Manual adjustment is inconvenient and imprecise |  |
|  |  |  |  |

### **Opportunity**

There is an opportunity to design a product that combines the simplicity of physical timers with the flexibility of digital applications, while introducing adaptive behavior based on user engagement.

## **7\. Persona**

**Name:**  
Lam

**Age / Role:**  
22 / Final-year Computer Science Student / Studying/Reading  research papers

**Goals:**

* Maintain high focus during long hour academic paper review sessions.  
* Manage long-term mental energy, discourage overexertion, and ensure the user remains productive throughout the week, not just a single day.

**Pain Points:**

* Standard 25-minute timers often interrupt him just as he enters a "flow state" in a complex paper.  
* Often forgets to take breaks until he has a headache or blurred vision.\>\> **Quality actually decrease when exhausted** 

**Needs:**

* A timer that detects when he appears visually engaged and adjusts the **next** focus/break cycle without interrupting the current reading flow.  
* Automated break reminders that don't require him to stop and click buttons constantly.

**Scenario:**  
Lam is reading a **20-page research paper** for his thesis. Lam is having an overview of this topic for his graduation thesis, he used NotebookLM to summerize all related papers and he noticed one paper should be read carefully for his research paper/thesis. 

He starts the adaptive Pomodoro timer. During the focus session, the system estimates whether he appears visually engaged with the screen. When the focus session ends, Lam answers a short focus/fatigue survey. Gazodoro combines webcam engagement and survey readiness, then automatically adjusts the next focus and break durations while still allowing Lam to override the recommendation.

**8\. User Journey Map**

| Stage | User Action | User Thought / Feeling | Pain Point | Opportunity |
| ----- | ----- | ----- | ----- | ----- |
| Preparation | Opens reading material and starts the timer | "I hope I can finish this chapter without getting distracted." | Anxiety about the volume of work. | Simple, clean UI to reduce initial cognitive load.  |
| Deep Work | Reads intensely until the timer reaches the planned focus duration.  | "I'm finally in the zone. I don't want to manage the timer manually." | Fixed timers do not adapt to his actual state across sessions. | System records engagement signals without interrupting the current focus session. |
| Fatigue | Starts rereading the same paragraph; eyes wandering.  | "I'm getting tired, but I should push through a bit more."  | User fails to recognize gradual fatigue. | System combines low engagement events and self-report to adjust the next cycle. |
| Break / Prompt | Completes a short focus/fatigue survey after the focus session | "I didn't realize how tired my eyes were until the app asked me." | Users often ignore gradual fatigue until it significantly impacts work quality.  | Use self-report to calibrate the next focus and break durations, preventing overexertion.  |

## **9\. Scope**

### **In Scope**

* Core Pomodoro timer (start, pause/resume, reset, break transition, session management)  
* Adaptive timer adjustment based on user engagement signals and post-focus feedback  
* Basic webcam-based engagement detection (e.g., screen presence, sustained disengagement)  
* Post-session self-report survey for focus and fatigue  
* Minimal and user-friendly interface optimized for deep reading tasks

### **Out of Scope**

* Advanced machine learning or predictive modeling  
* Gesture recognition or complex multimodal input  
* Full task management system or productivity suite features  
* Complex backend systems (e.g., user accounts, cloud synchronization)  
* High-precision eye tracking or hardware-dependent solutions

## **10\. Key Features**

### **Feature 1: Adaptive Pomodoro Timer**

**Description:**  
The system dynamically adjusts the **next** focus and break durations based on estimated user engagement and post-focus feedback.

**Purpose:**  
To address the mismatch between fixed Pomodoro intervals and users’ actual engagement and fatigue levels, helping maintain reading flow and reduce ineffective work periods.

**Priority:**  
High

### **Feature 2: Webcam-based Engagement Detection**

**Description:**  
The system uses webcam input to detect basic engagement signals such as screen presence and sustained disengagement, providing a lightweight estimate of visual engagement.

**Purpose:**  
To provide contextual input for next-session adaptation without requiring users to constantly manage the timer manually.

**Priority:**  
High

Webcam-based engagement detection is optional. The system should not store raw webcam video or images.

### **Feature 3: Post-focus Feedback (Self-report Survey)**

**Description:**  
After each focus session, users provide simple feedback on their focus level and fatigue. A baseline survey before the first focus session creates the first readiness reference.

| Question Topic | Question | Purpose |
| :---- | :---- | :---- |
| Focus Depth | “How focused were you during this session?” | Cross-check against webcam engagement information gathered during the focus session.  |
| Fatigue | “How tired do you feel right now?” | Information about user fatigue that is tough to determine through webcam alone. |

User can answer questions on a **1 to 5** scale. The user may also skip the post-focus survey; if skipped, the system uses available webcam data only and avoids strong adaptation.

**Purpose:**  
To complement system-based estimation and improve adaptation accuracy while encouraging user reflection on their work state.

**Priority:**  
Medium

## **11\. Functional Requirements**

| ID | Requirement | Priority |
| ----- | ----- | ----- |
| FR-01 | The system shall allow users to start, pause, resume, and reset a Pomodoro timer. | High |
| FR-02 | The system shall automatically transition between focus sessions and break sessions. | High |
| FR-03 | The system shall display the remaining time clearly during each session. | High |
| FR-04 | The system shall collect basic engagement signals using the user’s webcam (e.g., screen presence and sustained disengagement). | High |
| FR-05 | The system shall adjust the next focus and break durations based on webcam engagement and post-focus feedback. | High |
| FR-06 | The system shall prompt users to complete a short survey after each focus session (e.g., focus level, fatigue level). | Medium |
| FR-07 | The system shall provide a clear explanation for adaptive changes based on available engagement and survey signals. | Medium |
| FR-08 | The system shall auto-apply adaptive changes while allowing users to keep, reset, or manually override them. | Low |
| FR-09 | The system shall continue to function even when webcam input is unavailable. | Low |

# **12\. Non-Functional Requirements**

| ID | Requirement | Category |
| ----- | ----- | ----- |
| **NFR-01** | The system shall provide a clear and minimal interface so users can understand the timer status, session mode, and adaptive feedback without confusion. | Usability |
| **NFR-02** | The system shall collect at least **1 engagement sample per second** during active webcam-based focus tracking when browser performance allows. | Performance |
| **NFR-03** | The system shall keep timer operation stable while tracking runs and shall surface the latest engagement result after each completed focus session. | Performance |
| **NFR-04** | The system shall request explicit user permission before accessing the webcam. | Security / Privacy |
| **NFR-05** | The system shall continue to function even if the webcam is unavailable, using only timer controls and post-focus survey data. | Compatibility |
| **NFR-06** | The system shall allow users to disable webcam-based engagement detection at any time. | Privacy / Usability |
| **NFR-07** | The system shall provide clear feedback when webcam access is denied, unavailable, or not working properly. | Reliability |
| **NFR-08** | The system shall work on modern desktop browsers, with Chrome and Edge recommended for webcam-based tracking. Standard timer mode should remain available in other supported browsers. | Compatibility |
| **NFR-09** | The system shall avoid storing raw webcam video or images to protect user privacy. | Security / Privacy |
| **NFR-10** | The system shall maintain stable timer operation even if engagement detection fails or becomes inaccurate. | Reliability |

# **13\. Use Cases / User Flow**

## **Main Use Case**

**Actor:**  
 User

**Goal:**  
 The user wants to complete a long, deep reading session on a computer while receiving adaptive Pomodoro support based on engagement and post-focus feedback.

## **Main Flow**

1. **The user opens the web application.**  
    The system displays the Pomodoro timer interface and explains that webcam-based engagement detection is optional.  
2. **The user grants webcam permission or chooses to continue without webcam access.**  
    The system starts preparing the session settings and shows the current mode as “Focus Session with default 25 minutes session.”  
3. **The user completes the baseline survey before the first focus session.**  
    The system stores the baseline readiness score as the first reference for later adaptive comparison.  
4. **The user starts a focus session.**  
    The system begins the countdown timer and displays the remaining focus time clearly.  
5. **The user performs a deep reading task on the computer.**  
    If webcam access is available, the system monitors basic engagement signals, such as screen presence and sustained disengagement. The current focus session is not automatically extended or shortened based on these signals.  
6. **The focus session ends when the timer reaches the planned duration.**   
    The system stops focus tracking for that session and asks the user to complete a short post-focus survey. The user may submit or skip it.  
7. **The system calculates the adaptive decision.**  
    The system combines available webcam engagement data and survey readiness data to calculate the next focus and break durations.  
8. **The system auto-applies the next cycle settings.**  
    The user sees a short explanation and can keep the recommendation, reset to defaults, or manually customize the next focus/break duration.  
9. **The break session starts.**  
    After the break ends, the system prepares the next focus session using the updated adaptive settings.  

    ## **Alternative / Exception Flow**

| Condition | System Response |
| ----- | ----- |
| **If the user denies webcam permission** | The system continues with normal Pomodoro functions and uses only post-focus survey data for adaptation. |
| **If webcam input becomes unavailable during a session** | The system displays a short notice and keeps the timer running normally. |
| **If engagement appears low for 30 seconds or more** | The system records a sustained low-engagement event and uses it as one input for the next adaptive decision. |
| **If the user disagrees with the auto-applied adaptive recommendation** | The system allows the user to keep, reset, shorten, or extend the next session manually. |
| **If the user pauses the timer** | The system pauses both the countdown and engagement monitoring until the user resumes. |
| **If the user resets the session** | The system ends the current session and returns to the initial timer state. |
| **If the user skips the post-focus survey** | The system uses only available engagement data. |

    # **14\. Information Architecture/Wireframe**

    ## **Information Architecture**

The product is organized into the following main sections:

### **1\. Onboarding / Permission Setup**

* Briefly explains the purpose of the adaptive Pomodoro timer  
* Requests optional webcam permission for engagement detection  
* Allows users to continue without webcam access

  ### **2\. Main Timer Dashboard**

* Displays the current session mode: Focus / Break / Paused  
* Shows the remaining time clearly  
* Provides core controls: Start, Pause/Resume, Reset  
* Shows a simple engagement status indicator when webcam detection is enabled

  ### **3\. Adaptive Feedback / Recommendation**

* Displays a short explanation for adaptive changes  
* Shows auto-applied changes for the next focus and break duration  
* Allows users to keep, reset, or manually override adaptive recommendations

  ### **4\. Post-focus Survey**

* Collects simple self-report data after each focus session  
* Includes focus level and fatigue level questions  
* Allows users to skip the survey if they do not want to answer

  ### **5\. Settings / Privacy Control**

* Allows users to enable or disable webcam-based engagement detection  
* Explains that raw webcam images or videos are not stored  
* Allows users to manually adjust focus and break durations

  ## **Wireframe / Main Screens**

  ### **Screen 1: Onboarding / Permission Screen**

**Main elements:**

* Product title: **Gazodoro: An adaptive Pomodoro timer for deep reading**  
* Short explanation of adaptive timer and webcam-based engagement detection  
* Webcam permission button: “Enable Webcam Detection”  
* Alternative option: “Continue Without Webcam”  
* Privacy note: “Raw webcam video/images will not be stored.”

**Purpose:**  
 To introduce the system clearly and reduce user concern about webcam usage before starting the timer.

### **Screen 2: Main Timer Screen**

**Main elements:**

* Large timer display  
* Current mode indicator: Focus / Break / Paused  
* Core control buttons: Start, Pause/Resume, Reset  
* Engagement status indicator: High / Medium / Low / Unavailable  
* Gentle feedback message area  
* Current session information: Session number, focus duration, break duration

**Purpose:**  
 To support the main Pomodoro workflow with minimal distraction while keeping the user aware of timer status and adaptive feedback.

### **Screen 3: Adaptive Recommendation Screen**

**Main elements:**

* Summary of previous session  
* Engagement result: High / Medium / Low / Unavailable  
* Recommended next session duration  
* Buttons: Keep / Reset Defaults / Customize Manually  
* Short explanation of why the recommendation was made

**Purpose:**  
 To keep adaptive behavior transparent and give users control over system changes.

### **Screen 4: Post-focus Survey Screen**

**Main elements:**

* Focus level question, e.g., 1–5 scale  
* Fatigue level question, e.g., 1–5 scale  
* Optional comment field  
* Submit button  
* Skip button

**Purpose:**  
 To collect user self-report data and improve the reliability of adaptive decisions without making the survey too heavy.

### **Screen 5: Settings / Privacy Screen**

**Main elements:**

* Enable/disable webcam detection toggle  
* Focus duration adjustment  
* Break duration adjustment  
* Privacy explanation  
* Browser compatibility note

**Purpose:**  
 To provide user control, improve trust, and support fallback usage when webcam access is unavailable.

## **15\. Success Metrics**

The product will be considered successful if:

* 80% of users report that the adaptive timer intervals felt "more natural" than fixed intervals.  
* Users show a 20% increase in total "Deep Work" time compared to using a standard 25-minute fixed timer.  
* Webcam engagement classification aligns with post-focus self-report trends in at least 75% of tested sessions.

## **16\. Risks / Constraints**

### **Risks**

* **Privacy Concerns:** Users may be uncomfortable with active webcam monitoring.  
* **False Positives:** Reading a physical book next to the computer might be detected as "not focused".  
* **Camera Unavailability:** A technical failure, the webcam being reserved by another app or the user denying webcam access may lead to loss of webcam-based engagement data.  
* **Survey Refusal:** Low user participation in post-focus self-reports may reduce the system's ability to calibrate for future sessions.

### **Constraints**

* **Hardware:** Limited by the quality and field of view of the user's built-in laptop webcam.  
* **Environment:** Low-light conditions may significantly degrade webcam-based engagement detection.  
* **Development Time:** Project must be completed within the academic timeline of a single semester.  
* **App Resources:** System must be lightweight enough to run parallel to other apps like demanding browsers or document readers.  
* **Tools:** Project must be developed using open-source and version control tools like git, GitHub, Python and VSCode.

## **17\. Milestones**

| Milestone (Due date) | Description |
| ----- | ----- |
| **M1. Project Planning (04/06 \- 04/10)** | Define project concept, team roles, target users, and project scope. |
| **M2. Research & Requirement Analysis (04/06 \- 04/20)** | Analyze user problems, existing solutions, functional requirements, and non-functional requirements. |
| **M3. UX Design (04/20 \- 05/10)** | Create persona, user journey map, user flow, and information architecture. |
| **M4. UI Wireframe & Prototype (05/10 \- 05/18)** | Design main screens such as onboarding, timer dashboard, survey, recommendation, and settings. |
| **M5. Core Pomodoro Implementation (05/18 \- 06/01)** | Implement timer controls, focus/break transition, session management, and alerts. |
| **M6. Engagement Detection & Adaptive Logic (05/18 \- 06/03)** | Implement webcam-based engagement detection, adaptive timer rules, and fallback behavior. |
| **M7. Testing & Refinement (06/03 \- 06/11)** | Test core functions, webcam cases, survey flow, adaptive recommendations, and fix bugs. |
| **M8. Final Documentation & Presentation (06/12)** | Complete README, Git management, demo video, final slides, and presentation preparation. |
