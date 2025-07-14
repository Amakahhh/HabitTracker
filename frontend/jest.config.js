// jest.config.js
export default {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx"],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"]
};
