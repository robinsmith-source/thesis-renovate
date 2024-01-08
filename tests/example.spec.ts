// Important: import our fixtures.
import { test, expect } from "../playwright/fixtures";

test("test", async ({ page }) => {
  // page is authenticated
  await page.goto("http://localhost:3000/auth-info");
});
