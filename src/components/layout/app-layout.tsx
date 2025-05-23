
'use client';

import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { MessageSquareText, LifeBuoy, ArrowLeft, FileQuestion, MessageCircle } from 'lucide-react'; 
import SidebarNav from './sidebar-nav';
import { usePathname } from 'next/navigation';
import AnimatedShinyText from '@/components/ui/animated-shiny-text';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface AppLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: '/questionnaire', label: 'Cuestionario', icon: FileQuestion },
  { href: '/analyze', label: 'Analizar Conversación', icon: MessageSquareText },
  { href: '/feedback', label: 'Enviar Comentarios', icon: MessageCircle },
  { href: '/support', label: 'Soporte', icon: LifeBuoy },
];

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2 md:gap-3">
            <div className="group-data-[collapsible=icon]/sidebar-wrapper:hidden md:ml-0"> {/* No margin on larger screens */}
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/" passHref>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-sidebar-foreground hover:bg-sidebar-accent"
                        aria-label="Volver a Inicio"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" align="center" sideOffset={8}>
                    Volver a Inicio
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="flex-grow text-center md:text-left md:flex-none"> {/* Centered on mobile */}
                <Link href="/" className="inline-block text-lg font-semibold text-sidebar-primary hover:opacity-80 transition-opacity">
                <AnimatedShinyText
                    className={cn(
                    `text-2xl md:text-3xl font-bold inline animate-gradient bg-gradient-to-r from-purple-500 via-yellow-300 to-purple-500 bg-[length:var(--shimmer-width)_100%] bg-clip-text text-transparent` // Larger on mobile
                    )}
                >
                    Alumbra
                </AnimatedShinyText>
                </Link>
            </div>
          </div>
          <p className="text-xs text-sidebar-foreground/70 mt-1 group-data-[collapsible=icon]/sidebar-wrapper:hidden text-center">Iluminando tus conversaciones.</p>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarNav items={navItems} currentPath={pathname} />
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-sidebar-border">
            <p className="text-xs text-sidebar-foreground/60 text-center group-data-[collapsible=icon]/sidebar-wrapper:hidden">
              © {new Date().getFullYear()} Alumbra AI
            </p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
              <h1 className="font-semibold text-lg text-foreground">
                {navItems.find(item => pathname.startsWith(item.href))?.label || 'Alumbra AI'}
              </h1>
            </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-background">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
