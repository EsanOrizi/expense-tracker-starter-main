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

This is a single-page React app (Vite + React 19) split across four components in `src/`:

| File | Responsibility |
|---|---|
| `App.jsx` | Root component. Owns `transactions` state and passes it down. |
| `Summary.jsx` | Receives `transactions`, computes and displays `totalIncome`, `totalExpenses`, and `balance`. |
| `TransactionForm.jsx` | Owns its own form state (`description`, `amount`, `type`, `category`). Calls `onAdd` prop with the new transaction object on submit. |
| `TransactionList.jsx` | Receives `transactions`. Owns filter state (`filterType`, `filterCategory`) and applies filtering locally before rendering the table. |

**State ownership:**
- `transactions` — lives in `App`, array of `{ id, description, amount, type, category, date }`. `amount` is a number.
- Form state — lives in `TransactionForm`.
- Filter state — lives in `TransactionList`.

**Data flow**: `App` passes `transactions` to `Summary` and `TransactionList`. `TransactionForm` receives an `onAdd` callback; `App` appends the new transaction to its state when called. No persistence — state resets on page reload.

**Known intentional issues** (introduced for the course):
- "Freelance Work" in the seed data is typed as `"expense"` but categorized under `"salary"`.
- UI and styling are intentionally rough.
