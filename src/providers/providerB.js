module.exports = {
  send: async (email) => {
    if (Math.random() < 0.7) {
      return { success: true, provider: "B" };
    } else {
      throw new Error("Provider B failed");
    }
  }
};
