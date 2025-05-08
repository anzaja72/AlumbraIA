
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, MessageSquare, HelpCircle, LifeBuoy } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <LifeBuoy className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Centro de Soporte de Alumbra AI</h1>
        <p className="text-md md:text-lg text-muted-foreground">
          Estamos aquí para ayudarte. Encuentra respuestas o contáctanos directamente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-card-foreground">
              <HelpCircle className="mr-3 h-6 w-6 text-primary" />
              Preguntas Frecuentes (FAQ)
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Encuentra respuestas rápidas a las preguntas más comunes sobre Alumbra AI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Nuestra sección de FAQ está diseñada para resolver tus dudas al instante.
            </p>
            <Button variant="outline" className="w-full" disabled> {/* Assuming FAQ page is not ready */}
              Ir a FAQ (Próximamente)
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-card-foreground">
              <Mail className="mr-3 h-6 w-6 text-primary" />
              Contacto por Email
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Envíanos un correo electrónico con tus consultas o problemas técnicos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-2">
              Puedes contactarnos en:
            </p>
            <Button variant="default" className="w-full" asChild>
              <Link href="mailto:soporte@alumbra.ai">
                <Mail className="mr-2 h-4 w-4" />
                soporte@alumbra.ai
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Nuestro equipo te responderá lo antes posible.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-card text-card-foreground md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-card-foreground">
              <MessageSquare className="mr-3 h-6 w-6 text-primary" />
              Guías y Tutoriales
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Aprende a usar Alumbra AI y saca el máximo provecho de sus funciones con nuestras guías detalladas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Estamos preparando guías completas para ayudarte a entender cada aspecto de la aplicación. ¡Vuelve pronto para revisarlas!
            </p>
             <Button variant="outline" className="w-full" disabled>
              Ver Guías (Próximamente)
            </Button>
          </CardContent>
        </Card>
      </div>

       <div className="mt-12 text-center">
            <p className="text-muted-foreground">
                ¿No encuentras lo que buscas? Visita nuestra <Link href="/community" className="text-primary hover:underline">comunidad</Link> o <Link href="/contact" className="text-primary hover:underline">contáctanos</Link> de otras formas.
            </p>
       </div>
    </div>
  );
}
