process.env.NODE_ENV = 'localDev'
module.exports = wallaby => {
  return {
    autoDetect: true,
    setup: () => {
      // require('./src/test/beforeAllTests.js')
    },
    slowTestThreshold: 10,
    filesWithNoCoverageCalculated: ['test/**', 'src/**/*.test.js'],
    jest: {
      config: require('./jest.config.js'),
    },
  }
}
