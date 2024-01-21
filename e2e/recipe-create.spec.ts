import { test, expect } from "../playwright/fixtures";

test("Create a recipe and make sure it gets created", async ({ page }) => {
  await page.goto("http://localhost:3000/recipe/create");
  await page.getByPlaceholder("My tasty Pizza").fill("Testing Recipe");
  await page.getByLabel("Easy,").click();
  await page.getByLabel("Hard", { exact: true }).getByText("Hard").click();
  await page
    .getByPlaceholder("My grandma used to make this")
    .fill("Test Description");
  await page
    .locator("div")
    .filter({ hasText: /^Recipe Tags \(0\/10\)$/ })
    .locator("div")
    .click();
  await page.getByLabel("Recipe Tags (0/10)").fill("tag");
  await page.getByLabel("Recipe Tags (0/10)").press("Enter");
  await page.getByRole("button", { name: "Add Step" }).click();
  await page.getByLabel("Step Description").fill("Step 1 Description");
  await page
    .locator(".grid > div:nth-child(2) > .relative > .inline-flex")
    .click();
  await page.getByLabel("Duration (in minutes)").fill("10");
  await page.getByLabel(",", { exact: true }).click();
  await page.getByLabel("Prep", { exact: true }).getByText("Prep").click();
  await page
    .getByRole("button", { name: "Add Ingredient", exact: true })
    .click();
  await page.getByLabel("Name", { exact: true }).fill("Ingredient 1");
  await page.getByLabel("Quantity").fill("4");
  await page.getByLabel(",", { exact: true }).click();
  await page.getByLabel("Milliliter", { exact: true }).click();
  await page.getByRole("button", { name: "Submit" }).click();

  // wait for the page to not be a recipe
  await page.waitForURL(/\/recipe\/c[a-z0-9]{24}/);

  //TODO: due to layout changes, this assertions are broken and needs to be fixed
  await expect(page.getByRole("heading")).toContainText("Testing Recipe");
  await expect(page.getByRole("main")).toContainText("(hard)");
  await expect(page.getByRole("listitem")).toContainText("4 ml Ingredient 1");
  await page.getByText("Step 1 Description").click();
  await expect(page.getByRole("table")).toContainText("Step 1 Description");
  await page.getByText("minutes (prep)").click();
  await expect(page.getByRole("table")).toContainText("10 minutes (prep)");
  await expect(page.getByRole("main")).toContainText("#tag");
});
