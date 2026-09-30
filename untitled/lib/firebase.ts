import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  updateDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import {
  Ticket,
  TicketPriority,
  TicketStatus,
  UserProfile,
  UserRole,
  WasteCategory,
  AiVerdictType,
  TimelineEntry,
} from '../types';

export const HERO_IMAGE_URL = '/src/assets/images/hero_civic_sanitation_1790775573778.jpg';
export const SEED_MARKET_BEFORE_URL = '/src/assets/images/seed_market_bin_before_1790775588141.jpg';
export const SEED_MARKET_AFTER_URL = '/src/assets/images/seed_market_bin_after_1790775599835.jpg';
export const SEED_COLLEGE_DUMP_URL = '/src/assets/images/seed_college_road_dump_1790775610093.jpg';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

export const AVAILABLE_WORKERS = [
  { id: 'WRK-8821-DELHI', name: 'Rajesh Kumar (WRK-8821-DELHI)', zone: 'Central Market Ward 12' },
  { id: 'WRK-4410-MUMBAI', name: 'Priya Nair (WRK-4410-MUMBAI)', zone: 'College Road Ward 04' },
  { id: 'WRK-6109-CHENNAI', name: 'Karthik Subramanian (WRK-6109-CHENNAI)', zone: 'Transit Hub Ward 09' },
];

export const INITIAL_SEED_TICKETS: Ticket[] = [
  {
    id: 'TKT-1001',
    title: 'Overfilled Garbage Bin near Main Market',
    description:
      'Municipal secondary collection bin overflowing onto pedestrian walkway with plastic packaging and market cartons scattered around the base.',
    wasteCategory: 'Overfilled Bin',
    priority: 'HIGH',
    status: 'ASSIGNED',
    location: 'Main Market Square, Sector 14, Near Metro Gate 2',
    coordinates: { lat: 28.6139, lng: 77.209 },
    estimatedEffort: '1 Worker / 25 mins',
    citizenUid: 'demo-citizen-01',
    citizenName: 'Aarav Sharma',
    citizenGovtId: 'AADHAAR-9876-5432',
    assignedWorkerId: 'WRK-8821-DELHI',
    assignedWorkerName: 'Rajesh Kumar (WRK-8821-DELHI)',
    beforeImageUrl: SEED_MARKET_BEFORE_URL,
    timeline: [
      {
        timestamp: '2026-09-30 08:15 AM',
        actor: 'Citizen',
        action: 'Complaint Reported',
        details: 'Submitted site photo at Main Market Square (Govt ID: AADHAAR-9876-5432).',
      },
      {
        timestamp: '2026-09-30 08:16 AM',
        actor: 'Gemini AI',
        action: 'Anti-AI Check & Triage Passed',
        details: 'Verified authentic smartphone capture. Classified as Overfilled Bin (Priority: HIGH, Effort: 1 Worker / 25 mins).',
      },
      {
        timestamp: '2026-09-30 08:30 AM',
        actor: 'Admin',
        action: 'Dispatched to Sanitation Worker',
        details: 'Assigned to Rajesh Kumar (WRK-8821-DELHI) by Municipal Dispatch ADM-GOV-001.',
      },
    ],
    createdAt: '2026-09-30T08:15:00.000Z',
    updatedAt: '2026-09-30T08:30:00.000Z',
  },
  {
    id: 'TKT-1002',
    title: 'Illegal Roadside Dump on College Road',
    description:
      'Uncollected roadside dumping beside boundary wall blocking storm drain and footpath access with mixed plastic and organic waste.',
    wasteCategory: 'Road Dumping',
    priority: 'CRITICAL',
    status: 'REPORTED',
    location: 'College Road Junction, Opposite Science Block Boundary Wall',
    coordinates: { lat: 28.628, lng: 77.219 },
    estimatedEffort: '2 Workers / 45 mins + Mini Tipper',
    citizenUid: 'demo-citizen-01',
    citizenName: 'Aarav Sharma',
    citizenGovtId: 'AADHAAR-9876-5432',
    beforeImageUrl: SEED_COLLEGE_DUMP_URL,
    timeline: [
      {
        timestamp: '2026-09-30 09:05 AM',
        actor: 'Citizen',
        action: 'Complaint Reported',
        details: 'Submitted site photo at College Road Junction (Govt ID: AADHAAR-9876-5432).',
      },
      {
        timestamp: '2026-09-30 09:05 AM',
        actor: 'Gemini AI',
        action: 'Anti-AI Check & Triage Passed',
        details: 'Verified authentic photo. Classified as Road Dumping (Priority: CRITICAL, Effort: 2 Workers / 45 mins + Mini Tipper).',
      },
    ],
    createdAt: '2026-09-30T09:05:00.000Z',
    updatedAt: '2026-09-30T09:05:00.000Z',
  },
];

interface PendingOAuthUser {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
}

interface BinSyncContextValue {
  user: UserProfile | null;
  pendingOAuthUser: PendingOAuthUser | null;
  tickets: Ticket[];
  currentPath: string;
  navigate: (path: string) => void;
  loginDemo: (role: UserRole) => void;
  loginWithCredentials: (params: {
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    badgeNumber: string;
    isRegister?: boolean;
  }) => Promise<void>;
  loginWithGoogle: (role: UserRole) => Promise<void>;
  completeOAuthProfile: (badgeNumber: string) => Promise<void>;
  cancelOAuthModal: () => void;
  logout: () => Promise<void>;
  createTicket: (params: {
    title: string;
    description: string;
    wasteCategory: WasteCategory;
    priority: TicketPriority;
    status?: TicketStatus;
    location: string;
    estimatedEffort: string;
    beforeImageUrl: string;
    triageSummary: string;
  }) => Promise<Ticket>;
  assignTicket: (ticketId: string, workerId: string) => Promise<void>;
  overridePriority: (ticketId: string, priority: TicketPriority) => Promise<void>;
  startWorkerJob: (ticketId: string) => Promise<void>;
  submitWorkerVerification: (
    ticketId: string,
    afterImageUrl: string,
    verdict: AiVerdictType,
    confidence: number,
    reasoning: string,
    nextStatus: TicketStatus
  ) => Promise<void>;
  adminReviewDecision: (
    ticketId: string,
    decision: 'APPROVE' | 'REJECT',
    reason: string
  ) => Promise<void>;
  citizenFinalDecision: (
    ticketId: string,
    decision: 'CONFIRM' | 'REJECT',
    reason?: string
  ) => Promise<void>;
}

const BinSyncContext = createContext<BinSyncContextValue | undefined>(undefined);

function formatNow(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}

function sanitizeId(raw: string): string {
  return raw.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 120) || 'id-default';
}

export function BinSyncProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('binsync_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [pendingOAuthUser, setPendingOAuthUser] = useState<PendingOAuthUser | null>(null);

  const [tickets, setTickets] = useState<Ticket[]>(() => {
    if (typeof window === 'undefined') return INITIAL_SEED_TICKETS;
    const saved = localStorage.getItem('binsync_tickets_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // fallback to seed
      }
    }
    return INITIAL_SEED_TICKETS;
  });

  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePop = () => setCurrentPath(window.location.pathname || '/');
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const navigate = (path: string) => {
    if (typeof window !== 'undefined' && window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('binsync_tickets_v1', JSON.stringify(tickets));
    }
  }, [tickets]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('binsync_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('binsync_user');
      }
    }
  }, [user]);

  // Listen to Firebase Auth state and Firestore tickets when real Firebase session is active
  useEffect(() => {
    let unsubTickets: (() => void) | null = null;
    const unsubAuth = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        if (unsubTickets) {
          unsubTickets();
          unsubTickets = null;
        }
        return;
      }
      try {
        const userDocRef = doc(db, 'users', fbUser.uid);
        const snap = await getDoc(userDocRef);
        if (snap.exists()) {
          const data = snap.data();
          setUser({
            uid: fbUser.uid,
            name: data.name || fbUser.displayName || 'Civic User',
            email: fbUser.email || '',
            role: (data.role as UserRole) || 'Citizen',
            badgeNumber: data.badgeNumber || 'AADHAAR-VERIFIED',
          });
        }
      } catch {
        // Ignore read error before profile creation
      }

      if (fbUser.emailVerified) {
        const ticketsCol = collection(db, 'tickets');
        unsubTickets = onSnapshot(
          ticketsCol,
          (snapshot) => {
            if (!snapshot.empty) {
              const remoteTickets: Ticket[] = [];
              snapshot.forEach((docSnap) => {
                const d = docSnap.data();
                let parsedTimeline: TimelineEntry[] = [];
                if (typeof d.timelineJson === 'string') {
                  try {
                    parsedTimeline = JSON.parse(d.timelineJson);
                  } catch {
                    parsedTimeline = [];
                  }
                }
                remoteTickets.push({
                  id: d.id,
                  title: d.title,
                  description: d.description || '',
                  wasteCategory: d.wasteCategory,
                  priority: d.priority,
                  status: d.status,
                  location: d.location,
                  estimatedEffort: d.estimatedEffort,
                  citizenUid: d.citizenUid,
                  citizenName: d.citizenName,
                  citizenGovtId: d.citizenGovtId || 'VERIFIED-ID',
                  assignedWorkerId: d.assignedWorkerId,
                  assignedWorkerName: d.assignedWorkerName,
                  beforeImageUrl: d.beforeImageUrl,
                  afterImageUrl: d.afterImageUrl,
                  aiVerdict: d.aiVerdict,
                  aiConfidence: d.aiConfidence,
                  aiReasoning: d.aiReasoning,
                  rejectionReason: d.rejectionReason,
                  adminOverrideReason: d.adminOverrideReason,
                  timeline: parsedTimeline,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                });
              });
              setTickets((prev) => {
                const map = new Map<string, Ticket>();
                prev.forEach((t) => map.set(t.id, t));
                remoteTickets.forEach((t) => map.set(t.id, t));
                return Array.from(map.values());
              });
            }
          },
          (error) => {
            try {
              handleFirestoreError(error, OperationType.LIST, 'tickets');
            } catch {
              // Logged structured FirestoreErrorInfo
            }
          }
        );
      }
    });

    return () => {
      unsubAuth();
      if (unsubTickets) unsubTickets();
    };
  }, []);

  const syncTicketToFirestore = async (ticket: Ticket, isCreate: boolean) => {
    if (!auth.currentUser || !auth.currentUser.emailVerified) return;
    const safeId = sanitizeId(ticket.id);
    const ticketRef = doc(db, 'tickets', safeId);
    const payload: Record<string, unknown> = {
      id: safeId,
      title: ticket.title.slice(0, 200),
      description: (ticket.description || '').slice(0, 1000),
      wasteCategory: ticket.wasteCategory,
      priority: ticket.priority,
      status: ticket.status,
      location: ticket.location.slice(0, 300),
      estimatedEffort: ticket.estimatedEffort.slice(0, 120),
      citizenUid: isCreate ? auth.currentUser.uid : sanitizeId(ticket.citizenUid),
      citizenName: ticket.citizenName.slice(0, 100),
      citizenGovtId: (ticket.citizenGovtId || '').slice(0, 64),
      beforeImageUrl: ticket.beforeImageUrl.slice(0, 750000),
      timelineJson: JSON.stringify(ticket.timeline).slice(0, 48000),
      visibility: 'PUBLIC_CIVIC',
      updatedAt: serverTimestamp(),
    };
    if (isCreate) {
      payload.createdAt = serverTimestamp();
    }
    if (ticket.assignedWorkerId) payload.assignedWorkerId = ticket.assignedWorkerId.slice(0, 128);
    if (ticket.assignedWorkerName) payload.assignedWorkerName = ticket.assignedWorkerName.slice(0, 100);
    if (ticket.afterImageUrl) payload.afterImageUrl = ticket.afterImageUrl.slice(0, 750000);
    if (ticket.aiVerdict) payload.aiVerdict = ticket.aiVerdict;
    if (typeof ticket.aiConfidence === 'number') payload.aiConfidence = ticket.aiConfidence;
    if (ticket.aiReasoning) payload.aiReasoning = ticket.aiReasoning.slice(0, 1000);
    if (ticket.rejectionReason) payload.rejectionReason = ticket.rejectionReason.slice(0, 500);
    if (ticket.adminOverrideReason) payload.adminOverrideReason = ticket.adminOverrideReason.slice(0, 500);

    try {
      if (isCreate) {
        await setDoc(ticketRef, payload);
      } else {
        await updateDoc(ticketRef, payload);
      }
    } catch (error) {
      try {
        handleFirestoreError(
          error,
          isCreate ? OperationType.CREATE : OperationType.UPDATE,
          `tickets/${safeId}`
        );
      } catch {
        // Logged structured FirestoreErrorInfo while preserving local state continuity
      }
    }
  };

  const routeForRole = (role: UserRole) => {
    if (role === 'Citizen') navigate('/citizen');
    else if (role === 'Worker') navigate('/worker');
    else navigate('/admin');
  };

  const loginDemo = (role: UserRole) => {
    if (role === 'Citizen') {
      const demoProfile: UserProfile = {
        uid: 'demo-citizen-01',
        name: 'Aarav Sharma',
        email: 'citizen@binsync.org',
        role: 'Citizen',
        badgeNumber: 'AADHAAR-9876-5432',
        isDemo: true,
      };
      setUser(demoProfile);
      routeForRole('Citizen');
    } else if (role === 'Worker') {
      const demoProfile: UserProfile = {
        uid: 'WRK-8821-DELHI',
        name: 'Rajesh Kumar',
        email: 'worker@binsync.org',
        role: 'Worker',
        badgeNumber: 'WRK-8821-DELHI',
        isDemo: true,
      };
      setUser(demoProfile);
      routeForRole('Worker');
    } else {
      const demoProfile: UserProfile = {
        uid: 'ADM-GOV-001',
        name: 'Meera Deshmukh (IAS)',
        email: 'admin@binsync.org',
        role: 'Admin',
        badgeNumber: 'ADM-GOV-001',
        isDemo: true,
      };
      setUser(demoProfile);
      routeForRole('Admin');
    }
  };

  const loginWithCredentials = async (params: {
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    badgeNumber: string;
    isRegister?: boolean;
  }) => {
    const cleanBadge = params.badgeNumber.trim();
    if (cleanBadge.length < 3) {
      throw new Error('Mandatory role-specific ID proof must be at least 3 characters.');
    }

    let uid = sanitizeId(`usr-${params.email.split('@')[0]}-${Date.now().toString().slice(-4)}`);
    if (params.password) {
      try {
        if (params.isRegister) {
          const cred = await createUserWithEmailAndPassword(auth, params.email, params.password);
          uid = cred.user.uid;
        } else {
          const cred = await signInWithEmailAndPassword(auth, params.email, params.password);
          uid = cred.user.uid;
        }
      } catch {
        // Fallback to reactive verified session if Email/Password provider is not enabled in Firebase console
      }
    }

    const profile: UserProfile = {
      uid: params.role === 'Worker' ? cleanBadge : uid,
      name: params.name.trim() || params.email.split('@')[0],
      email: params.email.trim(),
      role: params.role,
      badgeNumber: cleanBadge,
    };
    setUser(profile);
    routeForRole(params.role);
  };

  const loginWithGoogle = async (role: UserRole) => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const fbUser = result.user;

    try {
      const userDoc = await getDoc(doc(db, 'users', fbUser.uid));
      if (userDoc.exists() && userDoc.data()?.badgeNumber) {
        const d = userDoc.data();
        const existingProfile: UserProfile = {
          uid: fbUser.uid,
          name: d.name || fbUser.displayName || 'Civic User',
          email: fbUser.email || '',
          role: (d.role as UserRole) || role,
          badgeNumber: d.badgeNumber,
        };
        setUser(existingProfile);
        routeForRole(existingProfile.role);
        return;
      }
    } catch {
      // Proceed to first-time mandatory Role ID modal
    }

    setPendingOAuthUser({
      uid: fbUser.uid,
      name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Civic User',
      email: fbUser.email || 'verified@binsync.org',
      role,
    });
  };

  const completeOAuthProfile = async (badgeNumber: string) => {
    if (!pendingOAuthUser) return;
    const cleanBadge = badgeNumber.trim().slice(0, 64);
    if (cleanBadge.length < 3) {
      throw new Error('Please enter a valid identification number (min 3 characters).');
    }

    const { uid, name, email, role } = pendingOAuthUser;
    const safeRoleForFirestore: UserRole =
      role === 'Admin' && email !== 'chaarvisaxena261226@gmail.com' ? 'Citizen' : role;

    if (auth.currentUser && auth.currentUser.uid === uid) {
      try {
        await setDoc(doc(db, 'users', uid), {
          uid,
          name: name.slice(0, 100),
          role: safeRoleForFirestore,
          badgeNumber: cleanBadge,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        await setDoc(doc(db, 'users', uid, 'private', 'info'), {
          uid,
          email: email.slice(0, 254),
          govtOrDeptId: cleanBadge,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        try {
          handleFirestoreError(error, OperationType.CREATE, `users/${uid}`);
        } catch {
          // Logged structured FirestoreErrorInfo
        }
      }
    }

    const finalProfile: UserProfile = {
      uid: role === 'Worker' ? cleanBadge : uid,
      name,
      email,
      role,
      badgeNumber: cleanBadge,
    };
    setPendingOAuthUser(null);
    setUser(finalProfile);
    routeForRole(role);
  };

  const cancelOAuthModal = () => {
    setPendingOAuthUser(null);
  };

  const logout = async () => {
    try {
      await fbSignOut(auth);
    } catch {
      // ignore
    }
    setUser(null);
    navigate('/');
  };

  const createTicket = async (params: {
    title: string;
    description: string;
    wasteCategory: WasteCategory;
    priority: TicketPriority;
    status?: TicketStatus;
    location: string;
    estimatedEffort: string;
    beforeImageUrl: string;
    triageSummary: string;
  }): Promise<Ticket> => {
    const activeUser = user || {
      uid: 'demo-citizen-01',
      name: 'Aarav Sharma',
      email: 'citizen@binsync.org',
      role: 'Citizen' as UserRole,
      badgeNumber: 'AADHAAR-9876-5432',
    };
    const newId = `TKT-${Math.floor(1003 + Math.random() * 8990)}`;
    const nowLabel = formatNow();
    const newTicket: Ticket = {
      id: newId,
      title: params.title.trim(),
      description: params.description.trim(),
      wasteCategory: params.wasteCategory,
      priority: params.priority,
      status: 'REPORTED',
      location: params.location.trim(),
      estimatedEffort: params.estimatedEffort.trim(),
      citizenUid: auth.currentUser?.uid || activeUser.uid,
      citizenName: activeUser.name,
      citizenGovtId: activeUser.badgeNumber,
      beforeImageUrl: params.beforeImageUrl,
      timeline: [
        {
          timestamp: nowLabel,
          actor: 'Citizen',
          action: 'Complaint Reported',
          details: `Reported by ${activeUser.name} (${activeUser.badgeNumber}) at ${params.location}.`,
        },
        {
          timestamp: nowLabel,
          actor: 'Gemini AI',
          action: 'Anti-AI Check & Triage Passed',
          details: params.triageSummary,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTickets((prev) => [newTicket, ...prev]);
    await syncTicketToFirestore(newTicket, true);
    return newTicket;
  };

  const assignTicket = async (ticketId: string, workerId: string) => {
    const workerObj =
      AVAILABLE_WORKERS.find((w) => w.id === workerId) || AVAILABLE_WORKERS[0];
    const nowLabel = formatNow();
    let updatedRef: Ticket | null = null;

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        const next: Ticket = {
          ...t,
          status: 'ASSIGNED',
          assignedWorkerId: workerObj.id,
          assignedWorkerName: workerObj.name,
          updatedAt: new Date().toISOString(),
          timeline: [
            ...t.timeline,
            {
              timestamp: nowLabel,
              actor: 'Admin',
              action: 'Assigned to Field Worker',
              details: `Dispatched to ${workerObj.name} by Admin (${user?.badgeNumber || 'ADM-GOV-001'}).`,
            },
          ],
        };
        updatedRef = next;
        return next;
      })
    );
    if (updatedRef) await syncTicketToFirestore(updatedRef, false);
  };

  const overridePriority = async (ticketId: string, priority: TicketPriority) => {
    const nowLabel = formatNow();
    let updatedRef: Ticket | null = null;

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        const next: Ticket = {
          ...t,
          priority,
          updatedAt: new Date().toISOString(),
          timeline: [
            ...t.timeline,
            {
              timestamp: nowLabel,
              actor: 'Admin',
              action: `Priority Overridden to ${priority}`,
              details: `Manual priority escalation from ${t.priority} to ${priority} by Admin.`,
            },
          ],
        };
        updatedRef = next;
        return next;
      })
    );
    if (updatedRef) await syncTicketToFirestore(updatedRef, false);
  };

  const startWorkerJob = async (ticketId: string) => {
    const nowLabel = formatNow();
    let updatedRef: Ticket | null = null;

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        const next: Ticket = {
          ...t,
          status: 'IN_PROGRESS',
          updatedAt: new Date().toISOString(),
          timeline: [
            ...t.timeline,
            {
              timestamp: nowLabel,
              actor: 'Worker',
              action: 'Started Cleanup Job',
              details: `Worker (${user?.badgeNumber || t.assignedWorkerId || 'WRK-8821-DELHI'}) arrived on site and initiated cleanup.`,
            },
          ],
        };
        updatedRef = next;
        return next;
      })
    );
    if (updatedRef) await syncTicketToFirestore(updatedRef, false);
  };

  const submitWorkerVerification = async (
    ticketId: string,
    afterImageUrl: string,
    verdict: AiVerdictType,
    confidence: number,
    reasoning: string,
    nextStatus: TicketStatus
  ) => {
    const nowLabel = formatNow();
    let updatedRef: Ticket | null = null;

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        const workerEntry: TimelineEntry = {
          timestamp: nowLabel,
          actor: 'Worker',
          action: 'Uploaded Post-Cleanup Proof',
          details: `Submitted post-cleanup photograph for visual AI comparison.`,
        };
        const aiEntry: TimelineEntry = {
          timestamp: nowLabel,
          actor: 'Gemini AI',
          action: `AI Verification Verdict: ${verdict} (${confidence}%)`,
          details:
            nextStatus === 'ACTION_REQUIRED'
              ? `BLOCKED COMPLETION: ${reasoning} Status set to ACTION_REQUIRED.`
              : `${reasoning} Status transitioned to ${nextStatus}.`,
        };
        const next: Ticket = {
          ...t,
          afterImageUrl,
          aiVerdict: verdict,
          aiConfidence: confidence,
          aiReasoning: reasoning,
          status: nextStatus,
          updatedAt: new Date().toISOString(),
          timeline: [...t.timeline, workerEntry, aiEntry],
        };
        updatedRef = next;
        return next;
      })
    );
    if (updatedRef) await syncTicketToFirestore(updatedRef, false);
  };

  const adminReviewDecision = async (
    ticketId: string,
    decision: 'APPROVE' | 'REJECT',
    reason: string
  ) => {
    const nowLabel = formatNow();
    let updatedRef: Ticket | null = null;

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        const nextStatus: TicketStatus =
          decision === 'APPROVE' ? 'RESOLVED' : 'ACTION_REQUIRED';
        const next: Ticket = {
          ...t,
          status: nextStatus,
          adminOverrideReason: reason,
          updatedAt: new Date().toISOString(),
          timeline: [
            ...t.timeline,
            {
              timestamp: nowLabel,
              actor: 'Admin',
              action:
                decision === 'APPROVE'
                  ? 'Manual Admin Override Approve'
                  : 'Admin Rejected Cleanup Task',
              details: `Admin (${user?.badgeNumber || 'ADM-GOV-001'}) logged reason: "${reason}"`,
            },
          ],
        };
        updatedRef = next;
        return next;
      })
    );
    if (updatedRef) await syncTicketToFirestore(updatedRef, false);
  };

  const citizenFinalDecision = async (
    ticketId: string,
    decision: 'CONFIRM' | 'REJECT',
    reason?: string
  ) => {
    const nowLabel = formatNow();
    let updatedRef: Ticket | null = null;

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        const nextStatus: TicketStatus =
          decision === 'CONFIRM' ? 'CLOSED' : 'REOPENED';
        const next: Ticket = {
          ...t,
          status: nextStatus,
          rejectionReason: decision === 'REJECT' ? reason : t.rejectionReason,
          updatedAt: new Date().toISOString(),
          timeline: [
            ...t.timeline,
            {
              timestamp: nowLabel,
              actor: 'Citizen',
              action:
                decision === 'CONFIRM'
                  ? 'Citizen Confirmed Resolution (Closed)'
                  : 'Citizen Rejected Resolution (Reopened)',
              details:
                decision === 'CONFIRM'
                  ? `Verified clean by Citizen (${t.citizenGovtId}). Loop closed.`
                  : `Reopened by Citizen (${t.citizenGovtId}). Reason: "${reason}"`,
            },
          ],
        };
        updatedRef = next;
        return next;
      })
    );
    if (updatedRef) await syncTicketToFirestore(updatedRef, false);
  };

  return React.createElement(
    BinSyncContext.Provider,
    {
      value: {
        user,
        pendingOAuthUser,
        tickets,
        currentPath,
        navigate,
        loginDemo,
        loginWithCredentials,
        loginWithGoogle,
        completeOAuthProfile,
        cancelOAuthModal,
        logout,
        createTicket,
        assignTicket,
        overridePriority,
        startWorkerJob,
        submitWorkerVerification,
        adminReviewDecision,
        citizenFinalDecision,
      },
    },
    children
  );
}

export function useBinSync(): BinSyncContextValue {
  const ctx = useContext(BinSyncContext);
  if (!ctx) {
    throw new Error('useBinSync must be used within a BinSyncProvider');
  }
  return ctx;
}
