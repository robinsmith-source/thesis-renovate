import { Link, User } from "@nextui-org/react";
import React from "react";
import type { User as UserType } from "@prisma/client";

export default async function RecipeAuthorSection(recipeAuthor: UserType) {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h2 className="text-2xl font-semibold">Recipe created by</h2>
      <User
        className="flex gap-4"
        name={
          <Link
            color="secondary"
            href={`/user/${recipeAuthor.id}`}
            showAnchorIcon
            size="md"
          >
            {recipeAuthor.name}
          </Link>
        }
        avatarProps={{
          isBordered: true,
          as: "button",
          color: "secondary",
          size: "md",
          src: recipeAuthor.image ?? undefined,
        }}
      />
      <h3 className="text-xl font-medium">
        Other recipes from {recipeAuthor.name}
      </h3>
      TODO: Add other recipes from author here
    </div>
  );
}
