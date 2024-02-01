import type { Prisma, RecipeStepIngredient } from "@prisma/client";

export enum ShoppingListModes {
  CREATE,
  EDIT,
  DELETE,
}

export type ShoppingListType = Prisma.ShoppingListGetPayload<{
  select: {
    id: true;
    name: true;
    description: true;
    authorId: true;
    items: {
      select: {
        id: true;
        name: true;
        quantity: true;
        unit: true;
      };
    };
  };
}>;

export type RecipeFormValues = Prisma.RecipeGetPayload<{
  select: {
    id: true;
    name: true;
    description: true;
    difficulty: true;
    tags: true;
    images: true;
    authorId: true;
    steps: {
      include: {
        ingredients: true;
      };
    };
  };
}>;

export type Ingredient = Omit<RecipeStepIngredient, "recipeStepId">;
