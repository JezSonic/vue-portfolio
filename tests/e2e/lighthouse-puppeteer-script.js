// This script is used by Lighthouse CI to navigate the app using Playwright (via its Puppeteer-compatible API).
// It allows Lighthouse to audit pages that require interaction or are behind navigation.

module.exports = async (browser, context) => {
  const page = await browser.newPage();
  const targetUrl = context.url; // This is the URL Lighthouse CI wants to audit (from the lighthouserc.js `url` array)

  console.log(`Navigating to ${targetUrl} for Lighthouse audit...`);

  try {
    await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 60000 }); // Increased timeout
    console.log(`Successfully navigated to ${targetUrl}.`);

    // Optional: Add specific interactions based on the URL if needed.
    // This script is called for EACH URL in the `lighthouserc.js` `url` array.
    // So, `targetUrl` will be 'http://localhost:4173/', then 'http://localhost:4173/projects', etc.

    if (targetUrl.endsWith('/projects')) {
      // Example: Wait for a specific element that indicates the projects page has loaded
      // await page.waitForSelector('.project-list-container', { timeout: 10000 });
      console.log('On projects page, any specific interactions for projects can go here.');
    } else if (targetUrl.endsWith('/contact')) {
      // Example: Wait for the contact form
      // await page.waitForSelector('form[aria-label="contact form"]', { timeout: 10000 });
      console.log('On contact page, any specific interactions for contact can go here.');
    } else if (targetUrl.endsWith('/')) {
      console.log('On home page, any specific interactions for home can go here.');
    }

    // Add a small delay to ensure all scripts have executed, if necessary
    await new Promise(resolve => setTimeout(resolve, 1000));

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
