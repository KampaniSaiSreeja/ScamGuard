const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/check-scam", (req, res) => {
  const message = req.body.message.toLowerCase();

  const scamKeywords = [
    "otp",
    "urgent",
    "account blocked",
    "click link",
    "verify",
    "bank",
    "upi",
    "refund",
    "won prize",
    "kyc"
  ];

  const matched = scamKeywords.filter(word =>
    message.includes(word)
  );

  let result = {
    status: "Safe",
    risk: "Low",
    reasons: []
  };

  if (matched.length >= 2) {
    result.status = "Scam";
    result.risk = "High";
    result.reasons = matched;
  } else if (matched.length === 1) {
    result.status = "Suspicious";
    result.risk = "Medium";
    result.reasons = matched;
  }

  res.json(result);
});

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
