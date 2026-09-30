export type LanguageCode = 'EN' | 'HI' | 'TA' | 'TE' | 'MR' | 'BN';

export type UserRole = 'Citizen' | 'Worker' | 'Admin';

export type WasteCategory =
  | 'Plastic/Dry'
  | 'Organic/Food'
  | 'Hazardous'
  | 'E-waste'
  | 'Overfilled Bin'
  | 'Road Dumping';

export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type TicketStatus =
  | 'REPORTED'
  | 'OPEN'
  | 'SUBMITTED'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'ACTION_REQUIRED'
  | 'FLAGGED'
  | 'RESOLVED'
  | 'CLOSED'
  | 'REOPENED';

export type AiVerdictType =
  | 'CLEANED'
  | 'PARTIALLY_CLEANED'
  | 'NOT_CLEANED'
  | 'DIFFERENT_LOCATION';

export interface TimelineEntry {
  timestamp: string;
  actor: 'Citizen' | 'Worker' | 'Admin' | 'Gemini AI';
  action: string;
  details: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  badgeNumber: string; // Govt ID for Citizen, Work ID for Worker, Official ID for Admin
  isDemo?: boolean;
}

export interface TriageResult {
  wasteCategory: WasteCategory;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  locationSummary: string;
  estimatedEffort: string;
  triageNotes: string;
  confidence: number;
}

export interface VerifyResult {
  verdict: AiVerdictType;
  confidence: number;
  reasoning: string;
  blocked: boolean;
  nextStatus: TicketStatus;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  wasteCategory: WasteCategory;
  priority: TicketPriority;
  status: TicketStatus;
  location: string;
  coordinates?: { lat: number; lng: number };
  estimatedEffort: string;
  citizenUid: string;
  citizenName: string;
  citizenGovtId: string;
  assignedWorkerId?: string;
  assignedWorkerName?: string;
  beforeImageUrl: string;
  afterImageUrl?: string;
  aiVerdict?: AiVerdictType;
  aiConfidence?: number;
  aiReasoning?: string;
  rejectionReason?: string;
  adminOverrideReason?: string;
  timeline: TimelineEntry[];
  createdAt: string;
  updatedAt: string;
}
