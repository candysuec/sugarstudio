# SOP-04: AI Refresh & Deployment

## 1. Purpose
To provide a guaranteed, repeatable process for starting the development environment and ensuring AI agents are synchronized with their latest context.

## 2. Scope
This SOP applies to all local development sessions for KniSoci and Candyland.

## 3. Command Flow
1.  **Start Environment:** From the appropriate project directory, run the main development script. This script should start the Next.js server and any other required services.
    ```bash
    ./run-dev.sh
    ```
2.  **Refresh AI Contexts:** Run the AI refresh script to update both Gemini and OpenAI with their latest system prompts.
    ```bash
    ./refresh-ai.sh
    ```
    *(Note: This step can be integrated into `run-dev.sh` for full automation).*
3.  **Test Connectivity:** Verify that both the application and the AI endpoints are responsive.
    - **App:** Open `http://localhost:3002` (KniSoci) or `http://localhost:3005` (Candyland) in a browser.
    - **AI:** Send a test request to the Gemini test API route.
    ```bash
    curl http://localhost:3002/api/gemini-test?message=Hello
    curl http://localhost:3005/api/gemini-test?message=Hello
    ```

## 4. Validation Checklist
- [ ] `run-dev.sh` executes without errors.
- [ ] `refresh-ai.sh` completes and prints acknowledgment messages from both AIs.
- [ ] Local web server is running and accessible.
- [ ] The `curl` command to the test API returns a valid response from the AI.

## 5. Responsible Parties
- **Owner:** You (Tandy) / Any Developer
- **Collaborators:** N/A

## 6. Related Scripts/Files
- `run-dev.sh`
- `refresh-ai.sh`
