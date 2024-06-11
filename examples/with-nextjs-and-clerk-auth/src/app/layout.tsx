'use server';

import { ReactNode } from 'react';

import {
  ClerkProvider,
  currentUser,
  MultisessionAppSupport,
} from '@clerk/nextjs';

import { RootI18nProvider } from '@/components/RootI18nProvider';
import { RootQueryClientProvider } from '@/components/RootQueryClientProvider';
import { AppThemeProvider } from '@/components/ThemeRegistry/AppThemeProvider';
import { themeFont } from '@/components/ThemeRegistry/themeFont';
import { getSelectedTheme } from '@/lib/clerk-api/get-selected-theme';

import './globals.css';

export async function generateMetadata() {
  return {
    title: 'Monite SDK Demo',
    description: 'Monite SDK demo app',
  };
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();
  const selectedTheme = getSelectedTheme(user);

  return (
    <ClerkProvider publishableKey={process.env.CLERK_PUBLISHABLE_KEY}>
      <MultisessionAppSupport>
        <html lang="en">
          <body className={themeFont.className}>
            <RootI18nProvider>
              <RootQueryClientProvider>
                <AppThemeProvider initialTheme={selectedTheme}>
                  {children}
                </AppThemeProvider>
              </RootQueryClientProvider>
            </RootI18nProvider>
          </body>
        </html>
      </MultisessionAppSupport>
    </ClerkProvider>
  );
}
