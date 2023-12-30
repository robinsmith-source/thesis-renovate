import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { equivalentUnits } from "~/utils/IngredientCalculator";

export const shoppingListRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.shoppingList.create({
        data: {
          name: input.name,
          description: input.description,
          author: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  get: publicProcedure
    .input(z.object({ shoppingListId: z.string().cuid() }))
    .query(({ input, ctx }) => {
      return ctx.db.shoppingList.findFirst({
        where: { id: input.shoppingListId },
        include: {
          items: true,
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.shoppingList.findMany({
      orderBy: { createdAt: "desc" },
      where: { authorId: ctx.session.user.id },
    });
  }),

  addItems: protectedProcedure
    .input(
      z.object({
        shoppingListId: z.string().cuid(),
        ingredients: z.array(
          z.object({
            name: z.string().min(1),
            quantity: z.number().min(1),
            unit: z.enum([
              "GRAM",
              "KILOGRAM",
              "LITER",
              "MILLILITER",
              "TEASPOON",
              "TABLESPOON",
              "CUP",
              "PINCH",
              "PIECE",
            ]),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await Promise.all(
        input.ingredients.map(async (ingredient) => {
          const shoppingListItem = await ctx.db.shoppingListItem.upsert({
            where: {
              shoppingListId: input.shoppingListId,
              name_unit: {
                name: ingredient.name,
                unit: ingredient.unit,
              },
            },
            create: {
              shoppingList: { connect: { id: input.shoppingListId } },
              ...ingredient,
            },
            update: {
              quantity: {
                increment: ingredient.quantity,
              },
            },
          });

          const equivalentUnit = equivalentUnits.find(
            ([smallUnit]) => smallUnit === shoppingListItem.unit,
          );

          if (equivalentUnit && shoppingListItem.quantity > 1000) {
            await ctx.db.shoppingListItem.update({
              where: {
                id: shoppingListItem.id,
              },
              data: {
                quantity: shoppingListItem.quantity / 1000,
                unit: equivalentUnit[1],
              },
            });
          }
        }),
      );
    }),
});
