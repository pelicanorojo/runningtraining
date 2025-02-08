/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-02-07T10:25:24-03:00
 */

import {useTranslations} from 'next-intl';

import React from 'react';
import Header from "@/components/ui/custom/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const t = useTranslations('header');
  return (
    <>
      {/* Header */}
      <Header title={t('title')} />
      {/* Main Content */}

      <div role="main" className="flex-1 flex flex-col overflow-hidden gap-2">
        {children}
      </div>
      {/* Footer */}
      <footer role="footer" className="border-t pt-4 h-[2rem]">
        <div className="container">
          <p className="text-sm text-muted-foreground text-center">
            © 2024 Marathon Training Planner
          </p>
        </div>
      </footer>
    </>
  );
}
