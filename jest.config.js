module.exports = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        'lib/**/*.js',
        '!lib/index.js',
        '!lib/**/*.test.js',
        '!lib/**/*.stubs.js',
        '!**/node_modules/**'
    ],
    coverageDirectory: 'coverage',
    restoreMocks: true,
    testEnvironment: 'node',
    transform: {
        '^.+\\.js$': 'babel-jest'
    }
};