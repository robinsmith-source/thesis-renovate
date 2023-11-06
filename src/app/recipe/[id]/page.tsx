import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { id: string } }) {
  const recipe = await api.recipe.get.query({ id: params.id });
  if (!recipe) {
    return <div>404</div>;
  }

  return (
    <main className="container mx-auto">
      <h1 className="text-lg font-bold">{recipe.name}</h1>
      <p>{recipe.description}</p>
      <ul>
        {recipe.steps.map((step, i) => (
          <li key={step.id}>
            <h2 className="font-semibold">
              {i + 1} {step.description}
            </h2>
            <p>{step.duration}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
