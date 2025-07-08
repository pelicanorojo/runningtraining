'use client';

import { SessionProvider } from 'next-auth/react';
import { ConfigProvider } from '@/contexts/config';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers ({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ConfigProvider>
      {children}
      </ConfigProvider>
    </SessionProvider>
  );
}
