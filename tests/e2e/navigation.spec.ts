import { test, expect } from '@playwright/test';

test.describe('Critical User Journeys', () => {
  const BASE_URL = 'http://localhost:4173'; // Vite's default preview port

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Navigate to Home Page and verify title', async ({ page }) => {
    await expect(page).toHaveTitle(/New DEV/); // Assuming 'Home' is in the title
  });

  test('Navigate to Contact Page and verify contact form', async ({ page }) => {
    // Adjust the selector for the contact link/button
    await page.getByRole('link', { name: /contact/i }).click();
    await expect(page).toHaveURL(/.*contact/); // Or whatever the contact page URL is
  });
});
