# Deploy Skill

Run the full deployment pipeline: lint check (no test runner is configured for this project), production build, then push to staging.

## Steps

Execute each step in order. Stop and report if any step fails — do not continue to the next step.

### 1. Run lint (acts as the test gate since no test runner is configured)

```bash
npm run lint
```

If lint fails, report the errors and abort. Do not proceed to build.

### 2. Build the production bundle

```bash
npm run build
```

If the build fails, report the output and abort. Do not push to staging.

### 3. Push to staging

```bash
git push staging main
```

If there is no `staging` remote configured, report the available remotes with `git remote -v` and ask the user how they would like to deploy (e.g. configure a staging remote, use a different remote/branch, or run a custom deploy script).

## Reporting

After each step succeeds, print a one-line confirmation. When all three steps complete, summarise:
- Lint: passed
- Build: passed (output size from `dist/`)
- Staging: pushed (commit SHA)
