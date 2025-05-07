'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { handleConversationAnalysis } from '@/app/actions';
import type { AnalyzeConversationOutput } from '@/ai/flows/analyze-conversation';
import { FileText, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


const FormSchema = z.object({
  conversationText: z.string().min(10, {
    message: 'Conversation text must be at least 10 characters.',
  }),
});

interface ConversationInputFormProps {
  onAnalysisStart: () => void;
  onAnalysisComplete: (result: AnalyzeConversationOutput) => void;
  onAnalysisError: (error: string) => void;
}

export default function ConversationInputForm({
  onAnalysisStart,
  onAnalysisComplete,
  onAnalysisError,
}: ConversationInputFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      conversationText: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    onAnalysisStart();

    const result = await handleConversationAnalysis(data.conversationText);

    if (result.error) {
      onAnalysisError(result.error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: result.error,
      });
    } else if (result.data) {
      onAnalysisComplete(result.data);
      toast({
        title: "Analysis Complete",
        description: "Conversation insights are ready.",
      });
      form.reset(); // Clear form on successful submission
    }
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 p-6 bg-card rounded-lg shadow-md">
        <FormField
          control={form.control}
          name="conversationText"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="conversationText" className="flex items-center text-lg font-semibold">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Enter Conversation Text
              </FormLabel>
              <FormControl>
                <Textarea
                  id="conversationText"
                  placeholder="Paste the conversation you want to analyze here..."
                  className="min-h-[150px] md:min-h-[200px] resize-y"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
          <Sparkles className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Analyzing...' : 'Analyze Conversation'}
        </Button>
      </form>
    </Form>
  );
}
