# 📧 Email Sending Service

A robust and resilient email-sending microservice built with Node.js. It uses **two mock email providers** and features retry logic, fallback, idempotency, rate limiting, status tracking, and logging. This project was built as part of a backend developer trainee task.

---

## 🚀 Features

- ✅ Retry mechanism with exponential backoff
- ✅ Fallback to secondary provider if the first fails
- ✅ Idempotency using messageId to prevent duplicate sends
- ✅ Rate limiting (max 5 requests/min)
- ✅ Status tracking (via response)
- ✅ Logging with timestamped info/warn/error logs
- ✅ Unit tests written with Jest

---

## 🛠 Tech Stack

- **Node.js** (CommonJS)
- **Express.js**
- **Jest** (unit testing)
- **Custom mock providers**

---

## 📁 Project Structure

```bash
email-service/
├── src/
│   ├── providers/
│   │   ├── providerA.js
│   │   └── providerB.js
│   ├── services/
│   │   └── emailService.js
│   └── utils/
│       └── logger.js
├── tests/
│   └── emailService.test.js
├── package.json
├── README.md
```


## ⚙️ Setup & Run

1. **Clone the repo:**
   ```bash
   git clone <your-github-repo-url>
   cd email-service

Install dependencies:

npm install

Start the server:

node index.js

Send request using Postman:

Endpoint: POST http://localhost:5000/send

Body (JSON):
{
  "to": "user@example.com",
  "subject": "Hello",
  "body": "This is a test email.",
  "messageId": "unique-email-id"
}

 🧪 Run Tests :

 npm test

Tested using Jest. All 3 core scenarios are covered:

Email sent via Provider A

Fallback to Provider B if A fails

Failure if both providers fail

🧠 Assumptions
Mock providers are used instead of real SMTP/email services

Email sending success/failure is simulated via Math.random() or manual failure injection

Logging is stored in logs/app.log

🏁 Author
Meet Patel
Fresher, Backend Developer Trainee
Email: meetpatel1234@email.com
LinkedIn: www.linkedin.com/in/meet-patel-4a88821a7