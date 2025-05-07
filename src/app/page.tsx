'use client';

import { useState } from 'react';
import type { AnalyzeConversationOutput } from '@/ai/flows/analyze-conversation';
import ConversationInputForm from '@/components/conversation-input-form';
import AnalysisResults from '@/components/analysis-results';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Spinner } from '@/components/ui/spinner'; // Placeholder for a spinner component

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeConversationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center min-h-screen py-8 md:py-12 bg-background">
      <div className="container mx-auto px-4 w-full max-w-4xl">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">Alumbra AI</h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Shining a light on your conversations for clarity and safety.
          </p>
        </header>

        <ConversationInputForm
          onAnalysisStart={() => {
            setIsLoading(true);
            setError(null);
            setAnalysisResult(null);
          }}
          onAnalysisComplete={(result) => {
            setAnalysisResult(result);
            setIsLoading(false);
          }}
          onAnalysisError={(errorMessage) => {
            setError(errorMessage);
            setIsLoading(false);
          }}
        />

        <div aria-live="polite" aria-atomic="true" className="w-full mt-8">
          {isLoading && (
            <div className="flex flex-col items-center justify-center p-8 space-y-4 bg-card rounded-lg shadow-md">
              <Spinner />
              <p className="text-muted-foreground">Analyzing... Please wait.</p>
            </div>
          )}
          {error && !isLoading && (
             <Alert variant="destructive" className="mt-4">
              <AlertTitle>Analysis Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {analysisResult && !isLoading && (
            <AnalysisResults analysis={analysisResult} />
          )}
        </div>

        <footer className="text-center mt-12 py-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Alumbra AI is a tool for insights and awareness. It is not a substitute for professional advice.
            </p>
             <p className="text-xs text-muted-foreground mt-1">
              © {new Date().getFullYear()} Alumbra AI. All rights reserved.
            </p>
        </footer>
      </div>
    </div>
  );
}
