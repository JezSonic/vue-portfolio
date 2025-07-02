# vue-portfolio

This is a Vue.js portfolio project.

## Development

### Prerequisites
- Node.js (version specified in `.nvmrc` or `package.json` engines, if applicable)
- npm or yarn

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/JezSonic/vue-portfolio.git
   cd vue-portfolio
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server
```bash
npm run dev
```
This will start the Vite development server, typically on `http://localhost:5173`.

### Building for Production
```bash
npm run build
```
This command builds the application for production, outputting the static files to the `dist` directory.

### Previewing the Production Build
```bash
npm run preview
```
This command serves the `dist` directory, typically on `http://localhost:4173`. This is useful for testing the production build locally.

## Testing

This project includes End-to-End (E2E) tests using Playwright and performance tests using Lighthouse CI.

### Running End-to-End (E2E) Tests
E2E tests simulate user interactions with the application in a browser.

1. **Ensure the application is running (or use Playwright's webServer option):**
   The Playwright configuration (`playwright.config.ts`) is set up to automatically start the preview server (`npm run preview`) before running tests.
2. **Run the tests:**
   ```bash
   npm run test:e2e
   ```
   Test results and a detailed HTML report will be available in the `playwright-report` directory.

### Running Performance Tests
Performance tests use Lighthouse CI to audit the application against predefined performance budgets, accessibility standards, best practices, and SEO guidelines.

1. **Build the application:**
   Performance tests should be run against a production build.
   ```bash
   npm run build
   ```
2. **Run Lighthouse CI:**
   ```bash
   npm run test:perf
   ```
   This command executes `lhci autorun`, which will:
    - Start a local server for the production build (as configured in `lighthouserc.js` via `npm run preview`).
    - Use Playwright (via `tests/e2e/lighthouse-puppeteer-script.js`) to navigate to specified pages (`/`, `/projects`, `/contact`).
    - Run Lighthouse audits on these pages.
    - Assert the results against the budgets defined in `lighthouserc.js`.
    - Output results to the console and save detailed reports in the `.lighthouseci` directory.

   If any Lighthouse score is below the configured threshold or a performance budget is exceeded, the command will exit with an error code.

### Interpreting Performance Test Results
- **Console Output:** `lhci autorun` provides a summary of the results in the console, highlighting any failed assertions.
- **HTML Reports:** Detailed HTML reports for each audited URL are saved in the `.lighthouseci` directory (e.g., `.lighthouseci/lhr-XXXXXXXX.html`). These reports provide in-depth information about each metric, identify areas for improvement, and offer specific optimization suggestions.
- **CI Environment:** In the GitHub Actions workflow (`.github/workflows/performance-tests.yml`), if performance tests fail, the workflow step will fail, preventing merges if configured as a required check. Artifacts for Lighthouse reports are also uploaded for inspection.

### Configuration Files
- **Playwright:** `playwright.config.ts`, test files in `tests/e2e/`
- **Lighthouse CI:** `lighthouserc.js`, navigation script `tests/e2e/lighthouse-puppeteer-script.js`

## Deployment
Firebase is used for deployment.
- **Deploy to production:**
  ```bash
  npm run deploy
  ```
- **Deploy to beta channel:**
  ```bash
  npm run deploy:beta
  ```

## Linting and Formatting
- **Format code:**
  ```bash
  npm run format
  ```
- **Lint code:**
  ```bash
  npm run lint
  ```
---

This project was bootstrapped with Vite.
