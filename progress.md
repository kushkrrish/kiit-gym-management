->further work
-razorpay integeration
-enter gym data

Gym Change Request API

POST /memberships/:id/request-change (student)



->this will used by admin
PATCH /memberships/:id/approve-change (admin)
/ *  have to do this    /*
QR Code Generation (when membership active)

Store { email, gymId, slotTime } in QR code.

Admin Entry Scan API

POST /admin/scan-entry

Decodes QR, verifies active membership & slot match.

Complaints API

Student: Create complaint.

Admin: View, mark resolved.