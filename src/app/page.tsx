'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Footer from '@/components/layout/footer';
import AnalysisMockup from '@/components/analysis-mockup';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1 flex items-center justify-center py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-bold">
                <span style={{ color: 'hsl(270, 35%, 40%)' }}>Alumbra:</span><br /> 
                <span className="text-foreground">Ponle luz a tus palabras,</span><br />
                <span className="text-foreground">claridad a tus vínculos</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
                Con una simple acción de copiar y pegar la última conversación,
                Alumbra podría esbozar un escenario preocupante que indique una
                señal de advertencia hacia tu salud emocional.
              </p>
              <Link href="/analyze" passHref>
                <Button size="lg" className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-lg transition-transform hover:scale-105">
                  Comenzar Análisis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <AnalysisMockup />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
