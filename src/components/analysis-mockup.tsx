'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Ban } from 'lucide-react';

export default function AnalysisMockup() {
  return (
    <Card className="bg-card/80 backdrop-blur-sm shadow-2xl w-full max-w-md mx-auto">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2 mb-2">
          {/* These dots can be styled with theme colors or kept as is for the "macOS window" effect */}
          <span className="h-3 w-3 rounded-full bg-red-500"></span>
          <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
          <span className="ml-auto text-xs text-muted-foreground/80">Análisis</span>
        </div>
        <Separator className="bg-border/50"/>
      </CardHeader>
      <CardContent className="text-sm space-y-4 p-6 pt-2">
        <div className="bg-muted/20 p-3 rounded-md text-muted-foreground">
          <p>"Eres estúpido, ¿Cómo pudiste hacer eso? ¡Eres un idiota!"</p>
          <p>"Cálmate, fue un error..."</p>
          <p>"¡Un error! Siempre arruinas todo. No sirves para nada."</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-1">Estado Emocional</h4>
          <div className="flex items-center text-destructive">
            <Ban className="h-4 w-4 mr-2" />
            <span>Negativo</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-1">Alerta</h4>
          <div className="flex items-center text-destructive">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span>Abuso / Manipulación</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
