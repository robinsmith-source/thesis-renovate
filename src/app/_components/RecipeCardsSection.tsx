import RecipeCard from "~/app/_components/RecipeCard";
import { RecipeDifficulty } from "@prisma/client";

interface RecipeCardSectionProps {
  className?: string;
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

export default function RecipeCardsSection(props: RecipeCardSectionProps) {
  const { className, recipes } = props;
  return (
    <section
      className={`${className} grid grid-cols-1 items-center justify-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
    >
      {recipes &&
        recipes.map((recipe) => <RecipeCard recipe={recipe} key={recipe.id} />)}
    </section>
  );
}
