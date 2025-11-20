# SOP-07: Version Control (Git + Vercel)

## 1. Purpose
To ensure all code, configuration, and AI context changes are managed systematically, reviewed properly, and deployed safely.

## 2. Scope
This SOP applies to both the KniSoci and Candyland codebases hosted on GitHub and deployed via Vercel.

## 3. Git Workflow
1.  **Branching:**
    - All new work must be done on a feature branch. Branch names should be descriptive (e.g., `feature/add-openai-integration`, `fix/prisma-connection-error`).
    - Never commit directly to `main`.
2.  **Committing:**
    - Commits should be small, atomic, and have clear, descriptive messages following the conventional commit format (e.g., `feat: Add brand governance module`).
3.  **Pull Requests (PRs):**
    - When a feature is complete, open a PR against the `main` branch.
    - The PR description should summarize the changes and their purpose.
    - At least one other collaborator (or you, Tandy) must review and approve the PR.
4.  **Merging:**
    - Once approved and all automated checks (linting, tests) have passed, the PR can be merged into `main`.

## 4. Deployment (Vercel)
- Vercel is configured to automatically deploy the `main` branch to production.
- Every PR will generate a preview deployment for review.
- Rollbacks can be performed via the Vercel dashboard if a deployment introduces a critical issue.

## 5. Validation Checklist
- [ ] No direct commits are made to the `main` branch.
- [ ] Every PR has a clear description and has been reviewed.
- [ ] Vercel preview deployments are checked before merging.
- [ ] `main` branch deployment succeeds after merging.

## 6. Responsible Parties
- **Owner:** You (Tandy) / Dev Lead
- **Collaborators:** All Developers

## 7. Related Scripts/Files
- `.gitignore`
- `vercel.json`
