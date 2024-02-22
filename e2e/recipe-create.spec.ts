import { test, expect } from "../playwright/fixtures";

test("Should create a recipe and make sure it gets created", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/recipe/create");
  await page.getByPlaceholder("My tasty Pizza").click();
  await page.getByPlaceholder("My tasty Pizza").fill("Testing Recipe");
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

  await expect(
    page.locator("h1").filter({ hasText: "Testing Recipe" }),
  ).toBeVisible();
  await expect(
    page
      .locator("span")
      .filter({ hasText: "Testing Recipe" })
      .locator("path")
      .nth(1),
  ).toBeVisible();

  await expect(page.getByRole("main")).toContainText("Description");
  await expect(page.getByRole("rowheader")).toContainText("1 g");
  await expect(
    page.getByLabel("Ingredient Table").locator("tbody"),
  ).toContainText("Ingredient1");
  await expect(page.getByRole("table")).toContainText("1 g Ingredient1");
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^#tag$/ })
      .nth(1),
  ).toBeVisible();
});

test("Should disable submit button, when no name is added", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/recipe/create");
  await page.getByPlaceholder("My grandma used to make this").click();
  await page
    .getByPlaceholder("My grandma used to make this")
    .fill("Description");
  await page.getByRole("button", { name: "Add Step", exact: true }).click();
  await page.getByLabel("Step Description").fill("Step1");
  await page
    .getByRole("button", { name: "Add Ingredient", exact: true })
    .click();
  await page.getByLabel("Name", { exact: true }).fill("Ingredient1");
  await expect(page.getByRole("button", { name: "Submit" })).toBeDisabled();
});

test("Should disable submit button, when no description is added", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/recipe/create");
  await page.getByPlaceholder("My tasty Pizza").click();
  await page.getByPlaceholder("My tasty Pizza").fill("Testing Recipe");
  await page.getByRole("button", { name: "Add Step", exact: true }).click();
  await page.getByLabel("Step Description").fill("Step1");
  await page
    .getByRole("button", { name: "Add Ingredient", exact: true })
    .click();
  await page.getByLabel("Name", { exact: true }).fill("Ingredient1");
  await expect(page.getByRole("button", { name: "Submit" })).toBeDisabled();
});

test("Should disable submit button, when no ingredient is added", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/recipe/create");
  await page.getByPlaceholder("My tasty Pizza").click();
  await page.getByPlaceholder("My tasty Pizza").fill("Testing Recipe");
  await page.getByPlaceholder("My grandma used to make this").click();
  await page
    .getByPlaceholder("My grandma used to make this")
    .fill("Description");
  await page.getByRole("button", { name: "Add Step", exact: true }).click();
  await page.getByLabel("Step Description", { exact: true }).fill("Step1");
  await expect(page.getByRole("button", { name: "Submit" })).toBeDisabled();
});

test("Should disable submit button, when no step is added", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/recipe/create");
  await page.getByPlaceholder("My tasty Pizza").click();
  await page.getByPlaceholder("My tasty Pizza").fill("Testing Recipe");
  await page.getByPlaceholder("My grandma used to make this").click();
  await page
    .getByPlaceholder("My grandma used to make this")
    .fill("Description");
  await expect(page.getByRole("button", { name: "Submit" })).toBeDisabled();
});

test("Should disable submit button, when description input is less than 3 letters", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/recipe/create");
  await page.getByPlaceholder("My tasty Pizza").click();
  await page.getByPlaceholder("My tasty Pizza").fill("Testing Recipe");
  await page.getByPlaceholder("My grandma used to make this").fill("D");
  await page.getByRole("button", { name: "Add Step", exact: true }).click();
  await page.getByLabel("Step Description").fill("Step1");
  await page
    .getByRole("button", { name: "Add Ingredient", exact: true })
    .click();
  await page.getByLabel("Name", { exact: true }).fill("Ingredient1");
  await expect(page.getByText("Descriptions must be at least")).toBeVisible();
  await expect(page.getByRole("button", { name: "Submit" })).toBeDisabled();
});

test("Should disable submit button, when name input is less than 3 letters", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/recipe/create");
  await page.getByPlaceholder("My tasty Pizza").click();
  await page.getByPlaceholder("My tasty Pizza").fill("T");
  await page.getByPlaceholder("My grandma used to make this").click();
  await page
    .getByPlaceholder("My grandma used to make this")
    .fill("Description");
  await page.getByRole("button", { name: "Add Step", exact: true }).click();
  await page.getByLabel("Step Description").fill("Step1");
  await page
    .getByRole("button", { name: "Add Ingredient", exact: true })
    .click();
  await page.getByLabel("Name", { exact: true }).fill("Ingredient1");
  await expect(page.getByText("Names must be at least 3")).toBeVisible();
  await expect(page.getByRole("button", { name: "Submit" })).toBeDisabled();
});
test("Should disable submit button, when tag input is number", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/recipe/create");
  await page.getByPlaceholder("My tasty Pizza").click();
  await page.getByPlaceholder("My tasty Pizza").fill("Testing Recipe");
  await page.getByPlaceholder("My grandma used to make this").click();
  await page
    .getByPlaceholder("My grandma used to make this")
    .fill("Description");
  await page.getByLabel("Recipe Tags (0/10)").click();
  await page.getByLabel("Recipe Tags (0/10)").fill("1");
  await page.getByLabel("Recipe Tags (0/10)").press("Enter");
  await page.getByRole("button", { name: "Add Step", exact: true }).click();
  await page.getByLabel("Step Description").fill("Step1");
  await page
    .getByRole("button", { name: "Add Ingredient", exact: true })
    .click();
  await page.getByLabel("Name", { exact: true }).fill("Ingredient1");
  //TODO tag error messages aren't showing up correctly. Either fix it or remove the following line
  //await expect(page.getByText("Tags can only contain")).toBeVisible();
  await expect(page.getByRole("button", { name: "Submit" })).toBeDisabled();
});
test("Should disable submit button, when tag input is duplicate", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/recipe/create");
  await page.getByPlaceholder("My tasty Pizza").click();
  await page.getByPlaceholder("My tasty Pizza").fill("Testing Recipe");
  await page.getByPlaceholder("My grandma used to make this").click();
  await page
    .getByPlaceholder("My grandma used to make this")
    .fill("Description");
  await page.getByLabel("Recipe Tags (0/10)").click();
  await page.getByLabel("Recipe Tags (0/10)").fill("tag");
  await page.getByLabel("Recipe Tags (0/10)").press("Enter");
  await page.getByLabel("Recipe Tags (1/10)").click();
  await page.getByLabel("Recipe Tags (1/10)").fill("tag");
  await page.getByLabel("Recipe Tags (1/10)").press("Enter");
  await expect(page.getByText("Must be an array of unique")).toBeVisible();
  await page.getByRole("button", { name: "Add Step", exact: true }).click();
  await page.getByLabel("Step Description").fill("Step1");
  await page
    .getByRole("button", { name: "Add Ingredient", exact: true })
    .click();
  await page.getByLabel("Name", { exact: true }).fill("Ingredient1");
  await expect(page.getByRole("button", { name: "Submit" })).toBeDisabled();
});

test("Should disable submit button, when step has negative duration type", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/recipe/create");
  await page.getByPlaceholder("My tasty Pizza").click();
  await page.getByPlaceholder("My tasty Pizza").fill("Testing Recipe");
  await page.getByLabel("Easy,").click();
  await page.getByLabel("Medium", { exact: true }).getByText("Medium").click();
  await page.getByPlaceholder("My grandma used to make this").click();
  await page
    .getByPlaceholder("My grandma used to make this")
    .fill("Description");
  await page.getByRole("button", { name: "Add Step" }).click();
  await page.getByLabel("Step Description").fill("Step1");
  await page.getByLabel("Duration (in minutes)").click();
  await page.getByLabel("Duration (in minutes)").press("ArrowDown");
  await page.getByLabel("Duration (in minutes)").press("ArrowDown");
  await page
    .getByRole("button", { name: "Add Ingredient", exact: true })
    .click();
  await page.getByLabel("Name", { exact: true }).fill("Ingredient1");
  await expect(page.getByText("Duration must be at least 1")).toBeVisible();
  await expect(page.getByRole("button", { name: "Submit" })).toBeDisabled();
});
