/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-expo",
  testMatch: ["**/?(*.)+(test).[jt]s?(x)"],
  setupFilesAfterEnv: [],
  // Recomendado para tests que usan timers (nuestro smoke test los usa):
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
};
