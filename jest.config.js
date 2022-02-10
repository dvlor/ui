module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest'
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transformIgnorePatterns: ['node_modules'],
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  },
  testEnvironment: 'jest-environment-jsdom-fifteen'
}
