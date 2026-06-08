import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'babel-jest',
      { configFile: './babel.config.js' },
    ],
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  projects: [
    {
      displayName: 'dom',
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      },
      transform: {
        '^.+\\.(ts|tsx|js|jsx)$': [
          'babel-jest',
          { configFile: './babel.config.js' },
        ],
      },
      testMatch: [
        '<rootDir>/__tests__/components/**/*.[jt]s?(x)',
        '<rootDir>/__tests__/app/**/*.[jt]s?(x)',
        '<rootDir>/__tests__/lib/**/*.[jt]s?(x)',
      ],
    },
    {
      displayName: 'api',
      testEnvironment: 'node',
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
      },
      transform: {
        '^.+\\.(ts|tsx|js|jsx)$': [
          'babel-jest',
          { configFile: './babel.config.js' },
        ],
      },
      testMatch: [
        '<rootDir>/__tests__/api/**/*.[jt]s?(x)',
        '<rootDir>/__tests__/middleware.test.ts',
      ],
    },
  ],
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    '!**/*.d.ts',
  ],
}

export default config
