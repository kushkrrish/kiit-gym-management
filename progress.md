
/ *  have to do this    /*
1-Admin Entry Scan API
POST /admin/scan-entry
*/
    app.post("/admin/scan-entry", async (req, res) => {
  const { qrData } = req.body;
  const payload = JSON.parse(qrData);

  const membership = await Membership.findById(payload.membershipId)
    .populate("user", "email profilePhoto");

  if (!membership || membership.status !== "active") {
    return res.status(400).json({ valid: false, reason: "Invalid membership" });
  }

  // validate date + slot
  const today = new Date().toISOString().split("T")[0];
  if (payload.date !== today || payload.slot !== membership.slot) {
    return res.status(400).json({ valid: false, reason: "Expired/Invalid QR" });
  }

  res.json({
    valid: true,
    userEmail: membership.user.email,
    profilePhoto: membership.user.profilePhoto,  // send photo to admin
    gymId: membership.gymId,
    slot: membership.slot
  });
});

/*
Decodes QR, verifies active membership & slot match.
When QR is scanned:-
Show ✅/❌ result.
Display student’s profile photo + name/email.
Admin can visually verify the student matches the face in photo.



2-Complaints API
Student: Create complaint.
Admin: View, mark resolved.

3-event api


/*daily check/*
chk qrcode api