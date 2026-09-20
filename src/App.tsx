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
      <div className="relative min-h-screen bg-[#F0F0F0] text-[#121212] font-sans flex flex-col justify-between selection:bg-[#F0C020] selection:text-[#121212]">
        <div>
          <Header />
          <main className="pb-24 md:pb-12">
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
        <Toaster position="top-right" theme="light" richColors />
      </div>
    </Router>
  );
}

export default App;
