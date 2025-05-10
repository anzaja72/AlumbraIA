
import { z } from 'zod';

export const QuestionnaireSchema = z.object({
  relationshipType: z.enum(['pareja', 'amistad', 'familiar', 'laboral', 'grupo'], {
    required_error: 'Por favor selecciona el tipo de relación.',
  }),
  makesYouDoubt: z.enum(['si', 'no'], {
    required_error: 'Por favor responde esta pregunta.',
  }),
  controlsOrLimits: z.enum(['si', 'no'], {
    required_error: 'Por favor responde esta pregunta.',
  }),
  feltGuiltyIncapable: z.enum(['si', 'no_no_aplica'], {
    required_error: 'Por favor responde esta pregunta.',
  }),
  wantsEvaluation: z.enum(['si', 'no'], {
    required_error: 'Por favor responde esta pregunta.',
  }),
  acceptedTerms: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar los Términos y Condiciones para continuar.',
  }),
});

export type QuestionnaireData = z.infer<typeof QuestionnaireSchema>;
