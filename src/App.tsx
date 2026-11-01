import React from 'react';
import { BusinessDataProvider, useBusinessData } from './context/BusinessDataContext';
import { LandingPage } from './pages/LandingPage';
import { AppShell } from './components/layout/AppShell';

const MainRouter: React.FC = () => {
  const { activeView } = useBusinessData();

  if (activeView === 'landing') {
    return <LandingPage />;
  }

  return <AppShell />;
};

export default function App() {
  return (
    <BusinessDataProvider>
      <MainRouter />
    </BusinessDataProvider>
  );
}
