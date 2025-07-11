module.exports = {
  send: async (email) => {
    if (Math.random() < 0.7) {
      return { success: true, provider: "A" };
    } else {
      throw new Error("Provider A failed");
    }
  }
};
