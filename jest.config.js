module.exports = {
  globals: {
    "ts-jest": {
      "tsConfigFile": "tsconfig.json"
    }
  },
  moduleFileExtensions: ['json', 'ts', 'js'],
  transform: {
    '^.+\\.ts$': './node_modules/ts-jest/preprocessor.js'
  },
  testMatch: ['**/test.ts'],
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/test.ts",
  ],
  mapCoverage: true,
  coverageDirectory: '.coverage'
};
