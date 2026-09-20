import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { SetupWizard } from '@/components/onboarding/SetupWizard';
import { ScanPage } from '@/pages/ScanPage';
import { TipsPage } from '@/pages/TipsPage';
import { HistoryPage } from '@/pages/HistoryPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { Toaster } from 'sonner';

export function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#08090a] text-[#d0d6e0] flex flex-col justify-between selection:bg-[#e4f222]/20 selection:text-white">
        <div>
          <Header />
          <main className="pb-20 md:pb-8">
            <Routes>
              <Route path="/" element={<ScanPage />} />
              <Route path="/tips" element={<TipsPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>

        <Footer />
        <MobileNav />
        <SetupWizard />
        <Toaster position="top-right" theme="dark" richColors />
      </div>
    </Router>
  );
}

export default App;
