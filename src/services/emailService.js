const logger = require("../utils/logger");
const providerA = require("../providers/providerA");
const providerB = require("../providers/providerB");

let sentEmails = new Set(); // for idempotency
let rateLimitLog = [];

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

async function trySendWithRetry(sendFn, email, maxRetries = 3) {
  let delay = 1000;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await sendFn(email);
    } catch (err) {
      if (i < maxRetries - 1) {
        logger.warn(`Retrying in ${delay}ms...`);
        await sleep(delay);
        delay *= 2;
      } else {
        throw err;
      }
    }
  }
}

function checkRateLimit() {
  const now = Date.now();
  rateLimitLog = rateLimitLog.filter((t) => now - t < 60000); // keep only last 1 min
  if (rateLimitLog.length >= 5) {
    logger.error("Rate limit exceeded: Too many emails in 1 minute.");
    throw new Error("Rate limit exceeded");
  }
  rateLimitLog.push(now);
}

async function sendEmail(email) {
  checkRateLimit();

  if (sentEmails.has(email.messageId)) {
    logger.warn(`Duplicate email blocked: messageId ${email.messageId}`);
    throw new Error("Duplicate email (idempotency)");
  }

  try {
    const res = await trySendWithRetry(providerA.send, email);
    sentEmails.add(email.messageId);
    logger.info(`Email sent via Provider A to ${email.to}`);
    return { ...res, status: "sent via A" };
  } catch (errA) {
    logger.error(`Provider A failed: ${errA.message}`);
    logger.warn("Switching to Provider B...");

    try {
      const res = await trySendWithRetry(providerB.send, email);
      sentEmails.add(email.messageId);
      logger.info(`Email sent via Provider B to ${email.to}`);
      return { ...res, status: "sent via B" };
    } catch (errB) {
      logger.error(`Both providers failed for messageId ${email.messageId}`);
      return { success: false, status: "both providers failed" };
    }
  }
}

module.exports = { sendEmail };
