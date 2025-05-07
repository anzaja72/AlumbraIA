'use server';

/**
 * @fileOverview Analyzes conversation text for potential emotional abuse, manipulation, and risk levels.
 *
 * - analyzeConversation - A function that handles the conversation analysis process.
 * - AnalyzeConversationInput - The input type for the analyzeConversation function.
 * - AnalyzeConversationOutput - The return type for the analyzeConversation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeConversationInputSchema = z.object({
  conversationText: z
    .string()
    .describe('The conversation text to analyze for emotional abuse, manipulation, and risk levels.'),
});
export type AnalyzeConversationInput = z.infer<typeof AnalyzeConversationInputSchema>;

const AnalyzeConversationOutputSchema = z.object({
  riskAssessment:
      z.object({
        riskScore: z.number().describe('A score indicating the overall risk level (e.g., 1-10).'),
        riskSummary: z.string().describe('A brief summary of the potential risks identified.'),
      }),
  detectedCategories: z
    .array(z.string())
    .describe('Categories of abuse detected in the conversation (e.g., emotional abuse, manipulation).'),
  relevantExamples: z
    .array(z.string())
    .describe('Specific examples from the text that demonstrate the identified abuse categories.'),
  recommendations: z
    .string()
    .describe('Tailored recommendations based on the analysis (e.g., seek professional help, set boundaries).'),
});
export type AnalyzeConversationOutput = z.infer<typeof AnalyzeConversationOutputSchema>;

export async function analyzeConversation(input: AnalyzeConversationInput): Promise<AnalyzeConversationOutput> {
  return analyzeConversationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeConversationPrompt',
  input: {schema: AnalyzeConversationInputSchema},
  output: {schema: AnalyzeConversationOutputSchema},
  prompt: `You are an AI expert in analyzing conversations for emotional abuse, manipulation, and risk levels.

  Analyze the following conversation text and provide a risk assessment, identified abuse categories, relevant examples, and tailored recommendations.

  Conversation Text: {{{conversationText}}}

  Output the analysis in a structured format as described by the output schema. Be direct and concise.
  `,
});

const analyzeConversationFlow = ai.defineFlow(
  {
    name: 'analyzeConversationFlow',
    inputSchema: AnalyzeConversationInputSchema,
    outputSchema: AnalyzeConversationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
