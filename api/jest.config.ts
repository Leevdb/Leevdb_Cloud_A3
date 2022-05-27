import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'test-coverage',
  collectCoverageFrom: ['src/**/*.ts'],
  testEnvironment: 'node',
  testTimeout: 10000,
};

export default config;
