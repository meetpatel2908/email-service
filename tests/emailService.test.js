const { sendEmail } = require("../src/services/emailService");

// Mock providerA and providerB manually
jest.mock("../src/providers/providerA", () => ({
  send: jest.fn()
}));
jest.mock("../src/providers/providerB", () => ({
  send: jest.fn()
}));

const providerA = require("../src/providers/providerA");
const providerB = require("../src/providers/providerB");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("EmailService", () => {
  const email = {
    to: "test@example.com",
    subject: "Test Email",
    body: "Hello world",
    messageId: `test-${Date.now()}`
  };

  test("sends email via Provider A", async () => {
    providerA.send.mockResolvedValue({ success: true });
    const result = await sendEmail({ ...email, messageId: "email-001" });

    expect(result.status).toBe("sent via A");
    expect(providerA.send).toHaveBeenCalled();
    expect(providerB.send).not.toHaveBeenCalled();
  });

  test("fallbacks to Provider B if A fails", async () => {
    providerA.send.mockRejectedValue(new Error("fail A"));
    providerB.send.mockResolvedValue({ success: true });

    const result = await sendEmail({ ...email, messageId: "email-002" });

    expect(result.status).toBe("sent via B");
    expect(providerA.send).toHaveBeenCalled();
    expect(providerB.send).toHaveBeenCalled();
  });

 test("returns failure if both providers fail", async () => {
  providerA.send.mockRejectedValue(new Error("fail A"));
  providerB.send.mockRejectedValue(new Error("fail B"));

  const result = await sendEmail({ ...email, messageId: "email-003" });

  expect(result.success).toBe(false);
  expect(result.status).toBe("both providers failed");
}, 10000); // ✅ increase timeout to 10 seconds
});
