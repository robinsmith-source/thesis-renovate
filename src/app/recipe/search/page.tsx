import { api } from "~/trpc/server";
import RecipeCard from "~/app/_components/RecipeCard";

import { type Recipe, PrismaClient } from "@prisma/client";
import AdvancedRecipeSearch from "~/app/_components/AdvancedRecipeSearch";

interface SearchParams {
  name?: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
  tags?: string[];
  labels?: string[];
  author?: string;
}

export default async function Page({
  searchParams = {},
}: {
  searchParams?: SearchParams;
}) {
  const prisma = new PrismaClient();
  const { name, difficulty, tags, labels, author } = searchParams;

  //query gets adjusted with the information provided from the client component --> as search query
  const displayedRecipes = await api.recipe.getRecipesAdvanced.query({
    take: 20,
    name: name,
    labels: labels,
  });

  //get all labels and their categories from the database for the searchbar autocompletion
  const allLabels: { name: string; category: string }[] =
    await prisma.recipeLabel.findMany({
      select: { name: true, category: { select: { name: true } } },
    });

  return (
    <main className="flex flex-col items-center">
      <AdvancedRecipeSearch allLabels={allLabels} />
      {displayedRecipes && displayedRecipes.length > 0 ? (
        <div className="mt-6 grid h-full w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {displayedRecipes.map((recipe: Recipe) => (
            <RecipeCard recipeId={recipe.id} key={recipe.id} />
          ))}
        </div>
      ) : (
        <div className="mt-20 flex items-center justify-center">
          <h2 className="text-center text-3xl font-bold text-warning-400">
            Oh no! You&apos;ll starve!
          </h2>
        </div>
      )}
    </main>
  );
}
