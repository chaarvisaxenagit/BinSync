import React, { useState } from 'react';
import {
  AlertOctagon,
  CheckCircle2,
  CloudUpload,
  MapPin,
  Navigation,
  Play,
  RefreshCw,
  Upload,
  Volume2,
} from 'lucide-react';
import {
  buildWorkerTtsAnnouncement,
  speakText,
  translateCategory,
  translateDynamicText,
  translatePriority,
  translateStatus,
  useLanguage,
} from '../../lib/i18n';
import {
  SEED_MARKET_AFTER_URL,
  useBinSync,
} from '../../lib/firebase';
import { Ticket, VerifyResult } from '../../types';

export default function WorkerDashboardPage() {
  const { lang, t } = useLanguage();
  const {
    user,
    tickets,
    loginDemo,
    startWorkerJob,
    submitWorkerVerification,
  } = useBinSync();

  const [verifyingTicketId, setVerifyingTicketId] = useState<string | null>(null);
  const [verifyResults, setVerifyResults] = useState<Record<string, VerifyResult>>({});
  const [verifyErrors, setVerifyErrors] = useState<Record<string, string>>({});
  const [activeNavBanner, setActiveNavBanner] = useState<string | null>(null);
  const [speakingTicketId, setSpeakingTicketId] = useState<string | null>(null);

  const handleSpeakTask = (ticket: Ticket) => {
    const speechText = buildWorkerTtsAnnouncement(
      {
        title: ticket.title,
        location: ticket.location,
        priority: ticket.priority,
        wasteCategory: ticket.wasteCategory,
        estimatedEffort: ticket.estimatedEffort,
      },
      lang
    );
    setSpeakingTicketId(ticket.id);
    speakText(speechText, lang);
    window.setTimeout(() => {
      setSpeakingTicketId((prev) => (prev === ticket.id ? null : prev));
    }, 5500);
  };

  const runAfterPhotoVerification = async (ticket: Ticket, afterImageUrl: string) => {
    setVerifyingTicketId(ticket.id);
    setVerifyErrors((prev) => ({ ...prev, [ticket.id]: '' }));

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          beforeImageUrl: ticket.beforeImageUrl,
          afterImageUrl,
          ticketTitle: ticket.title,
          location: ticket.location,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setVerifyErrors((prev) => ({
          ...prev,
          [ticket.id]: data.error || 'Verification request failed.',
        }));
        return;
      }

      const result: VerifyResult = {
        verdict: data.verdict,
        confidence: data.confidence,
        reasoning: data.reasoning,
        blocked: data.blocked,
        nextStatus: data.nextStatus,
      };

      setVerifyResults((prev) => ({ ...prev, [ticket.id]: result }));
      await submitWorkerVerification(
        ticket.id,
        afterImageUrl,
        result.verdict,
        result.confidence,
        result.reasoning,
        result.nextStatus
      );
    } catch (err) {
      setVerifyErrors((prev) => ({
        ...prev,
        [ticket.id]: err instanceof Error ? err.message : 'Network error during AI verification.',
      }));
    } finally {
      setVerifyingTicketId(null);
    }
  };

  const handleWorkerFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    ticket: Ticket
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        runAfterPhotoVerification(ticket, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const getAccessibilitySignal = (ticket: Ticket) => {
    if (ticket.status === 'RESOLVED' || ticket.status === 'CLOSED') {
      return {
        borderClass: 'border-l-8 border-l-emerald-500',
        headerBg:
          'bg-emerald-50 dark:bg-emerald-950/90 text-emerald-950 dark:text-emerald-100 border-b border-emerald-200 dark:border-emerald-500/30',
        statusText: `${t('legendGreenTitle')} (${translateStatus(ticket.status, lang)})`,
      };
    }
    if (ticket.status === 'ACTION_REQUIRED' || ticket.priority === 'CRITICAL') {
      return {
        borderClass: 'border-l-8 border-l-rose-500',
        headerBg:
          'bg-rose-50 dark:bg-rose-950/90 text-rose-950 dark:text-rose-100 border-b border-rose-200 dark:border-rose-500/30',
        statusText: `${t('legendRedTitle')} (${translateStatus(ticket.status, lang)})`,
      };
    }
    return {
      borderClass: 'border-l-8 border-l-amber-400',
      headerBg:
        'bg-amber-50 dark:bg-slate-900/95 text-amber-950 dark:text-amber-100 border-b border-amber-200 dark:border-amber-500/30',
      statusText: `${t('legendYellowTitle')} (${translateStatus(ticket.status, lang)})`,
    };
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto min-w-0">
      {/* High-Contrast Glassmorphic Worker Header */}
      <div className="animate-fade-in-up bg-white/85 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/30 text-slate-900 dark:text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xl shadow-slate-200/60 dark:shadow-black/30 overflow-hidden transition-all">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-wide mb-1">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 dark:bg-amber-400" />
            </span>
            <span>ACTIVE FIELD WORKER</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display break-words">
            {t('workerHeader')}
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 break-words">
            {t('workerSubheader')}
          </p>
        </div>

        {!user || user.role !== 'Worker' ? (
          <button
            type="button"
            onClick={() => loginDemo('Worker')}
            className="min-h-[44px] px-4 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all shrink-0 max-w-full text-ellipsis overflow-hidden cursor-pointer"
          >
            {t('activateWorkerBadgeBtn')}
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-amber-500/30 text-xs text-slate-800 dark:text-slate-200 font-mono tabular-nums shrink-0 max-w-full text-ellipsis overflow-hidden">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 dark:bg-emerald-400" />
            </span>
            <span>{t('activeBadgePrefix')} </span>
            <strong className="text-amber-700 dark:text-amber-400">{user.badgeNumber}</strong>
          </div>
        )}
      </div>

      {/* Accessibility Color Legend */}
      <div className="animate-fade-in-up delay-75 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-bold">
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 backdrop-blur-xl border border-rose-300 dark:border-rose-500/50 text-rose-950 dark:text-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 overflow-hidden min-w-0">
          <span className="break-words min-w-0">{t('legendRedTitle')}</span>
          <span className="font-mono tabular-nums text-rose-700 dark:text-rose-300 shrink-0 max-w-full text-ellipsis overflow-hidden">
            {t('legendRedSub')}
          </span>
        </div>
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 backdrop-blur-xl border border-amber-300 dark:border-amber-500/50 text-amber-950 dark:text-amber-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 overflow-hidden min-w-0">
          <span className="break-words min-w-0">{t('legendYellowTitle')}</span>
          <span className="font-mono tabular-nums text-amber-700 dark:text-amber-300 shrink-0 max-w-full text-ellipsis overflow-hidden">
            {t('legendYellowSub')}
          </span>
        </div>
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 backdrop-blur-xl border border-emerald-300 dark:border-emerald-500/50 text-emerald-950 dark:text-emerald-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 overflow-hidden min-w-0">
          <span className="break-words min-w-0">{t('legendGreenTitle')}</span>
          <span className="font-mono tabular-nums text-emerald-700 dark:text-emerald-300 shrink-0 max-w-full text-ellipsis overflow-hidden">
            {t('legendGreenSub')}
          </span>
        </div>
      </div>

      {activeNavBanner && (
        <div className="animate-fade-in-up p-4 rounded-xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-emerald-500/40 text-slate-900 dark:text-white flex flex-wrap items-center justify-between gap-4 text-xs shadow-lg shadow-emerald-500/10">
          <div className="flex items-center gap-2.5 min-w-0">
            <Navigation className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="break-words">{activeNavBanner}</span>
          </div>
          <button
            type="button"
            onClick={() => setActiveNavBanner(null)}
            className="px-3 py-1 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 rounded-lg font-semibold active:scale-95 transition-all cursor-pointer shrink-0"
          >
            {t('dismissBtn')}
          </button>
        </div>
      )}

      {/* Mobile-First High-Contrast Task Cards */}
      <div className="space-y-6 animate-fade-in-up delay-150">
        {tickets.map((ticket) => {
          const sig = getAccessibilitySignal(ticket);
          const isVerifyingThis = verifyingTicketId === ticket.id;
          const latestVerify = verifyResults[ticket.id];
          const isSpeakingThis = speakingTicketId === ticket.id;

          return (
            <section
              key={ticket.id}
              className={`bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/30 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10 duration-300 transition-all ${sig.borderClass}`}
            >
              {/* High-Contrast Status Strip */}
              <div
                className={`px-4 sm:px-5 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-bold ${sig.headerBg}`}
              >
                <div className="flex flex-wrap items-center gap-2 font-mono tabular-nums break-words min-w-0">
                  <span>{ticket.id}</span>
                  <span aria-hidden="true">·</span>
                  <span>{sig.statusText}</span>
                </div>
                <span className="font-mono tabular-nums break-words shrink-0 max-w-full text-ellipsis overflow-hidden">
                  {t('priorityPrefix')} {translatePriority(ticket.priority, lang)} ·{' '}
                  {translateDynamicText(ticket.estimatedEffort, lang)}
                </span>
              </div>

              <div className="p-4 sm:p-5 space-y-5">
                {/* Title, Location & Prominent Regional TTS Button with Audio Waveform */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 min-w-0">
                  <div className="space-y-1.5 min-w-0">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white break-words">
                      {translateDynamicText(ticket.title, lang)}
                    </h2>
                    <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 flex items-start gap-1.5 break-words">
                      <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{translateDynamicText(ticket.location, lang)}</span>
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 break-words">
                      {t('categoryPrefix')}{' '}
                      <strong className="text-slate-900 dark:text-white">
                        {translateCategory(ticket.wasteCategory, lang)}
                      </strong>{' '}
                      · {t('assignedPrefix')}{' '}
                      <strong className="text-amber-700 dark:text-amber-300">
                        {ticket.assignedWorkerName || 'WRK-8821-DELHI'}
                      </strong>
                    </p>
                  </div>

                  {/* Web Speech API Regional Voice Button with Animated Equalizer Waveform */}
                  <button
                    type="button"
                    onClick={() => handleSpeakTask(ticket)}
                    className="min-h-[44px] px-4 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-bold text-xs rounded-xl border border-amber-300 dark:border-amber-200 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2.5 shrink-0 max-w-full text-ellipsis overflow-hidden active:scale-95 transition-all cursor-pointer"
                  >
                    {isSpeakingThis ? (
                      <span
                        aria-hidden="true"
                        className="inline-flex items-end gap-0.5 h-4 w-4 shrink-0"
                      >
                        <span className="w-0.5 h-full bg-slate-950 rounded-full animate-eq-1" />
                        <span className="w-0.5 h-full bg-slate-950 rounded-full animate-eq-2" />
                        <span className="w-0.5 h-full bg-slate-950 rounded-full animate-eq-3" />
                        <span className="w-0.5 h-full bg-slate-950 rounded-full animate-eq-4" />
                      </span>
                    ) : (
                      <Volume2 className="w-4 h-4 shrink-0" />
                    )}
                    <span className="truncate">
                      {t('speakDirectionsBtn')} ({lang})
                    </span>
                  </button>
                </div>

                {/* Side-by-Side Before & After Photos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200 tracking-wide break-words">
                      {t('beforePhotoLabel')}
                    </p>
                    <div className="rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700/80 aspect-4/3 bg-slate-100 dark:bg-slate-950">
                      <img
                        src={ticket.beforeImageUrl}
                        alt={`Site before cleanup for ${ticket.title}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200 tracking-wide break-words">
                      {t('afterPhotoLabel')}
                    </p>
                    {ticket.afterImageUrl ? (
                      <div className="rounded-xl overflow-hidden border border-emerald-500/50 aspect-4/3 bg-slate-100 dark:bg-slate-950">
                        <img
                          src={ticket.afterImageUrl}
                          alt={`Site after cleanup for ${ticket.title}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <label className="rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500/60 aspect-4/3 bg-slate-50 dark:bg-slate-950/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all">
                        <CloudUpload className="w-7 h-7 text-emerald-600 dark:text-emerald-400 animate-float-slow mb-2 shrink-0" />
                        <p className="text-xs font-bold text-slate-900 dark:text-white break-words">
                          {t('postCleanupRequiredTitle')}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 break-words">
                          {t('postCleanupRequiredDesc')}
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={isVerifyingThis}
                          onChange={(e) => handleWorkerFileUpload(e, ticket)}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* High-Contrast Worker Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => startWorkerJob(ticket.id)}
                    disabled={
                      ticket.status === 'IN_PROGRESS' ||
                      ticket.status === 'RESOLVED' ||
                      ticket.status === 'CLOSED'
                    }
                    className="min-h-[44px] py-2.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 disabled:opacity-40 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 shrink-0" />
                    <span className="break-words">{t('startJobBtn')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveNavBanner(
                        `GPS → ${translateDynamicText(ticket.location, lang)} (28.6139° N, 77.2090° E)`
                      )
                    }
                    className="min-h-[44px] py-2.5 px-4 text-xs font-bold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-950/80 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500/40 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                  >
                    <Navigation className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="break-words">{t('navigateSiteBtn')}</span>
                  </button>
                </div>

                {/* Upload Post-Cleanup Photo + One-Click AI Verification Test Controls */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-3">
                  <p className="text-xs font-bold text-slate-900 dark:text-white break-words">
                    {isVerifyingThis ? t('verifyingCleanup') : t('uploadAfterPhotoBtn')}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <label className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer transition-all">
                      <Upload className="w-4 h-4 shrink-0" />
                      <span className="break-words">{t('uploadPostCleanupBtn')}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isVerifyingThis}
                        onChange={(e) => handleWorkerFileUpload(e, ticket)}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      disabled={isVerifyingThis}
                      onClick={() => runAfterPhotoVerification(ticket, SEED_MARKET_AFTER_URL)}
                      className="min-h-[44px] px-4 py-2.5 text-xs font-bold text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/70 border border-emerald-300 dark:border-emerald-500/40 rounded-xl active:scale-95 transition-all cursor-pointer break-words"
                    >
                      {t('demoVerifyPassBtn')}
                    </button>

                    <button
                      type="button"
                      disabled={isVerifyingThis}
                      onClick={() => runAfterPhotoVerification(ticket, ticket.beforeImageUrl)}
                      className="min-h-[44px] px-4 py-2.5 text-xs font-bold text-rose-900 dark:text-rose-200 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/70 border border-rose-300 dark:border-rose-500/40 rounded-xl active:scale-95 transition-all cursor-pointer break-words"
                    >
                      {t('demoVerifyFailBtn')}
                    </button>
                  </div>
                </div>

                {verifyErrors[ticket.id] && (
                  <div className="p-3.5 bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-500/50 rounded-xl text-xs font-bold text-rose-900 dark:text-rose-200 break-words">
                    {verifyErrors[ticket.id]}
                  </div>
                )}

                {/* Instant AI Verification Feedback Card */}
                {(latestVerify || ticket.aiVerdict) && (
                  <div
                    className={`p-4 rounded-xl border space-y-2 overflow-hidden ${
                      (latestVerify?.verdict || ticket.aiVerdict) === 'CLEANED'
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-500/50 text-emerald-950 dark:text-emerald-100'
                        : 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-500/50 text-rose-950 dark:text-rose-100'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
                      <span className="flex items-center gap-1.5 break-words">
                        {(latestVerify?.verdict || ticket.aiVerdict) === 'CLEANED' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : (
                          <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                        )}
                        <span>
                          {t('geminiVerdictPrefix')} {latestVerify?.verdict || ticket.aiVerdict}
                        </span>
                      </span>
                      <span className="font-mono tabular-nums text-emerald-800 dark:text-emerald-300">
                        {t('confidenceSuffix')}: {latestVerify?.confidence ?? ticket.aiConfidence}%
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed break-words">
                      {latestVerify?.reasoning || ticket.aiReasoning}
                    </p>

                    {ticket.status === 'ACTION_REQUIRED' && (
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-rose-200 dark:border-rose-500/30">
                        <span className="text-xs font-bold text-rose-900 dark:text-rose-200 break-words">
                          {t('hardEnforcementBanner')}
                        </span>
                        <button
                          type="button"
                          onClick={() => runAfterPhotoVerification(ticket, SEED_MARKET_AFTER_URL)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl active:scale-95 transition-all cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5 shrink-0" />
                          <span className="break-words">{t('retryUploadBtn')}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
