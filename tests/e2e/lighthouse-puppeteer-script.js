// This script is used by Lighthouse CI to navigate the app using Playwright (via its Puppeteer-compatible API).
// It allows Lighthouse to audit pages that require interaction or are behind navigation.

export default async (browser, context) => {
  const page = await browser.newPage();
  const targetUrl = context.url; // This is the URL Lighthouse CI wants to audit (from the lighthouserc.js `url` array)

  console.log(`Navigating to ${targetUrl} for Lighthouse audit...`);

  try {
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 60000 }); // Using domcontentloaded instead of networkidle0 for faster and more reliable tests
    console.log(`Successfully navigated to ${targetUrl}.`);

    // Optional: Add specific interactions based on the URL if needed.
    // This script is called for EACH URL in the `lighthouserc.js` `url` array.
    // So, `targetUrl` will be 'http://localhost:4173/', then 'http://localhost:4173/projects', etc.

    if (targetUrl.endsWith('/projects')) {
      // Wait for a specific element that indicates the projects page has loaded
      await page.waitForSelector('body', { timeout: 10000 });
      console.log('On projects page, waiting for body element to be loaded.');
    } else if (targetUrl.endsWith('/contact')) {
      // Wait for the contact form or any element that indicates the contact page has loaded
      await page.waitForSelector('body', { timeout: 10000 });
      console.log('On contact page, waiting for body element to be loaded.');
    } else if (targetUrl.endsWith('/')) {
      // Wait for the home page to load
      await page.waitForSelector('body', { timeout: 10000 });
      console.log('On home page, waiting for body element to be loaded.');
    }

    // Add a delay to ensure all scripts and resources have loaded
    await new Promise(resolve => setTimeout(resolve, 2000));

  } catch (error) {
    console.error(`Error navigating to ${targetUrl} or during page interaction:`, error);
    // It's important to not let an error here stop all Lighthouse runs if possible,
    // though a navigation failure is usually critical for the specific URL.
    // Rethrow if it's a critical failure for this URL.
    throw error;
  }

  // Lighthouse will now audit the current state of `page`.
  // No need to return the page object explicitly, Lighthouse handles it.
};
