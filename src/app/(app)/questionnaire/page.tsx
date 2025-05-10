
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import QuestionnaireForm from '@/components/questionnaire-form';
import UserDetailsModal from '@/components/user-details-modal';
import AnimatedShinyText from '@/components/ui/animated-shiny-text';
import { cn } from "@/lib/utils";
import { useToast } from '@/hooks/use-toast';
import type { QuestionnaireData, UserDetailsData, CombinedDataForAnalysis } from '@/lib/schemas';
import { handleQuestionnaireSubmission, handleUserDetailsSubmission } from '@/app/actions';

const LOCAL_STORAGE_KEY = 'alumbraAnalysisContext';

export default function QuestionnairePage() {
  const router = useRouter();
  const { toast } = useToast();

  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = React.useState(false);
  const [initialQuestionnaireData, setInitialQuestionnaireData] = React.useState<QuestionnaireData | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false); // Overall submission state

  const handleInitialFormSuccess = async (data: QuestionnaireData) => {
    setIsSubmitting(true);
    const result = await handleQuestionnaireSubmission(data);
    if (result.success && result.data) {
      setInitialQuestionnaireData(result.data);
      setIsUserDetailsModalOpen(true);
      // No toast here, wait for the full flow or modal cancel
    } else {
      toast({
        variant: 'destructive',
        title: 'Error en Cuestionario',
        description: result.error || 'No se pudo enviar la primera parte del cuestionario.',
      });
    }
    setIsSubmitting(false); // Stop primary spinner once modal is ready or error shown
  };

  const handleUserDetailsSubmit = async (userDetails: UserDetailsData) => {
    if (!initialQuestionnaireData) {
      toast({ variant: 'destructive', title: 'Error', description: 'Faltan datos del cuestionario inicial.' });
      setIsUserDetailsModalOpen(false);
      return;
    }
    setIsSubmitting(true); // Restart spinner for this step
    const userDetailsResult = await handleUserDetailsSubmission(userDetails);

    if (userDetailsResult.success && userDetailsResult.data) {
      // Store combined data in localStorage
      const combinedData: CombinedDataForAnalysis = {
        questionnaire: initialQuestionnaireData,
        userDetails: userDetailsResult.data,
      };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(combinedData));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
        toast({ variant: "destructive", title: "Error de Almacenamiento Local", description: "No se pudieron guardar los datos para el análisis."});
      }


      toast({
        title: 'Datos Completados',
        description: 'Gracias. Serás redirigido a la página de análisis.',
      });
      setIsUserDetailsModalOpen(false);
      router.push('/analyze');
    } else {
      toast({
        variant: 'destructive',
        title: 'Error en Datos Adicionales',
        description: userDetailsResult.error || 'No se pudieron guardar los datos adicionales.',
      });
    }
    setIsSubmitting(false);
  };

  const handleModalClose = () => {
    setIsUserDetailsModalOpen(false);
    // Optionally, ask user if they want to proceed without user details
    // For now, closing modal means they can try submitting initial form again or leave
    if (initialQuestionnaireData) {
       toast({
        title: 'Modal Cerrado',
        description: 'Puedes continuar al análisis, pero algunos datos no fueron guardados.',
        action: (
          <button
            onClick={() => {
                const combinedData: CombinedDataForAnalysis = { questionnaire: initialQuestionnaireData };
                 try {
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(combinedData));
                  } catch (error) {
                    console.error("Error saving to localStorage:", error);
                  }
                router.push('/analyze')
            }}
            className="bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90"
          >
            Continuar sin datos
          </button>
        ),
      });
    }
  };

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
      <QuestionnaireForm onSuccess={handleInitialFormSuccess} isSubmittingPrimary={isSubmitting} />
      {initialQuestionnaireData && (
        <UserDetailsModal
          isOpen={isUserDetailsModalOpen}
          onClose={handleModalClose}
          onSubmit={handleUserDetailsSubmit}
          // initialData can be passed if we want to pre-fill or edit
        />
      )}
    </div>
  );
}
