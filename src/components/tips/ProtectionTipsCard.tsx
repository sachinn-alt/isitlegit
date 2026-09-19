import { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckSquare, Square, LifeBuoy, Zap, Lock, PhoneCall } from 'lucide-react';
import { Badge } from '@/ui/badge';
import { CardSpotlight } from '@/components/aceternity/card-spotlight';

export const ProtectionTipsCard = () => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const checklist = [
    {
      id: 1,
      title: 'Inspect the Root Domain Carefully',
      desc: 'Look at the last two segments of the address before the first slash. For example, "chase.com.security-login.xyz" is security-login.xyz, NOT Chase.',
    },
    {
      id: 2,
      title: 'Beware of Artificial Panic & Timers',
      desc: 'Scams rely on creating panic ("Account closing in 2 hours", "Warrant for arrest"). Legitimate banks and government agencies never demand instant gift card or crypto payments.',
    },
    {
      id: 3,
      title: 'Never Read Back an SMS OTP to Any Caller',
      desc: 'Real customer service reps will never call you asking you to read a 6-digit code sent to your phone. Those codes are strictly for YOUR eyes only.',
    },
    {
      id: 4,
      title: 'Go Directly to the Source (Out-of-Band)',
      desc: 'If an email claims your package is held, close the email, open your browser, and type the courier website manually or check their official mobile app.',
    },
    {
      id: 5,
      title: 'Check the Reply-To Address on Emails',
      desc: 'Click on the sender profile to see the actual underlying email address. If the display name says "Netflix Support" but the address is @yahoo.com or @outlook.com, it is 100% fake.',
    },
  ];

  const toggleItem = (id: number) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Interactive 5-Second Scam Checklist */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">5-Second Scam Checklist</h3>
              <p className="text-xs text-slate-400">Run this quick mental inspection before clicking any link or sharing information</p>
            </div>
          </div>

          <Badge variant="outline" className="text-xs border-blue-500/40 text-blue-300 font-mono py-1 px-3 self-start sm:self-auto">
            {completedCount}/{checklist.length} Verified Safe
          </Badge>
        </div>

        <div className="space-y-3">
          {checklist.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                  isChecked
                    ? 'border-emerald-500/30 bg-emerald-500/10'
                    : 'border-slate-800/80 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div className="mt-0.5 shrink-0 text-slate-400">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-500" />
                  )}
                </div>
                <div>
                  <h4 className={`text-sm font-semibold transition-colors ${isChecked ? 'text-emerald-300' : 'text-slate-200'}`}>
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Emergency Damage Control */}
      <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400">
            <LifeBuoy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Emergency Damage Control: "I Clicked or Entered My Info"</h3>
            <p className="text-xs text-slate-300 mt-0.5">Immediate steps to minimize financial and identity exposure</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-5 space-y-2">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <Lock className="w-4 h-4 text-rose-400" />
              <span>1. Freeze or Lock Cards</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              If you provided credit or debit card numbers, open your banking app right now and toggle <strong>Freeze Card</strong> or call the 24/7 hotline on your card.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-5 space-y-2">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>2. Reset Account Passwords</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Go to the official website from a separate, clean browser or mobile app and immediately reset the password for any compromised account.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-5 space-y-2">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>3. Revoke Session Logins</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              In your security settings (Google, Apple, Microsoft, Bank), choose <strong>"Sign out of all other devices"</strong> to terminate any session stolen by session-hijackers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
