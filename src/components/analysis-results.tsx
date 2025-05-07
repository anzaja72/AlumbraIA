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
  if (score <= 3) return { label: "Low Risk", color: "text-green-600 dark:text-green-500", Icon: ShieldCheck, progressIndicatorClass: "bg-green-500" };
  if (score <= 7) return { label: "Medium Risk", color: "text-yellow-600 dark:text-yellow-500", Icon: ShieldAlert, progressIndicatorClass: "bg-yellow-500" };
  return { label: "High Risk", color: "text-red-600 dark:text-red-500", Icon: ShieldX, progressIndicatorClass: "bg-red-500" };
};


export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const { riskAssessment, detectedCategories, relevantExamples, recommendations } = analysis;
  const riskPresentation = getRiskPresentation(riskAssessment.riskScore);

  return (
    <div className="space-y-6 w-full">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Activity className="mr-3 h-7 w-7 text-primary" />
            Risk Assessment
          </CardTitle>
          <CardDescription>Overall risk level identified in the conversation.</CardDescription>
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
            className="h-3" 
            indicatorClassName={riskPresentation.progressIndicatorClass} 
          />
          <div>
            <h4 className="font-semibold text-foreground">Summary:</h4>
            <p className="text-muted-foreground">{riskAssessment.riskSummary}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <ListChecks className="mr-3 h-7 w-7 text-primary" />
            Detected Categories
          </CardTitle>
          <CardDescription>Identified categories of potential concern.</CardDescription>
        </CardHeader>
        <CardContent>
          {detectedCategories.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {detectedCategories.map((category, index) => (
                <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                  <Tags className="mr-1.5 h-4 w-4" />
                  {category}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No specific categories detected.</p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <MessageSquareQuote className="mr-3 h-7 w-7 text-primary" />
            Relevant Examples
          </CardTitle>
          <CardDescription>Specific text excerpts illustrating detected categories.</CardDescription>
        </CardHeader>
        <CardContent>
          {relevantExamples.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {relevantExamples.map((example, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    Example {index + 1}
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
            <p className="text-muted-foreground">No specific examples highlighted by the analysis.</p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <ClipboardCheck className="mr-3 h-7 w-7 text-primary" />
            Recommendations
          </CardTitle>
          <CardDescription>Tailored suggestions based on the analysis.</CardDescription>
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
