import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(({ input, ctx }) => {
      return ctx.db.user.findFirst({
        where: { id: input.id },
        include: {
          recipes: true,
        },
      });
    }),

  getMetadata: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ input, ctx }) => {
      if (ctx?.session?.user?.id && input.id !== ctx.session.user.id) {
        const [following, metadata] = await ctx.db.$transaction([
          ctx.db.user.findFirst({
            where: {
              id: ctx.session.user.id,
              following: {
                some: {
                  id: input.id,
                },
              },
            },
          }),
          ctx.db.user.findFirst({
            where: { id: input.id },
            select: {
              _count: {
                select: {
                  recipes: true,
                  following: true,
                  followedBy: true,
                },
              },
            },
          }),
        ]);
        if (!metadata) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }

        return {
          following: following !== null,
          recipeCount: metadata._count.recipes,
          followingCount: metadata._count.following,
          followedByCount: metadata._count.followedBy,
        };
      } else {
        const metadata = await ctx.db.user.findFirst({
          where: { id: input.id },
          select: {
            _count: {
              select: {
                recipes: true,
                following: true,
                followedBy: true,
              },
            },
          },
        });
        if (!metadata) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }
        return {
          following: null,
          recipeCount: metadata._count.recipes,
          followingCount: metadata._count.following,
          followedByCount: metadata._count.followedBy,
        };
      }
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.recipe.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  getFollowers: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(({ input, ctx }) => {
      return ctx.db.user.findMany({
        where: { following: { some: { id: input.id } } },
      });
    }),

  getFollowing: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(({ input, ctx }) => {
      return ctx.db.user.findMany({
        where: { followedBy: { some: { id: input.id } } },
      });
    }),

  follow: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(({ input, ctx }) => {
      if (input.id === ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You cannot follow yourself",
        });
      }

      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          following: {
            connect: {
              id: input.id,
            },
          },
        },
      });
    }),

  unfollow: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(({ input, ctx }) => {
      if (input.id === ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You cannot unfollow yourself",
        });
      }

      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          following: {
            disconnect: {
              id: input.id,
            },
          },
        },
      });
    }),
});
