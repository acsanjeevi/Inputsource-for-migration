import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 10000,
    testIsolation: false,
    pageLoadTimeout: 120000,
    screenshotOnRunFailure: true,
    video: true,
    retries: {
      runMode: 0,
      openMode: 0,
    },
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'mochawesome-report/json',
      overwrite: false,
      html: false,
      json: true,
    },
    setupNodeEvents(on, config) {
      return config;
    },
  },
});

