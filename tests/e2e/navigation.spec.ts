import { test, expect } from '@playwright/test';

test.describe('Critical User Journeys', () => {
  const BASE_URL = 'http://localhost:4173'; // Vite's default preview port

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Navigate to Home Page and verify title', async ({ page }) => {
    await expect(page).toHaveTitle(/Home/); // Assuming 'Home' is in the title
  });

  test('Navigate to Projects section and verify a project exists', async ({ page }) => {
    // This assumes there's a link/button to navigate to projects
    // Adjust the selector as per your actual application structure
    // For example, if your projects are directly on the home page, this might be different.
    // This is a placeholder and might need significant adjustment.

    // Attempt to find a link or button that navigates to a projects view or section
    // This is a common pattern but highly dependent on your app's structure.
    const projectsLink = page.getByRole('link', { name: /projects/i });
    if (await projectsLink.isVisible()) {
      await projectsLink.click();
      // Wait for navigation or content to load if it's a separate page/view
      await page.waitForURL('**/projects**', { timeout: 5000 }).catch(() => console.log('Not a separate projects page or timed out waiting for URL change.'));
    } else {
      console.log('Projects link not found, assuming projects are on the current page or loaded dynamically.');
    }

    // Verify that at least one project item is visible
    // This selector needs to be specific to how projects are rendered in your app
    // e.g., a common class name for project cards or items
    const projectItemSelector = '.project-card'; // Replace with your actual project item selector
    await expect(page.locator(projectItemSelector).first()).toBeVisible({ timeout: 10000 });
  });

  test('Navigate to Contact Page and verify contact form', async ({ page }) => {
    // Adjust the selector for the contact link/button
    await page.getByRole('link', { name: /contact/i }).click();
    await expect(page).toHaveURL(/.*contact/); // Or whatever the contact page URL is

    // Verify that a contact form or key contact information is visible
    // This selector needs to be specific to your contact form
    const contactFormSelector = 'form[aria-label="contact form"]'; // Replace with your actual form selector
    await expect(page.locator(contactFormSelector)).toBeVisible({ timeout: 10000 });
  });
});
