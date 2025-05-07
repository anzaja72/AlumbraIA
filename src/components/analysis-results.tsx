'use client';

import type { AnalyzeConversationOutput } from '@/ai/flows/analyze-conversation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Tags,
  MessageSquareQuote,
  Lightbulb,
  Activity,
  ListChecks,
  ClipboardCheck,
} from 'lucide-react';

interface AnalysisResultsProps {
  analysis: AnalyzeConversationOutput;
}

const getRiskPresentation = (score: number) => {
  // Using text-destructive for high/medium risk as per design, and a neutral/positive for low.
  if (score <= 3) return { label: "Riesgo Bajo", color: "text-green-500 dark:text-green-400", Icon: ShieldCheck, progressIndicatorClass: "bg-green-500" }; // Keep green for low risk
  if (score <= 7) return { label: "Riesgo Medio", color: "text-yellow-500 dark:text-yellow-400", Icon: ShieldAlert, progressIndicatorClass: "bg-yellow-500" }; // Keep yellow for medium
  return { label: "Riesgo Alto", color: "text-destructive", Icon: ShieldX, progressIndicatorClass: "bg-destructive" };
};


export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const { riskAssessment, detectedCategories, relevantExamples, recommendations } = analysis;
  const riskPresentation = getRiskPresentation(riskAssessment.riskScore);

  return (
    <div className="space-y-6 w-full">
      <Card className="shadow-lg bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-card-foreground">
            <Activity className="mr-3 h-7 w-7 text-primary" />
            Evaluación de Riesgo
          </CardTitle>
          <CardDescription className="text-muted-foreground">Nivel de riesgo general identificado en la conversación.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <riskPresentation.Icon className={`h-8 w-8 ${riskPresentation.color}`} />
            <span className={`text-2xl font-bold ${riskPresentation.color}`}>
              {riskAssessment.riskScore}/10 - {riskPresentation.label}
            </span>
          </div>
          <Progress 
            value={riskAssessment.riskScore * 10} 
            className="h-3 bg-muted" 
            indicatorClassName={riskPresentation.progressIndicatorClass} 
          />
          <div>
            <h4 className="font-semibold text-card-foreground">Resumen:</h4>
            <p className="text-muted-foreground">{riskAssessment.riskSummary}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-card-foreground">
            <ListChecks className="mr-3 h-7 w-7 text-primary" />
            Categorías Detectadas
          </CardTitle>
          <CardDescription className="text-muted-foreground">Categorías de posible preocupación identificadas.</CardDescription>
        </CardHeader>
        <CardContent>
          {detectedCategories.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {detectedCategories.map((category, index) => (
                <Badge key={index} variant="secondary" className="text-sm px-3 py-1 bg-secondary text-secondary-foreground">
                  <Tags className="mr-1.5 h-4 w-4" />
                  {category}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No se detectaron categorías específicas.</p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-card-foreground">
            <MessageSquareQuote className="mr-3 h-7 w-7 text-primary" />
            Ejemplos Relevantes
          </CardTitle>
          <CardDescription className="text-muted-foreground">Fragmentos de texto específicos que ilustran las categorías detectadas.</CardDescription>
        </CardHeader>
        <CardContent>
          {relevantExamples.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {relevantExamples.map((example, index) => (
                <AccordionItem value={`item-${index}`} key={index} className="border-border">
                  <AccordionTrigger className="text-left hover:no-underline text-card-foreground">
                    Ejemplo {index + 1}
                  </AccordionTrigger>
                  <AccordionContent>
                    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                      {example}
                    </blockquote>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-muted-foreground">No hay ejemplos específicos destacados por el análisis.</p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-card-foreground">
            <ClipboardCheck className="mr-3 h-7 w-7 text-primary" />
            Recomendaciones
          </CardTitle>
          <CardDescription className="text-muted-foreground">Sugerencias personalizadas basadas en el análisis.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {recommendations.split('\n').map((rec, index) => (
            rec.trim() && (
              <div key={index} className="flex items-start">
                <Lightbulb className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" />
                <p className="text-muted-foreground">{rec}</p>
              </div>
            )
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
