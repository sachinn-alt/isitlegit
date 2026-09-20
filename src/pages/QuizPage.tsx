import { useState } from 'react';
import { SEOHead } from '@/components/seo/SEOHead';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { QuizCard, QuizScenario } from '@/components/quiz/QuizCard';
import { Award, ShieldAlert, ShieldCheck, RotateCcw, ArrowRight, Zap, Target } from 'lucide-react';

export const QuizPage = () => {
  const scenarios: QuizScenario[] = [
    {
      id: 1,
      category: 'SMS',
      title: 'Suspicious Bank Card Authorization',
      senderOrUrl: 'Shortcode 24273 (CHASE)',
      body: 'Chase Fraud Alert: Did you attempt a charge of $248.50 at BESTBUY.COM on card ending in 8192? Reply YES or NO. (Do NOT share your card PIN with anyone).',
      isLegitimate: true,
      explanation: 'This is a genuine Chase transaction authorization alert. It asks only for a binary YES or NO reply, contains NO deceptive hyperlinks, and explicitly warns customers never to share card PINs.',
      forensicGiveaway: 'Absence of web links + zero demand for passwords or 2FA codes.',
    },
    {
      id: 2,
      category: 'URL',
      title: 'PayPal Account Dispute Resolution',
      senderOrUrl: 'http://раураl.com-verify.account-security.xyz/login?session=928a',
      body: 'Urgent security verification: Your account has been limited due to unusual activity. Login within 24 hours to restore full access: http://раураl.com-verify.account-security.xyz/login?session=928a',
      isLegitimate: false,
      explanation: 'Lookalike homoglyph attack. The characters "р" and "а" are Cyrillic (U+0440 and U+0430). The actual authoritative root domain before the slash is "account-security.xyz", an attacker-controlled server.',
      forensicGiveaway: 'Cyrillic homoglyph lookalikes + .xyz root domain pretending to be paypal.com.',
    },
    {
      id: 3,
      category: 'SMS',
      title: 'Courier Address Redelivery Request',
      senderOrUrl: '+1 (832) 991-0421 (Unregistered Cellular Number)',
      body: 'FEDEX: Package #US-8812 is on hold due to $1.85 unpaid address correction fee. Pay within 12h: http://fedx-pkg-status.link',
      isLegitimate: false,
      explanation: 'Classic courier smishing. Official logistics companies (FedEx, UPS, USPS) never dispatch alerts from random cellular numbers, never misspell their brand (fedx vs fedex), and do not demand small fees via strange domains.',
      forensicGiveaway: 'Random cellular sender + misspelled domain name + urgent fee trap.',
    },
    {
      id: 4,
      category: 'EMAIL',
      title: 'Google Account Security Code',
      senderOrUrl: 'Google Security <no-reply@accounts.google.com>',
      body: 'G-491028 is your Google verification code. Do not share it with anyone. Google will never call or text you to ask for this code.',
      isLegitimate: true,
      explanation: 'Legitimate Google 2FA dispatch. Notice the official "G-" prefix format and the proactive warning reminding users that Google employees never request verification codes.',
      forensicGiveaway: 'Official no-reply@accounts.google.com root + signature G- code format.',
    },
    {
      id: 5,
      category: 'QR',
      title: 'Parking Meter Adhesive Sticker',
      senderOrUrl: 'Overlaid Vinyl Sticker: https://city-parking-pay.quick-meter.cc/pay',
      body: 'Adhesive sticker pasted over the official municipal parking kiosk: "SCAN TO PAY PARKING QUICKLY AND AVOID CITATIONS". Resolves to an unverified checkout page.',
      isLegitimate: false,
      explanation: 'Quishing attack. Physical sticker was placed over a public parking kiosk. Legitimate municipal kiosks never use generic .cc domains or temporary adhesive labels to handle fee collection.',
      forensicGiveaway: 'Physical adhesive sticker overlay + non-government .cc domain.',
    },
    {
      id: 6,
      category: 'SMS',
      title: 'Internal Revenue Service Final Demand',
      senderOrUrl: '+1 (202) 555-0199',
      body: 'IRS NOTICE: Final demand for unpaid federal taxes of $1,420. Avoid arrest by submitting payment via Apple Gift Cards or Bitcoin within 1 hour.',
      isLegitimate: false,
      explanation: 'Extortion scam. Official government revenue services communicate audits exclusively via certified postal mail and will never accept retail gift cards or cryptocurrency.',
      forensicGiveaway: 'Demand for gift cards/crypto + threat of immediate police arrest.',
    },
    {
      id: 7,
      category: 'EMAIL',
      title: 'Apple ID Security Notification',
      senderOrUrl: 'Apple <appleid@id.apple.com>',
      body: 'Your Apple ID password was changed from Chrome on Windows in Munich. If this was you, ignore this message. If not, secure your account at https://appleid.apple.com',
      isLegitimate: true,
      explanation: 'Genuine security alert from Apple. Directs users strictly to the official root domain https://appleid.apple.com with SPF/DKIM alignment on id.apple.com.',
      forensicGiveaway: 'Strict official apple.com root domain link + informational posture.',
    },
    {
      id: 8,
      category: 'URL',
      title: 'Social Media Viral Video Forward',
      senderOrUrl: 'Direct Message: https://fb-video-stream.online/watch?id=4920',
      body: 'OMG look at what someone posted about you in this video!! 😂 https://fb-video-stream.online/watch?id=4920 (Requires Facebook login to view)',
      isLegitimate: false,
      explanation: 'Credential harvesting credential phishing portal. Leverages social anxiety and curiosity to trick victims into entering social media passwords on fake replica login screens.',
      forensicGiveaway: 'Non-official domain .online + fake video player demanding credentials.',
    },
  ];

  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [currentFilter, setCurrentFilter] = useState<'ALL' | 'SMS' | 'URL' | 'EMAIL' | 'QR'>('ALL');

  const handleAnswer = (scenarioId: number, userThinksLegit: boolean) => {
    setAnswers((prev) => ({ ...prev, [scenarioId]: userThinksLegit }));
  };

  const handleReset = () => {
    setAnswers({});
  };

  const answeredCount = Object.keys(answers).length;
  const correctCount = scenarios.filter(
    (s) => answers[s.id] !== undefined && answers[s.id] === s.isLegitimate
  ).length;

  const scorePercent = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  const getRankBadge = () => {
    if (answeredCount < 4) return { title: 'RECRUIT IN TRAINING', color: 'bg-[#F0F0F0] text-[#121212]' };
    if (scorePercent >= 85) return { title: 'BAUHAUS CYBER SENTINEL', color: 'bg-[#FFF9C4] text-[#121212]' };
    if (scorePercent >= 65) return { title: 'VIGILANT DEFENDER', color: 'bg-[#F0C020] text-[#121212]' };
    return { title: 'EASY TARGET (NEEDS DRILL)', color: 'bg-[#D02020] text-white' };
  };

  const filteredScenarios = scenarios.filter((s) => {
    if (currentFilter === 'ALL') return true;
    return s.category === currentFilter;
  });

  const rank = getRankBadge();

  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-8 py-8 space-y-10">
      <SEOHead
        title="Interactive Scam Gym & Phishing Defense Simulator"
        description="Test your threat intuition: identify real bank OTP alerts from deceptive SMS phishing, Cyrillic homoglyphs, and QR traps in real-world simulations."
        canonicalPath="/gym"
      />

      <Breadcrumbs items={[{ label: 'Scam Gym', path: '/gym' }]} />

      {/* Header & Score Matrix */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 sm:border-b-4 border-[#121212] pb-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D02020] text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-black uppercase tracking-widest">
            <Target className="w-3.5 h-3.5" />
            <span>INTERACTIVE THREAT GYMNASIUM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-[#121212] leading-[0.95]">
            SCAM RECOGNITION DRILL
          </h1>

          <p className="text-sm sm:text-base font-medium text-[#121212] max-w-xl leading-relaxed">
            Would you spot a Cyrillic lookalike or an authentic bank OTP? Test your defenses against curated real-world cases.
          </p>
        </div>

        {/* Scorecard Dial */}
        <div className="bg-white border-2 sm:border-4 border-[#121212] p-5 shadow-[4px_4px_0px_0px_#121212] flex items-center gap-5 shrink-0">
          <div className="text-center">
            <span className="text-xs font-bold uppercase text-[#62666D] block">RESILIENCE</span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-[#121212]">
              {answeredCount > 0 ? `${scorePercent}%` : '—'}
            </div>
            <span className="text-[10px] font-mono text-[#62666D]">
              {correctCount}/{answeredCount} SOLVED
            </span>
          </div>

          <div className="border-l-2 border-[#121212] pl-4 space-y-1">
            <span className="text-[10px] font-black uppercase text-[#62666D] block">CURRENT RANK</span>
            <span className={`text-xs font-black uppercase px-2 py-1 border border-[#121212] block text-center ${rank.color}`}>
              {rank.title}
            </span>
            {answeredCount > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] font-bold uppercase text-[#D02020] hover:underline flex items-center gap-1 pt-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>RESTART GYM</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Switcher */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-black uppercase tracking-wider text-[#121212] mr-2">
          FILTER VECTOR:
        </span>
        {(['ALL', 'SMS', 'URL', 'EMAIL', 'QR'] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCurrentFilter(cat)}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider border-2 border-[#121212] transition-all cursor-pointer ${
              currentFilter === cat
                ? 'bg-[#121212] text-white shadow-[2px_2px_0px_0px_#D02020]'
                : 'bg-white text-[#121212] hover:bg-[#F0F0F0] shadow-[2px_2px_0px_0px_#121212]'
            }`}
          >
            {cat} ({cat === 'ALL' ? scenarios.length : scenarios.filter((s) => s.category === cat).length})
          </button>
        ))}
      </div>

      {/* Scenario Drill Cards */}
      <div className="space-y-6">
        {filteredScenarios.map((scenario) => (
          <QuizCard
            key={scenario.id}
            scenario={scenario}
            onAnswer={handleAnswer}
            userAnswer={answers[scenario.id] !== undefined ? answers[scenario.id] : null}
          />
        ))}
      </div>
    </div>
  );
};
