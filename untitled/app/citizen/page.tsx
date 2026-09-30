import React, { useState } from 'react';
import {
  Camera,
  CheckCircle2,
  Clock,
  CloudUpload,
  MapPin,
  RotateCcw,
  Send,
  ShieldAlert,
  Sparkles,
  Upload,
  XCircle,
} from 'lucide-react';
import {
  useLanguage,
  translateCategory,
  translateDynamicText,
  translatePriority,
  translateStatus,
} from '../../lib/i18n';
import {
  SEED_COLLEGE_DUMP_URL,
  SEED_MARKET_BEFORE_URL,
  useBinSync,
} from '../../lib/firebase';
import {
  TicketPriority,
  TriageResult,
  WasteCategory,
} from '../../types';

const WASTE_CATEGORIES: WasteCategory[] = [
  'Plastic/Dry',
  'Organic/Food',
  'Hazardous',
  'E-waste',
  'Overfilled Bin',
  'Road Dumping',
];

const SEVERITY_TO_PRIORITY: Record<string, TicketPriority> = {
  Low: 'LOW',
  Medium: 'MEDIUM',
  High: 'HIGH',
  Critical: 'CRITICAL',
};

export default function CitizenPortalPage() {
  const { lang, t } = useLanguage();
  const { user, tickets, loginDemo, createTicket, citizenFinalDecision } = useBinSync();

  const [selectedImage, setSelectedImage] = useState<string>(SEED_MARKET_BEFORE_URL);
  const [locationInput, setLocationInput] = useState<string>(
    'Main Market Square, Sector 14, Near Metro Gate 2'
  );
  const [titleInput, setTitleInput] = useState<string>(
    'Overfilled Garbage Bin near Main Market'
  );
  const [descriptionInput] = useState<string>(
    'Municipal secondary collection bin overflowing onto pedestrian walkway with plastic packaging and market cartons scattered around the base.'
  );

  const [isTriaging, setIsTriaging] = useState(false);
  const [triageError, setTriageError] = useState<string>('');
  const [triageData, setTriageData] = useState<TriageResult | null>(null);

  const [editableCategory, setEditableCategory] = useState<WasteCategory>('Overfilled Bin');
  const [editablePriority, setEditablePriority] = useState<TicketPriority>('HIGH');
  const [editableEffort, setEditableEffort] = useState<string>('1 Worker / 25 mins');
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState<string>('');

  const [rejectingTicketId, setRejectingTicketId] = useState<string | null>(null);
  const [rejectionReasonText, setRejectionReasonText] = useState<string>('');
  const [rejectionError, setRejectionError] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTriageError('');
    setTriageData(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSelectedImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDropFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    setTriageError('');
    setTriageData(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSelectedImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const runTriageCheck = async (simulateSynthetic = false) => {
    setIsTriaging(true);
    setTriageError('');
    setSubmitSuccessMsg('');
    if (simulateSynthetic) {
      setTriageData(null);
    }

    try {
      const res = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: selectedImage,
          location: locationInput,
          simulateSynthetic,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setTriageData(null);
        setTriageError(
          data.error ||
            'AI-generated or synthetic images are strictly prohibited. Please upload an authentic photograph.'
        );
        return;
      }

      const tr: TriageResult = data.triage;
      setTriageData(tr);
      setEditableCategory(tr.wasteCategory);
      setEditablePriority(SEVERITY_TO_PRIORITY[tr.severity] || 'HIGH');
      setEditableEffort(tr.estimatedEffort);
    } catch (err) {
      setTriageError(
        err instanceof Error ? err.message : 'Unable to reach server-side AI triage endpoint.'
      );
    } finally {
      setIsTriaging(false);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!triageData) {
      setTriageError(t('runAiTriageBtn'));
      return;
    }
    const created = await createTicket({
      title: titleInput || `${editableCategory} — ${locationInput}`,
      description: descriptionInput || triageData.triageNotes,
      wasteCategory: editableCategory,
      priority: editablePriority,
      status: 'REPORTED',
      location: locationInput,
      estimatedEffort: editableEffort,
      beforeImageUrl: selectedImage,
      triageSummary: `${t('authenticVerifiedTitle')} (${triageData.confidence}% ${t('confidenceSuffix')}). ${triageData.triageNotes}`,
    });
    setSubmitSuccessMsg(`${created.id} — ${t('submitTicketBtn')}`);
    setTriageData(null);
  };

  const handleCitizenReject = async (ticketId: string) => {
    if (!rejectionReasonText.trim() || rejectionReasonText.trim().length < 5) {
      setRejectionError(t('rejectionReasonPlaceholder'));
      return;
    }
    setRejectionError('');
    await citizenFinalDecision(ticketId, 'REJECT', rejectionReasonText.trim());
    setRejectingTicketId(null);
    setRejectionReasonText('');
  };

  const filteredTickets = tickets.filter((tk) => {
    const activeTab = (statusFilter || 'ALL').trim().toUpperCase();
    if (activeTab === 'ALL') return true;

    const ticketStatus = (tk.status || 'REPORTED').trim().toUpperCase();
    if (activeTab === 'REPORTED') {
      const hasReportedTimeline = tk.timeline?.some((entry) =>
        entry.action?.toUpperCase().includes('REPORTED')
      );
      return (
        ticketStatus === 'REPORTED' ||
        ticketStatus === 'OPEN' ||
        ticketStatus === 'SUBMITTED' ||
        Boolean(hasReportedTimeline)
      );
    }
    return ticketStatus === activeTab;
  });

  const getStatusBadgeClasses = (status: string) => {
    const norm = status.toUpperCase();
    if (norm === 'RESOLVED' || norm === 'CLOSED') {
      return 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30';
    }
    if (norm === 'ASSIGNED' || norm === 'IN_PROGRESS') {
      return 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30';
    }
    if (norm === 'REOPENED' || norm === 'ACTION_REQUIRED' || norm === 'FLAGGED') {
      return 'bg-rose-500/15 text-rose-800 dark:text-rose-300 border-rose-500/30';
    }
    return 'bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border-cyan-500/30';
  };

  return (
    <div className="space-y-8 sm:space-y-10 min-w-0">
      {/* Top Role Header */}
      <div className="animate-fade-in-up relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-5 min-w-0">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wide mb-1">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>AI-VERIFIED CIVIC PORTAL</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display break-words">
            {t('citizenHeader')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 break-words">
            {t('citizenSubheader')}
          </p>
        </div>

        {!user || user.role !== 'Citizen' ? (
          <button
            type="button"
            onClick={() => loginDemo('Citizen')}
            className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all break-words shrink-0 cursor-pointer"
          >
            {t('switchCitizenSessionBtn')}
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 break-words">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span>{t('citizenIdPrefix')} </span>
            <strong className="font-mono tabular-nums text-emerald-700 dark:text-emerald-300">
              {user.badgeNumber}
            </strong>
          </div>
        )}
      </div>

      {/* Main Grid: Left Report & AI Triage / Right Complaint Tracker & Citizen Final Say */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-w-0">
        {/* Left 5 Columns: Upload Waste Form & Anti-AI Triage */}
        <div className="lg:col-span-5 animate-fade-in-up delay-75 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/30 rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xl shadow-slate-200/60 dark:shadow-black/30 overflow-hidden min-w-0 transition-all">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-display break-words">
            {t('reportIncidentTitle')}
          </h2>

          {/* Step 1: Drag-and-Drop Photo Dropzone & Quick Sample Triggers */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide break-words">
              {t('uploadPhotoLabel')}
            </label>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingOver(true);
              }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={handleDropFile}
              className={`group relative rounded-xl overflow-hidden border-2 border-dashed transition-all aspect-4/3 bg-slate-100 dark:bg-slate-950/70 ${
                isDraggingOver
                  ? 'border-emerald-500 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 shadow-lg shadow-emerald-500/20'
                  : 'border-slate-300 dark:border-slate-700/90 hover:border-emerald-500/50'
              }`}
            >
              <img
                src={selectedImage}
                alt="Selected sanitation site preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* Top-Right Glowing Reset / Remove Preview Button */}
              <button
                type="button"
                onClick={() => {
                  setSelectedImage(SEED_MARKET_BEFORE_URL);
                  setTriageError('');
                  setTriageData(null);
                }}
                title="Reset preview image"
                className="absolute top-2.5 right-2.5 p-2 rounded-lg bg-white/90 dark:bg-slate-950/80 hover:bg-rose-500/90 text-slate-700 dark:text-slate-200 hover:text-white border border-slate-300 dark:border-slate-700/80 hover:border-rose-400 shadow-lg hover:shadow-rose-500/30 active:scale-95 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Bottom Glassmorphic Dropzone Overlay Strip */}
              <label className="absolute inset-x-2.5 bottom-2.5 p-2.5 rounded-xl bg-white/90 dark:bg-slate-950/85 backdrop-blur-md border border-slate-200 dark:border-slate-800/90 hover:border-emerald-500/40 flex items-center justify-between gap-2 cursor-pointer transition-all">
                <div className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-200 min-w-0">
                  <CloudUpload className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-float-slow shrink-0" />
                  <span className="truncate font-medium">{t('uploadPhotoFileBtn')}</span>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 rounded shrink-0">
                  JPG / PNG
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl border border-emerald-500/30 active:scale-95 cursor-pointer transition-all">
                <Upload className="w-3.5 h-3.5 shrink-0" />
                <span className="break-words">{t('uploadPhotoFileBtn')}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => {
                  setSelectedImage(SEED_MARKET_BEFORE_URL);
                  setTitleInput('Overfilled Garbage Bin near Main Market');
                  setTriageError('');
                  setTriageData(null);
                }}
                className="px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-950/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/80 hover:border-emerald-500/40 rounded-xl active:scale-95 transition-all cursor-pointer break-words"
              >
                {t('sampleMarketBinBtn')}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedImage(SEED_COLLEGE_DUMP_URL);
                  setTitleInput('Illegal Roadside Dump on College Road');
                  setTriageError('');
                  setTriageData(null);
                }}
                className="px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-950/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/80 hover:border-emerald-500/40 rounded-xl active:scale-95 transition-all cursor-pointer break-words"
              >
                {t('sampleRoadDumpBtn')}
              </button>
            </div>
          </div>

          {/* Step 2: Location & Incident Title */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide mb-1 break-words">
                {t('locationInputLabel')}
              </label>
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide mb-1 break-words">
                {t('complaintHeadlineLabel')}
              </label>
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Step 3: Trigger Server-Side Anti-AI Check & Gemini Triage */}
          <div className="space-y-2 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                disabled={isTriaging}
                onClick={() => runTriageCheck(false)}
                className="py-2.5 px-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 disabled:opacity-50 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 shrink-0" />
                <span className="break-words">
                  {isTriaging ? t('analyzingImage') : t('runAiTriageBtn')}
                </span>
              </button>

              <button
                type="button"
                disabled={isTriaging}
                onClick={() => runTriageCheck(true)}
                className="py-2.5 px-3 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-500/40 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span className="break-words">{t('testSyntheticBlockBtn')}</span>
              </button>
            </div>
          </div>

          {/* Anti-AI Error Alert */}
          {triageError && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/50 rounded-xl space-y-1 overflow-hidden animate-fade-in-up">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-800 dark:text-rose-200 break-words">
                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <span>{t('syntheticBlockedTitle')}</span>
              </div>
              <p className="text-xs text-rose-700 dark:text-rose-300 leading-relaxed break-words">
                {triageError}
              </p>
            </div>
          )}

          {/* Step 4: Gemini Triage Result & Editable Fields */}
          {triageData && (
            <form
              onSubmit={handleCreateTicket}
              className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-4 animate-fade-in-up"
            >
              <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-500/40 rounded-xl p-3.5 space-y-1.5 overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5 break-words">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{t('authenticVerifiedTitle')}</span>
                  </span>
                  <span className="font-mono tabular-nums font-semibold text-emerald-800 dark:text-emerald-300">
                    {triageData.confidence}% {t('confidenceSuffix')}
                  </span>
                </div>
                <p className="text-xs text-emerald-900 dark:text-emerald-100/90 leading-relaxed break-words">
                  {triageData.triageNotes}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide mb-1 break-words">
                    {t('wasteCategoryLabel')}
                  </label>
                  <select
                    value={editableCategory}
                    onChange={(e) => setEditableCategory(e.target.value as WasteCategory)}
                    className="w-full px-3 py-2 text-xs font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    {WASTE_CATEGORIES.map((cat) => (
                      <option
                        key={cat}
                        value={cat}
                        className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      >
                        {translateCategory(cat, lang)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide mb-1 break-words">
                    {t('severityLabel')}
                  </label>
                  <select
                    value={editablePriority}
                    onChange={(e) => setEditablePriority(e.target.value as TicketPriority)}
                    className="w-full px-3 py-2 text-xs font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl"
                  >
                    {(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as TicketPriority[]).map((p) => (
                      <option
                        key={p}
                        value={p}
                        className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      >
                        {translatePriority(p, lang)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide mb-1 break-words">
                  {t('effortLabel')}
                </label>
                <input
                  type="text"
                  value={editableEffort}
                  onChange={(e) => setEditableEffort(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="group w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                <span className="break-words">{t('submitTicketBtn')}</span>
              </button>
            </form>
          )}

          {submitSuccessMsg && (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/40 rounded-xl text-xs font-semibold text-emerald-900 dark:text-emerald-200 break-words animate-fade-in-up">
              {submitSuccessMsg}
            </div>
          )}
        </div>

        {/* Right 7 Columns: Complaint Tracking List, Before/After Viewer & Citizen Final Say */}
        <div className="lg:col-span-7 space-y-6 min-w-0 animate-fade-in-up delay-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display break-words">
              {t('myComplaintsTitle')}
            </h2>

            {/* Interactive Glassmorphic Filter Bar */}
            <div className="flex flex-wrap items-center gap-1 p-1.5 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl">
              {(['ALL', 'REPORTED', 'ASSIGNED', 'RESOLVED', 'REOPENED', 'CLOSED'] as const).map(
                (st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all active:scale-95 cursor-pointer ${
                      statusFilter === st
                        ? 'bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 border border-emerald-500/40 font-semibold shadow-sm shadow-emerald-500/10'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-transparent'
                    }`}
                  >
                    {st === 'ALL' ? t('filterAll') : translateStatus(st, lang)}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="space-y-6">
            {filteredTickets.map((ticket) => {
              const canCitizenDecide =
                ticket.status === 'RESOLVED' || ticket.status === 'FLAGGED';

              return (
                <article
                  key={ticket.id}
                  className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/30 rounded-2xl p-5 sm:p-6 space-y-5 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10 duration-300 transition-all overflow-hidden min-w-0"
                >
                  {/* Metadata Line with Glowing Status Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400 tracking-wide">
                      <span className="font-mono tabular-nums font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800">
                        {ticket.id}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={
                          ticket.priority === 'CRITICAL'
                            ? 'font-bold text-rose-600 dark:text-rose-400'
                            : ticket.priority === 'HIGH'
                            ? 'font-semibold text-amber-600 dark:text-amber-400'
                            : 'font-medium text-slate-700 dark:text-slate-300'
                        }
                      >
                        {translatePriority(ticket.priority, lang)}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-700 dark:text-slate-300">
                        {translateCategory(ticket.wasteCategory, lang)}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums text-slate-600 dark:text-slate-400">
                        {translateDynamicText(ticket.estimatedEffort, lang)}
                      </span>
                    </div>

                    <div
                      className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold tracking-wide break-words ${getStatusBadgeClasses(
                        ticket.status
                      )}`}
                    >
                      {t('statusPrefix')} {translateStatus(ticket.status, lang)}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white break-words">
                      {translateDynamicText(ticket.title, lang)}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed break-words">
                      {translateDynamicText(ticket.description, lang)}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 flex items-start gap-1.5 break-words">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{translateDynamicText(ticket.location, lang)}</span>
                    </p>
                  </div>

                  {/* Side-by-Side Before / After Photo Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide break-words">
                        {t('beforePhotoLabel')}
                      </p>
                      <div className="rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-950 aspect-4/3">
                        <img
                          src={ticket.beforeImageUrl}
                          alt={`Before cleanup for ${ticket.title}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide break-words">
                        {t('afterPhotoLabel')}
                      </p>
                      {ticket.afterImageUrl ? (
                        <div className="rounded-xl overflow-hidden border border-emerald-500/40 bg-slate-100 dark:bg-slate-950 aspect-4/3">
                          <img
                            src={ticket.afterImageUrl}
                            alt={`After cleanup for ${ticket.title}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/60 aspect-4/3 flex flex-col items-center justify-center p-4 text-center">
                          <Clock className="w-5 h-5 text-amber-500 dark:text-amber-400 mb-1.5 shrink-0" />
                          <p className="text-xs font-medium text-slate-700 dark:text-slate-300 break-words">
                            {t('awaitingWorkerPhoto')}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5 break-words">
                            {ticket.assignedWorkerName || t('unassignedLabel')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Verification Verdict Banner if Present */}
                  {ticket.aiVerdict && (
                    <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/30 text-xs space-y-1 overflow-hidden">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-semibold text-emerald-900 dark:text-emerald-200 break-words">
                          {t('geminiVerdictPrefix')} {ticket.aiVerdict}
                        </span>
                        <span className="font-mono tabular-nums font-semibold text-emerald-800 dark:text-emerald-300">
                          {ticket.aiConfidence}% {t('confidenceSuffix')}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed break-words">
                        {ticket.aiReasoning}
                      </p>
                    </div>
                  )}

                  {/* Citizen Final Say Loop (Confirm or Reject with Mandatory Reason) */}
                  {canCitizenDecide && (
                    <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-3">
                      <p className="text-xs font-bold text-slate-900 dark:text-white break-words">
                        {t('citizenAuthorityTitle')}
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => citizenFinalDecision(ticket.id, 'CONFIRM')}
                          className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
                        >
                          {t('confirmResolutionBtn')}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setRejectingTicketId(ticket.id);
                            setRejectionError('');
                          }}
                          className="px-4 py-2 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-500/40 rounded-xl active:scale-95 transition-all cursor-pointer"
                        >
                          {t('rejectResolutionBtn')}
                        </button>
                      </div>

                      {rejectingTicketId === ticket.id && (
                        <div className="space-y-2 pt-2 animate-fade-in-up">
                          <textarea
                            rows={2}
                            value={rejectionReasonText}
                            onChange={(e) => setRejectionReasonText(e.target.value)}
                            placeholder={t('rejectionReasonPlaceholder')}
                            className="w-full px-3 py-2 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950/90 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                          />
                          {rejectionError && (
                            <p className="text-xs text-rose-600 dark:text-rose-400 font-medium break-words">
                              {rejectionError}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleCitizenReject(ticket.id)}
                              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl active:scale-95 transition-all cursor-pointer"
                            >
                              {t('submitRejectionBtn')}
                            </button>
                            <button
                              type="button"
                              onClick={() => setRejectingTicketId(null)}
                              className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                            >
                              {t('cancelBtn')}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Immutable Audit & Resolution Timeline */}
                  <div className="border-t border-slate-200 dark:border-slate-800/80 pt-4">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2.5 break-words">
                      {t('timelineTitle')}
                    </p>
                    <div className="space-y-2">
                      {ticket.timeline.map((log, idx) => (
                        <div
                          key={idx}
                          className="text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 border-l-2 border-emerald-500/40 pl-3 py-0.5 break-words"
                        >
                          <span className="font-mono tabular-nums text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
                            {log.timestamp}
                          </span>
                          <span
                            aria-hidden="true"
                            className="hidden sm:inline text-slate-300 dark:text-slate-600"
                          >
                            ·
                          </span>
                          <strong className="font-semibold text-emerald-700 dark:text-emerald-300 shrink-0">
                            [{log.actor}] {log.action}:
                          </strong>
                          <span className="text-slate-600 dark:text-slate-300 break-words">
                            {log.details}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
