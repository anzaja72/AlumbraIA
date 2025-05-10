
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { handleFeedbackSubmission } from '@/app/actions';
import { FeedbackSchema, type FeedbackData } from '@/lib/schemas';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '@/components/ui/spinner';
import { Send, MessageSquare } from 'lucide-react';

export default function FeedbackPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FeedbackData>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      feedbackText: '',
    },
  });

  async function onSubmit(data: FeedbackData) {
    setIsSubmitting(true);
    const result = await handleFeedbackSubmission(data);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: 'Comentario Enviado',
        description: result.message || '¡Gracias por tu feedback!',
      });
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Error al Enviar',
        description: result.error || 'No se pudo enviar tu comentario. Inténtalo de nuevo.',
      });
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-lg bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl md:text-3xl font-bold text-primary">
            <MessageSquare className="mr-3 h-7 w-7" />
            Enviar Comentarios
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Nos encantaría escuchar tu opinión. Por favor, comparte tus comentarios, sugerencias o reporta cualquier problema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="feedbackText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="feedbackText" className="text-card-foreground">Tu Comentario</FormLabel>
                    <FormControl>
                      <Textarea
                        id="feedbackText"
                        placeholder="Escribe aquí tus comentarios..."
                        className="min-h-[150px] resize-y bg-background text-foreground placeholder:text-muted-foreground"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Comentario
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
