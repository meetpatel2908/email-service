// logger.js
const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "logs.txt");

function logToFile(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFilePath, `[${timestamp}] ${message}\n`);
}

function info(message) {
  console.log(`ℹ️  INFO: ${message}`);
  logToFile(`INFO: ${message}`);
}

function error(message) {
  console.error(`❌ ERROR: ${message}`);
  logToFile(`ERROR: ${message}`);
}

function warn(message) {
  console.warn(`⚠️  WARN: ${message}`);
  logToFile(`WARN: ${message}`);
}

module.exports = {
  info,
  error,
  warn,
};
