import { test, expect } from "../playwright/fixtures";

test("Should successfully create a review when all fields are filled correctly", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("button", { name: "Pasta Primavera" }).click();
  await page.getByPlaceholder("I really liked this recipe!").click();
  await page
    .getByPlaceholder("I really liked this recipe!")
    .fill("Test review");
  await page
    .locator("section")
    .filter({ hasText: "CommentSubmit" })
    .getByRole("img")
    .nth(4)
    .click();
  await page.getByRole("button", { name: "Submit" }).click();

  //TODO: Add assertions
});

test("Should fail to create a review when no rating is selected", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");

  await page
    .getByRole("button", { name: "Spaghetti Carbonara Italian" })
    .click();
  await page.getByPlaceholder("I really liked this recipe!").click();
  await page
    .getByPlaceholder("I really liked this recipe!")
    .fill("Test review");

  await expect(page.getByRole("button", { name: "Submit" })).toBeDisabled();
});
