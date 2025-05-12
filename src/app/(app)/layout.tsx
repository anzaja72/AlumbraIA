import type { ReactNode } from 'react';
import AppLayout from '@/components/layout/app-layout';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}