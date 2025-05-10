
import QuestionnaireForm from '@/components/questionnaire-form';
import AnimatedShinyText from '@/components/ui/animated-shiny-text';
import { cn } from "@/lib/utils";

export default function QuestionnairePage() {
  return (
    <div className="w-full py-8">
       <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
             <AnimatedShinyText
                  className={cn(
                    `inline animate-gradient bg-gradient-to-r from-purple-500 via-yellow-300 to-purple-500 bg-[length:var(--shimmer-width)_100%] bg-clip-text text-transparent`
                  )}
                >
                    Alumbra
                </AnimatedShinyText>
          </h1>
          <p className="text-md md:text-lg text-muted-foreground mt-2">
            Identifica señales de manipulación emocional o relaciones tóxicas en tus conversaciones digitales
          </p>
      </div>
      <QuestionnaireForm />
    </div>
  );
}
