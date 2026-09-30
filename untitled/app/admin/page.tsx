import React, { useState } from 'react';
import {
  CheckCircle2,
  Eye,
  MapPin,
  ShieldCheck,
  X,
  XCircle,
} from 'lucide-react';
import {
  translateCategory,
  translateDynamicText,
  translatePriority,
  translateStatus,
  useLanguage,
} from '../../lib/i18n';
import {
  AVAILABLE_WORKERS,
  SEED_MARKET_AFTER_URL,
  useBinSync,
} from '../../lib/firebase';
import { Ticket, TicketPriority } from '../../types';

const PRIORITY_WEIGHT: Record<TicketPriority, number> = {
  CRITICAL: 4,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

export default function AdminDashboardPage() {
  const { lang, t } = useLanguage();
  const {
    user,
    tickets,
    loginDemo,
    assignTicket,
    overridePriority,
    adminReviewDecision,
  } = useBinSync();

  const [reviewingTicket, setReviewingTicket] = useState<Ticket | null>(null);
  const [adminReasonInput, setAdminReasonInput] = useState<string>('');
  const [modalError, setModalError] = useState<string>('');

  // Citywide Status Metrics
  const countByStatus = (statuses: string[]) =>
    tickets.filter((tk) => statuses.includes(tk.status)).length;

  const metrics = [
    {
      label: t('metricReported'),
      count: countByStatus(['REPORTED', 'OPEN', 'SUBMITTED']),
      tone: 'text-cyan-700 dark:text-cyan-300',
      borderGlow: 'hover:border-cyan-500/40',
    },
    {
      label: t('metricAssigned'),
      count: countByStatus(['ASSIGNED']),
      tone: 'text-amber-700 dark:text-amber-300',
      borderGlow: 'hover:border-amber-500/40',
    },
    {
      label: t('metricInProgress'),
      count: countByStatus(['IN_PROGRESS']),
      tone: 'text-sky-700 dark:text-sky-300',
      borderGlow: 'hover:border-sky-500/40',
    },
    {
      label: t('metricFlagged'),
      count: countByStatus(['FLAGGED', 'ACTION_REQUIRED']),
      tone: 'text-rose-700 dark:text-rose-400',
      borderGlow: 'hover:border-rose-500/40',
    },
    {
      label: t('metricResolved'),
      count: countByStatus(['RESOLVED', 'CLOSED']),
      tone: 'text-emerald-700 dark:text-emerald-400',
      borderGlow: 'hover:border-emerald-500/40',
    },
    {
      label: t('metricReopened'),
      count: countByStatus(['REOPENED']),
      tone: 'text-pink-700 dark:text-pink-400',
      borderGlow: 'hover:border-pink-500/40',
    },
  ];

  // Priority-sorted list: Critical first, then oldest first
  const sortedTickets = [...tickets].sort((a, b) => {
    const pDiff = PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority];
    if (pDiff !== 0) return pDiff;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  const handleAdminDecision = async (decision: 'APPROVE' | 'REJECT') => {
    if (!reviewingTicket) return;
    if (!adminReasonInput.trim() || adminReasonInput.trim().length < 5) {
      setModalError(t('adminReasonPlaceholder'));
      return;
    }
    setModalError('');
    await adminReviewDecision(reviewingTicket.id, decision, adminReasonInput.trim());
    setReviewingTicket(null);
    setAdminReasonInput('');
  };

  return (
    <div className="space-y-8 sm:space-y-10 min-w-0">
      {/* Header */}
      <div className="animate-fade-in-up flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-5 min-w-0">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-700 dark:text-cyan-400 tracking-wide mb-1">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>MUNICIPAL COMMAND CENTER</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display break-words">
            {t('adminHeader')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 break-words">
            {t('adminSubheader')}
          </p>
        </div>

        {!user || user.role !== 'Admin' ? (
          <button
            type="button"
            onClick={() => loginDemo('Admin')}
            className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all break-words shrink-0 cursor-pointer"
          >
            {t('activateAdminSessionBtn')}
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 break-words">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span>{t('deptCodePrefix')} </span>
            <strong className="font-mono tabular-nums text-emerald-700 dark:text-emerald-300">
              {user.badgeNumber}
            </strong>
          </div>
        )}
      </div>

      {/* Citywide Status Metrics Bar (Glassmorphic Cards with Ambient Glow) */}
      <section className="relative animate-fade-in-up delay-75">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 blur-2xl"
        />
        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className={`bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 ${m.borderGlow} rounded-2xl p-4 flex flex-col justify-between min-w-0 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10 duration-300 transition-all`}
            >
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400 tracking-wide break-words">
                {m.label}
              </span>
              <span
                className={`text-2xl font-bold font-mono tabular-nums mt-2 ${m.tone}`}
              >
                {m.count}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Priority-Sorted Dispatch Queue Table & Ward Map List */}
      <section className="space-y-4 min-w-0 animate-fade-in-up delay-150">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display break-words">
              {t('dispatchQueueTitle')}
            </h2>
          </div>
          <span className="text-xs text-emerald-800 dark:text-emerald-300 font-mono tabular-nums px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            {t('totalActiveRecordsPrefix')} {sortedTickets.length}
          </span>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/30 rounded-2xl shadow-2xl shadow-slate-200/60 dark:shadow-black/30 overflow-hidden transition-all">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 text-xs font-semibold text-slate-600 dark:text-slate-300 tracking-wide">
                  <th className="py-3.5 px-4">{t('colTicketWard')}</th>
                  <th className="py-3.5 px-4">{t('colCategoryEffort')}</th>
                  <th className="py-3.5 px-4">{t('priorityOverrideLabel')}</th>
                  <th className="py-3.5 px-4">{t('colCurrentStatus')}</th>
                  <th className="py-3.5 px-4">{t('assignWorkerLabel')}</th>
                  <th className="py-3.5 px-4 text-right">{t('colHumanLoop')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 text-xs">
                {sortedTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-4 px-4 align-top max-w-xs">
                      <div className="font-mono tabular-nums font-bold text-emerald-700 dark:text-emerald-300">
                        {ticket.id}
                      </div>
                      <div className="font-semibold text-slate-900 dark:text-white mt-0.5 break-words">
                        {translateDynamicText(ticket.title, lang)}
                      </div>
                      <div className="text-slate-600 dark:text-slate-400 mt-1 flex items-start gap-1 break-words">
                        <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{translateDynamicText(ticket.location, lang)}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 align-top">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 break-words">
                        {translateCategory(ticket.wasteCategory, lang)}
                      </div>
                      <div className="font-mono tabular-nums text-slate-600 dark:text-slate-400 mt-0.5 break-words">
                        {translateDynamicText(ticket.estimatedEffort, lang)}
                      </div>
                    </td>

                    <td className="py-4 px-4 align-top whitespace-nowrap">
                      <select
                        aria-label={`Override priority for ${ticket.id}`}
                        value={ticket.priority}
                        onChange={(e) =>
                          overridePriority(ticket.id, e.target.value as TicketPriority)
                        }
                        className={`px-2.5 py-1.5 text-xs font-bold rounded-xl border cursor-pointer transition-all ${
                          ticket.priority === 'CRITICAL'
                            ? 'bg-rose-50 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-500/50'
                            : ticket.priority === 'HIGH'
                            ? 'bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/50'
                            : 'bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as TicketPriority[]).map((p) => (
                          <option
                            key={p}
                            value={p}
                            className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                          >
                            {translatePriority(p, lang)}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-4 px-4 align-top">
                      <span className="font-semibold text-slate-900 dark:text-white break-words">
                        {translateStatus(ticket.status, lang)}
                      </span>
                      {ticket.aiVerdict && (
                        <div className="text-[11px] font-mono tabular-nums text-emerald-700 dark:text-emerald-400 mt-0.5">
                          AI: {ticket.aiVerdict} ({ticket.aiConfidence}%)
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4 align-top">
                      <select
                        aria-label={`Assign worker for ${ticket.id}`}
                        value={ticket.assignedWorkerId || ''}
                        onChange={(e) => {
                          if (e.target.value) {
                            assignTicket(ticket.id, e.target.value);
                          }
                        }}
                        className="px-2.5 py-1.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 hover:border-emerald-500/40 rounded-xl cursor-pointer max-w-[210px] transition-all"
                      >
                        <option value="" className="bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                          {t('unassignedSelectOption')}
                        </option>
                        {AVAILABLE_WORKERS.map((w) => (
                          <option
                            key={w.id}
                            value={w.id}
                            className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                          >
                            {w.name}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-4 px-4 align-top text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => {
                          setReviewingTicket(ticket);
                          setAdminReasonInput('');
                          setModalError('');
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-xl shadow-md shadow-emerald-500/15 active:scale-95 transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 shrink-0" />
                        <span>{t('reviewModalBtn')}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Glassmorphic Human-in-the-Loop Review Modal */}
      {reviewingTicket && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in-up">
          <div className="bg-white dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 rounded-2xl max-w-3xl w-full p-5 sm:p-6 space-y-5 shadow-2xl shadow-emerald-500/10 my-8 overflow-hidden transition-all">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="min-w-0">
                <div className="text-xs text-emerald-700 dark:text-emerald-400 font-mono tabular-nums break-words">
                  {reviewingTicket.id} · {t('priorityPrefix')}{' '}
                  {translatePriority(reviewingTicket.priority, lang)} · {t('statusPrefix')}{' '}
                  {translateStatus(reviewingTicket.status, lang)}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5 break-words">
                  {t('governanceModalPrefix')}{' '}
                  {translateDynamicText(reviewingTicket.title, lang)}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setReviewingTicket(null)}
                className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer shrink-0 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Side-by-Side Before & After Visual Inspection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide break-words">
                  {t('beforePhotoLabel')}
                </p>
                <div className="rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 aspect-4/3 bg-slate-100 dark:bg-slate-950">
                  <img
                    src={reviewingTicket.beforeImageUrl}
                    alt="Before cleanup"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide break-words">
                  {t('afterPhotoLabel')}
                </p>
                <div className="rounded-xl overflow-hidden border border-emerald-500/40 aspect-4/3 bg-slate-100 dark:bg-slate-950">
                  <img
                    src={reviewingTicket.afterImageUrl || SEED_MARKET_AFTER_URL}
                    alt="After cleanup"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Gemini AI Verdict Telemetry */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs space-y-1 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 font-bold text-slate-900 dark:text-white">
                <span className="break-words">
                  {t('geminiVerdictPrefix')}{' '}
                  {reviewingTicket.aiVerdict || t('pendingWorkerUploadPreview')}
                </span>
                <span className="font-mono tabular-nums text-emerald-700 dark:text-emerald-400">
                  {t('confidenceSuffix')}: {reviewingTicket.aiConfidence ?? 95}%
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed break-words">
                {reviewingTicket.aiReasoning || t('adminAuditFallbackDesc')}
              </p>
            </div>

            {/* Mandatory Administrative Audit Log Input */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide break-words">
                {t('mandatoryAdminReasonLabel')}
              </label>
              <textarea
                rows={2}
                value={adminReasonInput}
                onChange={(e) => setAdminReasonInput(e.target.value)}
                placeholder={t('adminReasonPlaceholder')}
                className="w-full px-3.5 py-2 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {modalError && (
                <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 break-words">
                  {modalError}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => handleAdminDecision('REJECT')}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-rose-800 dark:text-rose-200 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/70 border border-rose-200 dark:border-rose-500/40 rounded-xl active:scale-95 transition-all cursor-pointer"
              >
                <XCircle className="w-4 h-4 shrink-0" />
                <span>{t('adminRejectTaskBtn')}</span>
              </button>

              <button
                type="button"
                onClick={() => handleAdminDecision('APPROVE')}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{t('adminOverrideApproveBtn')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
