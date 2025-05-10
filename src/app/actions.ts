
'use server';

import { analyzeConversation, type AnalyzeConversationInput, type AnalyzeConversationOutput } from '@/ai/flows/analyze-conversation';
import type { QuestionnaireData, UserDetailsData } from '@/lib/schemas';

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
    console.log('Questionnaire data received:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Data is returned to the client, client handles next steps (e.g. opening modal)
    return { success: true, data };
  } catch (e) {
    console.error("Error submitting questionnaire:", e);
    const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
    return { error: `Failed to submit questionnaire: ${errorMessage}` };
  }
}


interface UserDetailsActionResult {
  success?: boolean;
  error?: string;
  data?: UserDetailsData;
}

export async function handleUserDetailsSubmission(data: UserDetailsData): Promise<UserDetailsActionResult> {
  try {
    console.log('User details received:', data);
    // If emergencyEmail is provided, it could be used later by an alert service.
    // For this application, frontend will pass it to backend if an analysis triggers an alert.
    // The backend should not store this email unless explicitly for a user account feature and with consent.
    // As per requirements, contacts are not stored server-side.
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    return { success: true, data };
  } catch (e) {
    console.error("Error submitting user details:", e);
    const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
    return { error: `Failed to submit user details: ${errorMessage}` };
  }
}
