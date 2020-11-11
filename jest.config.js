module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**', '!**/index.ts', '!src/config', '!src/middleware'],
};
