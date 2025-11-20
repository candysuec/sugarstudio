import { supabase } from '@sugarstudio/utils';
import { JobType } from "../types/jobTypes";
import { mockAIProvider } from "../services/mockAIProvider"; // Import mock AI provider
import { geminiProvider } from "../services/geminiProvider"; // Import geminiProvider
import { GeminiModel, getDefaultGeminiModel } from '@sugarstudio/utils';

// Sleep helper function
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function startAIJobWorker() {
  console.log("AI Job Worker started. Polling for pending jobs...");

  while (true) {
    try {
      // Fetch the oldest pending job
      const { data: jobs, error } = await supabase
        .from("ai_jobs")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: true })
        .limit(1);

      if (error) {
        console.error("Supabase fetch error:", error.message);
        await sleep(2000); // Sleep longer on error
        continue;
      }

      if (jobs && jobs.length > 0) {
        const job = jobs[0];
        console.log(`Processing job ${job.id} of type: ${job.job_type}`);

        let handlerOutput: any = null;
        let jobStatus: "completed" | "failed" = "completed";
        let errorMessage: string | null = null;

        try {
          switch (job.job_type as JobType) {
            case "CREATE_PROCESS_FROM_TEXT":
              const rawText = job.payload?.rawText; // Assuming payload has rawText
              if (!rawText) {
                throw new Error("Payload missing rawText for CREATE_PROCESS_FROM_TEXT");
              }

              let generatedSOP: any;
              if (process.env.AI_MOCK_MODE === 'true') {
                console.log(`[MOCK MODE] Using Mock AI Provider for job ${job.id}`);
                generatedSOP = await mockAIProvider.generateSOP(rawText);
              } else {
                console.log(`[REAL AI MODE] Using real Gemini API for job ${job.id}`);
                generatedSOP = await geminiProvider.generateSOP(rawText, getDefaultGeminiModel());
              }

              handlerOutput = generatedSOP;
              console.log(
                `Handler for CREATE_PROCESS_FROM_TEXT job ${job.id} executed.`
              );
              break;
            case "GENERATE_IMAGE_DESCRIPTION":
              const promptText = job.payload?.promptText;
              const base64Image = job.payload?.base64Image;
              if (!promptText || !base64Image) {
                throw new Error("Payload missing promptText or base64Image for GENERATE_IMAGE_DESCRIPTION");
              }

              let generatedDescription: any;
              if (process.env.AI_MOCK_MODE === 'true') {
                console.log(`[MOCK MODE] Using Mock AI Provider for job ${job.id}`);
                generatedDescription = `Mock description for image with prompt: ${promptText}`;
              } else {
                console.log(`[REAL AI MODE] Using real Gemini API for job ${job.id}`);
                generatedDescription = await geminiProvider.generateImageDescription(promptText, base64Image);
              }

              handlerOutput = generatedDescription;
              console.log(
                `Handler for GENERATE_IMAGE_DESCRIPTION job ${job.id} executed.`
              );
              break;
            // Add other job types here as they are implemented
            case "UPDATE_PROCESS_FROM_CHANGE_REQUEST":
            case "ANSWER_PROCESS_QUESTION":
              console.warn(
                `No handler implemented for job type: ${job.job_type} (job ID: ${job.id})`
              );
              jobStatus = "failed";
              errorMessage = `No handler implemented for job type: ${job.job_type}`;
              break;
            default:
              console.warn(
                `Unknown job type: ${job.job_type} (job ID: ${job.id})`
              );
              jobStatus = "failed";
              errorMessage = `Unknown job type: ${job.job_type}`;
              break;
          }
        } catch (handlerError: any) {
          console.error(
            `Error executing handler for job ${job.id} (${job.job_type}):`,
            handlerError.message
          );
          jobStatus = "failed";
          if (handlerError.message.includes("Content blocked by safety filters")) {
            errorMessage = `Job failed: Content blocked by Gemini safety filters. Reason: ${handlerError.message}`;
          } else {
            errorMessage = handlerError.message;
          }
          handlerOutput = { error: handlerError.message, stack: handlerError.stack };
        }

        // Insert result into ai_job_results
        const { error: insertError } = await supabase.from("ai_job_results").insert({
          job_id: job.id,
          status: jobStatus,
          result: handlerOutput,
          error_message: errorMessage,
        });

        if (insertError) {
          console.error(
            `Error inserting job result for job ${job.id}:`,
            insertError.message
          );
          // Attempt to update ai_jobs status even if result insertion failed
        }

        // Update ai_jobs status
        const { error: updateError } = await supabase
          .from("ai_jobs")
          .update({ status: jobStatus })
          .eq("id", job.id);

        if (updateError) {
          console.error(
            `Error updating job status for job ${job.id}:`,
            updateError.message
          );
        }

        console.log(
          `Job ${job.id} (${job.job_type}) finished with status: ${jobStatus}`
        );
      } else {
        // No pending jobs, sleep for a short period
        await sleep(1000);
      }
    } catch (globalError: any) {
      console.error("Global AI Job Worker error:", globalError.message);
      await sleep(2000); // Sleep longer on unexpected errors
    }
  }
}
