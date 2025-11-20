# SOP-05: Experiment Pipeline (Candyland → KniSoci)

## 1. Purpose
To define the official process for creating, logging, reviewing, and promoting creative experiments from the Candyland sandbox to the KniSoci production environment.

## 2. Scope
This SOP governs the entire lifecycle of an idea, from inception in Candyland to standardization in KniSoci.

## 3. Steps
1.  **Propose Experiment (Candyland):**
    - Define the experiment's objective, method, and success criteria.
    - The Candyland AI proposes the experiment and awaits approval.
2.  **Run Experiment (Candyland):**
    - The Candyland AI executes the experiment, using Gemini and/or OpenAI.
    - All outputs are generated and clearly labeled as `[experimental]`.
3.  **Log Results (Candyland → Supabase):**
    - The AI formats the results into a structured JSON object containing: `experiment_id`, `prompt`, `gemini_output`, `openai_output`, `tags`, and `summary_insights`.
    - This payload is sent to a dedicated Supabase table for logging.
4.  **Prepare Handoff (Candyland):**
    - The Candyland AI prepares a concise summary of the most promising results, ready for review.
    - This summary is sent to KniSoci via a handoff mechanism (e.g., an API endpoint like `/api/experiments/publish`).
5.  **Review & Standardize (KniSoci):**
    - The KniSoci AI receives the summary.
    - It evaluates the experiment against current brand strategy and governance rules.
    - If viable, the KniSoci AI refines the concept, documents it, and integrates it into the production brand model.

## 4. Validation Checklist
- [ ] Experiment is approved before running.
- [ ] Results are successfully logged to Supabase.
- [ ] Handoff summary is successfully sent to KniSoci.
- [ ] KniSoci provides feedback or an integration plan for the experiment.

## 5. Responsible Parties
- **Owner:** You (Tandy) / Brand Strategist
- **Collaborators:** KniSoci AI, Candyland AI

## 6. Related Scripts/Files
- `/api/experiments/publish` (future endpoint)
- Supabase database schema
