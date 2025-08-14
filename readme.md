
BASIC FlOW->
User logs in → gets JWT.

->fronted part
Calls GET /gyms → chooses gym.
Calls GET /gyms/:id/slots → chooses slot.



Calls POST /membership/create → gets membershipId.
Calls POST /payment/create-order → gets Razorpay orderId.
Opens Razorpay checkout → after payment success, calls /payment/verify.

