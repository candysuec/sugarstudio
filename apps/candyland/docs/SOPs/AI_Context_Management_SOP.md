# SOP-01: AI Context Management

## 1. Purpose
To ensure the system prompts for KniSoci and Candyland AIs are kept consistent, up-to-date, and properly versioned. This process guarantees that AI agents always operate with the latest mission-critical context.

## 2. Scope
This SOP applies to the `system_prompt_knisoci.txt` and `system_prompt_candyland.txt` files located in the `ai/context/` directory of their respective projects.

## 3. Steps
1.  **Identify Need for Update:** An update is required when an AI's core mission, capabilities, or operational parameters change.
2.  **Modify Prompt File:** Edit the relevant `system_prompt_*.txt` file directly. Ensure the language is clear, concise, and directly actionable by the AI.
3.  **Version Control:** Commit the changes to the Git repository.
    ```bash
    # Navigate to the correct project directory
    git add ai/context/system_prompt_*.txt
    git commit -m "Update system prompt for [KniSoci/Candyland]: [brief reason for change]"
    git push
    ```
4.  **Synchronize AIs:** Run the refresh script to make the AIs pull the new context.
    ```bash
    ./refresh-ai.sh
    ```

## 4. Validation Checklist
- [ ] The `git commit` message clearly states the nature of the context update.
- [ ] The `refresh-ai.sh` script completes without errors for the updated project.
- [ ] A test query is sent to the updated AI to confirm it acknowledges the new context in its response.

## 5. Responsible Parties
- **Owner:** You (Tandy) / AI Systems Lead
- **Collaborators:** Any developer working on AI behavior.

## 6. Related Scripts/Files
- `ai/context/system_prompt_knisoci.txt`
- `ai/context/system_prompt_candyland.txt`
- `refresh-ai.sh`
