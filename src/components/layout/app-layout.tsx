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
import { Sparkles, MessageSquareText, Settings, LifeBuoy, HomeIcon } from 'lucide-react';
import SidebarNav from './sidebar-nav';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

interface AppLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: '/', label: 'Analyze Conversation', icon: MessageSquareText },
  // { href: '/dashboard', label: 'Dashboard', icon: HomeIcon }, // Example for another page
  // { href: '/settings', label: 'Settings', icon: Settings },
];

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border">
        <SidebarHeader className="p-4 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-sidebar-primary hover:opacity-80 transition-opacity">
            <Sparkles className="h-7 w-7 text-primary" />
            <span className="text-2xl font-bold alumbra-animated-text">Alumbra</span>
          </Link>
          <p className="text-xs text-sidebar-foreground/70 mt-1 group-data-[collapsible=icon]/sidebar-wrapper:hidden">Shining a light on conversations.</p>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarNav items={navItems} currentPath={pathname} />
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-sidebar-border">
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent group-data-[collapsible=icon]/sidebar-wrapper:justify-center group-data-[collapsible=icon]/sidebar-wrapper:px-0">
                <LifeBuoy className="mr-2 h-4 w-4 group-data-[collapsible=icon]/sidebar-wrapper:mr-0" />
                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">Support</span>
            </Button>
            <p className="text-xs text-sidebar-foreground/60 mt-4 text-center group-data-[collapsible=icon]/sidebar-wrapper:hidden">
              © {new Date().getFullYear()} Alumbra AI
            </p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger className="md:hidden" />
            {/* You can add breadcrumbs or page titles here if needed */}
            <div className="flex-1">
              {/* <h1 className="font-semibold text-lg">
                {navItems.find(item => item.href === pathname)?.label || 'Alumbra AI'}
              </h1> */}
            </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
