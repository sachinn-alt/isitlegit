import { useState } from 'react';
import { ShieldCheck, CheckSquare, Square, LifeBuoy, Zap, Lock } from 'lucide-react';

export const ProtectionTipsCard = () => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const checklist = [
    {
      id: 1,
      title: 'Inspect the Root Domain Segment',
      desc: 'Look at the last two segments of the address before the first slash. For example, "chase.com.security-login.xyz" is security-login.xyz, NOT Chase.',
    },
    {
      id: 2,
      title: 'Beware of Artificial Panic & Timers',
      desc: 'Scams rely on creating panic ("Account closing in 2 hours", "Arrest notice"). Legitimate financial institutions never demand gift card or crypto payments.',
    },
    {
      id: 3,
      title: 'Never Disclose SMS OTP Codes Over Phone',
      desc: 'Bank customer service agents will NEVER call you requesting a 6-digit one-time code sent to your phone. Those codes are strictly for your eyes.',
    },
    {
      id: 4,
      title: 'Navigate Directly to the Source (Out-of-Band)',
      desc: 'If a notification claims your delivery is stuck, close the message, open your browser, and type the carrier website manually or open their mobile app.',
    },
    {
      id: 5,
      title: 'Examine Sender Reply-To Email Headers',
      desc: 'Click on the sender profile to inspect the underlying email address. If the display name says "Netflix Support" but the address is @yahoo.com, it is 100% fake.',
    },
  ];

  const toggleItem = (id: number) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Interactive Scam Checklist in Bauhaus */}
      <div className="bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 sm:border-b-4 border-[#121212] pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
              <Zap className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[#121212]">
                5-SECOND HEURISTIC CHECKLIST
              </h3>
              <p className="text-xs font-bold uppercase text-[#62666D]">
                Pre-flight sanity check before clicking links or granting permissions
              </p>
            </div>
          </div>

          <span className="text-xs font-black uppercase px-3 py-1 bg-[#121212] text-white border-2 border-[#121212] shadow-[2px_2px_0px_0px_#D02020] self-start sm:self-auto">
            {completedCount}/{checklist.length} VERIFIED
          </span>
        </div>

        <div className="space-y-3">
          {checklist.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`flex items-start gap-3.5 p-4 border-2 border-[#121212] transition-all cursor-pointer select-none shadow-[2px_2px_0px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                  isChecked
                    ? 'bg-[#FFF9C4]'
                    : 'bg-[#F0F0F0] hover:bg-white'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-[#1040C0]" strokeWidth={2.5} />
                  ) : (
                    <Square className="w-5 h-5 text-[#121212]" strokeWidth={2.5} />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-[#121212]">
                    {item.title}
                  </h4>
                  <p className="text-xs font-medium text-[#121212] mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Emergency Damage Control - Bauhaus Red Block */}
      <div className="bg-[#D02020] text-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-white pb-4">
          <div className="flex h-10 w-10 items-center justify-center bg-white text-[#D02020] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
            <LifeBuoy className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight text-white">
              EMERGENCY DAMAGE CONTROL: "I ENTERED CREDENTIALS"
            </h3>
            <p className="text-xs font-bold uppercase text-[#FFF9C4]">
              Immediate containment steps to arrest financial and account loss
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-white text-[#121212] border-2 border-[#121212] p-5 space-y-2 shadow-[3px_3px_0px_0px_#121212]">
            <div className="flex items-center gap-2 font-black uppercase text-sm text-[#D02020]">
              <Lock className="w-4 h-4" strokeWidth={2.5} />
              <span>1. Freeze Payment Cards</span>
            </div>
            <p className="font-medium leading-relaxed">
              If card details were submitted, open your banking app immediately and activate <strong>Freeze Card</strong> or contact the emergency card number.
            </p>
          </div>

          <div className="bg-white text-[#121212] border-2 border-[#121212] p-5 space-y-2 shadow-[3px_3px_0px_0px_#121212]">
            <div className="flex items-center gap-2 font-black uppercase text-sm text-[#1040C0]">
              <Zap className="w-4 h-4" strokeWidth={2.5} />
              <span>2. Change Master Password</span>
            </div>
            <p className="font-medium leading-relaxed">
              Open the genuine official website from a clean browser or mobile app and immediately reset login passwords.
            </p>
          </div>

          <div className="bg-white text-[#121212] border-2 border-[#121212] p-5 space-y-2 shadow-[3px_3px_0px_0px_#121212]">
            <div className="flex items-center gap-2 font-black uppercase text-sm text-[#121212]">
              <ShieldCheck className="w-4 h-4" strokeWidth={2.5} />
              <span>3. Terminate All Sessions</span>
            </div>
            <p className="font-medium leading-relaxed">
              In your security settings (Google, Apple, Microsoft, Bank), trigger <strong>"Sign out of all other devices"</strong> to invalidate stolen session cookies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
