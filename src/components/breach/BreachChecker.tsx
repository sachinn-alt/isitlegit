import { useState } from 'react';
import { ShieldCheck, ShieldAlert, Eye, EyeOff, Lock, Sparkles, RefreshCw, KeyRound, AlertTriangle } from 'lucide-react';

export const BreachChecker = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{
    tested: boolean;
    breachCount: number;
    sha1Prefix: string;
    entropyBits: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateEntropy = (str: string): number => {
    if (!str) return 0;
    const len = str.length;
    let pool = 0;
    if (/[a-z]/.test(str)) pool += 26;
    if (/[A-Z]/.test(str)) pool += 26;
    if (/[0-9]/.test(str)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(str)) pool += 33;
    if (pool === 0) return 0;
    return Math.round(len * Math.log2(pool));
  };

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setIsChecking(true);
    setError(null);

    try {
      // 1. Client-Side SHA-1 Hash using Web Crypto API
      const msgUint8 = new TextEncoder().encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();

      // 2. k-Anonymity Partitioning
      const prefix = hashHex.slice(0, 5);
      const suffix = hashHex.slice(5);

      // 3. Query range API (only first 5 chars sent — impossible to reverse full password)
      const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
        headers: { 'Add-Padding': 'true' },
      });

      if (!res.ok) {
        throw new Error('Unable to contact breach database registry.');
      }

      const text = await res.text();
      const lines = text.split('\n');
      let count = 0;

      for (const line of lines) {
        const [hashSuffix, countStr] = line.trim().split(':');
        if (hashSuffix && hashSuffix.toUpperCase() === suffix) {
          count = parseInt(countStr, 10) || 0;
          break;
        }
      }

      setResult({
        tested: true,
        breachCount: count,
        sha1Prefix: prefix,
        entropyBits: calculateEntropy(password),
      });
    } catch (err: any) {
      setError(err?.message || 'Error executing client-side k-Anonymity query.');
    } finally {
      setIsChecking(false);
    }
  };

  const reset = () => {
    setPassword('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 sm:border-b-4 border-[#121212] pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#1040C0] text-white text-xs font-black uppercase tracking-wider mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>K-ANONYMITY ZERO-LEAKAGE ENGINE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#121212]">
            CREDENTIAL EXPOSURE AUDIT
          </h3>
          <p className="text-xs font-bold uppercase text-[#62666D]">
            Check if a password has leaked in historical public data dumps without revealing it
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#FFF9C4] border-2 border-[#121212] text-xs font-black uppercase tracking-wider text-[#121212]">
          <span className="w-2 h-2 rounded-full bg-[#121212]" />
          <span>LOCAL WEB CRYPTO SHA-1</span>
        </div>
      </div>

      <form onSubmit={handleCheck} className="space-y-4">
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Type a password to test against 800M+ leaked credentials..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-14 pl-4 pr-24 font-mono text-base bg-[#F0F0F0] border-2 border-[#121212] text-[#121212] placeholder:text-[#62666D] focus:bg-white focus:outline-none shadow-inner"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-1.5 text-[#121212] hover:bg-[#F0C020] border border-[#121212] transition-colors"
              title={showPassword ? 'Hide characters' : 'Show characters'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs font-medium text-[#62666D]">
            🔒 <strong>Zero Data Storage</strong>: Only a 5-character SHA-1 prefix is queried via k-anonymity. Your password never leaves your device and vanishes immediately after check.
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {result && (
              <button
                type="button"
                onClick={reset}
                className="h-11 px-4 bg-white hover:bg-[#F0F0F0] text-[#121212] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                RESET
              </button>
            )}

            <button
              type="submit"
              disabled={isChecking || !password}
              className="flex-1 sm:flex-none h-11 px-6 bg-[#D02020] hover:bg-[#b01818] text-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] text-xs font-black uppercase tracking-wider transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isChecking && <RefreshCw className="w-4 h-4 animate-spin text-white" />}
              <span>{isChecking ? 'AUDITING...' : 'AUDIT PASSWORD'}</span>
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-[#D02020] text-white border-2 border-[#121212] text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && result.tested && (
        <div className="space-y-4 pt-4 border-t-2 sm:border-t-4 border-[#121212]">
          <div className={`p-6 border-2 sm:border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] ${
            result.breachCount > 0 
              ? 'bg-[#D02020] text-white' 
              : 'bg-[#FFF9C4] text-[#121212]'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center border-2 border-[#121212] ${
                  result.breachCount > 0 ? 'bg-white text-[#D02020]' : 'bg-[#1040C0] text-white'
                }`}>
                  {result.breachCount > 0 ? (
                    <ShieldAlert className="w-7 h-7" strokeWidth={2.5} />
                  ) : (
                    <ShieldCheck className="w-7 h-7" strokeWidth={2.5} />
                  )}
                </div>
                <div>
                  <h4 className="text-2xl font-black uppercase tracking-tight">
                    {result.breachCount > 0
                      ? `EXPOSED IN ${result.breachCount.toLocaleString()} KNOWN BREACHES`
                      : 'ZERO RECORDED EXPOSURES FOUND'}
                  </h4>
                  <p className={`text-xs font-bold uppercase ${
                    result.breachCount > 0 ? 'text-[#FFF9C4]' : 'text-[#62666D]'
                  }`}>
                    {result.breachCount > 0
                      ? 'This password exists in wordlists weaponized by credential-stuffing bots.'
                      : 'No occurrences detected across 800M+ leaked credentials in public breach dumps.'}
                  </p>
                </div>
              </div>

              <span className={`text-sm font-black uppercase px-3 py-1.5 border-2 border-[#121212] self-start sm:self-auto ${
                result.breachCount > 0 ? 'bg-white text-[#D02020]' : 'bg-[#121212] text-white'
              }`}>
                {result.breachCount > 0 ? 'COMPROMISED' : 'CLEAN RECORD'}
              </span>
            </div>
          </div>

          {/* Metric telemetry grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-[#F0F0F0] border-2 border-[#121212] p-3.5 space-y-1 shadow-[2px_2px_0px_0px_#121212]">
              <span className="font-bold uppercase text-[#62666D]">Shannon Entropy</span>
              <div className="text-lg font-black font-mono text-[#121212]">
                {result.entropyBits} bits
              </div>
              <p className="text-[11px] text-[#62666D]">
                {result.entropyBits > 60 ? 'Strong complexity' : 'Weak complexity'}
              </p>
            </div>

            <div className="bg-[#F0F0F0] border-2 border-[#121212] p-3.5 space-y-1 shadow-[2px_2px_0px_0px_#121212]">
              <span className="font-bold uppercase text-[#62666D]">Prefix Sent</span>
              <div className="text-lg font-black font-mono text-[#1040C0]">
                {result.sha1Prefix}*****
              </div>
              <p className="text-[11px] text-[#62666D]">k-Anonymity privacy veil</p>
            </div>

            <div className="bg-[#F0F0F0] border-2 border-[#121212] p-3.5 space-y-1 shadow-[2px_2px_0px_0px_#121212]">
              <span className="font-bold uppercase text-[#62666D]">Action Mandate</span>
              <div className="text-lg font-black uppercase text-[#D02020]">
                {result.breachCount > 0 ? 'ROTATE PASSWORD' : 'SAFE TO USE'}
              </div>
              <p className="text-[11px] text-[#62666D]">
                {result.breachCount > 0 ? 'Do not use for critical accounts' : 'Maintain unique password hygiene'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
