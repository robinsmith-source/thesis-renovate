import { test, expect } from "../playwright/fixtures";

test("User is authenticated", async ({ page }) => {
  await page.goto("http://localhost:3000/auth-info");
  // this is null if there is no user
  await expect(page.getByTestId("auth-info")).toContainText("user");
});
