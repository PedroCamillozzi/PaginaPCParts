module.exports ={
    displayName:'paginaPcParts',
    maxWorkers:3,
    bail: true,
    preset: 'jest-preset-angular',
    roots: ['<rootDir>/src/'],
    testMatch: ['**/+(*.)+(spec).+(ts)'],
    setupFilesAfterEnv:['<rootDir>/src/test.ts'],
    collectCoverage: true,
    cacheDirectory: '<rootDir>/jestCache',
    coverageReporters:['text-summary', 'lcov'],
    coverageDirectory: 'coverage/paginaPcParts',
    globals:{
        'ts-jest':{
            tsconfig: '<rootDir>/tsconfig.spec.json'
        },
    },
}