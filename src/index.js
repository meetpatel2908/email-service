const express = require("express");
const { sendEmail } = require("./services/emailService");

const app = express();
app.use(express.json());

app.post("/send", async (req, res) => {
  const email = req.body;

  try {
    const result = await sendEmail(email);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("API running at http://localhost:5000");
});
