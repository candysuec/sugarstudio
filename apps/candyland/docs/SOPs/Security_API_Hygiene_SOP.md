# SOP-08: Security & API Hygiene

## 1. Purpose
To establish strict procedures for managing, rotating, and auditing all secrets, API keys, and credentials used in the KniSoci ecosystem.

## 2. Scope
This SOP applies to all secrets, including but not limited to: `GEMINI_API_KEY`, `OPENAI_API_KEY`, `DATABASE_URL`, `NEXTAUTH_SECRET`, and `SUPABASE_KEY`.

## 3. Procedures
1.  **Secure Storage:**
    - **NEVER** hardcode secrets in the source code.
    - **NEVER** commit `.env.local` or any file containing secrets to Git.
    - Use `.env.local` for local development and Vercel's Environment Variables settings for production.
2.  **Key Rotation:**
    - All keys must be rotated on a fixed schedule (e.g., every 90 days).
    - All keys must be rotated immediately if a leak is suspected or a collaborator leaves the project.
    - The rotation process involves generating a new key, updating it in Vercel and local `.env` files, and revoking the old key.
3.  **Access Control:**
    - Grant access to production keys on a need-to-know basis only.
    - Use service accounts with the minimum required permissions where possible.
4.  **Auditing:**
    - Regularly review who has access to production secrets.
    - Periodically check API usage dashboards (Google Cloud, OpenAI, Vercel) for anomalous activity.

## 4. Validation Checklist
- [ ] `.gitignore` correctly excludes `.env.local`.
- [ ] Production secrets are stored in Vercel, not in the repository.
- [ ] A calendar reminder is set for the quarterly key rotation.
- [ ] API usage logs are reviewed monthly.

## 5. Responsible Parties
- **Owner:** You (Tandy) / Security Admin
- **Collaborators:** Dev Ops

## 6. Related Scripts/Files
- `.env.local`
- `.env.local.example`
- Vercel Dashboard
