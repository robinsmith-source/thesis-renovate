import { api } from "~/trpc/server";
import RecipeCard from "~/app/_components/RecipeCard";
import Search from "~/app/recipe/search/Search";

export default async function Page({ searchParams }: { searchParams?: any }) {
  const { name } = searchParams;

  const displayedRecipes = await api.recipe.getRecipesAdvanced.query({
    take: 20,
    name: name,
  });

  return (
    <main className="flex flex-col items-center">
      <Search />

      {displayedRecipes && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {displayedRecipes.map((recipe) => (
            <RecipeCard recipeId={recipe.id} key={recipe.id} />
          ))}
        </div>
      )}
    </main>
  );
}
