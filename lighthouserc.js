module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:4173/', // Home page
        'http://localhost:4173/projects', // Assuming a /projects route
        'http://localhost:4173/contact', // Assuming a /contact route
      ],
      startServerCommand: 'npm run preview',
      puppeteerScript: './tests/e2e/lighthouse-puppeteer-script.js',
      puppeteerLaunchOptions: { args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'] }, // Added more CI flags
      numberOfRuns: 2, // Reduced for faster CI runs, can be 3 for more stability
      settings: {
        preset: 'desktop',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        // It's often better to let Playwright handle navigation within the script for complex SPAs
        // rather than relying on Lighthouse's own navigation for multiple URLs if they depend on app state.
        // However, for simple, distinct pages, multiple URLs here are fine.
        // The puppeteerScript will be run for *each* URL listed here.
        // The script needs to be intelligent enough to handle the provided URL.
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.85 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 4000 }], // Slightly increased budget
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.15 }],
        'interactive': ['warn', { maxNumericValue: 4500 }], // Slightly increased budget
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
