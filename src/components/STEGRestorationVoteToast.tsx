import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, X, Radio, ThumbsUp, ThumbsDown } from 'lucide-react';
import { STEGAnnouncement } from '../services/stegParser';

interface STEGRestorationVoteToastProps {
  announcement: STEGAnnouncement;
  onClose: () => void;
  onVote: (announcementId: string, delegationId: number, vote: 'RESTORED' | 'STILL_OFF') => Promise<void>;
  userDelegationId?: number;
}

export const STEGRestorationVoteToast: React.FC<STEGRestorationVoteToastProps> = ({
  announcement,
  onClose,
  onVote,
  userDelegationId
}) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedVote, setSelectedVote] = useState<'RESTORED' | 'STILL_OFF' | null>(null);

  const primaryDelegation = announcement.affectedAreas[0];
  const targetDelId = userDelegationId || primaryDelegation?.delegationId || 1;

  const handleVoteClick = async (vote: 'RESTORED' | 'STILL_OFF') => {
    setIsSubmitting(true);
    setSelectedVote(vote);
    try {
      await onVote(announcement.id, targetDelId, vote);
      setHasVoted(true);
      setTimeout(() => {
        onClose();
      }, 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPending = announcement.restorationStatus === 'RESTORED_PENDING' || announcement.isPastExpiry;

  return (
    <div className="fixed bottom-16 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 z-50 bg-slate-900/95 backdrop-blur-xl border border-emerald-500/50 rounded-3xl p-4 shadow-2xl text-slate-100 animate-slide-in">
      <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-emerald-300 uppercase tracking-wide">
              {isPending ? '⏰ Horaire d\'annonce atteint' : '⚡ Suivi d\'annonce STEG'}
            </h4>
            <p className="text-[11px] text-slate-300 font-bold">
              {announcement.timeRange.start} - {announcement.timeRange.end} · {primaryDelegation?.delegationName || 'Zone STEG'}
            </p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-200">
          <X className="w-4 h-4" />
        </button>
      </div>

      {!hasVoted ? (
        <div className="space-y-3">
          <p className="text-xs text-slate-200 leading-snug">
            Le créneau d'interruption STEG touche à sa fin. <strong>Est-ce que l'électricité est rétablie dans votre zone ?</strong>
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleVoteClick('RESTORED')}
              disabled={isSubmitting}
              className="py-2.5 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg shadow-emerald-600/30 transition-all flex flex-col items-center justify-center gap-0.5 active:scale-95 disabled:opacity-50"
            >
              <div className="flex items-center gap-1.5">
                <ThumbsUp className="w-4 h-4" />
                <span>الضو رجع !</span>
              </div>
              <span className="text-[9px] font-normal opacity-90">Oui, rétabli</span>
            </button>

            <button
              onClick={() => handleVoteClick('STILL_OFF')}
              disabled={isSubmitting}
              className="py-2.5 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all flex flex-col items-center justify-center gap-0.5 active:scale-95 disabled:opacity-50"
            >
              <div className="flex items-center gap-1.5 text-red-400">
                <ThumbsDown className="w-4 h-4" />
                <span>مزال ما رجعش</span>
              </div>
              <span className="text-[9px] font-normal text-slate-400">Toujours coupé</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 pt-1 font-mono">
            <span>Votes confirmation: <strong className="text-emerald-400">{announcement.restoredVotesCount || 0} / 3</strong></span>
            <span>(Consensus 3+ votes)</span>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-center space-y-1">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto animate-bounce" />
          <p className="text-xs font-bold text-emerald-300">Merci pour votre confirmation !</p>
          <p className="text-[10px] text-slate-300">Votre vote aide tous les citoyens de votre secteur.</p>
        </div>
      )}
    </div>
  );
};
