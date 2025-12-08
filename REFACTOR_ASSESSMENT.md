# Refactor Assessment Report

## Executive Summary
This assessment focuses on identifying refactoring targets to improve code maintainability, AI-accessibility, and system robustness. The codebase handles the Hogan Assessment Platform.

Key Findings:
1.  **Dead Code Detected**: Redundant calculation logic exists, confusing the source of truth for scoring.
2.  **Large Data Coupling**: Configuration files (`constants.ts`) are bloated with static data, exceeding recommended file sizes.
3.  **Duplication**: Business logic for scoring is duplicated between `calculateHogan.ts` and `utils/scoring.ts`.

## 1. Dead Code Removal (High Priority)
**Target**: `calculateHogan.ts`
-   **Current State**: Contains scoring logic for HPI, HDS, MVPI.
-   **Problem**: This file appears to be unused. `TestRunner.tsx` relies on `utils/scoring.ts`. The existence of `calculateHogan.ts` creates ambiguity about which scoring logic is active.
-   **Recommendation**: **Delete** `calculateHogan.ts`.
-   **Risk**: Low. (Verified no usages in `.tsx` files; `.ts` reference is only a comment).
-   **Reward**: Eliminates "zombie code"; prevents future bugs where developers modify the wrong scoring file.

## 2. Data Decoupling & File Size Optimization (High Priority)
**Target**: `constants.ts`
-   **Current State**: ~819 lines. Mostly occupied by `MOCK_QUESTIONS` (100+ items).
-   **Constraint Violation**: Exceeds 600-line threshold for AI context optimization.
-   **Problem**: Mixing configuration (`VISUAL_TO_LOGICAL_MAP`) with large static data arrays makes the file hard to read and modify.
-   **Refactor Strategy**:
    1.  Create directory `data/questions/`.
    2.  Split questions by type to ensure files remain < 600 lines:
        -   `data/questions/hpi.ts`
        -   `data/questions/hds.ts`
        -   `data/questions/mvpi.ts`
        -   `data/questions/hbri.ts`
    3.  Export a combined `questions` array from `data/questions/index.ts`.
-   **Risk**: Low. Requires updating imports in `TestRunner.tsx` and `types.ts`.
-   **Reward**: Drastically smaller files; easier to manage specific test sections; improved AI analysis of questions.

## 3. Logic Centralization (Medium Priority)
**Target**: `utils/scoring.ts`
-   **Current State**: Contains scoring logic partially adapted from `calculateHogan.ts`.
-   **Problem**: Redundant "percentage calculation" loops.
-   **Refactor**: Extract `calculateDimensionPercentage` helper function to handle the repeated math pattern: `(score / total) * 100`.
-   **Risk**: Medium. Requires testing to ensure scoring accuracy remains identical.
-   **Reward**: clean, DRY (Don't Repeat Yourself) code; easier to change scoring formulas globally.

## 4. Admin Logic Separation (Low Priority)
**Target**: `components/AdminDashboard.tsx`
-   **Current State**: mixed concerns (Auth, Data Fetching, CSV Export).
-   **Refactor**:
    -   Move `downloadCSV` logic to `utils/exportUtils.ts`.
    -   Move `fetchUsers`/`fetchStats` to `services/adminService.ts`.
-   **Risk**: Low.
-   **Reward**: Component focused purely on UI; reusable export logic.

## Risk/Reward Analysis Summary

| Target | Refactor Type | Complexity | Risk | Reward | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `calculateHogan.ts` | Delete | Low | Low | High | **1** |
| `constants.ts` | Extract Data | Low | Low | High | **2** |
| `utils/scoring.ts` | DRY Logic | Medium | Medium | Medium | **3** |
| `AdminDashboard.tsx` | Separation | Medium | Low | Low | **4** |

## Implementation Plan
1.  **Delete** `calculateHogan.ts`.
2.  **Create** `data/questions/` folder structure.
3.  **Move** question data from `constants.ts` to new files.
4.  **Update** imports in `TestRunner.tsx` and `utils/scoring.ts`.
5.  **Audit** `utils/scoring.ts` for clean-up opportunities.
