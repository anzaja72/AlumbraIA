
'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertTriangle, Frown, ArrowRight } from 'lucide-react';
import AnimatedShinyText from '@/components/ui/animated-shiny-text';
import { cn } from "@/lib/utils";

// Define the HeroSection1 component
function HeroSection1() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          {/* Left Column: Text and Button */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none" style={{color: '#e7d6f1'}}>
                <AnimatedShinyText
                  className={cn(
                    `inline animate-gradient bg-gradient-to-r from-purple-500 via-yellow-300 to-purple-500 bg-[length:var(--shimmer-width)_100%] bg-clip-text text-transparent`
                  )}
                >
                    Alumbra:
                </AnimatedShinyText>
                 <br />
                 <span> {/* Removed text-foreground class */}
                   Ponle luz a tus palabras, claridad a tus vínculos
                 </span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Con una simple acción de copiar y pegar la última conversación, Alumbra podría esbozar un escenario preocupante que indique una señal de advertencia hacia tu salud emocional.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/analyze" passHref>
                <Button size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_0_rgb(0,0,0,20%)] transition-all duration-300 ease-out hover:scale-105 active:scale-95">
                  Comenzar Análisis
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

           {/* Right Column: Card */}
           <div className="relative">
              <Card className="relative bg-card shadow-lg rounded-lg overflow-hidden ml-0 lg:ml-12 mt-12 lg:mt-0">
                <CardHeader className="bg-muted/30 p-4 flex flex-row items-center space-x-2">
                  <div className="flex space-x-1.5">
                     <span className="w-3 h-3 rounded-full bg-red-500"></span>
                     <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                     <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  </div>
                   <p className="text-xs text-muted-foreground font-mono truncate">Análisis</p>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="bg-secondary/50 p-4 rounded-md text-sm text-secondary-foreground">
                     <p>"Eres estúpido, ¿Cómo pudiste hacer eso? ¡Eres un idiota!"</p>
                     <p>"Cálmate, fue un error..."</p>
                     <p>"¡Un error! Siempre arruinas todo. No sirves para nada."</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground">Estado Emocional</h3>
                    <div className="flex items-center space-x-2">
                      <Frown className="w-5 h-5 text-red-600" />
                      <span className="text-foreground font-medium">Negativo</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground">Alerta</h3>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                      <span className="text-destructive font-medium">Abuso / Manipulación</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
           </div>
        </div>
      </div>
    </section>
  );
}

export default function WelcomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <HeroSection1 />

       <footer className="w-full py-6 bg-background border-t">
          <div className="container px-4 md:px-6 text-center text-muted-foreground text-sm">
              © {new Date().getFullYear()} Alumbra. Todos los derechos reservados.
              <p className="text-xs mt-1">Tu información es privada. El análisis se procesa de forma segura.</p>
          </div>
       </footer>
    </main>
  );
}
