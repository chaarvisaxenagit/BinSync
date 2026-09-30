import React, { useState } from 'react';
import {
  ArrowRight,
  KeyRound,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import {
  useLanguage,
  translateCategory,
  translateDynamicText,
  translatePriority,
  translateStatus,
} from '../lib/i18n';
import { HERO_IMAGE_URL, useBinSync } from '../lib/firebase';
import { UserRole } from '../types';

export default function LandingPage() {
  const { lang, t } = useLanguage();
  const {
    tickets,
    navigate,
    loginDemo,
    loginWithCredentials,
    loginWithGoogle,
  } = useBinSync();

  const [activeTab, setActiveTab] = useState<UserRole>('Citizen');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [badgeNumber, setBadgeNumber] = useState('');
  const [authError, setAuthError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [heroImgBroken, setHeroImgBroken] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<{ rotateX: number; rotateY: number }>({
    rotateX: 0,
    rotateY: 0,
  });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltStyle({
      rotateX: Number((-y * 6).toFixed(2)),
      rotateY: Number((x * 6).toFixed(2)),
    });
  };

  const handleHeroMouseLeave = () => {
    setTiltStyle({ rotateX: 0, rotateY: 0 });
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setSubmitting(true);
    try {
      await loginWithCredentials({
        name,
        email,
        password,
        role: activeTab,
        badgeNumber,
        isRegister: isRegisterMode,
      });
    } catch (err) {
      setAuthError(
        err instanceof Error ? err.message : 'Authentication failed. Please check your credentials.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError('');
    try {
      await loginWithGoogle(activeTab);
    } catch (err) {
      setAuthError(
        err instanceof Error
          ? err.message
          : 'Google OAuth sign-in was cancelled or blocked by popup settings.'
      );
    }
  };

  const getRoleBadgePlaceholder = (role: UserRole) => {
    if (role === 'Citizen') return 'AADHAAR-9876-5432 / DL-042026';
    if (role === 'Worker') return 'WRK-8821-DELHI';
    return 'ADM-GOV-001';
  };

  const getRoleBadgeLabel = (role: UserRole) => {
    if (role === 'Citizen') return t('citizenIdLabel');
    if (role === 'Worker') return t('workerIdLabel');
    return t('adminIdLabel');
  };

  const getGoogleButtonRoleSuffix = (role: UserRole) => {
    if (lang === 'EN') {
      if (role === 'Citizen') return 'Citizen';
      if (role === 'Worker') return 'Sanitation Worker';
      return 'Administrator';
    }
    if (role === 'Citizen') return t('citizenPortalTab');
    if (role === 'Worker') return t('workerPortalTab');
    return t('adminPortalTab');
  };

  return (
    <div className="space-y-10 sm:space-y-12 min-w-0">
      {/* Quick Demo Login Bar (3 One-Click Buttons with Glassmorphism & Tactile Elevation) */}
      <section className="animate-fade-in-up bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-xl shadow-slate-200/50 dark:shadow-black/20 overflow-hidden transition-all">
        <div className="flex flex-col gap-4 min-w-0">
          <div className="flex items-center justify-between gap-3 min-w-0">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wide break-words">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>{t('quickDemoTitle')}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 break-words">
                {t('quickDemoSubtitle')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full">
            <button
              type="button"
              onClick={() => loginDemo('Citizen')}
              className="group flex flex-col items-start px-4 py-3 text-left bg-slate-50 dark:bg-slate-950/70 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 rounded-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10 active:scale-95 duration-300 transition-all cursor-pointer min-w-0 overflow-hidden"
            >
              <div className="flex items-center justify-between w-full gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 truncate transition-colors">
                  {t('demoCitizenBtn')}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0" />
              </div>
              <span className="text-[11px] font-mono tabular-nums text-slate-600 dark:text-slate-400 mt-1 break-all w-full">
                citizen@binsync.org · AADHAAR-9876-5432
              </span>
            </button>

            <button
              type="button"
              onClick={() => loginDemo('Worker')}
              className="group flex flex-col items-start px-4 py-3 text-left bg-slate-50 dark:bg-slate-950/70 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 rounded-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10 active:scale-95 duration-300 transition-all cursor-pointer min-w-0 overflow-hidden"
            >
              <div className="flex items-center justify-between w-full gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 truncate transition-colors">
                  {t('demoWorkerBtn')}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0" />
              </div>
              <span className="text-[11px] font-mono tabular-nums text-slate-600 dark:text-slate-400 mt-1 break-all w-full">
                worker@binsync.org · WRK-8821-DELHI
              </span>
            </button>

            <button
              type="button"
              onClick={() => loginDemo('Admin')}
              className="group flex flex-col items-start px-4 py-3 text-left bg-slate-50 dark:bg-slate-950/70 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 rounded-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 active:scale-95 duration-300 transition-all cursor-pointer min-w-0 overflow-hidden"
            >
              <div className="flex items-center justify-between w-full gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300 truncate transition-colors">
                  {t('demoAdminBtn')}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0" />
              </div>
              <span className="text-[11px] font-mono tabular-nums text-slate-600 dark:text-slate-400 mt-1 break-all w-full">
                admin@binsync.org · ADM-GOV-001
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Split Grid: Left Hero & Civic Loop / Right Tabbed Role Authentication Portal */}
      <div className="flex flex-col lg:flex-row gap-8 items-start min-w-0">
        {/* Left Column: Hero & Closed-Loop Architecture */}
        <div className="w-full lg:w-7/12 space-y-8 min-w-0 animate-fade-in-up delay-75">
          <div className="relative space-y-4 min-w-0">
            {/* Ambient Glow Spot Behind Hero Headline */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 -left-10 w-72 h-72 rounded-full bg-emerald-500/15 blur-3xl"
            />
            <div className="relative inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-800 dark:text-emerald-300 tracking-wide break-words">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 dark:bg-emerald-400" />
              </span>
              <span>{t('brandTagline')}</span>
            </div>
            <h1
              className="relative text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white font-display tracking-tight leading-tight break-words"
              style={{ textWrap: 'balance' }}
            >
              {t('heroTitle')}
            </h1>
            <p className="relative text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-[68ch] break-words">
              {t('heroSubtitle')}
            </p>
          </div>

          {/* Interactive 3D Perspective Tilt Hero Showcase Banner */}
          <div
            onMouseMove={handleHeroMouseMove}
            onMouseLeave={handleHeroMouseLeave}
            className="perspective-1000"
          >
            <div
              style={{
                transform: `rotateX(${tiltStyle.rotateX}deg) rotateY(${tiltStyle.rotateY}deg)`,
              }}
              className="preserve-3d relative rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700/80 hover:border-emerald-500/40 bg-slate-900 aspect-video shadow-2xl shadow-emerald-950/20 dark:shadow-emerald-950/40 transition-transform duration-200 ease-out"
            >
              {!heroImgBroken ? (
                <img
                  src={HERO_IMAGE_URL}
                  alt="Municipal electric sanitation fleet operating along a clean Indian boulevard"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgBroken(true)}
                  className="w-full h-full object-cover scale-[1.02] transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-8 text-white">
                  <p className="text-sm font-medium">{t('brandTagline')}</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 border-t border-white/15 pt-3 sm:pt-4 backdrop-blur-xs bg-slate-950/30 rounded-xl px-3 py-2">
                  <div className="min-w-0">
                    <p className="text-base sm:text-xl font-bold font-mono tabular-nums text-emerald-300 break-words">
                      {t('heroStat1Value')}
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-200 mt-0.5 break-words">
                      {t('heroStat1Label')}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-base sm:text-xl font-bold font-mono tabular-nums text-cyan-300 break-words">
                      {t('heroStat2Value')}
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-200 mt-0.5 break-words">
                      {t('heroStat2Label')}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-base sm:text-xl font-bold font-mono tabular-nums text-amber-300 break-words">
                      {t('heroStat3Value')}
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-200 mt-0.5 break-words">
                      {t('heroStat3Label')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Step Editorial Resolution Architecture Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {[
              { title: t('step1Title'), desc: t('step1Desc'), badge: '01' },
              { title: t('step2Title'), desc: t('step2Desc'), badge: '02' },
              { title: t('step3Title'), desc: t('step3Desc'), badge: '03' },
              { title: t('step4Title'), desc: t('step4Desc'), badge: '04' },
            ].map((step) => (
              <div
                key={step.badge}
                className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/30 rounded-xl p-4 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10 duration-300 transition-all min-w-0"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white break-words">
                    {step.title}
                  </h3>
                  <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400/80 shrink-0">
                    {step.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed break-words">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Tabbed Role-Based Authentication Portal */}
        <div className="w-full lg:w-5/12 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-slate-200/60 dark:shadow-black/40 overflow-hidden min-w-0 animate-fade-in-up delay-150 transition-all">
          <div className="flex items-center justify-between gap-2 mb-5 min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display break-words">
              {t('authPortalTitle')}
            </h2>
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 shrink-0">
              <KeyRound className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>

          {/* Interactive Role Segmented Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl mb-6">
            {(['Citizen', 'Worker', 'Admin'] as UserRole[]).map((role) => {
              const active = activeTab === role;
              const label =
                role === 'Citizen'
                  ? t('citizenPortalTab')
                  : role === 'Worker'
                  ? t('workerPortalTab')
                  : t('adminPortalTab');
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    setActiveTab(role);
                    setAuthError('');
                  }}
                  className={`px-2.5 py-2 text-xs font-semibold rounded-lg transition-all break-words text-center cursor-pointer active:scale-95 ${
                    active
                      ? 'bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 border border-emerald-500/40 shadow-md shadow-emerald-500/10'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-900'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Sign In / Register Mode Switch */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-300 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="break-words">
              {t('portalModeLabel')}{' '}
              <strong className="text-emerald-700 dark:text-emerald-300">
                {isRegisterMode ? t('modeRegister') : t('modeSignIn')}
              </strong>
            </span>
            <button
              type="button"
              onClick={() => setIsRegisterMode(!isRegisterMode)}
              className="font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 underline cursor-pointer"
            >
              {isRegisterMode ? t('switchToSignIn') : t('switchToRegister')}
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide mb-1 break-words">
                {t('fullNameLabel')}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={
                  activeTab === 'Citizen'
                    ? 'Aarav Sharma'
                    : activeTab === 'Worker'
                    ? 'Rajesh Kumar'
                    : 'Meera Deshmukh'
                }
                className="w-full px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide mb-1 break-words">
                {t('emailLabel')}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  activeTab === 'Citizen'
                    ? 'citizen@binsync.org'
                    : activeTab === 'Worker'
                    ? 'worker@binsync.org'
                    : 'admin@binsync.org'
                }
                className="w-full px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide mb-1 break-words">
                {t('passwordLabel')}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide mb-1 break-words">
                {getRoleBadgeLabel(activeTab)}
              </label>
              <input
                type="text"
                required
                value={badgeNumber}
                onChange={(e) => setBadgeNumber(e.target.value)}
                placeholder={getRoleBadgePlaceholder(activeTab)}
                className="w-full px-3.5 py-2.5 text-sm font-mono text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500 transition-all"
              />
            </div>

            {authError && (
              <div className="p-3 text-xs font-medium text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/40 rounded-xl break-words">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="group w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 disabled:opacity-50 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 shrink-0" />
              <span className="break-words">
                {isRegisterMode ? t('registerBtn') : t('signInBtn')}
              </span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white dark:bg-slate-900 px-2.5 text-slate-500 dark:text-slate-400">
                {t('orOAuthDivider')}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2.5 px-4 text-xs font-semibold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-950/90 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/80 hover:border-emerald-500/40 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="break-words">
              {`${t('googleOAuthBtn')} (${getGoogleButtonRoleSuffix(activeTab)})`}
            </span>
          </button>
        </div>
      </div>

      {/* Live Pre-Seeded Active Civic Complaints Feed */}
      <section className="border-t border-slate-200 dark:border-slate-800/80 pt-8 min-w-0 animate-fade-in-up delay-225">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display break-words">
                {t('activeQueueTitle')}
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 break-words">
              {t('activeQueueSubtitle')}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/awareness')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 hover:border-emerald-500/40 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
            >
              {t('navAwareness')}
            </button>
            <button
              type="button"
              onClick={() => loginDemo('Citizen')}
              className="group inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>{t('reportNewWasteBtn')}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/30 rounded-2xl p-5 flex flex-col justify-between gap-4 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10 duration-300 transition-all overflow-hidden min-w-0"
            >
              <div className="space-y-3 min-w-0">
                {/* Clean Metadata with Glowing Status & Priority Accents */}
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
                    {t('priorityPrefix')} {translatePriority(ticket.priority, lang)}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    {t('statusPrefix')} {translateStatus(ticket.status, lang)}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {translateCategory(ticket.wasteCategory, lang)}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white break-words">
                  {translateDynamicText(ticket.title, lang)}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed break-words">
                  {translateDynamicText(ticket.description, lang)}
                </p>

                <div className="text-xs text-slate-600 dark:text-slate-400 pt-1 break-words">
                  <strong className="text-slate-800 dark:text-slate-200">
                    {t('locationPrefix')}
                  </strong>{' '}
                  {translateDynamicText(ticket.location, lang)}
                  <span aria-hidden="true"> · </span>
                  <strong className="text-slate-800 dark:text-slate-200">
                    {t('effortPrefix')}
                  </strong>{' '}
                  {translateDynamicText(ticket.estimatedEffort, lang)}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-xs">
                <span className="text-slate-600 dark:text-slate-400 break-words">
                  {ticket.assignedWorkerName
                    ? `${t('assignedPrefix')} ${ticket.assignedWorkerName}`
                    : t('awaitingDispatch')}
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => navigate('/citizen')}
                    className="group inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 cursor-pointer"
                  >
                    <span>{t('viewTimelineBtn')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
