import { test, expect } from "../playwright/fixtures";

test("Should create a empty shopping list and make sure it gets created", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/shopping-list");
  await page
    .locator("div")
    .filter({ hasText: /^Shopping Lists$/ })
    .getByRole("button")
    .click();
  await page.getByPlaceholder("My shopping list", { exact: true }).click();
  await page
    .getByPlaceholder("My shopping list", { exact: true })
    .fill("ShoppingList1");
  await page.getByPlaceholder("This is my shopping list").click();
  await page.getByPlaceholder("This is my shopping list").fill("Description");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("heading", { name: "ShoppingList1" }).first(),
  ).toBeVisible();
  await expect(page.locator(".text-left").first()).toContainText("Description");
  await expect(page.locator(".relative > p").first()).toContainText(
    "No items in this shopping list",
  );
});

test("Should create a shopping list from recipe page and add all ingredients", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/recipe/create");
  await page.getByPlaceholder("My tasty Pizza").click();
  await page
    .getByPlaceholder("My tasty Pizza")
    .fill("Testing Recipe for Shopping List");
  await page.getByLabel("Easy,").click();
  await page.getByLabel("Medium", { exact: true }).getByText("Medium").click();
  await page.getByPlaceholder("My grandma used to make this").click();
  await page
    .getByPlaceholder("My grandma used to make this")
    .fill("Description");
  await page.getByLabel("Recipe Tags (0/10)").click();
  await page.getByLabel("Recipe Tags (0/10)").fill("tag");
  await page.getByLabel("Recipe Tags (0/10)").press("Enter");
  await page.getByRole("button", { name: "Add Step" }).click();
  await page.getByLabel("Step Description").fill("Step1");
  await page
    .getByRole("button", { name: "Add Ingredient", exact: true })
    .click();
  await page.getByLabel("Name", { exact: true }).fill("Ingredient1");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.waitForURL(/\/recipe\/c[a-z0-9]{24}/);

  await page
    .locator("div")
    .filter({ hasText: /^Shopping ListSelect ingredients$/ })
    .locator("button")
    .nth(2)
    .click();
  await page.getByPlaceholder("My shopping list", { exact: true }).click();
  await page
    .getByPlaceholder("My shopping list", { exact: true })
    .fill("ShoppingList2");
  await page.getByPlaceholder("This is my shopping list").click();
  await page.getByPlaceholder("This is my shopping list").fill("Description");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Choose a shopping list").click();
  await page.getByPlaceholder("Choose a shopping list").fill("ShoppingList2");
  await page.getByText("ShoppingList2").first().click();

  await page.getByLabel("Select All").locator("svg").click();
  await page
    .getByRole("button", {
      name: "Add Ingredient to shopping list",
      exact: true,
    })
    .click();

  await page.waitForURL(/\/shopping-list/);
  expect(
    page.getByRole("heading", { name: "ShoppingList2" }).first().isVisible(),
  );
  await expect(page.locator(".text-left").first()).toContainText("Description");
  await expect(page.getByLabel("Ingredient Table").first()).toContainText(
    "AmountIngredient1 gIngredient1",
  );
});
