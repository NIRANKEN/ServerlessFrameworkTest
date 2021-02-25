module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverageFrom: [
        'functions/**/*.{ts,tsx}',
        '!functions/__*.{ts,tsx}',
        '!functions/**/__test__/**/*.*'
    ]
};