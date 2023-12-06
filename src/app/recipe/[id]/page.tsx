import { api } from "~/trpc/server";
import React from "react";
import { Chip, Divider, Image } from "@nextui-org/react";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import RecipeStep from "./RecipeStep";
import IngredientTable from "./IngredientTable";
import RecipeAuthorSection from "~/app/recipe/[id]/RecipeAuthorSection";

export default async function Page({ params }: { params: { id: string } }) {
  const recipe = await api.recipe.get.query({ id: params.id });
  if (!recipe) {
    notFound();
  }

  return (
    <main>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <h1 className="text-2xl font-bold">
            {recipe.name} (
            <span className="capitalize">
              {recipe.difficulty.toLowerCase()}
            </span>
            )
          </h1>

          <div className="flex gap-2">
            {recipe.tags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </div>
          <p>{recipe.description}</p>
        </div>

        <Image
          as={NextImage}
          width={500}
          height={300}
          className="row-span-2 h-96 w-full place-self-center object-cover"
          removeWrapper
          alt="recipe header"
          src="https://placekitten.com/500/300"
        />
        <IngredientTable recipeSteps={recipe.steps} />
      </div>

      <Divider className="my-4" />

      <div>
        <table>
          <thead>
            <tr>
              <th className="pr-4 text-right">Ingredients</th>
            </tr>
          </thead>
          <tbody>
            {recipe.steps.map((step) => (
              <RecipeStep step={step} key={step.id} />
            ))}
          </tbody>
        </table>
      </div>

      <Divider className="my-4" />
      <RecipeAuthorSection {...recipe.author} />
    </main>
  );
}
