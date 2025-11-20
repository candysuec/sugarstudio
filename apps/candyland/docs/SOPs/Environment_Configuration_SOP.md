# SOP-02: Environment Configuration

## 1. Purpose
To define the standard procedure for setting up, maintaining, and securing all environment variables for both KniSoci and Candyland projects.

## 2. Scope
This SOP covers all variables stored in `.env.local` files and configured in Vercel for deployment.

## 3. Steps
1.  **Initial Setup:**
    - Copy `.env.local.example` to a new file named `.env.local`.
    - Populate `.env.local` with the correct, up-to-date credentials and endpoints. **NEVER** commit this file to Git.
2.  **Key Rotation:**
    - All API keys (Gemini, OpenAI, Supabase) and secrets must be rotated quarterly or immediately upon suspected exposure.
    - Generate new keys from the respective service provider.
    - Update the values in the local `.env.local` file and in the Vercel project's environment variable settings.
3.  **Updating Example File:**
    - If a new key is added, add the key name (without its value) to the `.env.local.example` file and commit it.

## 4. Validation Checklist
- [ ] `.env.local` exists and is populated.
- [ ] `.gitignore` contains an entry for `.env.local`.
- [ ] Vercel deployment settings match the required variables in `.env.local.example`.
- [ ] Application connects to all services (Database, AI APIs, Auth) without errors.

## 5. Key Variables Checklist
- `GEMINI_API_KEY`
- `OPENAI_API_KEY`
- `DATABASE_URL` (for KniSoci)
- `NEXTAUTH_URL`
- `SUPABASE_URL` (for Candyland)
- `SUPABASE_KEY` (for Candyland)

## 6. Responsible Parties
- **Owner:** You (Tandy) / Dev Ops
- **Collaborators:** All Developers

## 7. Related Scripts/Files
- `.env.local`
- `.env.local.example`
- `vercel.json` (or Vercel Dashboard)
