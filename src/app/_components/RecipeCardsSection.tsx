import RecipeCard from "~/app/_components/RecipeCard";
import { RecipeDifficulty } from "@prisma/client";

interface RecipeCardSectionProps {
  recipes: {
    id: string;
    name: string;
    difficulty: RecipeDifficulty;
    labels: {
      name: string;
    }[];
    images: string[];
  }[];
}

export default function RecipeCardsSection({
  recipes,
}: RecipeCardSectionProps) {
  return (
    <section>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {recipes ? (
          recipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))
        ) : (
          <h2>No recipes found...</h2>
        )}
      </div>
    </section>
  );
}
