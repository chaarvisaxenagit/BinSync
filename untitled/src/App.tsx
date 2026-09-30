import React from 'react';
import { LanguageProvider } from '../lib/i18n';
import { BinSyncProvider, useBinSync } from '../lib/firebase';
import RootLayout from '../app/layout';
import LandingPage from '../app/page';
import CitizenPortalPage from '../app/citizen/page';
import WorkerDashboardPage from '../app/worker/page';
import AdminDashboardPage from '../app/admin/page';
import AwarenessPage from '../app/awareness/page';

function AppRouter() {
  const { currentPath } = useBinSync();

  let pageContent: React.ReactNode;
  if (currentPath.startsWith('/citizen')) {
    pageContent = <CitizenPortalPage />;
  } else if (currentPath.startsWith('/worker')) {
    pageContent = <WorkerDashboardPage />;
  } else if (currentPath.startsWith('/admin')) {
    pageContent = <AdminDashboardPage />;
  } else if (currentPath.startsWith('/awareness')) {
    pageContent = <AwarenessPage />;
  } else {
    pageContent = <LandingPage />;
  }

  return <RootLayout>{pageContent}</RootLayout>;
}

export default function App() {
  return (
    <LanguageProvider>
      <BinSyncProvider>
        <AppRouter />
      </BinSyncProvider>
    </LanguageProvider>
  );
}
