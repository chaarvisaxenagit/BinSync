import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, TicketPriority, TicketStatus, WasteCategory } from '../types';
export type { LanguageCode };

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  bcp47: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'EN', label: 'English', nativeLabel: 'English (EN)', bcp47: 'en-US' },
  { code: 'HI', label: 'Hindi', nativeLabel: 'हिंदी (HI)', bcp47: 'hi-IN' },
  { code: 'TA', label: 'Tamil', nativeLabel: 'தமிழ் (TA)', bcp47: 'ta-IN' },
  { code: 'TE', label: 'Telugu', nativeLabel: 'తెలుగు (TE)', bcp47: 'te-IN' },
  { code: 'MR', label: 'Marathi', nativeLabel: 'मराठी (MR)', bcp47: 'mr-IN' },
  { code: 'BN', label: 'Bengali', nativeLabel: 'বাংলা (BN)', bcp47: 'bn-IN' },
];

export type TranslationKeys = {
  brandTagline: string;
  navHome: string;
  navCitizen: string;
  navWorker: string;
  navAdmin: string;
  navAwareness: string;
  signOut: string;
  heroTitle: string;
  heroSubtitle: string;
  quickDemoTitle: string;
  quickDemoSubtitle: string;
  demoCitizenBtn: string;
  demoWorkerBtn: string;
  demoAdminBtn: string;
  heroStat1Value: string;
  heroStat1Label: string;
  heroStat2Value: string;
  heroStat2Label: string;
  heroStat3Value: string;
  heroStat3Label: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  authPortalTitle: string;
  citizenPortalTab: string;
  workerPortalTab: string;
  adminPortalTab: string;
  portalModeLabel: string;
  modeRegister: string;
  modeSignIn: string;
  switchToSignIn: string;
  switchToRegister: string;
  fullNameLabel: string;
  emailLabel: string;
  passwordLabel: string;
  citizenIdLabel: string;
  workerIdLabel: string;
  adminIdLabel: string;
  signInBtn: string;
  registerBtn: string;
  orOAuthDivider: string;
  googleOAuthBtn: string;
  oauthModalTitle: string;
  oauthModalDesc: string;
  oauthAccountLabel: string;
  oauthPortalLabel: string;
  cancelBtn: string;
  completeAuthBtn: string;
  activeQueueTitle: string;
  activeQueueSubtitle: string;
  reportNewWasteBtn: string;
  priorityPrefix: string;
  statusPrefix: string;
  locationPrefix: string;
  effortPrefix: string;
  assignedPrefix: string;
  awaitingDispatch: string;
  viewTimelineBtn: string;
  citizenHeader: string;
  citizenSubheader: string;
  switchCitizenSessionBtn: string;
  citizenIdPrefix: string;
  reportIncidentTitle: string;
  uploadPhotoLabel: string;
  uploadPhotoFileBtn: string;
  sampleMarketBinBtn: string;
  sampleRoadDumpBtn: string;
  locationInputLabel: string;
  complaintHeadlineLabel: string;
  runAiTriageBtn: string;
  testSyntheticBlockBtn: string;
  analyzingImage: string;
  syntheticBlockedTitle: string;
  authenticVerifiedTitle: string;
  confidenceSuffix: string;
  wasteCategoryLabel: string;
  severityLabel: string;
  effortLabel: string;
  submitTicketBtn: string;
  myComplaintsTitle: string;
  filterAll: string;
  awaitingWorkerPhoto: string;
  unassignedLabel: string;
  geminiVerdictPrefix: string;
  citizenAuthorityTitle: string;
  confirmResolutionBtn: string;
  rejectResolutionBtn: string;
  rejectionReasonPlaceholder: string;
  submitRejectionBtn: string;
  workerHeader: string;
  workerSubheader: string;
  activateWorkerBadgeBtn: string;
  activeBadgePrefix: string;
  legendRedTitle: string;
  legendRedSub: string;
  legendYellowTitle: string;
  legendYellowSub: string;
  legendGreenTitle: string;
  legendGreenSub: string;
  dismissBtn: string;
  categoryPrefix: string;
  speakDirectionsBtn: string;
  postCleanupRequiredTitle: string;
  postCleanupRequiredDesc: string;
  startJobBtn: string;
  navigateSiteBtn: string;
  uploadAfterPhotoBtn: string;
  uploadPostCleanupBtn: string;
  demoVerifyPassBtn: string;
  demoVerifyFailBtn: string;
  verifyingCleanup: string;
  hardEnforcementBanner: string;
  retryUploadBtn: string;
  adminHeader: string;
  adminSubheader: string;
  activateAdminSessionBtn: string;
  deptCodePrefix: string;
  metricReported: string;
  metricAssigned: string;
  metricInProgress: string;
  metricFlagged: string;
  metricResolved: string;
  metricReopened: string;
  dispatchQueueTitle: string;
  totalActiveRecordsPrefix: string;
  colTicketWard: string;
  colCategoryEffort: string;
  assignWorkerLabel: string;
  priorityOverrideLabel: string;
  colCurrentStatus: string;
  colHumanLoop: string;
  unassignedSelectOption: string;
  reviewModalBtn: string;
  governanceModalPrefix: string;
  pendingWorkerUploadPreview: string;
  adminAuditFallbackDesc: string;
  mandatoryAdminReasonLabel: string;
  adminOverrideApproveBtn: string;
  adminRejectTaskBtn: string;
  adminReasonPlaceholder: string;
  awarenessHeader: string;
  awarenessSubheader: string;
  streamAllTab: string;
  streamWetTab: string;
  streamDryTab: string;
  streamEwasteTab: string;
  streamHazardousTab: string;
  listenAudioBtn: string;
  permittedItemsTitle: string;
  prohibitedItemsTitle: string;
  municipalProcessingPrefix: string;
  charterSectionTitle: string;
  charter1Title: string;
  charter1Desc: string;
  charter2Title: string;
  charter2Desc: string;
  charter3Title: string;
  charter3Desc: string;
  timelineTitle: string;
  beforePhotoLabel: string;
  afterPhotoLabel: string;
};

export const TRANSLATIONS: Record<LanguageCode, TranslationKeys> = {
  EN: {
    brandTagline: 'AI-Verified Sanitation & Waste Resolution Loop',
    navHome: 'Portal Access',
    navCitizen: 'Citizen Portal',
    navWorker: 'Worker Field App',
    navAdmin: 'Admin Dispatch',
    navAwareness: 'Segregation Guide',
    signOut: 'Sign Out',
    heroTitle: 'Closed-Loop Civic Sanitation Verified by Visual AI',
    heroSubtitle:
      'Every sanitation complaint is screened against synthetic images, triaged by Gemini Vision, routed to field workers with regional voice guidance, and verified side-by-side before closure.',
    quickDemoTitle: 'Quick Demo Login Bar — Instant One-Click Role Access',
    quickDemoSubtitle:
      'Instant role switching pre-configured with verified civic credentials and pre-seeded sanitation tickets.',
    demoCitizenBtn: 'Demo Citizen (Aadhaar Verified)',
    demoWorkerBtn: 'Demo Worker (WRK-8821-DELHI)',
    demoAdminBtn: 'Demo Admin (ADM-GOV-001)',
    heroStat1Value: '100%',
    heroStat1Label: 'Anti-Synthetic Image Gate',
    heroStat2Value: '6 Languages',
    heroStat2Label: 'Regional Voice TTS for Workers',
    heroStat3Value: '2-Stage Proof',
    heroStat3Label: 'Gemini Vision + Citizen Sign-Off',
    step1Title: '01. Synthetic Filter & Visual Triage',
    step1Desc:
      'Gemini Vision inspects uploaded photographs for CGI or synthetic AI generation before extracting waste category, urgency severity, and cleanup crew estimates.',
    step2Title: '02. Priority Dispatch & Regional TTS',
    step2Desc:
      'Municipal administrators assign tasks from a priority-sorted queue. Field workers receive directions aloud via Web Speech API in Hindi, Tamil, Telugu, Marathi, Bengali, or English.',
    step3Title: '03. Hard-Enforced Before/After Proof',
    step3Desc:
      'When a worker uploads a post-cleanup photo, Gemini compares both frames side-by-side. Uncleaned or mismatched locations are automatically blocked as Action Required.',
    step4Title: '04. Human-in-the-Loop & Citizen Final Say',
    step4Desc:
      'Administrators can audit and override flagged verdicts with mandatory audit logs, while reporting citizens hold the final authority to confirm closure or reopen the ticket.',
    authPortalTitle: 'Role-Based Civic Authentication Portal',
    citizenPortalTab: 'Citizen Portal',
    workerPortalTab: 'Sanitation Worker',
    adminPortalTab: 'Administrator',
    portalModeLabel: 'Portal Mode:',
    modeRegister: 'New Registration',
    modeSignIn: 'Existing Account Sign-In',
    switchToSignIn: 'Switch to Sign In',
    switchToRegister: 'New User? Register',
    fullNameLabel: 'Full Legal Name',
    emailLabel: 'Official or Personal Email',
    passwordLabel: 'Account Password',
    citizenIdLabel: 'Government ID Proof Number (Aadhaar / Voter ID / DL)',
    workerIdLabel: 'Worker Work ID / Employee Badge Number',
    adminIdLabel: 'Official Admin ID / Department Code',
    signInBtn: 'Authenticate & Enter Portal',
    registerBtn: 'Create Verified Account',
    orOAuthDivider: 'or OAuth 2.0',
    googleOAuthBtn: 'Continue with Google',
    oauthModalTitle: 'Mandatory Role Identity Verification',
    oauthModalDesc:
      'Please enter your mandatory role-specific identification number to complete first-time Google OAuth registration.',
    oauthAccountLabel: 'Authenticated Google Account:',
    oauthPortalLabel: 'Portal:',
    cancelBtn: 'Cancel',
    completeAuthBtn: 'Verify ID & Enter Dashboard',
    activeQueueTitle: 'Active Municipal Sanitation Queue',
    activeQueueSubtitle:
      'Real-time transparency ledger of reported complaints, worker assignments, and Gemini verification states.',
    reportNewWasteBtn: 'Report New Waste',
    priorityPrefix: 'Priority:',
    statusPrefix: 'Status:',
    locationPrefix: 'Location:',
    effortPrefix: 'Effort:',
    assignedPrefix: 'Assigned:',
    awaitingDispatch: 'Awaiting Admin Dispatch',
    viewTimelineBtn: 'View Timeline →',
    citizenHeader: 'Citizen Waste Reporting & Resolution Tracker',
    citizenSubheader:
      'Upload an authentic site photo for instant AI triage and track before/after cleanup proof.',
    switchCitizenSessionBtn: 'Switch to Active Citizen Session (AADHAAR-9876-5432)',
    citizenIdPrefix: 'Citizen ID:',
    reportIncidentTitle: 'Report New Civic Waste Incident',
    uploadPhotoLabel: '1. Select or Capture Site Photograph',
    uploadPhotoFileBtn: 'Upload Photo File',
    sampleMarketBinBtn: 'Sample: Market Bin',
    sampleRoadDumpBtn: 'Sample: Road Dump',
    locationInputLabel: '2. Street Address / Landmark / Ward',
    complaintHeadlineLabel: 'Complaint Headline',
    runAiTriageBtn: 'Run Anti-AI Check & Gemini Triage',
    testSyntheticBlockBtn: 'Test Synthetic AI Block',
    analyzingImage: 'Running Synthetic Image Check & Visual Triage...',
    syntheticBlockedTitle: 'Anti-Synthetic Image Gate Blocked Upload',
    authenticVerifiedTitle: 'Authentic Photo Verified by Gemini',
    confidenceSuffix: 'Confidence',
    wasteCategoryLabel: 'Waste Category (Editable)',
    severityLabel: 'Urgency & Severity (Editable)',
    effortLabel: 'Estimated Cleanup Effort',
    submitTicketBtn: 'Submit Verified Sanitation Ticket',
    myComplaintsTitle: 'Active & Historical Civic Complaints',
    filterAll: 'All',
    awaitingWorkerPhoto: 'Awaiting Field Worker Post-Cleanup Photo',
    unassignedLabel: 'Unassigned',
    geminiVerdictPrefix: 'Gemini Vision Verdict:',
    citizenAuthorityTitle:
      'Citizen Final Resolution Authority — Inspect Before & After Proof:',
    confirmResolutionBtn: 'Confirm Resolution & Close Ticket',
    rejectResolutionBtn: 'Reject Resolution & Reopen',
    rejectionReasonPlaceholder:
      'Mandatory: Explain why the cleanup is incomplete or unsatisfactory...',
    submitRejectionBtn: 'Submit Rejection & Reopen Ticket',
    workerHeader: 'Sanitation Worker Field Console',
    workerSubheader:
      'High-contrast mobile task view with regional voice guidance and instant AI cleanup verification.',
    activateWorkerBadgeBtn: 'Activate Worker Badge (WRK-8821-DELHI)',
    activeBadgePrefix: 'Active Badge:',
    legendRedTitle: 'RED = CRITICAL / BLOCKED',
    legendRedSub: 'Immediate Fix',
    legendYellowTitle: 'YELLOW = ACTION NEEDED',
    legendYellowSub: 'Assigned / Active',
    legendGreenTitle: 'GREEN = DONE',
    legendGreenSub: 'AI Verified Clean',
    dismissBtn: 'Dismiss',
    categoryPrefix: 'Category:',
    speakDirectionsBtn: 'Speak Task Directions Aloud',
    postCleanupRequiredTitle: 'Post-Cleanup Photo Required',
    postCleanupRequiredDesc:
      'Gemini Vision will compare your photo side-by-side with the Before photo.',
    startJobBtn: 'Start Cleanup Job',
    navigateSiteBtn: 'Open GPS Route to Site',
    uploadAfterPhotoBtn: 'Upload Post-Cleanup Photo & Verify',
    uploadPostCleanupBtn: 'Upload Post-Cleanup Photo',
    demoVerifyPassBtn: 'Demo Verify: Cleaned Photo (PASS)',
    demoVerifyFailBtn: 'Demo Verify: Uncleaned Photo (HARD BLOCK)',
    verifyingCleanup: 'Gemini Vision Comparing Before & After Photos...',
    hardEnforcementBanner:
      'HARD ENFORCEMENT: Completion Blocked — Status set to ACTION_REQUIRED.',
    retryUploadBtn: 'Fix Cleanup & Re-Upload After Photo',
    adminHeader: 'Municipal Admin Dispatch & Human-in-the-Loop Console',
    adminSubheader:
      'Citywide sanitation telemetry, priority queue routing, and manual override governance.',
    activateAdminSessionBtn: 'Activate Official Admin Session (ADM-GOV-001)',
    deptCodePrefix: 'Department Code:',
    metricReported: 'Reported',
    metricAssigned: 'Assigned',
    metricInProgress: 'In Progress',
    metricFlagged: 'Flagged / Action',
    metricResolved: 'Resolved / Closed',
    metricReopened: 'Reopened',
    dispatchQueueTitle: 'Priority Dispatch Queue (Critical & Oldest First)',
    totalActiveRecordsPrefix: 'Total Active Records:',
    colTicketWard: 'Ticket & Ward Pin',
    colCategoryEffort: 'Category & Effort',
    assignWorkerLabel: 'Assign Field Worker',
    priorityOverrideLabel: 'Override Priority',
    colCurrentStatus: 'Current Status',
    colHumanLoop: 'Human-in-the-Loop',
    unassignedSelectOption: '-- Unassigned (Select Worker) --',
    reviewModalBtn: 'Human-in-the-Loop Review',
    governanceModalPrefix: 'Human-in-the-Loop Governance:',
    pendingWorkerUploadPreview: 'PENDING_WORKER_UPLOAD (Previewing Sample)',
    adminAuditFallbackDesc:
      'Admin can manually override and approve resolution or reject the task back to the assigned worker with a mandatory audit log entry.',
    mandatoryAdminReasonLabel: 'Mandatory Administrative Audit Log Reason',
    adminOverrideApproveBtn: 'Manual Admin Override Approve',
    adminRejectTaskBtn: 'Reject Task & Return to Worker',
    adminReasonPlaceholder:
      'Mandatory administrative audit log reason for override or rejection...',
    awarenessHeader: 'Civic Waste Segregation & Community Awareness Hub',
    awarenessSubheader:
      'Standardized municipal source-segregation protocols for households, markets, and bulk generators.',
    streamAllTab: 'All 4 Streams',
    streamWetTab: 'Wet (Green)',
    streamDryTab: 'Dry (Blue)',
    streamEwasteTab: 'E-Waste',
    streamHazardousTab: 'Hazardous (Red)',
    listenAudioBtn: 'Listen',
    permittedItemsTitle: 'What Goes In (Permitted):',
    prohibitedItemsTitle: 'Strictly Prohibited:',
    municipalProcessingPrefix: 'Municipal Processing Loop:',
    charterSectionTitle:
      'Solid Waste Management (SWM) Civic Charter & Worker Safety Rules',
    charter1Title: '01. Zero Mixed-Waste Handover',
    charter1Desc:
      'Door-to-door municipal tippers are compartmented for Wet and Dry streams. Unsegregated mixed bags contaminate entire vehicle loads and reduce Material Recovery Facility efficiency by over 60%.',
    charter2Title: '02. Puncture-Safe Packaging for Sharps',
    charter2Desc:
      'Broken glass, ceramic shards, and needles cause severe occupational injuries to sanitation workers. Always encase sharp items inside rigid cardboard taped shut and labeled clearly before handover.',
    charter3Title: '03. Citizen Final Verification Responsibility',
    charter3Desc:
      'When BinSync notifies you of a completed ticket, inspect the side-by-side Before and After photos carefully. Confirming resolution closes the municipal ledger; rejecting with a reason re-dispatches the crew.',
    timelineTitle: 'Immutable Audit & Resolution Timeline',
    beforePhotoLabel: 'Before Cleanup (Citizen Report)',
    afterPhotoLabel: 'After Cleanup (Worker Proof)',
  },
  HI: {
    brandTagline: 'एआई-सत्यापित स्वच्छता और कचरा निवारण प्रणाली',
    navHome: 'मुख्य पोर्टल',
    navCitizen: 'नागरिक पोर्टल',
    navWorker: 'कर्मचारी ऐप',
    navAdmin: 'प्रशासन केंद्र',
    navAwareness: 'कचरा पृथक्करण गाइड',
    signOut: 'लॉग आउट',
    heroTitle: 'विजुअल एआई द्वारा सत्यापित नागरिक स्वच्छता समाधान',
    heroSubtitle:
      'प्रत्येक शिकायत की कृत्रिम (AI) फोटो जांच होती है, जेमिनी विज़न द्वारा श्रेणी तय की जाती है, और सफाई से पहले/बाद की फोटो की तुलना से पुष्टि होती है।',
    quickDemoTitle: 'त्वरित डेमो लॉगिन — एक क्लिक में पोर्टल खोलें',
    quickDemoSubtitle:
      'सत्यापित नागरिक क्रेडेंशियल्स और पूर्व-दर्ज स्वच्छता शिकायतों के साथ तुरंत भूमिका बदलें।',
    demoCitizenBtn: 'डेमो नागरिक (आधार सत्यापित)',
    demoWorkerBtn: 'डेमो कर्मचारी (WRK-8821-DELHI)',
    demoAdminBtn: 'डेमो अधिकारी (ADM-GOV-001)',
    heroStat1Value: '100%',
    heroStat1Label: 'कृत्रिम (AI) फोटो रोकथाम गेट',
    heroStat2Value: '6 भाषाएं',
    heroStat2Label: 'कर्मचारियों के लिए क्षेत्रीय आवाज़ निर्देश',
    heroStat3Value: '2-स्तरीय प्रमाण',
    heroStat3Label: 'जेमिनी विज़न + नागरिक अंतिम पुष्टि',
    step1Title: '01. सिंथेटिक फ़िल्टर और विजुअल ट्रायज',
    step1Desc:
      'जेमिनी विज़न कचरे की श्रेणी, गंभीरता और सफाई प्रयास निकालने से पहले अपलोड की गई तस्वीरों की कृत्रिम एआई जांच करता है।',
    step2Title: '02. प्राथमिकता डिस्पैच और क्षेत्रीय आवाज़ (TTS)',
    step2Desc:
      'नगर निगम अधिकारी प्राथमिकता कतार से कार्य सौंपते हैं। फील्ड कर्मचारी हिंदी, तमिल, तेलुगु, मराठी, बंगाली या अंग्रेजी में आवाज़ निर्देश सुनते हैं।',
    step3Title: '03. सख्त पहले/बाद का फोटो सत्यापन',
    step3Desc:
      'जब कर्मचारी सफाई के बाद फोटो अपलोड करता है, तो जेमिनी दोनों तस्वीरों की तुलना करता है। अधूरी सफाई स्वतः रोक दी जाती है।',
    step4Title: '04. मानवीय समीक्षा और नागरिक अंतिम निर्णय',
    step4Desc:
      'प्रशासक अनिवार्य ऑडिट लॉग के साथ समीक्षा कर सकते हैं, जबकि शिकायतकर्ता नागरिक के पास शिकायत बंद करने या पुनः खोलने का अंतिम अधिकार होता है।',
    authPortalTitle: 'भूमिका-आधारित प्रमाणीकरण पोर्टल',
    citizenPortalTab: 'नागरिक पोर्टल',
    workerPortalTab: 'सफाई कर्मचारी',
    adminPortalTab: 'प्रशासक (Admin)',
    portalModeLabel: 'पोर्टल मोड:',
    modeRegister: 'नया पंजीकरण',
    modeSignIn: 'मौजूदा खाता साइन-इन',
    switchToSignIn: 'साइन इन पर जाएं',
    switchToRegister: 'नए उपयोगकर्ता? पंजीकरण करें',
    fullNameLabel: 'पूरा नाम',
    emailLabel: 'ईमेल पता',
    passwordLabel: 'पासवर्ड',
    citizenIdLabel: 'सरकारी पहचान पत्र संख्या (आधार / वोटर आईडी / लाइसेंस)',
    workerIdLabel: 'कर्मचारी कार्य आईडी / बैज नंबर',
    adminIdLabel: 'आधिकारिक एडमिन आईडी / विभाग कोड',
    signInBtn: 'लॉगिन करें और पोर्टल में जाएं',
    registerBtn: 'नया खाता बनाएं',
    orOAuthDivider: 'या OAuth 2.0',
    googleOAuthBtn: 'Continue with Google',
    oauthModalTitle: 'अनिवार्य पहचान संख्या सत्यापन',
    oauthModalDesc:
      'कृपया आगे बढ़ने के लिए अपनी भूमिका के अनुसार अनिवार्य पहचान पत्र संख्या दर्ज करें।',
    oauthAccountLabel: 'सत्यापित Google खाता:',
    oauthPortalLabel: 'पोर्टल:',
    cancelBtn: 'रद्द करें',
    completeAuthBtn: 'सत्यापित करें और आगे बढ़ें',
    activeQueueTitle: 'सक्रिय नगर निगम स्वच्छता कतार',
    activeQueueSubtitle:
      'दर्ज शिकायतों, कर्मचारी नियुक्तियों और जेमिनी सत्यापन स्थिति की लाइव पारदर्शी सूची।',
    reportNewWasteBtn: 'नई शिकायत दर्ज करें',
    priorityPrefix: 'प्राथमिकता:',
    statusPrefix: 'स्थिति:',
    locationPrefix: 'स्थान:',
    effortPrefix: 'प्रयास:',
    assignedPrefix: 'नियुक्त:',
    awaitingDispatch: 'एडमिन डिस्पैच की प्रतीक्षा में',
    viewTimelineBtn: 'समयरेखा देखें →',
    citizenHeader: 'नागरिक कचरा शिकायत एवं निवारण ट्रैकर',
    citizenSubheader:
      'असली फोटो अपलोड करें, एआई जांच देखें और सफाई का सत्यापन करें।',
    switchCitizenSessionBtn: 'सक्रिय नागरिक सत्र में बदलें (AADHAAR-9876-5432)',
    citizenIdPrefix: 'नागरिक आईडी:',
    reportIncidentTitle: 'नई स्वच्छता शिकायत दर्ज करें',
    uploadPhotoLabel: '1. कचरे के स्थान की असली फोटो चुनें',
    uploadPhotoFileBtn: 'फोटो फ़ाइल अपलोड करें',
    sampleMarketBinBtn: 'नमूना: मार्केट डस्टबिन',
    sampleRoadDumpBtn: 'नमूना: सड़क किनारे कचरा',
    locationInputLabel: '2. पता / लैंडमार्क / वार्ड का नाम',
    complaintHeadlineLabel: 'शिकायत का शीर्षक',
    runAiTriageBtn: 'एआई फोटो जांच और ट्रायज चलाएं',
    testSyntheticBlockBtn: 'सिंथेटिक एआई रोक जांचें',
    analyzingImage: 'एआई फोटो की प्रामाणिकता और कचरे की जांच कर रहा है...',
    syntheticBlockedTitle: 'सिंथेटिक फोटो गेट ने अपलोड रोक दिया',
    authenticVerifiedTitle: 'जेमिनी द्वारा असली फोटो सत्यापित',
    confidenceSuffix: 'विश्वास स्तर',
    wasteCategoryLabel: 'कचरे की श्रेणी (बदलाव संभव)',
    severityLabel: 'गंभीरता और प्राथमिकता',
    effortLabel: 'अनुमानित सफाई प्रयास',
    submitTicketBtn: 'सत्यापित शिकायत दर्ज करें',
    myComplaintsTitle: 'सक्रिय और पिछली शिकायतें',
    filterAll: 'सभी',
    awaitingWorkerPhoto: 'कर्मचारी द्वारा सफाई के बाद की फोटो की प्रतीक्षा',
    unassignedLabel: 'अनिर्दिष्ट',
    geminiVerdictPrefix: 'जेमिनी विज़न निर्णय:',
    citizenAuthorityTitle: 'नागरिक अंतिम निर्णय — पहले और बाद का प्रमाण जांचें:',
    confirmResolutionBtn: 'सफाई की पुष्टि करें (शिकायत बंद करें)',
    rejectResolutionBtn: 'अस्वीकार करें और पुनः खोलें',
    rejectionReasonPlaceholder: 'अनिवार्य: बताएं कि सफाई अधूरी क्यों है...',
    submitRejectionBtn: 'अस्वीकृति दर्ज करें और टिकट पुनः खोलें',
    workerHeader: 'सफाई कर्मचारी फील्ड डैशबोर्ड',
    workerSubheader:
      'आवाज़ निर्देश (TTS) और तुरंत एआई फोटो सत्यापन के साथ सरल कार्य सूची।',
    activateWorkerBadgeBtn: 'कर्मचारी बैज सक्रिय करें (WRK-8821-DELHI)',
    activeBadgePrefix: 'सक्रिय बैज:',
    legendRedTitle: 'लाल = अति गंभीर / रुका हुआ',
    legendRedSub: 'तुरंत सुधार आवश्यक',
    legendYellowTitle: 'पीला = कार्रवाई आवश्यक',
    legendYellowSub: 'नियुक्त / कार्य जारी',
    legendGreenTitle: 'हरा = पूर्ण',
    legendGreenSub: 'एआई द्वारा सफाई सत्यापित',
    dismissBtn: 'बंद करें',
    categoryPrefix: 'श्रेणी:',
    speakDirectionsBtn: 'कार्य निर्देश आवाज़ में सुनें',
    postCleanupRequiredTitle: 'सफाई के बाद की फोटो आवश्यक है',
    postCleanupRequiredDesc:
      'जेमिनी विज़न आपकी फोटो की तुलना पहले की फोटो से करेगा।',
    startJobBtn: 'सफाई कार्य शुरू करें',
    navigateSiteBtn: 'जीपीएस रास्ता खोलें',
    uploadAfterPhotoBtn: 'सफाई के बाद की फोटो अपलोड करें',
    uploadPostCleanupBtn: 'सफाई के बाद फोटो चुनें',
    demoVerifyPassBtn: 'डेमो सत्यापन: साफ फोटो (सफल)',
    demoVerifyFailBtn: 'डेमो सत्यापन: बिना सफाई फोटो (रोक)',
    verifyingCleanup: 'जेमिनी एआई पहले और बाद की फोटो की तुलना कर रहा है...',
    hardEnforcementBanner:
      'सख्त नियम: कार्य पूर्ण करना रोका गया — स्थिति ACTION_REQUIRED की गई।',
    retryUploadBtn: 'सफाई ठीक करें और दोबारा फोटो अपलोड करें',
    adminHeader: 'नगर निगम एडमिन डिस्पैच और समीक्षा केंद्र',
    adminSubheader:
      'शहर भर की स्वच्छता स्थिति, प्राथमिकता कतार और मानवीय समीक्षा।',
    activateAdminSessionBtn: 'आधिकारिक एडमिन सत्र सक्रिय करें (ADM-GOV-001)',
    deptCodePrefix: 'विभाग कोड:',
    metricReported: 'दर्ज शिकायतें',
    metricAssigned: 'नियुक्त',
    metricInProgress: 'सफाई जारी',
    metricFlagged: 'चिन्हित / कार्रवाई',
    metricResolved: 'हल / बंद',
    metricReopened: 'पुनः खोली गई',
    dispatchQueueTitle: 'प्राथमिकता डिस्पैच कतार (गंभीर शिकायतें पहले)',
    totalActiveRecordsPrefix: 'कुल सक्रिय रिकॉर्ड:',
    colTicketWard: 'टिकट और वार्ड स्थान',
    colCategoryEffort: 'श्रेणी और प्रयास',
    assignWorkerLabel: 'कर्मचारी नियुक्त करें',
    priorityOverrideLabel: 'प्राथमिकता बदलें',
    colCurrentStatus: 'वर्तमान स्थिति',
    colHumanLoop: 'मानवीय समीक्षा',
    unassignedSelectOption: '-- अनिर्दिष्ट (कर्मचारी चुनें) --',
    reviewModalBtn: 'मानवीय समीक्षा (Review)',
    governanceModalPrefix: 'मानवीय समीक्षा नियंत्रण:',
    pendingWorkerUploadPreview: 'कर्मचारी फोटो प्रतीक्षित (नमूना पूर्वावलोकन)',
    adminAuditFallbackDesc:
      'एडमिन अनिवार्य ऑडिट लॉग कारण दर्ज करके कार्य को स्वीकृत या अस्वीकार कर सकते हैं।',
    mandatoryAdminReasonLabel: 'अनिवार्य प्रशासनिक ऑडिट लॉग कारण',
    adminOverrideApproveBtn: 'एडमिन ओवरराइड द्वारा स्वीकृत करें',
    adminRejectTaskBtn: 'कार्य अस्वीकार करें',
    adminReasonPlaceholder: 'अनिवार्य: प्रशासनिक निर्णय का कारण लिखें...',
    awarenessHeader: 'कचरा पृथक्करण और नागरिक जागरूकता केंद्र',
    awarenessSubheader:
      'सूखा, गीला, ई-कचरा और खतरनाक कचरा अलग करने के नियम।',
    streamAllTab: 'सभी 4 श्रेणियां',
    streamWetTab: 'गीला कचरा (हरा)',
    streamDryTab: 'सूखा कचरा (नीला)',
    streamEwasteTab: 'ई-कचरा',
    streamHazardousTab: 'खतरनाक कचरा (लाल)',
    listenAudioBtn: 'आवाज़ में सुनें',
    permittedItemsTitle: 'क्या डालें (अनुमत):',
    prohibitedItemsTitle: 'सख्त वर्जित:',
    municipalProcessingPrefix: 'नगर निगम प्रसंस्करण प्रक्रिया:',
    charterSectionTitle:
      'ठोस अपशिष्ट प्रबंधन (SWM) नागरिक चार्टर और कर्मचारी सुरक्षा नियम',
    charter1Title: '01. मिश्रित कचरा न दें',
    charter1Desc:
      'नगर निगम के वाहन गीले और सूखे कचरे के लिए अलग-अलग बने हैं। मिश्रित कचरा देने से रीसाइक्लिंग क्षमता 60% तक कम हो जाती है।',
    charter2Title: '02. नुकीली वस्तुओं की सुरक्षित पैकिंग',
    charter2Desc:
      'टूटे कांच, ब्लेड और सुइयों से सफाई कर्मचारियों को गंभीर चोट लग सकती है। इन्हें हमेशा मोटे गत्ते में लपेटकर और चिन्हित करके ही दें।',
    charter3Title: '03. नागरिक अंतिम सत्यापन जिम्मेदारी',
    charter3Desc:
      'जब शिकायत हल हो जाए, तो पहले और बाद की फोटो ध्यान से जांचें। पुष्टि करने पर शिकायत बंद होती है और अस्वीकार करने पर टीम दोबारा भेजी जाती है।',
    timelineTitle: 'अपरिवर्तनीय ऑडिट लॉग और समयरेखा',
    beforePhotoLabel: 'सफाई से पहले (नागरिक फोटो)',
    afterPhotoLabel: 'सफाई के बाद (कर्मचारी प्रमाण)',
  },
  TA: {
    brandTagline: 'AI-சரிபார்க்கப்பட்ட சுகாதாரம் மற்றும் கழிவு தீர்வு அமைப்பு',
    navHome: 'முகப்பு',
    navCitizen: 'குடிமக்கள் தளம்',
    navWorker: 'பணியாளர் தளம்',
    navAdmin: 'நிர்வாக தளம்',
    navAwareness: 'விழிப்புணர்வு வழிகாட்டி',
    signOut: 'வெளியேறு',
    heroTitle: 'காட்சி AI மூலம் சரிபார்க்கப்படும் நகர்ப்புற தூய்மை',
    heroSubtitle:
      'ஒவ்வொரு புகாரும் போலி AI படங்களுக்கு எதிராக சோதிக்கப்பட்டு, களப்பணியாளர்களுக்கு தமிழ் குரல் வழிகாட்டுதலுடன் அனுப்பப்பட்டு, முன்னும் பின்னும் புகைப்பட ஒப்பீடு மூலம் உறுதி செய்யப்படுகிறது.',
    quickDemoTitle: 'விரைவு டெமோ உள்நுழைவு — ஒரே கிளிக்கில் அணுகவும்',
    quickDemoSubtitle:
      'சரிபார்க்கப்பட்ட அடையாள எண்கள் மற்றும் மாதிரி புகார்களுடன் உடனடியாக உள்நுழையுங்கள்.',
    demoCitizenBtn: 'டெமோ குடிமகன் (ஆதார்)',
    demoWorkerBtn: 'டெமோ பணியாளர் (WRK-8821)',
    demoAdminBtn: 'டெமோ நிர்வாகி (ADM-GOV-001)',
    heroStat1Value: '100%',
    heroStat1Label: 'போலி AI புகைப்பட தடுப்பு',
    heroStat2Value: '6 மொழிகள்',
    heroStat2Label: 'பணியாளர்களுக்கான குரல் வழிகாட்டி',
    heroStat3Value: '2-நிலை சான்று',
    heroStat3Label: 'ஜெமினி AI + குடிமக்கள் ஒப்புதல்',
    step1Title: '01. போலி பட வடிகட்டி & AI வகைப்படுத்தல்',
    step1Desc:
      'ஜெமினி விஷன் புகைப்படத்தின் உண்மைத்தன்மையை சரிபார்த்து கழிவு வகை, தீவிரம் மற்றும் பணி நேரத்தை கணிக்கிறது.',
    step2Title: '02. முன்னுரிமை ஒதுக்கீடு & தமிழ் குரல் (TTS)',
    step2Desc:
      'நிர்வாகிகள் முன்னுரிமை அடிப்படையில் பணிகளை ஒதுக்குகிறார்கள். களப்பணியாளர்கள் தங்கள் தாய்மொழியில் குரல் வழிமுறைகளைக் கேட்கலாம்.',
    step3Title: '03. முன்னும் பின்னும் புகைப்பட ஒப்பீடு',
    step3Desc:
      'பணியாளர் சுத்தம் செய்த பின் பதிவேற்றும் படத்தை முந்தைய படத்துடன் AI ஒப்பிடுகிறது. சுத்தம் செய்யப்படாவிட்டால் உடனடியாக தடுக்கப்படும்.',
    step4Title: '04. நிர்வாக ஆய்வு & குடிமக்கள் இறுதி முடிவு',
    step4Desc:
      'நிர்வாகிகள் ஆய்வு செய்யலாம் மற்றும் புகார் அளித்த குடிமகன் தீர்வை உறுதிப்படுத்தி மூடலாம் அல்லது மீண்டும் திறக்கலாம்.',
    authPortalTitle: 'பங்கு அடிப்படையிலான உள்நுழைவு தளம்',
    citizenPortalTab: 'குடிமக்கள்',
    workerPortalTab: 'தூய்மைப் பணியாளர்',
    adminPortalTab: 'நிர்வாகி',
    portalModeLabel: 'தள முறை:',
    modeRegister: 'புதிய பதிவு',
    modeSignIn: 'கணக்கு உள்நுழைவு',
    switchToSignIn: 'உள்நுழைவுக்கு மாறு',
    switchToRegister: 'புதிய பயனரா? பதிவு செய்க',
    fullNameLabel: 'முழு பெயர்',
    emailLabel: 'மின்னஞ்சல் முகவரி',
    passwordLabel: 'கடவுச்சொல்',
    citizenIdLabel: 'அரசு அடையாள எண் (ஆதார் / வாக்காளர் அட்டை)',
    workerIdLabel: 'பணியாளர் அடையாள எண் / பேட்ஜ் எண்',
    adminIdLabel: 'நிர்வாக அதிகாரி எண் / துறை குறியீடு',
    signInBtn: 'உள்நுழைக',
    registerBtn: 'புதிய கணக்கை உருவாக்கு',
    orOAuthDivider: 'அல்லது OAuth 2.0',
    googleOAuthBtn: 'Continue with Google',
    oauthModalTitle: 'கட்டாய அடையாள எண் சரிபார்ப்பு',
    oauthModalDesc:
      'தொடர்வதற்கு உங்கள் பங்கு சார்ந்த அரசு அல்லது பணியாளர் அடையாள எண்ணை உள்ளிடவும்.',
    oauthAccountLabel: 'Google கணக்கு:',
    oauthPortalLabel: 'பிரிவு:',
    cancelBtn: 'ரத்து செய்',
    completeAuthBtn: 'சரிபார்த்து உள்ளே செல்லவும்',
    activeQueueTitle: 'தற்போதைய நகராட்சி தூய்மைப் புகார் வரிசை',
    activeQueueSubtitle:
      'பதிவான புகார்கள், பணியாளர் ஒதுக்கீடு மற்றும் AI சரிபார்ப்பு நிலையின் நேரடி பட்டியல்.',
    reportNewWasteBtn: 'புதிய புகார் அளி',
    priorityPrefix: 'முன்னுரிமை:',
    statusPrefix: 'நிலை:',
    locationPrefix: 'இடம்:',
    effortPrefix: 'முயற்சி:',
    assignedPrefix: 'ஒதுக்கப்பட்டது:',
    awaitingDispatch: 'நிர்வாக ஒதுக்கீட்டிற்காக காத்திருக்கிறது',
    viewTimelineBtn: 'வரலாற்றைப் பார் →',
    citizenHeader: 'குடிமக்கள் கழிவு புகார் மற்றும் தீர்வு கண்காணிப்பு',
    citizenSubheader:
      'உண்மையான புகைப்படத்தை பதிவேற்றி AI வகைப்படுத்தலைப் பெறுங்கள்.',
    switchCitizenSessionBtn: 'குடிமகன் கணக்கிற்கு மாறு (AADHAAR-9876-5432)',
    citizenIdPrefix: 'குடிமகன் எண்:',
    reportIncidentTitle: 'புதிய கழிவு புகாரை பதிவு செய்க',
    uploadPhotoLabel: '1. இடத்தின் புகைப்படத்தைத் தேர்ந்தெடுக்கவும்',
    uploadPhotoFileBtn: 'புகைப்பட கோப்பை பதிவேற்று',
    sampleMarketBinBtn: 'மாதிரி: மார்க்கெட் தொட்டி',
    sampleRoadDumpBtn: 'மாதிரி: சாலையோர குப்பை',
    locationInputLabel: '2. முகவரி / அடையாளம் / வார்டு',
    complaintHeadlineLabel: 'புகார் தலைப்பு',
    runAiTriageBtn: 'AI பரிசோதனை & வகைப்படுத்தல் செய்',
    testSyntheticBlockBtn: 'போலி AI பட தடுப்பை சோதி',
    analyzingImage: 'AI புகைப்படத்தை ஆய்வு செய்கிறது...',
    syntheticBlockedTitle: 'போலி AI புகைப்படம் தடுக்கப்பட்டது',
    authenticVerifiedTitle: 'உண்மையான புகைப்படம் என ஜெமினி உறுதி செய்தது',
    confidenceSuffix: 'நம்பகத்தன்மை',
    wasteCategoryLabel: 'கழிவு வகை',
    severityLabel: 'தீவிரத்தன்மை',
    effortLabel: 'மதிப்பிடப்பட்ட பணி நேரம்',
    submitTicketBtn: 'புகாரை சமர்ப்பிக்கவும்',
    myComplaintsTitle: 'எனது புகார்கள் மற்றும் நிலை',
    filterAll: 'அனைத்தும்',
    awaitingWorkerPhoto: 'பணியாளரின் சுத்தம் செய்த புகைப்படத்திற்காக காத்திருக்கிறது',
    unassignedLabel: 'ஒதுக்கப்படவில்லை',
    geminiVerdictPrefix: 'ஜெமினி AI முடிவு:',
    citizenAuthorityTitle: 'குடிமக்கள் இறுதி முடிவு — முன்/பின் படங்களை ஒப்பிடுக:',
    confirmResolutionBtn: 'தீர்வை உறுதிப்படுத்தி மூடவும்',
    rejectResolutionBtn: 'தீர்வை நிராகரித்து மீண்டும் திறக்கவும்',
    rejectionReasonPlaceholder:
      'கட்டாயம்: நிராகரிப்பதற்கான காரணத்தைக் குறிப்பிடவும்...',
    submitRejectionBtn: 'நிராகரிப்பை சமர்ப்பித்து மீண்டும் திற',
    workerHeader: 'தூய்மைப் பணியாளர் பணித்தளம்',
    workerSubheader:
      'குரல் வழிகாட்டுதல் (TTS) மற்றும் உடனடி AI புகைப்பட சரிபார்ப்பு.',
    activateWorkerBadgeBtn: 'பணியாளர் பேட்ஜை இயக்கு (WRK-8821-DELHI)',
    activeBadgePrefix: 'பணியாளர் எண்:',
    legendRedTitle: 'சிவப்பு = மிக அவசரம் / தடுக்கப்பட்டது',
    legendRedSub: 'உடனடி நடவடிக்கை',
    legendYellowTitle: 'மஞ்சள் = பணி தேவை',
    legendYellowSub: 'ஒதுக்கப்பட்டது / செயல்பாட்டில்',
    legendGreenTitle: 'பச்சை = முடிந்தது',
    legendGreenSub: 'AI மூலம் உறுதி செய்யப்பட்டது',
    dismissBtn: 'மூடு',
    categoryPrefix: 'வகை:',
    speakDirectionsBtn: 'பணி விவரங்களை குரலில் கேள்',
    postCleanupRequiredTitle: 'சுத்தம் செய்த பின் புகைப்படம் தேவை',
    postCleanupRequiredDesc:
      'ஜெமினி AI உங்கள் படத்தை முந்தைய படத்துடன் ஒப்பிட்டு சரிபார்க்கும்.',
    startJobBtn: 'பணியைத் தொடங்கு',
    navigateSiteBtn: 'இடத்திற்கு வழிகாட்டு',
    uploadAfterPhotoBtn: 'சுத்தம் செய்த பின் புகைப்படம் பதிவேற்று',
    uploadPostCleanupBtn: 'புகைப்படத்தைத் தேர்ந்தெடு',
    demoVerifyPassBtn: 'டெமோ சரிபார்ப்பு: சுத்தமான படம் (தேர்ச்சி)',
    demoVerifyFailBtn: 'டெமோ சரிபார்ப்பு: சுத்தம் செய்யாத படம் (தடுப்பு)',
    verifyingCleanup: 'Gemini AI முன்பு/பின்பு படங்களை ஒப்பிடுகிறது...',
    hardEnforcementBanner:
      'கடும் விதி: பணி நிறைவு தடுக்கப்பட்டது — நிலை ACTION_REQUIRED ஆக மாற்றப்பட்டது.',
    retryUploadBtn: 'மீண்டும் சுத்தம் செய்து புகைப்படம் பதிவேற்று',
    adminHeader: 'நகராட்சி நிர்வாக கட்டுப்பாட்டு மையம்',
    adminSubheader:
      'நகர அளவிலான புகார் புள்ளிவிவரங்கள் மற்றும் பணியாளர் ஒதுக்கீடு.',
    activateAdminSessionBtn: 'நிர்வாக கணக்கை இயக்கு (ADM-GOV-001)',
    deptCodePrefix: 'துறை குறியீடு:',
    metricReported: 'புகாரளிக்கப்பட்டவை',
    metricAssigned: 'ஒதுக்கப்பட்டவை',
    metricInProgress: 'செயல்பாட்டில்',
    metricFlagged: 'ஆய்வுக்குறியவை',
    metricResolved: 'தீர்க்கப்பட்டவை',
    metricReopened: 'மீண்டும் திறந்தவை',
    dispatchQueueTitle: 'முன்னுரிமை புகார் வரிசை',
    totalActiveRecordsPrefix: 'மொத்த புகார்கள்:',
    colTicketWard: 'புகார் எண் & வார்டு',
    colCategoryEffort: 'வகை & பணி நேரம்',
    assignWorkerLabel: 'பணியாளரை நியமிக்கவும்',
    priorityOverrideLabel: 'முன்னுரிமையை மாற்று',
    colCurrentStatus: 'தற்போதைய நிலை',
    colHumanLoop: 'மனித ஆய்வு',
    unassignedSelectOption: '-- ஒதுக்கப்படவில்லை (பணியாளரைத் தேர்ந்தெடு) --',
    reviewModalBtn: 'மனித ஆய்வு (Review)',
    governanceModalPrefix: 'மனித ஆய்வு கட்டுப்பாடு:',
    pendingWorkerUploadPreview: 'பணியாளர் படம் நிலுவையில் (மாதிரி காட்சி)',
    adminAuditFallbackDesc:
      'நிர்வாகி தணிக்கை காரணத்தைக் குறிப்பிட்டு பணியை ஏற்கலாம் அல்லது நிராகரிக்கலாம்.',
    mandatoryAdminReasonLabel: 'கட்டாய நிர்வாக தணிக்கை காரணம்',
    adminOverrideApproveBtn: 'நிர்வாக ஒப்புதல் அளி',
    adminRejectTaskBtn: 'பணியை நிராகரி',
    adminReasonPlaceholder: 'கட்டாயம்: நிர்வாக முடிவிற்கான காரணம்...',
    awarenessHeader: 'கழிவு பிரிப்பு மற்றும் விழிப்புணர்வு மையம்',
    awarenessSubheader:
      'மக்கும் குப்பை, மக்காத குப்பை, மின்னணு மற்றும் அபாயகரமான கழிவுகளை பிரிக்கும் முறை.',
    streamAllTab: 'அனைத்து 4 வகைகள்',
    streamWetTab: 'மக்கும் குப்பை (பச்சை)',
    streamDryTab: 'மக்காத குப்பை (நீலம்)',
    streamEwasteTab: 'மின்னணு கழிவு',
    streamHazardousTab: 'அபாயகரமானவை (சிவப்பு)',
    listenAudioBtn: 'குரலில் கேள்',
    permittedItemsTitle: 'போடக்கூடியவை (அனுமதிக்கப்பட்டவை):',
    prohibitedItemsTitle: 'கடுமையாக தடைசெய்யப்பட்டவை:',
    municipalProcessingPrefix: 'நகராட்சி சுத்திகரிப்பு முறை:',
    charterSectionTitle:
      'திடக்கழிவு மேலாண்மை (SWM) விதிகள் மற்றும் பணியாளர் பாதுகாப்பு',
    charter1Title: '01. கலப்பு குப்பைகளைத் தவிர்க்கவும்',
    charter1Desc:
      'மக்கும் மற்றும் மக்காத குப்பைகளை தனித்தனியாக பிரித்து வழங்குவது மறுசுழற்சி திறனை அதிகரிக்கிறது.',
    charter2Title: '02. கூர்மையான பொருட்களை பாதுகாப்பாக மடிக்கவும்',
    charter2Desc:
      'உடைந்த கண்ணாடி மற்றும் ஊசிகளை தடிமனான அட்டையில் சுற்றி வழங்குவது தூய்மைப் பணியாளர்களை காயத்திலிருந்து பாதுகாக்கும்.',
    charter3Title: '03. குடிமக்கள் இறுதி சரிபார்ப்பு கடமை',
    charter3Desc:
      'பணி முடிந்ததும் முன்னும் பின்னும் உள்ள படங்களை ஒப்பிட்டு உறுதிப்படுத்தவும் அல்லது காரணத்துடன் நிராகரிக்கவும்.',
    timelineTitle: 'புகார் வரலாறு மற்றும் தணிக்கை பதிவு',
    beforePhotoLabel: 'சுத்தம் செய்யும் முன்',
    afterPhotoLabel: 'சுத்தம் செய்த பின்',
  },
  TE: {
    brandTagline: 'AI-ధృవీకరించబడిన పారిశుద్ధ్యం & వ్యర్థాల పరిష్కార వ్యవస్థ',
    navHome: 'హోమ్ పోర్టల్',
    navCitizen: 'పౌర పోర్టల్',
    navWorker: 'కార్మిక యాప్',
    navAdmin: 'అడ్మిన్ కన్సోల్',
    navAwareness: 'వ్యర్థాల వేర్పాటు గైడ్',
    signOut: 'సైన్ అవుట్',
    heroTitle: 'విజువల్ AI ద్వారా ధృవీకరించబడిన పట్టణ పారిశుద్ధ్యం',
    heroSubtitle:
      'ప్రతి ఫిర్యాదు నకిలీ AI చిత్రాల కోసం తనిఖీ చేయబడుతుంది, జెమిని విopషన్ ద్వారా వర్గీకరించబడుతుంది మరియు ముందు/తర్వాత ఫోటోల పోలికతో పరిష్కరించబడుతుంది.',
    quickDemoTitle: 'త్వరిత డెమో లాగిన్ — ఒక్క క్లిక్‌తో యాక్సెస్',
    quickDemoSubtitle:
      'ధృవీకరించబడిన గుర్తింపు కార్డులు మరియు ముందస్తు ఫిర్యాదులతో తక్షణమే పోర్టల్ మార్చండి.',
    demoCitizenBtn: 'డెమో పౌరుడు (ఆధార్)',
    demoWorkerBtn: 'డెమో కార్మికుడు (WRK-8821)',
    demoAdminBtn: 'డెమో అడ్మిన్ (ADM-GOV-001)',
    heroStat1Value: '100%',
    heroStat1Label: 'నకిలీ AI ఫోటో నిరోధక గేట్',
    heroStat2Value: '6 భాషలు',
    heroStat2Label: 'కార్మికులకు ప్రాంతీయ వాయిస్ సూచనలు',
    heroStat3Value: '2-దశల రుజువు',
    heroStat3Label: 'జెమిని విopషన్ + పౌర నిర్ధారణ',
    step1Title: '01. సింథటిక్ ఫిల్టర్ & విజువల్ ట్రయాజ్',
    step1Desc:
      'జెమిని విopషన్ ఫోటో యొక్క నిజాయితీని తనిఖీ చేసి వ్యర్థాల వర్గం, తీవ్రత మరియు పని సమయాన్ని అంచనా వేస్తుంది.',
    step2Title: '02. ప్రాధాన్యత డిస్పాచ్ & తెలుగు వాయిస్ (TTS)',
    step2Desc:
      'అడ్మిన్‌లు ప్రాధాన్యత క్రమంలో పనులను కేటాయిస్తారు. కార్మికులు తమ భాషలో వాయిస్ సూచనలను వినవచ్చు.',
    step3Title: '03. ముందు/తర్వాత ఫోటోల కఠిన తనిఖీ',
    step3Desc:
      'కార్మికుడు శుభ్రం చేసిన తర్వాత ఫోటోను అప్‌లోడ్ చేసినప్పుడు, జెమిని రెండు ఫోటోలను పోల్చి చూస్తుంది. శుభ్రం చేయకపోతే బ్లాక్ చేస్తుంది.',
    step4Title: '04. మానవ సమీక్ష & పౌరుల తుది నిర్ణయం',
    step4Desc:
      'అడ్మిన్‌లు సమీక్షించవచ్చు మరియు ఫిర్యాదు చేసిన పౌరుడు పరిష్కారాన్ని నిర్ధారించవచ్చు లేదా తిరిగి తెరవవచ్చు.',
    authPortalTitle: 'పాత్ర-ఆధారిత ధృవీకరణ పోర్టల్',
    citizenPortalTab: 'పౌర పోర్టల్',
    workerPortalTab: 'పారిశుద్ధ్య కార్మికుడు',
    adminPortalTab: 'అడ్మినిస్ట్రేటర్',
    portalModeLabel: 'పోర్టల్ మోడ్:',
    modeRegister: 'కొత్త రిజిస్ట్రేషన్',
    modeSignIn: 'ఖాతా సైన్-ఇన్',
    switchToSignIn: 'సైన్ ఇన్‌కు మారండి',
    switchToRegister: 'కొత్త వినియోగదారు? నమోదు చేయండి',
    fullNameLabel: 'పూర్తి పేరు',
    emailLabel: 'ఇమెయిల్ చిరునామా',
    passwordLabel: 'పాస్‌వర్డ్',
    citizenIdLabel: 'ప్రభుత్వ గుర్తింపు సంఖ్య (ఆధార్ / ఓటర్ ID)',
    workerIdLabel: 'కార్మిక పని ID / బ్యాడ్జ్ నంబర్',
    adminIdLabel: 'అధికారిక అడ్మిన్ ID / విభాగం కోడ్',
    signInBtn: 'లాగిన్ చేయండి',
    registerBtn: 'కొత్త ఖాతాను సృష్టించండి',
    orOAuthDivider: 'లేదా OAuth 2.0',
    googleOAuthBtn: 'Continue with Google',
    oauthModalTitle: 'తప్పనిసరి గుర్తింపు సంఖ్య ధృవీకరణ',
    oauthModalDesc:
      'కొనసాగడానికి దయచేసి మీ పాత్రకు సంబంధించిన గుర్తింపు సంఖ్యను నమోదు చేయండి.',
    oauthAccountLabel: 'Google ఖాతా:',
    oauthPortalLabel: 'పోర్టల్:',
    cancelBtn: 'రద్దు చేయండి',
    completeAuthBtn: 'ధృవీకరించి కొనసాగండి',
    activeQueueTitle: 'సక్రియ మున్సిపల్ పారిశుద్ధ్య క్యూ',
    activeQueueSubtitle:
      'నివేదించబడిన ఫిర్యాదులు, కార్మికుల కేటాయింపులు మరియు AI ధృవీకరణ స్థితి యొక్క ప్రత్యక్ష జాబితా.',
    reportNewWasteBtn: 'కొత్త ఫిర్యాదు చేయండి',
    priorityPrefix: 'ప్రాధాన్యత:',
    statusPrefix: 'స్థితి:',
    locationPrefix: 'స్థానం:',
    effortPrefix: 'సమయం:',
    assignedPrefix: 'కేటాయించినది:',
    awaitingDispatch: 'అడ్మిన్ కేటాయింపు కోసం వేచి ఉంది',
    viewTimelineBtn: 'టైమ్‌లైన్ చూడండి →',
    citizenHeader: 'పౌర వ్యర్థాల ఫిర్యాదు & ట్రాకింగ్ పోర్టల్',
    citizenSubheader: 'నిజమైన ఫోటోను అప్‌లోడ్ చేసి AI విశ్లేషణ పొందండి.',
    switchCitizenSessionBtn: 'పౌర సెషన్‌కు మారండి (AADHAAR-9876-5432)',
    citizenIdPrefix: 'పౌర ID:',
    reportIncidentTitle: 'కొత్త వ్యర్థాల ఫిర్యాదును నమోదు చేయండి',
    uploadPhotoLabel: '1. ప్రదేశం యొక్క ఫోటోను ఎంచుకోండి',
    uploadPhotoFileBtn: 'ఫోటో ఫైల్ అప్‌లోడ్ చేయండి',
    sampleMarketBinBtn: 'నమూనా: మార్కెట్ డస్ట్‌బిన్',
    sampleRoadDumpBtn: 'నమూనా: రోడ్డు పక్కన చెత్త',
    locationInputLabel: '2. చిరునామా / ల్యాండ్‌మార్క్ / వార్డు',
    complaintHeadlineLabel: 'ఫిర్యాదు శీర్షిక',
    runAiTriageBtn: 'AI తనిఖీ & వర్గీకరణ రన్ చేయండి',
    testSyntheticBlockBtn: 'నకిలీ AI ఫోటో బ్లాక్ పరీక్షించండి',
    analyzingImage: 'AI ఫోటోను విశ్లేషిస్తోంది...',
    syntheticBlockedTitle: 'నకిలీ AI ఫోటో అప్‌లోడ్ నిలిపివేయబడింది',
    authenticVerifiedTitle: 'నిజమైన ఫోటోగా జెమిని ధృవీకరించింది',
    confidenceSuffix: 'విశ్వాసం',
    wasteCategoryLabel: 'వ్యర్థాల వర్గం',
    severityLabel: 'తీవ్రత & ప్రాధాన్యత',
    effortLabel: 'అంచనా వేసిన శుభ్రపరిచే సమయం',
    submitTicketBtn: 'ఫిర్యాదును సమర్పించండి',
    myComplaintsTitle: 'నా ఫిర్యాదుల జాబితా',
    filterAll: 'అన్నీ',
    awaitingWorkerPhoto: 'కార్మికుని శుభ్రం చేసిన ఫోటో కోసం వేచి ఉంది',
    unassignedLabel: 'కేటాయించబడలేదు',
    geminiVerdictPrefix: 'జెమిని విopషన్ తీర్పు:',
    citizenAuthorityTitle: 'పౌరుల తుది నిర్ణయం — ముందు & తర్వాత ఫోటోలను పరిశీలించండి:',
    confirmResolutionBtn: 'పరిష్కారాన్ని నిర్ధారించండి',
    rejectResolutionBtn: 'తిరస్కరించండి & తిరిగి తెరవండి',
    rejectionReasonPlaceholder: 'తప్పనిసరి: తిరస్కరణకు గల కారణాన్ని వివరించండి...',
    submitRejectionBtn: 'తిరస్కరణను సమర్పించి మళ్లీ తెరవండి',
    workerHeader: 'పారిశుద్ధ్య కార్మిక ఫీల్డ్ డ్యాష్‌బోర్డ్',
    workerSubheader:
      'తెలుగు వాయిస్ సూచనలు (TTS) మరియు తక్షణ AI ఫోటో ధృవీకరణ.',
    activateWorkerBadgeBtn: 'కార్మిక బ్యాడ్జ్‌ని సక్రియం చేయండి (WRK-8821-DELHI)',
    activeBadgePrefix: 'సక్రియ బ్యాడ్జ్:',
    legendRedTitle: 'ఎరుపు = అత్యవసరం / నిలిపివేయబడింది',
    legendRedSub: 'తక్షణ చర్య అవసరం',
    legendYellowTitle: 'పసుపు = చర్య అవసరం',
    legendYellowSub: 'కేటాయించబడింది / పనిలో ఉంది',
    legendGreenTitle: 'ఆకుపచ్చ = పూర్తయింది',
    legendGreenSub: 'AI ద్వారా ధృవీకరించబడింది',
    dismissBtn: 'మూసివేయి',
    categoryPrefix: 'వర్గం:',
    speakDirectionsBtn: 'పని సూచనలను వాయిస్‌లో వినండి',
    postCleanupRequiredTitle: 'శుభ్రం చేసిన తర్వాత ఫోటో అవసరం',
    postCleanupRequiredDesc:
      'జెమిని విopషన్ మీ ఫోటోను మునుపటి ఫోటోతో పోల్చి తనిఖీ చేస్తుంది.',
    startJobBtn: 'పని ప్రారంభించండి',
    navigateSiteBtn: 'సైట్‌కు నావిగేట్ చేయండి',
    uploadAfterPhotoBtn: 'శుభ్రం చేసిన తర్వాత ఫోటోను అప్‌లోడ్ చేయండి',
    uploadPostCleanupBtn: 'ఫోటోను అప్‌లోడ్ చేయండి',
    demoVerifyPassBtn: 'డెమో తనిఖీ: శుభ్రమైన ఫోటో (పాస్)',
    demoVerifyFailBtn: 'డెమో తనిఖీ: శుభ్రం చేయని ఫోటో (బ్లాక్)',
    verifyingCleanup: 'Gemini AI ముందు/తర్వాత ఫోటోలను పోలుస్తోంది...',
    hardEnforcementBanner:
      'కఠిన నియమం: పూర్తి చేయడం నిలిపివేయబడింది — స్థితి ACTION_REQUIRED కు మార్చబడింది.',
    retryUploadBtn: 'మళ్లీ శుభ్రం చేసి ఫోటో అప్‌లోడ్ చేయండి',
    adminHeader: 'మున్సిపల్ అడ్మిన్ డిస్పాచ్ కన్సోల్',
    adminSubheader:
      'నగరవ్యాప్త పారిశుద్ధ్య గణాంకాలు మరియు కార్మికుల కేటాయింపు.',
    activateAdminSessionBtn: 'అడ్మిన్ సెషన్‌ను సక్రియం చేయండి (ADM-GOV-001)',
    deptCodePrefix: 'విభాగం కోడ్:',
    metricReported: 'నివేదించబడినవి',
    metricAssigned: 'కేటాయించినవి',
    metricInProgress: 'పురోగతిలో ఉన్నవి',
    metricFlagged: 'ఫ్లాగ్ / చర్య',
    metricResolved: 'పరిష్కరించబడినవి',
    metricReopened: 'తిరిగి తెరిచినవి',
    dispatchQueueTitle: 'ప్రాధాన్యత డిస్పాచ్ క్యూ',
    totalActiveRecordsPrefix: 'మొత్తం రికార్డులు:',
    colTicketWard: 'టికెట్ & వార్డు స్థానం',
    colCategoryEffort: 'వర్గం & సమయం',
    assignWorkerLabel: 'కార్మికుడిని కేటాయించండి',
    priorityOverrideLabel: 'ప్రాధాన్యతను మార్చండి',
    colCurrentStatus: 'ప్రస్తుత స్థితి',
    colHumanLoop: 'మానవ సమీక్ష',
    unassignedSelectOption: '-- కేటాయించలేదు (కార్మికుడిని ఎంచుకోండి) --',
    reviewModalBtn: 'మానవ సమీక్ష (Review)',
    governanceModalPrefix: 'మానవ సమీక్ష నియంత్రణ:',
    pendingWorkerUploadPreview: 'కార్మిక ఫోటో పెండింగ్‌లో ఉంది (నమూనా)',
    adminAuditFallbackDesc:
      'అడ్మిన్ ఆడిట్ కారణాన్ని నమోదు చేసి పనిని ఆమోదించవచ్చు లేదా తిరస్కరించవచ్చు.',
    mandatoryAdminReasonLabel: 'తప్పనిసరి అడ్మిన్ ఆడిట్ కారణం',
    adminOverrideApproveBtn: 'అడ్మిన్ ఓవర్‌రైడ్ ఆమోదం',
    adminRejectTaskBtn: 'పనిని తిరస్కరించండి',
    adminReasonPlaceholder: 'తప్పనిసరి: అడ్మిన్ నిర్ణయానికి కారణం...',
    awarenessHeader: 'వ్యర్థాల వేర్పాటు & అవగాహన కేంద్రం',
    awarenessSubheader:
      'పొడి, తడి, ఇ-వ్యర్థాలు మరియు ప్రమాదకర వ్యర్థాలను వేరు చేసే విధానం.',
    streamAllTab: 'అన్ని 4 విభాగాలు',
    streamWetTab: 'తడి చెత్త (ఆకుపచ్చ)',
    streamDryTab: 'పొడి చెత్త (నీలం)',
    streamEwasteTab: 'ఇ-వ్యర్థాలు',
    streamHazardousTab: 'ప్రమాదకరమైనవి (ఎరుపు)',
    listenAudioBtn: 'వినండి',
    permittedItemsTitle: 'వేయదగినవి (అనుమతించబడినవి):',
    prohibitedItemsTitle: 'కఠినంగా నిషేధించబడినవి:',
    municipalProcessingPrefix: 'మున్సిపల్ ప్రాసెసింగ్ విధానం:',
    charterSectionTitle:
      'ఘన వ్యర్థాల నిర్వహణ (SWM) నియమాలు & కార్మికుల భద్రత',
    charter1Title: '01. కలిపిన చెత్తను ఇవ్వకండి',
    charter1Desc:
      'తడి మరియు పొడి చెత్తను వేరుగా ఇవ్వడం వల్ల రీసైక్లింగ్ సామర్థ్యం పెరుగుతుంది.',
    charter2Title: '02. పదునైన వస్తువుల సురక్షిత ప్యాకింగ్',
    charter2Desc:
      'పగిలిన గాజు మరియు సూదులను మందపాటి కార్డ్‌బోర్డ్‌లో చుట్టి ఇవ్వడం వల్ల పారిశుద్ధ్య కార్మికులకు గాయాలు కాకుండా ఉంటాయి.',
    charter3Title: '03. పౌరుల తుది ధృవీకరణ బాధ్యత',
    charter3Desc:
      'పని పూర్తయినప్పుడు ముందు మరియు తర్వాత ఫోటోలను పరిశీలించి నిర్ధారించండి లేదా కారణంతో తిరిగి తెరవండి.',
    timelineTitle: 'ఆడిట్ లాగ్ & టైమ్‌లైన్',
    beforePhotoLabel: 'శుభ్రం చేయడానికి ముందు',
    afterPhotoLabel: 'శుభ్రం చేసిన తర్వాత',
  },
  MR: {
    brandTagline: 'एआय-सत्यापित स्वच्छता आणि कचरा निवारण प्रणाली',
    navHome: 'मुख्य पोर्टल',
    navCitizen: 'नागरिक पोर्टल',
    navWorker: 'कर्मचारी पोर्टल',
    navAdmin: 'प्रशासन कक्ष',
    navAwareness: 'कचरा वर्गीकरण मार्गदर्शक',
    signOut: 'बाहेर पडा',
    heroTitle: 'व्हिज्युअल एआय द्वारे सत्यापित नागरी स्वच्छता लूप',
    heroSubtitle:
      'प्रत्येक तक्रारीची बनावट एआय फोटो तपासणी केली जाते, जेमिनी व्हिजनद्वारे वर्गीकरण होते आणि साफसफाईपूर्वी/नंतरच्या फोटो तुलनेने पुष्टी केली जाते.',
    quickDemoTitle: 'जलद डेमो लॉगिन — एका क्लिकवर प्रवेश करा',
    quickDemoSubtitle:
      'सत्यापित ओळखपत्र आणि पूर्व-नोंदणीकृत तक्रारींसह तात्काळ भूमिका बदला.',
    demoCitizenBtn: 'डेमो नागरिक (आधार)',
    demoWorkerBtn: 'डेमो कर्मचारी (WRK-8821)',
    demoAdminBtn: 'डेमो प्रशासक (ADM-GOV-001)',
    heroStat1Value: '100%',
    heroStat1Label: 'बनावट एआय फोटो प्रतिबंध गेट',
    heroStat2Value: '6 भाषा',
    heroStat2Label: 'कर्मचाऱ्यांसाठी प्रादेशिक आवाज सूचना',
    heroStat3Value: '2-स्तरीय पुरावा',
    heroStat3Label: 'जेमिनी व्हिजन + नागरिक अंतिम मंजुरी',
    step1Title: '01. सिंथेटिक फिल्टर आणि व्हिज्युअल वर्गीकरण',
    step1Desc:
      'जेमिनी व्हिजन कचऱ्याचा प्रकार, गांभीर्य आणि साफसफाईचा वेळ काढण्यापूर्वी अपलोड केलेल्या फोटोची सत्यता तपासते.',
    step2Title: '02. प्राधान्य डिस्पॅच आणि मराठी आवाज (TTS)',
    step2Desc:
      'प्रशासक प्राधान्य क्रमाने कामे नेमून देतात. स्वच्छता कर्मचारी मराठी, हिंदी, तमिळ, तेलुगू, बंगाली किंवा इंग्रजीत सूचना ऐकू शकतात.',
    step3Title: '03. आधी/नंतरच्या फोटोची कडक पडताळणी',
    step3Desc:
      'कर्मचाऱ्याने साफसफाईनंतर फोटो अपलोड केल्यावर जेमिनी दोन्ही फोटोंची तुलना करते. कचरा साफ नसल्यास काम आपोआप थांबवले जाते.',
    step4Title: '04. मानवी पुनरावलोकन आणि नागरिकांचा अंतिम निर्णय',
    step4Desc:
      'प्रशासक ऑडिट कारणासह निर्णय घेऊ शकतात आणि तक्रारदार नागरिक तक्रार बंद करू शकतो किंवा पुन्हा उघडू शकतो.',
    authPortalTitle: 'भूमिका-आधारित प्रमाणीकरण पोर्टल',
    citizenPortalTab: 'नागरिक पोर्टल',
    workerPortalTab: 'स्वच्छता कर्मचारी',
    adminPortalTab: 'प्रशासक (Admin)',
    portalModeLabel: 'पोर्टल मोड:',
    modeRegister: 'नवीन नोंदणी',
    modeSignIn: 'खाते साइन-इन',
    switchToSignIn: 'साइन इन वर जा',
    switchToRegister: 'नवीन वापरकर्ता? नोंदणी करा',
    fullNameLabel: 'पूर्ण नाव',
    emailLabel: 'ईमेल पत्ता',
    passwordLabel: 'पासवर्ड',
    citizenIdLabel: 'सरकारी ओळखपत्र क्रमांक (आधार / मतदान कार्ड)',
    workerIdLabel: 'कर्मचारी आयडी / बॅज क्रमांक',
    adminIdLabel: 'अधिकृत एडमिन आयडी / विभाग कोड',
    signInBtn: 'लॉगिन करा',
    registerBtn: 'नवीन खाते तयार करा',
    orOAuthDivider: 'किंवा OAuth 2.0',
    googleOAuthBtn: 'Continue with Google',
    oauthModalTitle: 'अनिवार्य ओळखपत्र सत्यापन',
    oauthModalDesc:
      'कृपया पुढे जाण्यासाठी तुमचा अनिवार्य ओळखपत्र क्रमांक प्रविष्ट करा.',
    oauthAccountLabel: 'सत्यापित Google खाते:',
    oauthPortalLabel: 'पोर्टल:',
    cancelBtn: 'रद्द करा',
    completeAuthBtn: 'सत्यापित करा आणि प्रवेश करा',
    activeQueueTitle: 'सक्रिय महानगरपालिका स्वच्छता रांग',
    activeQueueSubtitle:
      'नोंदवलेल्या तक्रारी, कर्मचारी नेमणूक आणि जेमिनी पडताळणी स्थितीची थेट यादी.',
    reportNewWasteBtn: 'नवीन तक्रार नोंदवा',
    priorityPrefix: 'प्राधान्य:',
    statusPrefix: 'स्थिती:',
    locationPrefix: 'ठिकाण:',
    effortPrefix: 'वेळ:',
    assignedPrefix: 'नेमलेले:',
    awaitingDispatch: 'प्रशासकीय नेमणुकीच्या प्रतीक्षेत',
    viewTimelineBtn: 'इतिहास पहा →',
    citizenHeader: 'नागरिक कचरा तक्रार आणि निवारण ट्रॅकर',
    citizenSubheader:
      'खरा फोटो अपलोड करा, एआय वर्गीकरण पहा आणि साफसफाईची खात्री करा.',
    switchCitizenSessionBtn: 'सक्रिय नागरिक सत्रावर जा (AADHAAR-9876-5432)',
    citizenIdPrefix: 'नागरिक आयडी:',
    reportIncidentTitle: 'नवीन कचरा तक्रार नोंदवा',
    uploadPhotoLabel: '1. जागेचा खरा फोटो निवडा',
    uploadPhotoFileBtn: 'फोटो फाईल अपलोड करा',
    sampleMarketBinBtn: 'नमुना: मार्केट कचराकुंडी',
    sampleRoadDumpBtn: 'नमुना: रस्त्यावरील कचरा',
    locationInputLabel: '2. पत्ता / खूण / प्रभाग',
    complaintHeadlineLabel: 'तक्रारीचे शीर्षक',
    runAiTriageBtn: 'एआय फोटो तपासणी आणि वर्गीकरण करा',
    testSyntheticBlockBtn: 'बनावट एआय फोटो ब्लॉक तपासा',
    analyzingImage: 'एआय फोटोची सत्यता तपासत आहे...',
    syntheticBlockedTitle: 'बनावट एआय फोटो अपलोड रोखला गेला',
    authenticVerifiedTitle: 'जेमिनीद्वारे खरा फोटो सत्यापित',
    confidenceSuffix: 'खात्री',
    wasteCategoryLabel: 'कचऱ्याचा प्रकार',
    severityLabel: 'गांभीर्य आणि प्राधान्य',
    effortLabel: 'अंदाजे साफसफाई वेळ',
    submitTicketBtn: 'तक्रार नोंदवा',
    myComplaintsTitle: 'माझ्या तक्रारी आणि सद्यस्थिती',
    filterAll: 'सर्व',
    awaitingWorkerPhoto: 'कर्मचाऱ्याच्या साफसफाईनंतरच्या फोटोची प्रतीक्षा',
    unassignedLabel: 'नेमलेले नाही',
    geminiVerdictPrefix: 'जेमिनी व्हिजन निष्कर्ष:',
    citizenAuthorityTitle: 'नागरिक अंतिम निर्णय — आधी आणि नंतरचे फोटो तपासा:',
    confirmResolutionBtn: 'साफसफाईची पुष्टी करा (तक्रार बंद करा)',
    rejectResolutionBtn: 'नाकारा आणि पुन्हा उघडा',
    rejectionReasonPlaceholder: 'अनिवार्य: साफसफाई अपूर्ण का आहे ते लिहा...',
    submitRejectionBtn: 'नकार नोंदवा आणि तक्रार पुन्हा उघडा',
    workerHeader: 'स्वच्छता कर्मचारी फील्ड डॅशबोर्ड',
    workerSubheader:
      'मराठी आवाज सूचना (TTS) आणि तात्काळ एआय फोटो पडताळणी.',
    activateWorkerBadgeBtn: 'कर्मचारी बॅज सुरू करा (WRK-8821-DELHI)',
    activeBadgePrefix: 'सक्रिय बॅज:',
    legendRedTitle: 'लाल = अति गंभीर / रोखलेले',
    legendRedSub: 'तात्काळ दुरुस्ती आवश्यक',
    legendYellowTitle: 'पिवळा = कृती आवश्यक',
    legendYellowSub: 'नेमलेले / काम सुरू',
    legendGreenTitle: 'हिरवा = पूर्ण',
    legendGreenSub: 'एआय द्वारे स्वच्छता सत्यापित',
    dismissBtn: 'बंद करा',
    categoryPrefix: 'प्रकार:',
    speakDirectionsBtn: 'कामाच्या सूचना आवाजात ऐका',
    postCleanupRequiredTitle: 'साफसफाईनंतरचा फोटो आवश्यक आहे',
    postCleanupRequiredDesc:
      'जेमिनी व्हिजन तुमच्या फोटोची आधीच्या फोटोशी समोरासमोर तुलना करेल.',
    startJobBtn: 'काम सुरू करा',
    navigateSiteBtn: 'जागेचा नकाशा उघडा',
    uploadAfterPhotoBtn: 'साफसफाईनंतरचा फोटो अपलोड करा',
    uploadPostCleanupBtn: 'साफसफाईनंतरचा फोटो निवडा',
    demoVerifyPassBtn: 'डेमो पडताळणी: स्वच्छ फोटो (यशस्वी)',
    demoVerifyFailBtn: 'डेमो पडताळणी: अस्वच्छ फोटो (रोखले)',
    verifyingCleanup: 'जेमिनी एआय आधी आणि नंतरच्या फोटोची तुलना करत आहे...',
    hardEnforcementBanner:
      'कडक नियम: काम पूर्ण करणे रोखले — स्थिती ACTION_REQUIRED केली.',
    retryUploadBtn: 'पुन्हा साफ करा आणि फोटो अपलोड करा',
    adminHeader: 'महानगरपालिका प्रशासन नियंत्रण कक्ष',
    adminSubheader:
      'शहरातील तक्रारींची स्थिती, प्राधान्य रांग आणि मानवी पुनरावलोकन.',
    activateAdminSessionBtn: 'अधिकृत प्रशासक सत्र सुरू करा (ADM-GOV-001)',
    deptCodePrefix: 'विभाग कोड:',
    metricReported: 'नोंदवलेल्या',
    metricAssigned: 'नेमलेल्या',
    metricInProgress: 'काम सुरू',
    metricFlagged: 'तपासणी / कृती',
    metricResolved: 'सोडवलेल्या / बंद',
    metricReopened: 'पुन्हा उघडलेल्या',
    dispatchQueueTitle: 'प्राधान्य डिस्पॅच रांग',
    totalActiveRecordsPrefix: 'एकूण सक्रिय नोंदी:',
    colTicketWard: 'तक्रार क्र. आणि प्रभाग',
    colCategoryEffort: 'प्रकार आणि वेळ',
    assignWorkerLabel: 'कर्मचारी नेमा',
    priorityOverrideLabel: 'प्राधान्य बदला',
    colCurrentStatus: 'सद्यस्थिती',
    colHumanLoop: 'मानवी पुनरावलोकन',
    unassignedSelectOption: '-- नेमलेले नाही (कर्मचारी निवडा) --',
    reviewModalBtn: 'मानवी पुनरावलोकन (Review)',
    governanceModalPrefix: 'मानवी पुनरावलोकन नियंत्रण:',
    pendingWorkerUploadPreview: 'कर्मचारी फोटो प्रतीक्षेत (नमुना दृश्य)',
    adminAuditFallbackDesc:
      'प्रशासक अनिवार्य ऑडिट कारणासह काम मंजूर किंवा नामंजूर करू शकतात.',
    mandatoryAdminReasonLabel: 'अनिवार्य प्रशासकीय ऑडिट लॉग कारण',
    adminOverrideApproveBtn: 'प्रशासकीय मंजुरी द्या',
    adminRejectTaskBtn: 'काम नाकारा',
    adminReasonPlaceholder: 'अनिवार्य: प्रशासकीय निर्णयाचे कारण लिहा...',
    awarenessHeader: 'कचरा वर्गीकरण आणि जनजागृती केंद्र',
    awarenessSubheader:
      'सुका, ओला, ई-कचरा आणि घातक कचरा वेगळा करण्याचे नियम.',
    streamAllTab: 'सर्व 4 प्रकार',
    streamWetTab: 'ओला कचरा (हिरवा)',
    streamDryTab: 'सुका कचरा (निळा)',
    streamEwasteTab: 'ई-कचरा',
    streamHazardousTab: 'घातक कचरा (लाल)',
    listenAudioBtn: 'ऐका',
    permittedItemsTitle: 'काय टाकावे (परवानगी असलेले):',
    prohibitedItemsTitle: 'सक्त मनाई:',
    municipalProcessingPrefix: 'महानगरपालिका प्रक्रिया पद्धत:',
    charterSectionTitle:
      'घनकचरा व्यवस्थापन (SWM) नागरी सनद आणि कर्मचारी सुरक्षा नियम',
    charter1Title: '01. मिश्र कचरा देऊ नका',
    charter1Desc:
      'ओला आणि सुका कचरा वेगळा दिल्याने पुनर्वापर प्रक्रियेची कार्यक्षमता वाढते.',
    charter2Title: '02. धारदार वस्तूंचे सुरक्षित पॅकिंग',
    charter2Desc:
      'तुटलेली काच, ब्लेड आणि सुया जाड पुठ्ठ्यात गुंडाळून द्या जेणेकरून स्वच्छता कर्मचाऱ्यांना इजा होणार नाही.',
    charter3Title: '03. नागरिकांची अंतिम पडताळणी जबाबदारी',
    charter3Desc:
      'तक्रार सोडवल्यावर आधी आणि नंतरचे फोटो तपासा. पुष्टी केल्यावर तक्रार बंद होते आणि नाकारल्यास पथक पुन्हा पाठवले जाते.',
    timelineTitle: 'तक्रार इतिहास आणि ऑडिट लॉग',
    beforePhotoLabel: 'साफसफाईपूर्वी (नागरिक फोटो)',
    afterPhotoLabel: 'साफसफाईनंतर (कर्मचारी पुरावा)',
  },
  BN: {
    brandTagline: 'AI-যাচাইকৃত স্যানিটেশন ও বর্জ্য নিষ্পত্তি ব্যবস্থা',
    navHome: 'মূল পোর্টাল',
    navCitizen: 'নাগরিক পোর্টাল',
    navWorker: 'কর্মী অ্যাপ',
    navAdmin: 'অ্যাডমিন কনসোল',
    navAwareness: 'বর্জ্য পৃথকীকরণ গাইড',
    signOut: 'লগ আউট',
    heroTitle: 'ভিজ্যুয়াল AI দ্বারা যাচাইকৃত নাগরিক পরিচ্ছন্নতা',
    heroSubtitle:
      'প্রতিটি অভিযোগ কৃত্রিম AI ছবির বিরুদ্ধে পরীক্ষা করা হয়, জেমিনি ভিশন দ্বারা শ্রেণীবদ্ধ করা হয় এবং পরিষ্কারের আগে/পরের ছবি তুলনা করে নিশ্চিত করা হয়।',
    quickDemoTitle: 'কুইক ডেমো লগইন — এক ক্লিকে প্রবেশ করুন',
    quickDemoSubtitle:
      'যাচাইকৃত নাগরিক পরিচয়পত্র এবং পূর্ব-নির্ধারিত অভিযোগসহ তাৎক্ষণিক ভূমিকা পরিবর্তন করুন।',
    demoCitizenBtn: 'ডেমো নাগরিক (আধার)',
    demoWorkerBtn: 'ডেমো কর্মী (WRK-8821)',
    demoAdminBtn: 'ডেমো অ্যাডমিন (ADM-GOV-001)',
    heroStat1Value: '১০০%',
    heroStat1Label: 'কৃত্রিম AI ছবি প্রতিরোধ গেট',
    heroStat2Value: '৬টি ভাষা',
    heroStat2Label: 'কর্মীদের জন্য আঞ্চলিক ভয়েস নির্দেশিকা',
    heroStat3Value: '২-স্তরের প্রমাণ',
    heroStat3Label: 'জেমিনি ভিশন + নাগরিক চূড়ান্ত অনুমোদন',
    step1Title: '০১. সিন্থেটিক ফিল্টার ও ভিজ্যুয়াল ট্রায়াজ',
    step1Desc:
      'জেমিনি ভিশন বর্জ্যের বিভাগ, তীব্রতা এবং পরিষ্কারের সময় নির্ধারণের আগে আপলোড করা ছবির সত্যতা পরীক্ষা করে।',
    step2Title: '০২. অগ্রাধিকার ডিসপ্যাচ ও বাংলা ভয়েস (TTS)',
    step2Desc:
      'পৌর প্রশাসকরা অগ্রাধিকার তালিকা থেকে কাজ বরাদ্দ করেন। কর্মীরা বাংলা, হিন্দি, তামিল, তেলুগু, মারাঠি বা ইংরেজিতে নির্দেশ শুনতে পারেন।',
    step3Title: '০৩. আগে/পরের ছবির কঠোর যাচাইকরণ',
    step3Desc:
      'কর্মী পরিষ্কারের পরের ছবি আপলোড করলে জেমিনি দুটি ছবি পাশাপাশি তুলনা করে। পরিষ্কার না হলে কাজটি স্বয়ংক্রিয়ভাবে ব্লক হয়।',
    step4Title: '০৪. মানবিক পর্যালোচনা ও নাগরিকের চূড়ান্ত সিদ্ধান্ত',
    step4Desc:
      'অ্যাডমিনরা অডিট লগসহ সিদ্ধান্ত নিতে পারেন এবং অভিযোগকারী নাগরিক সমাধান নিশ্চিত বা পুনরায় খুলতে পারেন।',
    authPortalTitle: 'ভূমিকা-ভিত্তিক প্রমাণীকরণ পোর্টাল',
    citizenPortalTab: 'নাগরিক পোর্টাল',
    workerPortalTab: 'পরিচ্ছন্নতা কর্মী',
    adminPortalTab: 'প্রশাসক (Admin)',
    portalModeLabel: 'পোর্টাল মোড:',
    modeRegister: 'নতুন নিবন্ধন',
    modeSignIn: 'অ্যাকাউন্ট সাইন-ইন',
    switchToSignIn: 'সাইন ইনে যান',
    switchToRegister: 'নতুন ব্যবহারকারী? নিবন্ধন করুন',
    fullNameLabel: 'পুরো নাম',
    emailLabel: 'ইমেল ঠিকানা',
    passwordLabel: 'পাসওয়ার্ড',
    citizenIdLabel: 'সরকারি পরিচয়পত্র নম্বর (আধার / ভোটার আইডি)',
    workerIdLabel: 'কর্মী আইডি / ব্যাজ নম্বর',
    adminIdLabel: 'অফিসিয়াল অ্যাডমিন আইডি / বিভাগ কোড',
    signInBtn: 'লগইন করুন',
    registerBtn: 'নতুন অ্যাকাউন্ট তৈরি করুন',
    orOAuthDivider: 'অথবা OAuth 2.0',
    googleOAuthBtn: 'Continue with Google',
    oauthModalTitle: 'বাধ্যতামূলক পরিচয়পত্র যাচাইকরণ',
    oauthModalDesc:
      'এগিয়ে যেতে অনুগ্রহ করে আপনার ভূমিকা অনুযায়ী বাধ্যতামূলক পরিচয়পত্র নম্বরটি লিখুন।',
    oauthAccountLabel: 'যাচাইকৃত Google অ্যাকাউন্ট:',
    oauthPortalLabel: 'পোর্টাল:',
    cancelBtn: 'বাতিল করুন',
    completeAuthBtn: 'যাচাই করুন ও প্রবেশ করুন',
    activeQueueTitle: 'সক্রিয় পৌর পরিচ্ছন্নতা তালিকা',
    activeQueueSubtitle:
      'রিপোর্ট করা অভিযোগ, কর্মী নিয়োগ এবং জেমিনি যাচাইকরণ অবস্থার সরাসরি তালিকা।',
    reportNewWasteBtn: 'নতুন অভিযোগ করুন',
    priorityPrefix: 'অগ্রাধিকার:',
    statusPrefix: 'অবস্থা:',
    locationPrefix: 'স্থান:',
    effortPrefix: 'প্রচেষ্টা:',
    assignedPrefix: 'নিযুক্ত:',
    awaitingDispatch: 'অ্যাডমিন নিয়োগের অপেক্ষায়',
    viewTimelineBtn: 'টাইমলাইন দেখুন →',
    citizenHeader: 'নাগরিক বর্জ্য অভিযোগ ও ট্র্যাকিং পোর্টাল',
    citizenSubheader:
      'আসল ছবি আপলোড করুন, AI ট্রায়াজ দেখুন এবং পরিষ্কারের প্রমাণ যাচাই করুন।',
    switchCitizenSessionBtn: 'সক্রিয় নাগরিক সেশনে যান (AADHAAR-9876-5432)',
    citizenIdPrefix: 'নাগরিক আইডি:',
    reportIncidentTitle: 'নতুন বর্জ্য অভিযোগ নথিভুক্ত করুন',
    uploadPhotoLabel: '১. স্থানের আসল ছবি নির্বাচন করুন',
    uploadPhotoFileBtn: 'ছবির ফাইল আপলোড করুন',
    sampleMarketBinBtn: 'নমুনা: মার্কেট ডাস্টবিন',
    sampleRoadDumpBtn: 'নমুনা: রাস্তার পাশের আবর্জনা',
    locationInputLabel: '২. ঠিকানা / ল্যান্ডমার্ক / ওয়ার্ড',
    complaintHeadlineLabel: 'অভিযোগের শিরোনাম',
    runAiTriageBtn: 'AI ছবি পরীক্ষা ও ট্রায়াজ চালান',
    testSyntheticBlockBtn: 'কৃত্রিম AI ছবি ব্লক পরীক্ষা করুন',
    analyzingImage: 'AI ছবির সত্যতা ও বর্জ্য পরীক্ষা করছে...',
    syntheticBlockedTitle: 'কৃত্রিম AI ছবি আপলোড ব্লক করা হয়েছে',
    authenticVerifiedTitle: 'জেমিনি দ্বারা আসল ছবি যাচাইকৃত',
    confidenceSuffix: 'নিশ্চয়তা',
    wasteCategoryLabel: 'বর্জ্যের বিভাগ',
    severityLabel: 'জরুরিতা ও তীব্রতা',
    effortLabel: 'আনুমানিক পরিষ্কারের প্রচেষ্টা',
    submitTicketBtn: 'অভিযোগ জমা দিন',
    myComplaintsTitle: 'আমার অভিযোগের তালিকা',
    filterAll: 'সবগুলো',
    awaitingWorkerPhoto: 'কর্মীর পরিষ্কারের পরের ছবির অপেক্ষায়',
    unassignedLabel: 'নিযুক্ত নয়',
    geminiVerdictPrefix: 'জেমিনি ভিশন রায়:',
    citizenAuthorityTitle: 'নাগরিকের চূড়ান্ত সিদ্ধান্ত — আগে ও পরের ছবি দেখুন:',
    confirmResolutionBtn: 'সমাধান নিশ্চিত করুন (টিকিট বন্ধ করুন)',
    rejectResolutionBtn: 'প্রত্যাখ্যান করুন ও পুনরায় খুলুন',
    rejectionReasonPlaceholder: 'বাধ্যতামূলক: কেন পরিষ্কার অসম্পূর্ণ তা লিখুন...',
    submitRejectionBtn: 'প্রত্যাখ্যান জমা দিন ও পুনরায় খুলুন',
    workerHeader: 'পরিচ্ছন্নতা কর্মী ফিল্ড ড্যাশবোর্ড',
    workerSubheader:
      'বাংলা ভয়েস নির্দেশিকা (TTS) এবং তাৎক্ষণিক AI ছবি যাচাইকরণ।',
    activateWorkerBadgeBtn: 'কর্মী ব্যাজ সক্রিয় করুন (WRK-8821-DELHI)',
    activeBadgePrefix: 'সক্রিয় ব্যাজ:',
    legendRedTitle: 'লাল = অতি জরুরি / ব্লকড',
    legendRedSub: 'তাৎক্ষণিক ব্যবস্থা নিন',
    legendYellowTitle: 'হলুদ = পদক্ষেপ প্রয়োজন',
    legendYellowSub: 'নিযুক্ত / কাজ চলছে',
    legendGreenTitle: 'সবুজ = সম্পন্ন',
    legendGreenSub: 'AI দ্বারা পরিষ্কার যাচাইকৃত',
    dismissBtn: 'বন্ধ করুন',
    categoryPrefix: 'বিভাগ:',
    speakDirectionsBtn: 'কাজের নির্দেশাবলী কণ্ঠে শুনুন',
    postCleanupRequiredTitle: 'পরিষ্কারের পরের ছবি প্রয়োজন',
    postCleanupRequiredDesc:
      'জেমিনি ভিশন আপনার ছবিটি আগের ছবির সাথে পাশাপাশি তুলনা করবে।',
    startJobBtn: 'কাজ শুরু করুন',
    navigateSiteBtn: 'স্থানে নেভিগেট করুন',
    uploadAfterPhotoBtn: 'পরিষ্কারের পরের ছবি আপলোড করুন',
    uploadPostCleanupBtn: 'পরিষ্কারের পরের ছবি নির্বাচন করুন',
    demoVerifyPassBtn: 'ডেমো যাচাই: পরিষ্কার ছবি (পাস)',
    demoVerifyFailBtn: 'ডেমো যাচাই: অপরিষ্কার ছবি (ব্লক)',
    verifyingCleanup: 'Gemini AI আগের ও পরের ছবি তুলনা করছে...',
    hardEnforcementBanner:
      'কঠোর নিয়ম: কাজ সম্পন্ন করা ব্লক হয়েছে — অবস্থা ACTION_REQUIRED করা হয়েছে।',
    retryUploadBtn: 'পুনরায় পরিষ্কার করে ছবি আপলোড করুন',
    adminHeader: 'পৌর অ্যাডমিন ডিসপ্যাচ ও রিভিউ কনসোল',
    adminSubheader:
      'শহরব্যাপী পরিচ্ছন্নতা পরিসংখ্যান, অগ্রাধিকার তালিকা এবং মানবিক পর্যালোচনা।',
    activateAdminSessionBtn: 'অফিসিয়াল অ্যাডমিন সেশন সক্রিয় করুন (ADM-GOV-001)',
    deptCodePrefix: 'বিভাগ কোড:',
    metricReported: 'রিপোর্টকৃত',
    metricAssigned: 'নিযুক্ত',
    metricInProgress: 'চলমান',
    metricFlagged: 'চিহ্নিত / পদক্ষেপ',
    metricResolved: 'সমাধানকৃত / বন্ধ',
    metricReopened: 'পুনরায় খোলা',
    dispatchQueueTitle: 'অগ্রাধিকার ডিসপ্যাচ তালিকা',
    totalActiveRecordsPrefix: 'মোট সক্রিয় রেকর্ড:',
    colTicketWard: 'টিকিট ও ওয়ার্ড অবস্থান',
    colCategoryEffort: 'বিভাগ ও প্রচেষ্টা',
    assignWorkerLabel: 'কর্মী নিয়োগ করুন',
    priorityOverrideLabel: 'অগ্রাধিকার পরিবর্তন করুন',
    colCurrentStatus: 'বর্তমান অবস্থা',
    colHumanLoop: 'মানবিক পর্যালোচনা',
    unassignedSelectOption: '-- নিযুক্ত নয় (কর্মী নির্বাচন করুন) --',
    reviewModalBtn: 'মানবিক পর্যালোচনা (Review)',
    governanceModalPrefix: 'মানবিক পর্যালোচনা নিয়ন্ত্রণ:',
    pendingWorkerUploadPreview: 'কর্মীর ছবি অপেক্ষমাণ (নমুনা প্রিভিউ)',
    adminAuditFallbackDesc:
      'অ্যাডমিন বাধ্যতামূলক অডিট লগ কারণ লিখে কাজটি অনুমোদন বা প্রত্যাখ্যান করতে পারেন।',
    mandatoryAdminReasonLabel: 'বাধ্যতামূলক প্রশাসনিক অডিট লগ কারণ',
    adminOverrideApproveBtn: 'অ্যাডমিন ওভাররাইড অনুমোদন',
    adminRejectTaskBtn: 'কাজ প্রত্যাখ্যান করুন',
    adminReasonPlaceholder: 'বাধ্যতামূলক: প্রশাসনিক সিদ্ধান্তের কারণ লিখুন...',
    awarenessHeader: 'বর্জ্য পৃথকীকরণ ও জনসচেতনতা কেন্দ্র',
    awarenessSubheader:
      'শুকনো, ভেজা, ই-বর্জ্য এবং বিপজ্জনক বর্জ্য আলাদা করার নিয়মাবলী।',
    streamAllTab: 'সব ৪টি বিভাগ',
    streamWetTab: 'ভেজা বর্জ্য (সবুজ)',
    streamDryTab: 'শুকনো বর্জ্য (নীল)',
    streamEwasteTab: 'ই-বর্জ্য',
    streamHazardousTab: 'বিপজ্জনক (লাল)',
    listenAudioBtn: 'শুনুন',
    permittedItemsTitle: 'কী ফেলা যাবে (অনুমোদিত):',
    prohibitedItemsTitle: 'কঠোরভাবে নিষিদ্ধ:',
    municipalProcessingPrefix: 'পৌর প্রক্রিয়াকরণ পদ্ধতি:',
    charterSectionTitle:
      'কঠিন বর্জ্য ব্যবস্থাপনা (SWM) নাগরিক সনদ ও কর্মী সুরক্ষা নিয়ম',
    charter1Title: '০১. মিশ্র বর্জ্য দেবেন না',
    charter1Desc:
      'ভেজা এবং শুকনো বর্জ্য আলাদাভাবে দিলে রিসাইক্লিং কেন্দ্রের কার্যকারিতা বৃদ্ধি পায়।',
    charter2Title: '০২. ধারালো বস্তুর নিরাপদ প্যাকিং',
    charter2Desc:
      'ভাঙা কাঁচ, ব্লেড এবং সুই মোটা শক্ত কাগজে মুড়ে দিন যাতে পরিচ্ছন্নতা কর্মীরা আহত না হন।',
    charter3Title: '০৩. নাগরিকের চূড়ান্ত যাচাইকরণ দায়িত্ব',
    charter3Desc:
      'কাজ শেষ হলে আগের ও পরের ছবি মিলিয়ে দেখুন। নিশ্চিত করলে টিকিট বন্ধ হবে এবং প্রত্যাখ্যান করলে পুনরায় দল পাঠানো হবে।',
    timelineTitle: 'অপরিবর্তনীয় অডিট লগ ও টাইমলাইন',
    beforePhotoLabel: 'পরিষ্কারের আগে (নাগরিক ছবি)',
    afterPhotoLabel: 'পরিষ্কারের পরে (কর্মী প্রমাণ)',
  },
};

const STATUS_LABELS: Record<LanguageCode, Record<TicketStatus, string>> = {
  EN: {
    REPORTED: 'Reported',
    OPEN: 'Reported',
    SUBMITTED: 'Reported',
    ASSIGNED: 'Assigned',
    IN_PROGRESS: 'In Progress',
    ACTION_REQUIRED: 'Action Needed',
    FLAGGED: 'Flagged for Review',
    RESOLVED: 'Resolved (Verify)',
    CLOSED: 'Closed & Verified',
    REOPENED: 'Reopened',
  },
  HI: {
    REPORTED: 'दर्ज की गई',
    OPEN: 'दर्ज की गई',
    SUBMITTED: 'दर्ज की गई',
    ASSIGNED: 'कर्मचारी नियुक्त',
    IN_PROGRESS: 'सफाई जारी',
    ACTION_REQUIRED: 'पुनः कार्य आवश्यक',
    FLAGGED: 'समीक्षा हेतु चिन्हित',
    RESOLVED: 'हल किया गया',
    CLOSED: 'सत्यापित एवं बंद',
    REOPENED: 'पुनः खोला गया',
  },
  TA: {
    REPORTED: 'புகாரளிக்கப்பட்டது',
    OPEN: 'புகாரளிக்கப்பட்டது',
    SUBMITTED: 'புகாரளிக்கப்பட்டது',
    ASSIGNED: 'ஒதுக்கப்பட்டது',
    IN_PROGRESS: 'செயல்பாட்டில்',
    ACTION_REQUIRED: 'நடவடிக்கை தேவை',
    FLAGGED: 'ஆய்வுக்குறியது',
    RESOLVED: 'தீர்க்கப்பட்டது',
    CLOSED: 'முடிக்கப்பட்டது',
    REOPENED: 'மீண்டும் திறக்கப்பட்டது',
  },
  TE: {
    REPORTED: 'నివేదించబడింది',
    OPEN: 'నివేదించబడింది',
    SUBMITTED: 'నివేదించబడింది',
    ASSIGNED: 'కేటాయించబడింది',
    IN_PROGRESS: 'పురోగతిలో ఉంది',
    ACTION_REQUIRED: 'చర్య అవసరం',
    FLAGGED: 'సమీక్షకు ఫ్లాగ్',
    RESOLVED: 'పరిష్కరించబడింది',
    CLOSED: 'మూసివేయబడింది',
    REOPENED: 'తిరిగి తెరవబడింది',
  },
  MR: {
    REPORTED: 'नोंदवलेली',
    OPEN: 'नोंदवलेली',
    SUBMITTED: 'नोंदवलेली',
    ASSIGNED: 'नेमून दिलेली',
    IN_PROGRESS: 'काम सुरू',
    ACTION_REQUIRED: 'कृती आवश्यक',
    FLAGGED: 'तपासणीसाठी राखीव',
    RESOLVED: 'सोडवलेली',
    CLOSED: 'सत्यापित व बंद',
    REOPENED: 'पुन्हा उघडलेली',
  },
  BN: {
    REPORTED: 'রিপোর্ট করা হয়েছে',
    OPEN: 'রিপোর্ট করা হয়েছে',
    SUBMITTED: 'রিপোর্ট করা হয়েছে',
    ASSIGNED: 'নিযুক্ত',
    IN_PROGRESS: 'কাজ চলছে',
    ACTION_REQUIRED: 'পদক্ষেপ প্রয়োজন',
    FLAGGED: 'পর্যালোচনার জন্য চিহ্নিত',
    RESOLVED: 'সমাধানকৃত',
    CLOSED: 'নিশ্চিত ও বন্ধ',
    REOPENED: 'পুনরায় খোলা',
  },
};

const PRIORITY_LABELS: Record<LanguageCode, Record<TicketPriority, string>> = {
  EN: { LOW: 'Low', MEDIUM: 'Medium', HIGH: 'High', CRITICAL: 'Critical' },
  HI: { LOW: 'कम', MEDIUM: 'मध्यम', HIGH: 'उच्च', CRITICAL: 'अति गंभीर' },
  TA: { LOW: 'குறைவு', MEDIUM: 'நடுத்தரம்', HIGH: 'அதிகம்', CRITICAL: 'மிக அவசரம்' },
  TE: { LOW: 'తక్కువ', MEDIUM: 'మధ్యస్థం', HIGH: 'అధికం', CRITICAL: 'అత్యవసరం' },
  MR: { LOW: 'कमी', MEDIUM: 'मध्यम', HIGH: 'उच्च', CRITICAL: 'अति गंभीर' },
  BN: { LOW: 'কম', MEDIUM: 'মাঝারি', HIGH: 'উচ্চ', CRITICAL: 'অতি জরুরি' },
};

const CATEGORY_LABELS: Record<LanguageCode, Record<WasteCategory, string>> = {
  EN: {
    'Plastic/Dry': 'Plastic/Dry',
    'Organic/Food': 'Organic/Food',
    Hazardous: 'Hazardous',
    'E-waste': 'E-waste',
    'Overfilled Bin': 'Overfilled Bin',
    'Road Dumping': 'Road Dumping',
  },
  HI: {
    'Plastic/Dry': 'प्लास्टिक / सूखा कचरा',
    'Organic/Food': 'गीला / जैविक कचरा',
    Hazardous: 'खतरनाक कचरा',
    'E-waste': 'ई-कचरा',
    'Overfilled Bin': 'भरा हुआ कचरा पात्र',
    'Road Dumping': 'सड़क किनारे अवैध कचरा',
  },
  TA: {
    'Plastic/Dry': 'பிளாஸ்டிக் / உர்ந்த கழிவு',
    'Organic/Food': 'மக்கும் உணவுக் கழிவு',
    Hazardous: 'அபாயகரமான கழிவு',
    'E-waste': 'மின்னணு கழிவு',
    'Overfilled Bin': 'நிரம்பி வழியும் குப்பைத் தொட்டி',
    'Road Dumping': 'சாலையோர குப்பை கொட்டுதல்',
  },
  TE: {
    'Plastic/Dry': 'ప్లాస్టిక్ / పొడి చెత్త',
    'Organic/Food': 'తడి / ఆహార వ్యర్థాలు',
    Hazardous: 'ప్రమాదకర వ్యర్థాలు',
    'E-waste': 'ఇ-వ్యర్థాలు',
    'Overfilled Bin': 'నిండిపోయిన చెత్త బుట్ట',
    'Road Dumping': 'రోడ్డు పక్కన చెత్త వేయడం',
  },
  MR: {
    'Plastic/Dry': 'प्लास्टिक / सुका कचरा',
    'Organic/Food': 'ओला / अन्न कचरा',
    Hazardous: 'घातक कचरा',
    'E-waste': 'ई-कचरा',
    'Overfilled Bin': 'भरलेली कचराकुंडी',
    'Road Dumping': 'रस्त्यावरील बेकायदेशीर कचरा',
  },
  BN: {
    'Plastic/Dry': 'প্লাস্টিক / শুকনো বর্জ্য',
    'Organic/Food': 'জৈব / খাবারের বর্জ্য',
    Hazardous: 'বিপজ্জনক বর্জ্য',
    'E-waste': 'ই-বর্জ্য',
    'Overfilled Bin': 'উপচে পড়া ডাস্টবিন',
    'Road Dumping': 'রাস্তার পাশে অবৈধ আবর্জনা',
  },
};

const DYNAMIC_TEXT_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  'Overfilled Garbage Bin near Main Market': {
    EN: 'Overfilled Garbage Bin near Main Market',
    HI: 'मेन मार्केट के पास भरा हुआ कचरा पात्र',
    TA: 'மெயின் மார்க்கெட் அருகே நிரம்பி வழியும் குப்பைத் தொட்டி',
    TE: 'మెయిన్ మార్కెట్ దగ్గర నిండిపోయిన చెత్త బుట్ట',
    MR: 'मेन मार्केटजवळ भरलेली कचराकुंडी',
    BN: 'মেইন মার্কেটের কাছে উপচে পড়া ডাস্টবিন',
  },
  'Municipal secondary collection bin overflowing onto pedestrian walkway with plastic packaging and market cartons scattered around the base.': {
    EN: 'Municipal secondary collection bin overflowing onto pedestrian walkway with plastic packaging and market cartons scattered around the base.',
    HI: 'पैदल पथ पर नगर निगम का कचरा पात्र ओवरफ्लो हो रहा है और आसपास प्लास्टिक व कार्टन बिखरे हैं।',
    TA: 'நடைபாதையில் நகராட்சி குப்பைத் தொட்டி நிரம்பி பிளாஸ்டிக் மற்றும் அட்டைப் பெட்டிகள் சிதறிக்கிடக்கின்றன.',
    TE: 'పాదచారుల దారిపై మున్సిపల్ చెత్త బుట్ట నిండిపోయి ప్లాస్టిక్ కవర్లు మరియు అట్టపెట్టెలు చెల్లాచెదురుగా పడి ఉన్నాయి.',
    MR: 'पादचारी मार्गावर महानगरपालिकेची कचराकुंडी ओसंडून वाहत असून आजूबाजूला प्लास्टिक आणि खोक्यांचा कचरा पसरला आहे.',
    BN: 'ফুটপাথে পৌরসভার ডাস্টবিন উপচে পড়ছে এবং চারপাশে প্লাস্টিক ও কার্টন ছড়িয়ে ছিটিয়ে রয়েছে।',
  },
  'Main Market Square, Sector 14, Near Metro Gate 2': {
    EN: 'Main Market Square, Sector 14, Near Metro Gate 2',
    HI: 'मेन मार्केट स्क्वायर, सेक्टर 14, मेट्रो गेट 2 के पास',
    TA: 'மெயின் மார்க்கெட் சதுக்கம், செக்டர் 14, மெட்ரோ கேட் 2 அருகில்',
    TE: 'మెయిన్ మార్కెట్ స్క్వేర్, సెక్టార్ 14, మెట్రో గేట్ 2 దగ్గర',
    MR: 'मेन मार्केट चौक, सेक्टर 14, मेट्रो गेट 2 जवळ',
    BN: 'মেইন মার্কেট স্কোয়ার, সেক্টর ১৪, মেট্রো গেট ২ এর কাছে',
  },
  '1 Worker / 25 mins': {
    EN: '1 Worker / 25 mins',
    HI: '1 कर्मचारी / 25 मिनट',
    TA: '1 பணியாளர் / 25 நிமிடங்கள்',
    TE: '1 కార్మికుడు / 25 నిమిషాలు',
    MR: '1 कर्मचारी / 25 मिनिटे',
    BN: '১ জন কর্মী / ২৫ মিনিট',
  },
  'Illegal Roadside Dump on College Road': {
    EN: 'Illegal Roadside Dump on College Road',
    HI: 'कॉलेज रोड पर सड़क किनारे अवैध कचरा ढेर',
    TA: 'கல்லூரி சாலையில் சட்டவிரோத சாலையோர குப்பைக் குவியல்',
    TE: 'కాలేజ్ రోడ్డుపై అక్రమ రోడ్డు పక్కన చెత్త కుప్ప',
    MR: 'कॉलेज रोडवर रस्त्याकडेला बेकायदेशीर कचऱ्याचा ढीग',
    BN: 'কলেজ রোডে রাস্তার পাশে অবৈধ আবর্জনার স্তূপ',
  },
  'Uncollected roadside dumping beside boundary wall blocking storm drain and footpath access with mixed plastic and organic waste.': {
    EN: 'Uncollected roadside dumping beside boundary wall blocking storm drain and footpath access with mixed plastic and organic waste.',
    HI: 'बाउंड्री वॉल के पास मिश्रित प्लास्टिक और गीले कचरे का ढेर नाले और फुटपाथ को अवरुद्ध कर रहा है।',
    TA: 'சுற்றுச்சுவர் அருகே கலப்பு பிளாஸ்டிக் மற்றும் மக்கும் கழிவுகள் வடிகால் மற்றும் நடைபாதையை அடைத்துள்ளன.',
    TE: 'ప్రహరీ గోడ పక్కన ప్లాస్టిక్ మరియు తడి చెత్త కాలువను మరియు ఫుట్‌పాత్‌ను అడ్డుకుంటున్నాయి.',
    MR: 'संरक्षक भिंतीजवळ प्लास्टिक आणि ओल्या कचऱ्याच्या ढिगाऱ्यामुळे गटार आणि पदपथ बंद झाला आहे.',
    BN: 'সীমানা প্রাচীরের পাশে মিশ্র প্লাস্টিক ও জৈব বর্জ্যের স্তূপ ড্রেন এবং ফুটপাথ আটকে দিয়েছে।',
  },
  'College Road Junction, Opposite Science Block Boundary Wall': {
    EN: 'College Road Junction, Opposite Science Block Boundary Wall',
    HI: 'कॉलेज रोड जंक्शन, साइंस ब्लॉक बाउंड्री वॉल के सामने',
    TA: 'கல்லூரி சாலை சந்திப்பு, அறிவியல் பிரிவு சுற்றுச்சுவர் எதிரில்',
    TE: 'కాలేజ్ రోడ్ జంక్షన్, సైన్స్ బ్లాక్ ప్రహరీ గోడ ఎదురుగా',
    MR: 'कॉलेज रोड चौक, सायन्स ब्लॉक भिंतीसमोर',
    BN: 'কলেজ রোড জংশন, সায়েন্স ব্লক সীমানা প্রাচীরের বিপরীতে',
  },
  '2 Workers / 45 mins + Mini Tipper': {
    EN: '2 Workers / 45 mins + Mini Tipper',
    HI: '2 कर्मचारी / 45 मिनट + मिनी टिपर',
    TA: '2 பணியாளர்கள் / 45 நிமிடங்கள் + சிறிய வாகனம்',
    TE: '2 కార్మికులు / 45 నిమిషాలు + మినీ టిప్పర్',
    MR: '2 कर्मचारी / 45 मिनिटे + मिनी टिपर',
    BN: '২ জন কর্মী / ৪৫ মিনিট + মিনি টিপার',
  },
};

export function translateStatus(status: TicketStatus, lang: LanguageCode): string {
  return STATUS_LABELS[lang]?.[status] || STATUS_LABELS.EN[status];
}

export function translatePriority(priority: TicketPriority, lang: LanguageCode): string {
  return PRIORITY_LABELS[lang]?.[priority] || PRIORITY_LABELS.EN[priority];
}

export function translateCategory(category: WasteCategory, lang: LanguageCode): string {
  return CATEGORY_LABELS[lang]?.[category] || category;
}

export function translateDynamicText(text: string, lang: LanguageCode): string {
  if (!text) return '';
  return DYNAMIC_TEXT_TRANSLATIONS[text]?.[lang] || text;
}

const LOCALE_MAP: Record<LanguageCode, string> = {
  EN: 'en-US',
  HI: 'hi-IN',
  TA: 'ta-IN',
  TE: 'te-IN',
  MR: 'mr-IN',
  BN: 'bn-IN',
};

const LANGUAGE_NAME_HINTS: Record<LanguageCode, string[]> = {
  EN: ['english', 'en-us', 'en-in', 'en_us', 'en_in'],
  HI: ['hindi', 'hi-in', 'hi_in', 'हिन्दी', 'हिंदी', 'lekha', 'hemant', 'kalpana'],
  TA: ['tamil', 'ta-in', 'ta_in', 'தமிழ்', 'valluvar'],
  TE: ['telugu', 'te-in', 'te_in', 'తెలుగు', 'chitra'],
  MR: ['marathi', 'mr-in', 'mr_in', 'मराठी', 'ananya'],
  BN: ['bengali', 'bangla', 'bn-in', 'bn_in', 'bn-bd', 'বাংলা', 'tanishaa', 'bashkar'],
};

export function speakText(text: string, lang: LanguageCode): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    const synth = window.speechSynthesis;
    synth.cancel();

    const targetBcp47 = LOCALE_MAP[lang] || 'en-US';
    const langPrefix = targetBcp47.split('-')[0].toLowerCase();
    const hints = LANGUAGE_NAME_HINTS[lang] || [];

    const executeSpeak = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = targetBcp47;
      utterance.rate = 0.95;

      const voices = synth.getVoices();
      if (voices && voices.length > 0) {
        // 1. Exact locale match (e.g. ta-IN, te-IN, mr-IN, bn-IN, hi-IN, en-US)
        const exactVoice = voices.find(
          (v) => v.lang.replace('_', '-').toLowerCase() === targetBcp47.toLowerCase()
        );
        // 2. Prefix locale match (e.g. ta, te, mr, bn, hi)
        const prefixVoice = voices.find((v) =>
          v.lang.replace('_', '-').toLowerCase().startsWith(`${langPrefix}-`) ||
          v.lang.toLowerCase() === langPrefix
        );
        // 3. Voice name or lang hint match
        const hintVoice = voices.find((v) => {
          const combined = `${v.name} ${v.lang}`.toLowerCase();
          return hints.some((h) => combined.includes(h));
        });
        // 4. For Indian regional languages, fallback to hi-IN / en-IN voice if specific regional OS voice isn't installed
        const indianFallbackVoice =
          lang !== 'EN'
            ? voices.find((v) => v.lang.replace('_', '-').toLowerCase() === 'hi-in')
            : undefined;

        const selectedVoice = exactVoice || prefixVoice || hintVoice || indianFallbackVoice;
        if (selectedVoice) {
          utterance.voice = selectedVoice;
          utterance.lang = selectedVoice.lang || targetBcp47;
        }
      }

      synth.speak(utterance);
    };

    if (synth.getVoices().length === 0) {
      const handleVoicesChanged = () => {
        synth.removeEventListener('voiceschanged', handleVoicesChanged);
        executeSpeak();
      };
      synth.addEventListener('voiceschanged', handleVoicesChanged);
      setTimeout(() => {
        synth.removeEventListener('voiceschanged', handleVoicesChanged);
        executeSpeak();
      }, 250);
    } else {
      executeSpeak();
    }
  } catch (err) {
    console.error('Speech synthesis error:', err);
  }
}

export function buildWorkerTtsAnnouncement(
  ticket: {
    title: string;
    location: string;
    priority: TicketPriority;
    wasteCategory: WasteCategory;
    estimatedEffort: string;
  },
  lang: LanguageCode
): string {
  const prio = translatePriority(ticket.priority, lang);
  const cat = translateCategory(ticket.wasteCategory, lang);
  const localizedTitle = translateDynamicText(ticket.title, lang);
  const localizedLocation = translateDynamicText(ticket.location, lang);
  const localizedEffort = translateDynamicText(ticket.estimatedEffort, lang);

  switch (lang) {
    case 'HI':
      return `कार्य निर्देश: ${localizedTitle}। स्थान: ${localizedLocation}। प्राथमिकता: ${prio}। कचरा श्रेणी: ${cat}। अनुमानित प्रयास: ${localizedEffort}। कृपया स्थान पर जाएं और सफाई के बाद की फोटो अपलोड करें।`;
    case 'TA':
      return `பணி விவரம்: ${localizedTitle}. இடம்: ${localizedLocation}. முன்னுரிமை: ${prio}. கழிவு வகை: ${cat}. மதிப்பிடப்பட்ட நேரம்: ${localizedEffort}. இடத்திற்குச் சென்று சுத்தம் செய்த பிறகு புகைப்படம் பதிவேற்றவும்.`;
    case 'TE':
      return `పని వివరాలు: ${localizedTitle}. స్థానం: ${localizedLocation}. ప్రాధాన్యత: ${prio}. వ్యర్థాల వర్గం: ${cat}. అంచనా సమయం: ${localizedEffort}. దయచేసి ప్రదేశానికి వెళ్లి శుభ్రం చేసిన తర్వాత ఫోటోను అప్‌లోడ్ చేయండి.`;
    case 'MR':
      return `कामाची सूचना: ${localizedTitle}. ठिकाण: ${localizedLocation}. प्राधान्य: ${prio}. कचरा प्रकार: ${cat}. अंदाजे वेळ: ${localizedEffort}. कृपया ठिकाणी जाऊन साफसफाईनंतरचा फोटो अपलोड करा.`;
    case 'BN':
      return `কাজের নির্দেশিকা: ${localizedTitle}। স্থান: ${localizedLocation}। অগ্রাধিকার: ${prio}। বর্জ্যের বিভাগ: ${cat}। আনুমানিক সময়: ${localizedEffort}। অনুগ্রহ করে স্থানে যান এবং পরিষ্কারের পরের ছবি আপলোড করুন।`;
    default:
      return `Task assignment: ${localizedTitle}. Location: ${localizedLocation}. Priority: ${prio}. Waste category: ${cat}. Estimated effort: ${localizedEffort}. Proceed to site and upload post-cleanup photograph for AI verification.`;
  }
}

export type TFunction = ((key: keyof TranslationKeys) => string) & TranslationKeys;

interface LanguageContextValue {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: TFunction;
  speak: (text: string) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function createTFunction(dict: TranslationKeys): TFunction {
  const fn = ((key: keyof TranslationKeys) => dict[key] ?? TRANSLATIONS.EN[key] ?? String(key)) as TFunction;
  return Object.assign(fn, dict);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>('EN');

  useEffect(() => {
    const saved = localStorage.getItem('binsync_lang') as LanguageCode | null;
    if (saved && TRANSLATIONS[saved]) {
      setLangState(saved);
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const setLang = (next: LanguageCode) => {
    setLangState(next);
    localStorage.setItem('binsync_lang', next);
  };

  const value: LanguageContextValue = {
    lang,
    setLang,
    t: createTFunction(TRANSLATIONS[lang]),
    speak: (text: string) => speakText(text, lang),
  };

  return React.createElement(LanguageContext.Provider, { value }, children);
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
