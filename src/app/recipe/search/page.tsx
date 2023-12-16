import { api } from "~/trpc/server";
import RecipeCard from "~/app/_components/RecipeCard";
import RecipeSearchbar from "~/app/_components/RecipeSearchbar";
import { type Recipe } from "@prisma/client";

export default async function Page({ searchParams }: { searchParams?: any }) {
  const { name, difficulty, tags, labels, author } = searchParams;

  //query gets adjusted with the information provided from the client component --> as search query

  const displayedRecipes = await api.recipe.getRecipesAdvanced.query({
    take: 20,
    name,
  });

  const handleSearch = async (searchQuery: string) => {
    console.log("searching for:  " + searchQuery);
  };

  return (
    <main className="flex flex-col items-center">
      {/* Here should be the search component as a client component */}
      <RecipeSearchbar />
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {displayedRecipes ? (
          displayedRecipes.map((recipe: Recipe) => (
            <RecipeCard recipeId={recipe.id} key={recipe.id} />
          ))
        ) : (
          <h2>No recipes found...</h2>
        )}
      </div>
    </main>
  );
}
