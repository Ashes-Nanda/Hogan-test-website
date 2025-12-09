import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { HoganResultData } from "@/types/tests/hogan/results";
import {
    HoganReportContentSchema,
    HoganReportContent,
    Part1_CoreSchema,
    Part2_AnalysisSchema,
    Part3_ApplicationSchema
} from "./report-schema";
import { HOGAN_SYSTEM_PROMPT } from "./hogan-prompt";

// Initialize OpenAI client
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
});

export async function generateHoganReportAI(
    resultData: HoganResultData,
    onProgress?: (partial: Partial<HoganReportContent>) => void
): Promise<HoganReportContent | null> {
    if (!apiKey) {
        console.error("OpenAI API Key is missing. Check .env VITE_OPENAI_API_KEY");
        throw new Error("Missing OpenAI API Key");
    }

    try {
        console.log("🚀 [Hogan Generator] Starting Parallel OpenAI Report Generation...");
        const startTime = Date.now();

        const userContext = `Here is the user's Hogan Assessment Data:
          Name: ${resultData.firstname}
          Hogan Profile Type: ${resultData.hoganProfile}
          HPI Scores: ${JSON.stringify(resultData.hpiScores)}
          HDS Scores: ${JSON.stringify(resultData.hdsScores)}
          MVPI Scores: ${JSON.stringify(resultData.mvpiScores)}
          HBRI Scores: ${JSON.stringify(resultData.hbriScores)}`;

        // 1. EXECUTE SEQUENTIALLY to avoid Browser/CORS/Rate-Limit issues
        let currentReport: Partial<HoganReportContent> = {};

        // --- PART 1: CORE ---
        console.log("⏳ Fetching Part 1 (Core)...");
        const part1 = await openai.chat.completions.create({
            model: "gpt-4o-2024-08-06",
            messages: [
                { role: "system", content: HOGAN_SYSTEM_PROMPT },
                { role: "user", content: `${userContext}\n\nTASK: Generate PART 1 - Core Identity & Trait Summary.` }
            ],
            response_format: zodResponseFormat(Part1_CoreSchema, "part1_core"),
        }).then(res => {
            console.log(`✅ Part 1 finished in ${(Date.now() - startTime) / 1000}s`);
            const data = JSON.parse(res.choices[0].message.content || "{}");
            // EMIT PROGRESS
            currentReport = { ...currentReport, ...data };
            if (onProgress) onProgress(currentReport);
            return data;
        });

        // --- PART 2: ANALYSIS ---
        console.log("⏳ Fetching Part 2 (Analysis)...");
        const part2 = await openai.chat.completions.create({
            model: "gpt-4o-2024-08-06",
            messages: [
                { role: "system", content: HOGAN_SYSTEM_PROMPT },
                { role: "user", content: `${userContext}\n\nTASK: Generate PART 2 - Deep Analysis (HPI, HDS, MVPI, HBRI). Focus on detailed interpretations.` }
            ],
            response_format: zodResponseFormat(Part2_AnalysisSchema, "part2_analysis"),
        }).then(res => {
            console.log(`✅ Part 2 finished in ${(Date.now() - startTime) / 1000}s`);
            const data = JSON.parse(res.choices[0].message.content || "{}");
            // EMIT PROGRESS
            currentReport = { ...currentReport, ...data };
            if (onProgress) onProgress(currentReport);
            return data;
        });

        // --- PART 3: APPLICATION ---
        console.log("⏳ Fetching Part 3 (Application)...");
        const part3 = await openai.chat.completions.create({
            model: "gpt-4o-2024-08-06",
            messages: [
                { role: "system", content: HOGAN_SYSTEM_PROMPT },
                { role: "user", content: `${userContext}\n\nTASK: Generate PART 3 - Application (Career, Relationships, Growth, Action Plan).` }
            ],
            response_format: zodResponseFormat(Part3_ApplicationSchema, "part3_application"),
        }).then(res => {
            console.log(`✅ Part 3 finished in ${(Date.now() - startTime) / 1000}s`);
            const data = JSON.parse(res.choices[0].message.content || "{}");
            // EMIT PROGRESS
            currentReport = { ...currentReport, ...data };
            if (onProgress) onProgress(currentReport);
            return data;
        });

        // 3. Final Return
        console.log(`🎉 [Hogan Generator] Full Report Generated in ${(Date.now() - startTime) / 1000}s!`);
        return currentReport as HoganReportContent;

    } catch (error) {
        console.error("❌ [Hogan Generator] Error generating AI report:", error);
        throw error;
    }
}
