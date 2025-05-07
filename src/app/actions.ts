'use server';

import { analyzeConversation, type AnalyzeConversationInput, type AnalyzeConversationOutput } from '@/ai/flows/analyze-conversation';

interface ActionResult {
  data?: AnalyzeConversationOutput;
  error?: string;
}

export async function handleConversationAnalysis(conversationText: string): Promise<ActionResult> {
  if (!conversationText || conversationText.trim() === "") {
    return { error: "Conversation text cannot be empty." };
  }

  try {
    const input: AnalyzeConversationInput = { conversationText };
    // Simulate a delay to show loading state for Genkit flow if it's too fast
    // await new Promise(resolve => setTimeout(resolve, 2000)); 
    const result = await analyzeConversation(input);
    return { data: result };
  } catch (e) {
    console.error("Error analyzing conversation:", e);
    if (e instanceof Error) {
        // Sanitize error message for client
        if (e.message.includes('DEADLINE_EXCEEDED') || e.message.includes('unavailable')) {
             return { error: "The analysis service is currently unavailable or timed out. Please try again later." };
        }
        return { error: "An error occurred during analysis. Please check the input or try again." };
    }
    return { error: "An unexpected error occurred during analysis." };
  }
}
