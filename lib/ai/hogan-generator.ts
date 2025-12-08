import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { HoganResultData } from "@/types/tests/hogan/results";
import { HoganReportContentSchema, HoganReportContent } from "./report-schema";
import { HOGAN_SYSTEM_PROMPT, VERSION_B_TEMPLATE_INSTRUCTIONS } from "./hogan-prompt";

// Initialize OpenAI client
// Note: In a real production app, we should use a backend proxy. 
// For this standalone/demo version, we use the client-side key with danger flag if needed, 
// or rely on VITE_ prefix variables being available.
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // Explicitly allowing client-side call for this specific use case
});

export async function generateHoganReportAI(resultData: HoganResultData): Promise<HoganReportContent | null> {
    if (!apiKey) {
        console.error("OpenAI API Key is missing. Check .env VITE_OPENAI_API_KEY");
        return null;
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-2024-08-06",
            messages: [
                { role: "system", content: HOGAN_SYSTEM_PROMPT + "\n" + VERSION_B_TEMPLATE_INSTRUCTIONS },
                {
                    role: "user",
                    content: `Here is the user's Hogan Assessment Data:
          
          Name: ${resultData.firstname}
          Hogan Profile Type: ${resultData.hoganProfile}
          
          HPI Scores (Personality): ${JSON.stringify(resultData.hpiScores)}
          HDS Scores (Risks): ${JSON.stringify(resultData.hdsScores)}
          MVPI Scores (Values): ${JSON.stringify(resultData.mvpiScores)}
          HBRI Scores (Reasoning): ${JSON.stringify(resultData.hbriScores)}
          
          Generate the full Personal Report content.`
                },
            ],
            response_format: zodResponseFormat(HoganReportContentSchema, "hogan_report"),
        });

        const content = completion.choices[0].message.content;
        if (!content) return null;

        const report = JSON.parse(content);
        return report;

    } catch (error) {
        console.error("Error generating AI report:", error);

        // Fallback to mock data on error (e.g. Rate Limit / 429)
        console.warn("Falling back to MOCK DATA due to API error.");
        const { MOCK_HOGAN_REPORT } = await import("./mock-hogan-report");
        return MOCK_HOGAN_REPORT;
    }
}
