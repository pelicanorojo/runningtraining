/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-22T09:54:09-03:00
 */


import React from 'react';
import Header from "@/components/ui/custom/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Header */}
      <Header title="Marathon Training Planner"/>
      {/* Main Content */}
      <div role="main" className="flex-1 container py-6">
        {children}
      </div>
      {/* Footer */}
      <footer role="footer" className="border-t py-4">
        <div className="container">
          <p className="text-sm text-muted-foreground text-center">
            © 2024 Marathon Training Planner
          </p>
        </div>
      </footer>
    </>
  );
}
