# BinSync Firestore Security Specification (`security_spec.md`)

## 1. Data Invariants
1. **Default Deny**: All paths not explicitly matched are denied (`allow read, write: if false`).
2. **Verified Authentication**: All standard mutations require `request.auth != null && request.auth.token.email_verified == true`.
3. **Path Variable Hardening**: Every single-document path variable (`userId`, `infoId`, `ticketId`, `adminId`) must satisfy `isValidId(id)` (`<= 128` chars, `^[a-zA-Z0-9_\-]+$`).
4. **PII Isolation**: User email and government ID proofs are stored in `/users/{userId}/private/{infoId}` and can only be read by `isOwner(userId)` or `isAdmin()`.
5. **Privilege Escalation Prevention**: Users creating `/users/{userId}` cannot self-assign `role == 'Admin'` unless `isAdmin()`. Role fields are immutable on user updates.
6. **Terminal State Locking**: Once a `/tickets/{ticketId}` document reaches `status == 'CLOSED'`, subsequent updates are blocked unless `isAdmin()`.
7. **Temporal & Identity Integrity**: `citizenUid` and `createdAt` are immutable on ticket updates; `createdAt == request.time` on creation and `updatedAt == request.time` on updates.
8. **Secure List Queries**: `allow list` on `/tickets/{ticketId}` checks `resource.data.visibility == 'PUBLIC_CIVIC' || resource.data.citizenUid == request.auth.uid` so no unverified query scraping occurs.

## 2. The "Dirty Dozen" Adversarial Payloads
1. **Unauthenticated Ticket Create**: `{ id: "t1", citizenUid: "anon", ... }` with `auth == null` -> `PERMISSION_DENIED`.
2. **Unverified Email Spoof Admin**: `auth: { uid: "u1", token: { email: "chaarvisaxena261226@gmail.com", email_verified: false } }` -> `PERMISSION_DENIED`.
3. **Identity Spoofing on Ticket Create**: Authenticated as `u1`, payload sets `citizenUid: "u2"` -> `PERMISSION_DENIED`.
4. **Shadow Field Injection on Create**: Valid ticket payload + `"isSuperVerified": true` -> Rejected by `.keys().hasOnly(...)` -> `PERMISSION_DENIED`.
5. **Self-Assigned Admin Role on User Profile Create**: `u1` creates `/users/u1` with `role: "Admin"` -> `PERMISSION_DENIED`.
6. **PII Cross-Read Attack**: `u2` performs `get` on `/users/u1/private/info` -> `PERMISSION_DENIED`.
7. **ID Poisoning Attack**: Document ID with 300 characters or special characters (`../admin`) -> Rejected by `isValidId()` -> `PERMISSION_DENIED`.
8. **Value Poisoning on Update**: Updating `status` to `"HACKED_STATE"` -> Rejected by `isValidTicket(incoming())` enum check -> `PERMISSION_DENIED`.
9. **Terminal State Bypass**: Updating a ticket whose existing `status` is `'CLOSED'` as a non-admin -> `PERMISSION_DENIED`.
10. **Immortal Field Tampering**: Updating `citizenUid` or `createdAt` on an existing ticket -> `PERMISSION_DENIED`.
11. **Temporal Forgery**: Creating a ticket with a forged past/future `createdAt != request.time` -> `PERMISSION_DENIED`.
12. **Unauthorized Admin Registry Write**: Non-admin user writing to `/admins/u1` -> `PERMISSION_DENIED`.
