
BASIC FlOW->
User logs in → gets JWT.

->fronted part
Calls GET /gyms → chooses gym.
Calls GET /gyms/:id/slots → chooses slot.



Calls POST /membership/create → gets membershipId.
Calls POST /payment/create-order → gets Razorpay orderId.
Opens Razorpay checkout → after payment success, calls /payment/verify.

-payment flow-
1-Backend → create Razorpay order → return orderId.
2-Frontend → Razorpay Checkout is opened using that orderId.
3-After payment:
    Razorpay sends razorpay_payment_id, razorpay_order_id, razorpay_signature back to frontend in handler callback.
4-Frontend → calls your backend /verify-payment API with those three values.
5-Backend → verifies signature → marks membership as active. ✅