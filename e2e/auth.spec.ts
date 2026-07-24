import { test, expect } from "@playwright/test";

test.describe("Authentication & Navigation E2E Flow", () => {
  test("should navigate to landing page successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/ISYA/i);
  });

  test("should navigate to login page and display form elements", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("input[type='email']")).toBeVisible();
    await expect(page.locator("input[type='password']")).toBeVisible();
  });

  test("should navigate to forgot password page from login page", async ({ page }) => {
    await page.goto("/forgot-password");
    await expect(page.getByRole("heading", { name: "Reset Your Password" })).toBeVisible();
    await expect(page.locator("input[type='email']")).toBeVisible();
  });

  test("should navigate to password reset page with token parameter", async ({ page }) => {
    await page.goto("/reset-password/test-token-123");
    await expect(page.getByRole("heading", { name: "Set New Password" })).toBeVisible();
  });
});
