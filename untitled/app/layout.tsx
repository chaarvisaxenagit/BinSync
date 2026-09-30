import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { Globe, LogOut, Moon, ShieldCheck, Sparkles, Sun, X } from 'lucide-react';
import { LANGUAGES, LanguageCode, useLanguage } from '../lib/i18n';
import { useBinSync } from '../lib/firebase';

function ThemeToggleButton() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? resolvedTheme || theme : 'dark';
  const isDark = currentTheme === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="shrink-0 inline-flex items-center justify-center p-1.5 md:p-2 rounded-lg bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/40 active:scale-95 transition-all cursor-pointer"
    >
      {isDark ? (
        <Sun className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400 transition-transform duration-200" />
      ) : (
        <Moon className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-700 transition-transform duration-200" />
      )}
    </button>
  );
}

function LayoutShell({ children }: { children: React.ReactNode }) {
  const { lang, setLang, t } = useLanguage();
  const {
    user,
    pendingOAuthUser,
    currentPath,
    navigate,
    completeOAuthProfile,
    cancelOAuthModal,
    logout,
  } = useBinSync();

  const [oauthBadgeInput, setOauthBadgeInput] = useState('');
  const [oauthError, setOauthError] = useState('');

  const handleOAuthComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    setOauthError('');
    try {
      await completeOAuthProfile(oauthBadgeInput);
      setOauthBadgeInput('');
    } catch (err) {
      setOauthError(err instanceof Error ? err.message : 'Verification failed');
    }
  };

  const navItems = [
    { path: '/', label: t('navHome') },
    { path: '/citizen', label: t('navCitizen') },
    { path: '/worker', label: t('navWorker') },
    { path: '/admin', label: t('navAdmin') },
    { path: '/awareness', label: t('navAwareness') },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans overflow-x-hidden relative selection:bg-emerald-500/30 selection:text-emerald-900 dark:selection:text-emerald-200 transition-colors duration-200">
      {/* Ambient Civic Mesh Lighting Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/4 w-[540px] h-[540px] rounded-full bg-emerald-500/10 blur-[130px]" />
        <div className="absolute top-24 right-1/5 w-[460px] h-[460px] rounded-full bg-cyan-500/8 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-emerald-600/6 blur-[140px]" />
      </div>

      {/* Top Bar Contract: 2-Row Mobile Stack / 1-Row Desktop Horizontal Bar */}
      <header className="w-full bg-white/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800 px-3 py-2.5 md:px-4 md:py-3 z-50 sticky top-0 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
          {/* Mobile Top Row: Logo & Right Actions (dissolves into left/right zones on md+) */}
          <div className="flex items-center justify-between w-full md:w-auto md:contents shrink-0">
            {/* Zone 1: Single text element wordmark with live civic beacon */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="group shrink-0 inline-flex items-center gap-2 text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display whitespace-nowrap md:order-1"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="bg-gradient-to-r from-slate-900 via-emerald-800 to-emerald-600 dark:from-white dark:via-emerald-100 dark:to-emerald-400 bg-clip-text text-transparent transition-all">
                BinSync
              </span>
            </a>

            {/* Zone 3: Language Switcher + Theme Toggle + Auth Control */}
            <div className="flex items-center gap-2 shrink-0 md:order-3">
              <div className="relative flex items-center shrink-0">
                <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600 dark:text-emerald-400 absolute left-2.5 pointer-events-none" />
                <select
                  aria-label="Select Regional Indian Language"
                  value={lang}
                  onChange={(e) => setLang(e.target.value as LanguageCode)}
                  className="shrink-0 pl-7 md:pl-8 pr-2.5 md:pr-3 py-1 md:py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all cursor-pointer whitespace-nowrap"
                >
                  {LANGUAGES.map((l) => (
                    <option
                      key={l.code}
                      value={l.code}
                      className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    >
                      {l.nativeLabel}
                    </option>
                  ))}
                </select>
              </div>

              <ThemeToggleButton />

              {user ? (
                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden xl:inline-block text-xs text-slate-600 dark:text-slate-300 truncate max-w-[200px]">
                    <strong className="font-semibold text-slate-900 dark:text-white">
                      {user.name}
                    </strong>
                    <span aria-hidden="true"> · </span>
                    <span className="font-mono tabular-nums text-emerald-700 dark:text-emerald-400">
                      {user.badgeNumber}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={logout}
                    className="shrink-0 inline-flex items-center gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/40 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{t('signOut')}</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="shrink-0 px-3 md:px-3.5 py-1 md:py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg shadow-emerald-500/20 rounded-lg active:scale-95 transition-all whitespace-nowrap cursor-pointer"
                >
                  {t('navHome')}
                </button>
              )}
            </div>
          </div>

          {/* Zone 2: Navigation Bar (Row 2 on Mobile, Center on Desktop) */}
          <nav className="w-full md:w-auto md:flex-1 min-w-0 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap py-1 scrollbar-none border-t border-slate-200/80 dark:border-slate-800/60 md:border-0 pt-2 md:pt-0 md:order-2">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                  }}
                  className={`shrink-0 inline-flex items-center px-2.5 py-1 md:px-3 md:py-1.5 text-xs md:text-sm font-medium rounded-md whitespace-nowrap text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10 ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 font-semibold shadow-sm shadow-emerald-500/10'
                      : 'border border-transparent'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 min-w-0">
        {children}
      </main>

      {/* Mandatory First-Time Google OAuth Role ID Verification Modal */}
      {pendingOAuthUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in-up">
          <div className="bg-white dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800/90 hover:border-emerald-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl shadow-emerald-500/10 overflow-hidden transition-all">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display break-words">
                  {t('oauthModalTitle')}
                </h2>
              </div>
              <button
                type="button"
                onClick={cancelOAuthModal}
                className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg shrink-0 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed break-words">
              {t('oauthModalDesc')}
            </p>

            <div className="text-xs text-slate-600 dark:text-slate-300 mb-4 py-2.5 px-3 bg-slate-50 dark:bg-slate-950/70 rounded-xl border border-slate-200 dark:border-slate-800 break-words">
              <span>{t('oauthAccountLabel')} </span>
              <strong className="text-slate-900 dark:text-white">{pendingOAuthUser.email}</strong>
              <span aria-hidden="true"> · </span>
              <span>{t('oauthPortalLabel')} </span>
              <strong className="text-emerald-700 dark:text-emerald-400">
                {pendingOAuthUser.role}
              </strong>
            </div>

            <form onSubmit={handleOAuthComplete} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide mb-1.5 break-words">
                  {pendingOAuthUser.role === 'Citizen'
                    ? t('citizenIdLabel')
                    : pendingOAuthUser.role === 'Worker'
                    ? t('workerIdLabel')
                    : t('adminIdLabel')}
                </label>
                <input
                  type="text"
                  required
                  value={oauthBadgeInput}
                  onChange={(e) => setOauthBadgeInput(e.target.value)}
                  placeholder={
                    pendingOAuthUser.role === 'Citizen'
                      ? 'AADHAAR-9876-5432'
                      : pendingOAuthUser.role === 'Worker'
                      ? 'WRK-8821-DELHI'
                      : 'ADM-GOV-001'
                  }
                  className="w-full px-3.5 py-2.5 text-sm font-mono text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950/90 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
              </div>

              {oauthError && (
                <p className="text-xs font-medium text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/40 rounded-xl px-3 py-2 break-words">
                  {oauthError}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={cancelOAuthModal}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {t('cancelBtn')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  {t('completeAuthBtn')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Glassmorphic Editorial Footer */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl py-6 px-4 sm:px-6 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2 break-words text-center sm:text-left">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <strong className="font-semibold text-slate-900 dark:text-white">BinSync</strong>
            <span aria-hidden="true"> · </span>
            <span>{t('brandTagline')}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <button
              type="button"
              onClick={() => navigate('/citizen')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {t('navCitizen')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/worker')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {t('navWorker')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {t('navAdmin')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/awareness')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {t('navAwareness')}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
      <LayoutShell>{children}</LayoutShell>
    </ThemeProvider>
  );
}
