
'use server';

import { analyzeConversation, type AnalyzeConversationInput, type AnalyzeConversationOutput } from '@/ai/flows/analyze-conversation';
import type { QuestionnaireData } from '@/lib/schemas';

interface AnalysisActionResult {
  data?: AnalyzeConversationOutput;
  error?: string;
}

export async function handleConversationAnalysis(conversationText: string): Promise<AnalysisActionResult> {
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

interface QuestionnaireActionResult {
  success?: boolean;
  error?: string;
  data?: QuestionnaireData;
}

export async function handleQuestionnaireSubmission(data: QuestionnaireData): Promise<QuestionnaireActionResult> {
  try {
    // Here you would typically send data to your backend API
    // For now, we'll just log it and simulate a successful submission
    console.log('Questionnaire data received:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // This data could be stored in localStorage/sessionStorage or passed via state/query params
    // to the analyze page if it needs to influence the analysis prompt.
    // For now, we assume the analyze page is independent or gets context differently.

    return { success: true, data };
  } catch (e) {
    console.error("Error submitting questionnaire:", e);
    const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
    return { error: `Failed to submit questionnaire: ${errorMessage}` };
  }
}
