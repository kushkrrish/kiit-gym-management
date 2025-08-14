->further work
-razorpay integeration
-enter gym data

Gym Change Request API

POST /memberships/:id/request-change (student)

PATCH /memberships/:id/approve-change (admin)

QR Code Generation (when membership active)

Store { email, gymId, slotTime } in QR code.

Admin Entry Scan API

POST /admin/scan-entry

Decodes QR, verifies active membership & slot match.

Complaints API

Student: Create complaint.

Admin: View, mark resolved.