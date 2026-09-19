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
      <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-500/30 selection:text-white cyber-grid">
        {/* Ambient radial glows */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="fixed bottom-0 right-0 w-[500px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

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
