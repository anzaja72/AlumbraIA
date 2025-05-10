
'use server';

import fs from 'fs/promises';
import path from 'path';
import { analyzeConversation, type AnalyzeConversationInput, type AnalyzeConversationOutput } from '@/ai/flows/analyze-conversation';
import type { QuestionnaireData, UserDetailsData, FeedbackData } from '@/lib/schemas';

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

interface FeedbackActionResult {
  success?: boolean;
  error?: string;
  message?: string;
}

const COMMENTS_DIR_NAME = 'Comentarios';
const MAX_COMMENTS_PER_FILE = 100;
const METADATA_FILE_NAME = 'metadata.json';

async function ensureCommentsDir(): Promise<string> {
  const commentsDirPath = path.join(process.cwd(), COMMENTS_DIR_NAME);
  try {
    await fs.mkdir(commentsDirPath, { recursive: true });
  } catch (error) {
    // Ignore if directory already exists, otherwise rethrow
    if (error instanceof Error && 'code' in error && error.code !== 'EEXIST') {
      console.error('Failed to create comments directory:', error);
      throw error; 
    }
  }
  return commentsDirPath;
}

async function getMetadata(commentsDirPath: string): Promise<{ lastGlobalCommentId: number }> {
  const metadataFilePath = path.join(commentsDirPath, METADATA_FILE_NAME);
  try {
    const data = await fs.readFile(metadataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file not found or error in parsing, initialize
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return { lastGlobalCommentId: 0 };
    }
    console.warn('Error reading metadata file, re-initializing:', error);
    return { lastGlobalCommentId: 0 }; // Default if file is corrupted or unreadable
  }
}

async function saveMetadata(commentsDirPath: string, metadata: { lastGlobalCommentId: number }): Promise<void> {
  const metadataFilePath = path.join(commentsDirPath, METADATA_FILE_NAME);
  await fs.writeFile(metadataFilePath, JSON.stringify(metadata, null, 2));
}

export async function handleFeedbackSubmission(feedbackData: FeedbackData): Promise<FeedbackActionResult> {
  if (!feedbackData.feedbackText || feedbackData.feedbackText.trim() === "") {
    return { success: false, error: "El comentario no puede estar vacío." };
  }

  try {
    const commentsDirPath = await ensureCommentsDir();
    const metadata = await getMetadata(commentsDirPath);

    const newCommentId = metadata.lastGlobalCommentId + 1;
    
    const fileIndex = Math.floor((newCommentId - 1) / MAX_COMMENTS_PER_FILE);
    const fileStartId = fileIndex * MAX_COMMENTS_PER_FILE + 1;
    const fileEndId = (fileIndex + 1) * MAX_COMMENTS_PER_FILE;
    const fileName = `${fileStartId}-${fileEndId}.txt`;
    const filePath = path.join(commentsDirPath, fileName);

    const commentEntry = `${newCommentId} - User: ${feedbackData.feedbackText}\n`;

    await fs.appendFile(filePath, commentEntry, 'utf-8');
    
    metadata.lastGlobalCommentId = newCommentId;
    await saveMetadata(commentsDirPath, metadata);

    return { success: true, message: 'Comentario guardado localmente con éxito.' };

  } catch (e) {
    console.error("Error saving feedback to file:", e);
    const errorMessage = e instanceof Error ? e.message : 'Ocurrió un error inesperado al guardar tu comentario.';
    return { success: false, error: `Error al guardar el comentario: ${errorMessage}` };
  }
}
