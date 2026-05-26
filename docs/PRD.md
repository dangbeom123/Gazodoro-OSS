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
* To improve usability and engagement by aligning work and break intervals with users’ real-time engagement patterns  
* To provide adaptive support and personalized feedback based on user engagement and post-session self-report

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

* A timer that detects when he is actually focused and **extends the session slightly** and stop at the **on-the-edge of decreasing** .  
* Automated break reminders that don't require him to stop and click buttons constantly.

**Scenario:**  
Lam is reading a **20-page research paper** for his thesis. Lam is having an overview of this topic for his graduation thesis, he used NotebookLM to summerize all related papers and he noticed one paper should be read carefully for his research paper/thesis. 

He starts the adaptive Pomodoro timer. After 25 minutes, the system detects his gaze is still steady on the screen (high engagement) and silently extends the session by 10 minutes to preserve his flow. When he begins to fidget or look away frequently, the app triggers a "refresher break."

**8\. User Journey Map**

| Stage | User Action | User Thought / Feeling | Pain Point | Opportunity |
| ----- | ----- | ----- | ----- | ----- |
| Preparation | Opens reading material and starts the timer | "I hope I can finish this chapter without getting distracted." | Anxiety about the volume of work. | Simple, clean UI to reduce initial cognitive load.  |
| Deep Work | Reads intensely until the timer reaches 25 mins.  | "I'm finally in the zone. I don't want to stop now." | A fixed timers would force a break, breaking the "flow." | System detects user is focused and keeps the timer running. |
| Fatigue | Starts rereading the same paragraph; eyes wandering.  | "I'm getting tired, but I should push through a bit more."  | User fails to recognize their own fatigue. | System detects unfocused user (low gaze stability) and triggers a break session. |
| Break / Prompt | Completes a short survey on fatigue and focus levels after a study block | "I didn't realize how tired my eyes were until the app asked me." | Users often ignore gradual fatigue until it significantly impacts their work quality.  | Use the self-report to calibrate future session lengths, preventing overexertion.  |

## **9\. Scope**

### **In Scope**

* Core Pomodoro timer (start, pause/resume, reset, break transition, session management)  
* Adaptive timer adjustment based on user engagement signals and post-session feedback  
* Basic webcam-based engagement detection (e.g., screen presence, gaze stability)  
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
The system dynamically adjusts focus and break durations based on estimated user engagement and post-session feedback.

**Purpose:**  
To address the mismatch between fixed Pomodoro intervals and users’ actual attention and fatigue levels, helping maintain reading flow and reduce ineffective work periods.

**Priority:**  
High

### **Feature 2: Webcam-based Engagement Detection**

**Description:**  
The system uses webcam input to detect basic engagement signals such as screen presence and gaze stability, providing real-time estimation of user engagement.

**Purpose:**  
To provide contextual input for adaptive behavior, allowing the system to respond to changes in user attention without requiring manual input.

**Priority:**  
High

**Should have thought about the privacy** 

### **Feature 3: Post-session Feedback (Self-report Survey)**

**Description:**  
After each session, users provide simple feedback on their focus level and fatigue.

| Question Topic | Question | Purpose |
| :---- | :---- | :---- |
| Focus Depth | “How focused were you during this session?” | Cross-check against gaze stability information gathered from webcam analysis.  |
| Fatigue | “How tired do you feel right now?” | Information about user fatigue that is tough to determine through webcam alone. |
| Rest & Relaxation | “How long a break do you need right now?” | Helps system adjust break time to avoid user overextension. |

(Maybe the third question is redundant, we can get similar information about the user from the second question)

User can answer questions in a scale **from 1 to 5**. If the user doesn’t answer the questions **within 1 minute** (or 30 seconds?) the break begins automatically without user feedback.

Suggestion:

Scoring question (from 1 \>10 I guess) (maybe change the scale to be from 1 to 5? A scale with lower accuracy and less options will create less of a cognitive load to first-time users especially)

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
| FR-04 | The system shall collect basic engagement signals using the user’s webcam (e.g., screen presence, gaze stability). | High |
| FR-05 | The system shall adjust the duration of focus or break sessions based on user engagement and post-session feedback. | High |
| FR-06 | The system shall prompt users to complete a short survey after each session (e.g., focus level, fatigue level). | Medium |
| FR-07 | The system shall provide simple feedback or suggestions (e.g., break recommendation) based on detected engagement. | Medium |
| FR-08 | The system shall allow users to manually override or ignore adaptive changes. | Low |
| FR-09 | The system shall continue to function even when webcam input is unavailable. | Low |

# **12\. Non-Functional Requirements**

| ID | Requirement | Category |
| ----- | ----- | ----- |
| **NFR-01** | The system shall provide a clear and minimal interface so users can understand the timer status, session mode, and adaptive feedback without confusion. | Usability |
| **NFR-02** | The system shall process at least **5 webcam frames per second** to support basic real-time engagement estimation. | Performance |
| **NFR-03** | The system shall update the user engagement status at least once every **5 seconds** to support timely adaptive feedback. | Performance |
| **NFR-04** | The system shall request explicit user permission before accessing the webcam. | Security / Privacy |
| **NFR-05** | The system shall continue to function even if the webcam is unavailable, using only timer controls and post-session survey data. | Compatibility |
| **NFR-06** | The system shall allow users to disable webcam-based engagement detection at any time. | Privacy / Usability |
| **NFR-07** | The system shall provide clear feedback when webcam access is denied, unavailable, or not working properly. | Reliability |
| **NFR-08** | The system shall work on modern desktop browsers such as Chrome, Edge, or Firefox. | Compatibility |
| **NFR-09** | The system shall avoid storing raw webcam video or images to protect user privacy. | Security / Privacy |
| **NFR-10** | The system shall maintain stable timer operation even if engagement detection fails or becomes inaccurate. | Reliability |

# **13\. Use Cases / User Flow**

## **Main Use Case**

**Actor:**  
 User

**Goal:**  
 The user wants to complete a long, deep reading session on a computer while receiving adaptive Pomodoro support based on engagement and post-session feedback.

## **Main Flow**

1. **The user opens the web application.**  
    The system displays the Pomodoro timer interface and explains that webcam-based engagement detection is optional.  
2. **The user grants webcam permission or chooses to continue without webcam access.**  
    The system starts preparing the session settings and shows the current mode as “Focus Session with default 25 minutes session.”  
3. **The user starts a focus session.**  
    The system begins the countdown timer and displays the remaining focus time clearly.  
4. **The user performs a deep reading task on the computer.**  
    The system monitors basic engagement signals, such as screen presence and gaze stability, if webcam access is available.  
5. **The system estimates the user’s engagement during the session.**  
    If engagement is high, the system extends the user’s focus session. If engagement is medium to high, system transitions to a break when focus session time is over and keeps break and focus session time stable. If engagement is medium to low, system will increase next break time and decrease next study time. If engagement is low the system will suggest an early break.  
6. **The focus session ends when the timer reaches the planned duration or when the system recommends an early break and the user accepts it.**   
    The system shows an alert and automatically transitions to a break session.  
7. **The user completes the break session.**  
    The system ends the session cycle and asks the user to complete a short post-session survey, users have the option to skip it.  
8. **The user submits feedback about focus and fatigue.**  
    The system uses the survey response together with engagement signals to adjust the next Pomodoro session.  
9. **The system prepares the next session with adaptive settings.**  
    The user can accept the adaptive recommendation or manually override it.  
10.  WILL add some later \!\!\!

    ## **Alternative / Exception Flow**

| Condition | System Response |
| ----- | ----- |
| **If the user denies webcam permission** | The system continues with normal Pomodoro functions and uses only post-session survey data for adaptation. |
| **If webcam input becomes unavailable during a session** | The system displays a short notice and keeps the timer running normally. |
| **If engagement appears low for a certain period** | The system shows a gentle suggestion, such as “You may need a short break” or “Try to refocus on your reading.” depend on the users data. |
| **If the user disagrees with the adaptive recommendation** | The system allows the user to manually keep, shorten, or extend the next session. |
| **If the user pauses the timer** | The system pauses both the countdown and engagement monitoring until the user resumes. |
| **If the user resets or stops the session** | The system ends the current session and returns to the initial timer state. |
| **If the user skips the post-session survey** | The system uses only available engagement data. |

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
* Provides core controls: Start, Pause/Resume, Reset, Stop  
* Shows a simple engagement status indicator when webcam detection is enabled

  ### **3\. Adaptive Feedback / Recommendation**

* Displays gentle suggestions based on engagement patterns  
* Shows recommended changes for the next session duration  
* Allows users to accept or manually override adaptive recommendations

  ### **4\. Post-session Survey**

* Collects simple self-report data after each session  
* Includes focus level and fatigue level questions  
* Allows users to skip the survey if they do not want to answer

  ### **5\. Settings / Privacy Control**

* Allows users to enable or disable webcam-based engagement detection  
* Explains that raw webcam images or videos are not stored  
* Allows users to adjust default focus and break durations

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
* Core control buttons: Start, Pause/Resume, Reset, Stop  
* Engagement status indicator: Stable / Low / Unavailable  
* Gentle feedback message area  
* Current session information: Session number, focus duration, break duration

**Purpose:**  
 To support the main Pomodoro workflow with minimal distraction while keeping the user aware of timer status and adaptive feedback.

### **Screen 3: Adaptive Recommendation Screen**

**Main elements:**

* Summary of previous session  
* Engagement result: Stable / Unstable / Not available  
* Recommended next session duration  
* Buttons: Accept Recommendation / Keep Default / Customize Manually  
* Short explanation of why the recommendation was made

**Purpose:**  
 To keep adaptive behavior transparent and give users control over system changes.

### **Screen 4: Post-session Survey Screen**

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
* Default focus duration setting  
* Default break duration setting  
* Privacy explanation  
* Browser compatibility note

**Purpose:**  
 To provide user control, improve trust, and support fallback usage when webcam access is unavailable.

## **15\. Success Metrics**

The product will be considered successful if:

* 80% of users report that the adaptive timer intervals felt "more natural" than fixed intervals.  
* Users show a 20% increase in total "Deep Work" time compared to using a standard 25-minute fixed timer.  
* System detects user fatigue through webcam accurately 75% of the time (cross-check with post-session survey)

## **16\. Risks / Constraints**

### **Risks**

* **Privacy Concerns:** Users may be uncomfortable with active webcam monitoring.  
* **False Positives:** Reading a physical book next to the computer might be detected as "not focused".  
* **Camera Unavailability:** A technical failure, the webcam being reserved by another app or the user denying webcam access may lead to loss of real-time fatigue level data.  
* **Survey Refusal:** Low user participation in post-session self-reports, may reduce the system's ability to calibrate for future sessions.

### **Constraints**

* **Hardware:** Limited by the quality and field of view of the user's built-in laptop webcam.  
* **Environment:** Low-light conditions may significantly degrade gaze stability detection.  
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

