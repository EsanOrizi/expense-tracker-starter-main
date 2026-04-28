# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build
npm run preview   # preview production build
npm run lint      # run ESLint
```

No test runner is configured.

## Architecture

This is a single-page React app (Vite + React 19) with all logic in one file: `src/App.jsx`.

**State** lives entirely in `App` via `useState`:
- `transactions` — array of `{ id, description, amount, type, category, date }`. `amount` is stored as a **string** (known bug — causes string concatenation instead of numeric addition in the summary calculations).
- Form state: `description`, `amount`, `type`, `category`
- Filter state: `filterType`, `filterCategory`

**Known intentional issues** (introduced for the course):
- `amount` is never parsed to a number, so `totalIncome`, `totalExpenses`, and `balance` are computed via string concatenation.
- "Freelance Work" in the seed data is typed as `"expense"` but categorized under `"salary"`.
- UI and styling are intentionally rough.

**Data flow**: no persistence — state resets on page reload. Filtering is done by chaining `.filter()` on the `transactions` array in the render body.
