# SOP-03: Gemini + OpenAI Integration

## 1. Purpose
To standardize how Gemini and OpenAI models are used across the KniSoci ecosystem, ensuring each AI is leveraged for its core strengths.

## 2. Scope
This SOP applies to all AI-driven modules in both KniSoci (production) and Candyland (sandbox) environments.

## 3. Core Principles (The "Dual Brain" Model)
- **Gemini (The Strategist):** Used for tasks requiring reasoning, structure, planning, and strategic insight. This includes brand strategy formulation, documentation, and evaluating experimental results.
- **OpenAI (The Creator):** Used for tasks requiring creative generation, rapid ideation, and copywriting. This includes generating slogans, ad copy, and diverse content variations.

## 4. Implementation
1.  **Candyland (Experimentation):**
    - Gemini and OpenAI are used interchangeably to test different approaches to a problem.
    - The goal is to compare their outputs for quality, tone, and strategic fit.
    - Results are logged with clear attribution to the model that generated them.
2.  **KniSoci (Production):**
    - Workflows are more structured.
    - A task is first routed to Gemini for strategic definition (e.g., "Define the key message for this campaign").
    - The strategic output from Gemini is then used as a prompt for OpenAI to generate the creative copy (e.g., "Write three versions of an Instagram post based on this key message").

## 5. Validation Checklist
- [ ] New features specify which AI model is responsible for which part of the workflow.
- [ ] Candyland experiments clearly document which AI produced which output.
- [ ] KniSoci modules use Gemini for strategy and OpenAI for creative execution.

## 6. Responsible Parties
- **Owner:** You (Tandy) / AI Systems Lead
- **Collaborators:** All Developers

## 7. Related Scripts/Files
- `aiClient.js` (or equivalent AI interaction library)
- `refresh-ai.sh`
