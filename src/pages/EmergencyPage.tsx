import { useState } from 'react';
import { SEOHead } from '@/components/seo/SEOHead';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PhoneCall, ShieldAlert, AlertOctagon, Lock, Copy, Check, FileText, ExternalLink, Globe } from 'lucide-react';
import { toast } from 'sonner';

interface BankHotline {
  name: string;
  country: 'US' | 'IN' | 'UK';
  phone: string;
  alternatePhone?: string;
  officialDomain: string;
  cardFreezeInstruction: string;
}

export const EmergencyPage = () => {
  const [selectedCountry, setSelectedCountry] = useState<'ALL' | 'US' | 'IN' | 'UK'>('ALL');
  const [copiedMemo, setCopiedMemo] = useState(false);

  // Form states for Dispute Memo Generator
  const [bankName, setBankName] = useState('');
  const [incidentDate, setIncidentDate] = useState(new Date().toISOString().split('T')[0]);
  const [details, setDetails] = useState('');
  const [unauthorizedAmount, setUnauthorizedAmount] = useState('');

  const hotlines: BankHotline[] = [
    // United States
    {
      name: 'Chase Bank (JPMorgan)',
      country: 'US',
      phone: '1-800-935-9935',
      alternatePhone: '1-877-242-7372',
      officialDomain: 'chase.com',
      cardFreezeInstruction: 'Chase Mobile App → Select Card → Manage Account → Lock Card',
    },
    {
      name: 'Bank of America',
      country: 'US',
      phone: '1-800-432-1000',
      alternatePhone: '1-800-732-9194',
      officialDomain: 'bankofamerica.com',
      cardFreezeInstruction: 'BofA App → Manage Debit/Credit Card → Lock Card',
    },
    {
      name: 'Wells Fargo',
      country: 'US',
      phone: '1-800-869-3557',
      alternatePhone: '1-800-642-4720',
      officialDomain: 'wellsfargo.com',
      cardFreezeInstruction: 'Wells Fargo App → Card Settings → Turn Card On/Off',
    },
    {
      name: 'Citibank',
      country: 'US',
      phone: '1-800-374-9700',
      officialDomain: 'citi.com',
      cardFreezeInstruction: 'Citi Mobile → Profile → Manage Cards → Quick Lock',
    },
    {
      name: 'FBI Internet Crime Complaint Center (IC3)',
      country: 'US',
      phone: '1-800-225-5324',
      officialDomain: 'ic3.gov',
      cardFreezeInstruction: 'Submit online cyber fraud affidavit at ic3.gov within 24 hours.',
    },

    // India (Bharat)
    {
      name: 'National Cyber Crime Helpline (Govt of India)',
      country: 'IN',
      phone: '1930',
      officialDomain: 'cybercrime.gov.in',
      cardFreezeInstruction: 'Dial 1930 immediately to freeze financial pipeline within golden hours.',
    },
    {
      name: 'State Bank of India (SBI)',
      country: 'IN',
      phone: '1800 11 2211',
      alternatePhone: '1800 425 3800',
      officialDomain: 'sbi.co.in',
      cardFreezeInstruction: 'SMS "BLOCK <last 4 digits>" to 567676 or YONO App → Service Request → Block Card',
    },
    {
      name: 'HDFC Bank',
      country: 'IN',
      phone: '1800 1600',
      alternatePhone: '1800 2600',
      officialDomain: 'hdfcbank.com',
      cardFreezeInstruction: 'HDFC MobileBanking → Pay → Cards → Instant Block Card',
    },
    {
      name: 'ICICI Bank',
      country: 'IN',
      phone: '1800 1080',
      officialDomain: 'icicibank.com',
      cardFreezeInstruction: 'iMobile App → Services → Card Services → Block Debit/Credit Card',
    },
    {
      name: 'Axis Bank',
      country: 'IN',
      phone: '1860 419 5555',
      officialDomain: 'axisbank.com',
      cardFreezeInstruction: 'Axis Mobile → Dashboard → Debit/Credit Cards → Block/Replace',
    },

    // United Kingdom
    {
      name: 'Action Fraud (UK Police National Reporting)',
      country: 'UK',
      phone: '0300 123 2040',
      officialDomain: 'actionfraud.police.uk',
      cardFreezeInstruction: 'Call 24/7 hotline or file online police incident reference.',
    },
    {
      name: 'Barclays UK',
      country: 'UK',
      phone: '0800 389 1652',
      officialDomain: 'barclays.co.uk',
      cardFreezeInstruction: 'Barclays App → Cards → Temporary Freeze',
    },
    {
      name: 'HSBC UK',
      country: 'UK',
      phone: '03457 404 404',
      officialDomain: 'hsbc.co.uk',
      cardFreezeInstruction: 'HSBC Mobile App → Manage Cards → Freeze Card',
    },
    {
      name: 'NatWest',
      country: 'UK',
      phone: '0800 051 4176',
      officialDomain: 'natwest.com',
      cardFreezeInstruction: 'NatWest App → Manage my card → Lock card',
    },
  ];

  const filteredHotlines = hotlines.filter((h) => {
    if (selectedCountry === 'ALL') return true;
    return h.country === selectedCountry;
  });

  const generateDisputeMemo = () => {
    return `FORMAL NOTICE OF UNAUTHORIZED TRANSACTION & FRAUD INCIDENT
------------------------------------------------------------
TO: Fraud & Dispute Resolution Department, ${bankName || '[Institution Name]'}
DATE OF INCIDENT: ${incidentDate}
ESTIMATED EXPOSURE / AMOUNT: ${unauthorizedAmount || 'Pending Audit'}

INCIDENT PARTICULARS:
${details || 'Entered card details / clicked malicious deceptive link resulting in unauthorized exposure.'}

IMMEDIATE REMEDIAL ACTIONS TAKEN:
1. Account / card frozen via emergency banking hotline.
2. Compromised credentials and passwords rotated from separate clean device.
3. Connected OAuth session tokens terminated.

This document serves as formal declaration under consumer protection regulations (Electronic Fund Transfer Act / RBI Consumer Protection Circular / UK Payment Services Regulations) demanding immediate investigation and reversal of unauthorized charges.
------------------------------------------------------------
Generated via IsItLegit Incident Response Engine (https://isitlegit.app)`;
  };

  const handleCopyMemo = async () => {
    try {
      await navigator.clipboard.writeText(generateDisputeMemo());
      setCopiedMemo(true);
      toast.success('Dispute memo copied to clipboard!');
      setTimeout(() => setCopiedMemo(false), 2500);
    } catch {
      toast.error('Clipboard access denied.');
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-8 py-8 space-y-12">
      <SEOHead
        title="Emergency Fraud Hotline Directory & Instant Incident Response"
        description="Immediate one-touch fraud hotlines for major banks (US, India, UK), emergency card freezing commands, and automated dispute memo generator."
        canonicalPath="/emergency"
      />

      <Breadcrumbs items={[{ label: 'Emergency Response', path: '/emergency' }]} />

      {/* Emergency Header in Bauhaus Red */}
      <div className="bg-[#D02020] text-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center bg-white text-[#D02020] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
            <AlertOctagon className="w-8 h-8" strokeWidth={2.5} />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#FFF9C4]">
              URGENT INCIDENT RESPONSE
            </span>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
              BANK FRAUD HOTLINE DIRECTORY
            </h1>
          </div>
        </div>

        <p className="text-xs sm:text-sm font-medium text-white max-w-2xl leading-relaxed">
          If you entered account credentials, card numbers, or OTP codes on a deceptive link, execute containment immediately. Contact your financial institution within 2 hours to activate statutory zero-liability protections.
        </p>
      </div>

      {/* Region Filter Switcher */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 sm:border-b-4 border-[#121212] pb-4">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#121212] flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-[#1040C0]" strokeWidth={2.5} />
            <span>VERIFIED EMERGENCY PHONE CONTACTS</span>
          </h2>

          <div className="flex items-center gap-1.5 bg-white p-1 border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212]">
            <Globe className="w-4 h-4 text-[#62666D] ml-1" />
            {(['ALL', 'US', 'IN', 'UK'] as const).map((country) => (
              <button
                key={country}
                type="button"
                onClick={() => setSelectedCountry(country)}
                className={`px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCountry === country
                    ? 'bg-[#121212] text-white'
                    : 'text-[#121212] hover:bg-[#F0F0F0]'
                }`}
              >
                {country === 'ALL' ? 'GLOBAL' : country}
              </button>
            ))}
          </div>
        </div>

        {/* Hotlines Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHotlines.map((h, idx) => (
            <div
              key={idx}
              className="bg-white border-2 sm:border-4 border-[#121212] p-5 shadow-[4px_4px_0px_0px_#121212] flex flex-col justify-between space-y-4 hover:-translate-y-0.5 transition-transform"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-black text-base uppercase text-[#121212]">
                    {h.name}
                  </h3>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-[#F0C020] text-[#121212] border border-[#121212]">
                    {h.country}
                  </span>
                </div>

                <div className="bg-[#FFF9C4] border-2 border-[#121212] p-2.5 text-xs text-[#121212] space-y-1">
                  <span className="font-bold text-[10px] uppercase text-[#62666D] block">Fast App Freeze:</span>
                  <p className="font-medium">{h.cardFreezeInstruction}</p>
                </div>
              </div>

              <div className="pt-2 border-t-2 border-[#121212] flex items-center justify-between gap-2">
                <a
                  href={`tel:${h.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 h-11 bg-[#1040C0] hover:bg-[#0c3196] text-white border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] text-xs font-black uppercase tracking-wider transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  <PhoneCall className="w-4 h-4 text-white" strokeWidth={2.5} />
                  <span>CALL {h.phone}</span>
                </a>

                {h.alternatePhone && (
                  <a
                    href={`tel:${h.alternatePhone.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center justify-center px-3 h-11 bg-white hover:bg-[#F0F0F0] text-[#121212] border-2 border-[#121212] text-xs font-bold uppercase tracking-wider"
                    title={`Alt: ${h.alternatePhone}`}
                  >
                    ALT
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dispute Memo Generator in Bauhaus Style */}
      <div className="bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] space-y-6">
        <div className="border-b-2 sm:border-b-4 border-[#121212] pb-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#F0C020] text-[#121212] text-xs font-black uppercase tracking-wider mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>STANDARDIZED FRAUD AFFIDAVIT</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#121212]">
            INSTANT BANK DISPUTE MEMO GENERATOR
          </h2>
          <p className="text-xs font-bold uppercase text-[#62666D]">
            Draft an evidentiary memorandum to email your fraud team or hand to law enforcement
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-[#121212]">Target Bank Name</span>
            <input
              type="text"
              placeholder="e.g. Chase Bank / SBI"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full h-11 px-3 bg-[#F0F0F0] border-2 border-[#121212] text-xs font-bold text-[#121212] rounded-none focus:bg-white focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-[#121212]">Incident Date</span>
            <input
              type="date"
              value={incidentDate}
              onChange={(e) => setIncidentDate(e.target.value)}
              className="w-full h-11 px-3 bg-[#F0F0F0] border-2 border-[#121212] text-xs font-bold text-[#121212] rounded-none focus:bg-white focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-[#121212]">Disputed Amount ($/₹/£)</span>
            <input
              type="text"
              placeholder="e.g. $184.20 or N/A"
              value={unauthorizedAmount}
              onChange={(e) => setUnauthorizedAmount(e.target.value)}
              className="w-full h-11 px-3 bg-[#F0F0F0] border-2 border-[#121212] text-xs font-bold text-[#121212] rounded-none focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-black uppercase text-[#121212]">What Happened (Deceptive link, fake SMS, etc.)</span>
          <textarea
            rows={3}
            placeholder="Describe what occurred: e.g. Received SMS claiming package held, clicked link, entered card credentials before realizing domain was spoofed."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full p-3 bg-[#F0F0F0] border-2 border-[#121212] text-xs font-medium text-[#121212] rounded-none focus:bg-white focus:outline-none"
          />
        </div>

        {/* Preview of the Generated Memo */}
        <div className="space-y-2">
          <span className="text-xs font-black uppercase text-[#62666D]">Generated Evidentiary Notice:</span>
          <pre className="p-4 bg-[#F0F0F0] border-2 border-[#121212] font-mono text-xs text-[#121212] whitespace-pre-wrap leading-relaxed shadow-inner">
            {generateDisputeMemo()}
          </pre>
        </div>

        <button
          type="button"
          onClick={handleCopyMemo}
          className="w-full sm:w-auto h-12 px-6 bg-[#D02020] hover:bg-[#b01818] text-white border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] text-xs font-black uppercase tracking-wider transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none inline-flex items-center justify-center gap-2"
        >
          {copiedMemo ? <Check className="w-4 h-4 text-white" strokeWidth={3} /> : <Copy className="w-4 h-4 text-white" strokeWidth={2.5} />}
          <span>{copiedMemo ? 'COPIED TO CLIPBOARD' : 'COPY FORMAL DISPUTE MEMO'}</span>
        </button>
      </div>
    </div>
  );
};
