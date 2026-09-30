/**
 * Firestore Security Rules Verification Spec for the Dirty Dozen Payloads
 */
export interface SecurityTestCase {
  id: number;
  name: string;
  collectionPath: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  auth: { uid: string; email: string; email_verified: boolean } | null;
  payload?: Record<string, unknown>;
  expectedResult: 'PERMISSION_DENIED';
}

export const DIRTY_DOZEN_TESTS: SecurityTestCase[] = [
  {
    id: 1,
    name: 'Unauthenticated Ticket Create',
    collectionPath: '/tickets/tkt_01',
    operation: 'create',
    auth: null,
    payload: { id: 'tkt_01', title: 'Dump', citizenUid: 'u1' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 2,
    name: 'Unverified Email Spoof Admin',
    collectionPath: '/admins/u1',
    operation: 'get',
    auth: { uid: 'u1', email: 'chaarvisaxena261226@gmail.com', email_verified: false },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 3,
    name: 'Identity Spoofing on Ticket Create',
    collectionPath: '/tickets/tkt_02',
    operation: 'create',
    auth: { uid: 'u1', email: 'citizen@binsync.org', email_verified: true },
    payload: { id: 'tkt_02', citizenUid: 'u2', title: 'Spoofed' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 4,
    name: 'Shadow Field Injection on Create',
    collectionPath: '/tickets/tkt_03',
    operation: 'create',
    auth: { uid: 'u1', email: 'citizen@binsync.org', email_verified: true },
    payload: { id: 'tkt_03', citizenUid: 'u1', ghostField: true },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 5,
    name: 'Self-Assigned Admin Role on User Profile Create',
    collectionPath: '/users/u1',
    operation: 'create',
    auth: { uid: 'u1', email: 'citizen@binsync.org', email_verified: true },
    payload: { uid: 'u1', name: 'Attacker', role: 'Admin', badgeNumber: 'ADM-999' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 6,
    name: 'PII Cross-Read Attack',
    collectionPath: '/users/u1/private/info',
    operation: 'get',
    auth: { uid: 'u2', email: 'other@binsync.org', email_verified: true },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 7,
    name: 'ID Poisoning Attack',
    collectionPath: '/tickets/invalid$id!with@symbols',
    operation: 'get',
    auth: { uid: 'u1', email: 'citizen@binsync.org', email_verified: true },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 8,
    name: 'Value Poisoning on Update',
    collectionPath: '/tickets/tkt_01',
    operation: 'update',
    auth: { uid: 'u1', email: 'citizen@binsync.org', email_verified: true },
    payload: { status: 'INVALID_STATUS_VALUE' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 9,
    name: 'Terminal State Bypass on CLOSED Ticket',
    collectionPath: '/tickets/tkt_closed',
    operation: 'update',
    auth: { uid: 'u1', email: 'citizen@binsync.org', email_verified: true },
    payload: { status: 'REOPENED' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 10,
    name: 'Immortal Field Tampering (citizenUid)',
    collectionPath: '/tickets/tkt_01',
    operation: 'update',
    auth: { uid: 'u1', email: 'citizen@binsync.org', email_verified: true },
    payload: { citizenUid: 'u_hijacked' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 11,
    name: 'Temporal Forgery on Create',
    collectionPath: '/tickets/tkt_04',
    operation: 'create',
    auth: { uid: 'u1', email: 'citizen@binsync.org', email_verified: true },
    payload: { id: 'tkt_04', createdAt: '1999-01-01T00:00:00Z' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 12,
    name: 'Unauthorized Admin Registry Write',
    collectionPath: '/admins/u1',
    operation: 'create',
    auth: { uid: 'u1', email: 'citizen@binsync.org', email_verified: true },
    payload: { uid: 'u1', departmentCode: 'ADM-001' },
    expectedResult: 'PERMISSION_DENIED',
  },
];
