import { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, RotateCcw, Award } from 'lucide-react';

export interface QuizScenario {
  id: number;
  category: 'SMS' | 'URL' | 'EMAIL' | 'QR';
  title: string;
  senderOrUrl: string;
  body: string;
  isLegitimate: boolean;
  explanation: string;
  forensicGiveaway: string;
}

interface QuizCardProps {
  scenario: QuizScenario;
  onAnswer: (scenarioId: number, userThinksLegit: boolean) => void;
  userAnswer: boolean | null;
}

export const QuizCard = ({ scenario, onAnswer, userAnswer }: QuizCardProps) => {
  const isAnswered = userAnswer !== null;
  const isCorrect = isAnswered && userAnswer === scenario.isLegitimate;

  const getCategoryBadge = (cat: QuizScenario['category']) => {
    switch (cat) {
      case 'SMS':
        return 'bg-[#F0C020] text-[#121212]';
      case 'URL':
        return 'bg-[#1040C0] text-white';
      case 'EMAIL':
        return 'bg-[#D02020] text-white';
      case 'QR':
        return 'bg-[#121212] text-white';
    }
  };

  return (
    <div className="bg-white border-2 sm:border-4 border-[#121212] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] sm:shadow-[8px_8px_0px_0px_#121212] space-y-6">
      <div className="flex items-center justify-between border-b-2 sm:border-b-4 border-[#121212] pb-4">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-black uppercase px-2.5 py-0.5 border border-[#121212] ${getCategoryBadge(scenario.category)}`}>
            {scenario.category} SCENARIO
          </span>
          <span className="text-xs font-bold uppercase text-[#62666D]">
            Case #{scenario.id}
          </span>
        </div>

        <span className="text-xs font-black uppercase tracking-widest text-[#121212]">
          SPOT THE THREAT
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#121212]">
          {scenario.title}
        </h3>
        <div className="bg-[#F0F0F0] border-2 border-[#121212] p-2.5 font-mono text-xs text-[#121212] break-all">
          <span className="font-bold text-[#62666D] uppercase text-[10px] block">Sender / Header / Link:</span>
          {scenario.senderOrUrl}
        </div>
      </div>

      {/* Simulated Message Payload Box */}
      <div className="bg-white border-2 border-[#121212] p-5 font-mono text-sm leading-relaxed text-[#121212] shadow-inner space-y-2">
        <span className="text-[10px] font-bold uppercase text-[#62666D] block font-sans">
          Incoming Payload:
        </span>
        <p className="whitespace-pre-wrap">{scenario.body}</p>
      </div>

      {/* Action Buttons: Pick Legit vs Phishing */}
      {!isAnswered ? (
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onAnswer(scenario.id, true)}
            className="h-13 px-6 bg-[#FFF9C4] hover:bg-[#F0C020] text-[#121212] border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] text-sm font-black uppercase tracking-wider transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5 text-[#1040C0]" strokeWidth={2.5} />
            <span>AUTHENTIC / SAFE</span>
          </button>

          <button
            type="button"
            onClick={() => onAnswer(scenario.id, false)}
            className="h-13 px-6 bg-[#D02020] hover:bg-[#b01818] text-white border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] text-sm font-black uppercase tracking-wider transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2"
          >
            <XCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
            <span>PHISHING / SCAM</span>
          </button>
        </div>
      ) : (
        /* Answer Reveal Dossier */
        <div className="space-y-4 pt-4 border-t-2 sm:border-t-4 border-[#121212]">
          <div className={`p-4 border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212] flex items-center justify-between gap-3 ${
            isCorrect ? 'bg-[#FFF9C4] text-[#121212]' : 'bg-[#D02020] text-white'
          }`}>
            <div className="flex items-center gap-2 font-black uppercase text-sm">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-[#1040C0]" strokeWidth={3} />
              ) : (
                <AlertTriangle className="w-5 h-5 text-white" strokeWidth={3} />
              )}
              <span>
                {isCorrect
                  ? 'CORRECT! YOUR INTEL WAS ACCURATE'
                  : 'INCORRECT EVALUATION! WATCH OUT'}
              </span>
            </div>

            <span className={`text-xs font-black uppercase px-2 py-0.5 border border-[#121212] ${
              isCorrect ? 'bg-[#121212] text-white' : 'bg-white text-[#D02020]'
            }`}>
              {scenario.isLegitimate ? 'GENUINE' : 'ATTACK PAYLOAD'}
            </span>
          </div>

          <div className="bg-[#F0F0F0] border-2 border-[#121212] p-4 text-xs sm:text-sm text-[#121212] space-y-2">
            <p className="font-medium leading-relaxed">{scenario.explanation}</p>
            <div className="pt-2 border-t border-[#121212]/30 flex items-start gap-2 font-mono text-xs">
              <strong className="text-[#D02020] uppercase shrink-0">Forensic Giveaway:</strong>
              <span>{scenario.forensicGiveaway}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
