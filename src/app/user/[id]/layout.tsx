import { Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";
import { cache } from "react";
import UserCard from "~/app/_components/UserCard";
import { api } from "~/trpc/server";

const getUser = cache(async (id: string) => {
  return await api.user.get.query({ id });
});

const getUserMeta = cache(async (id: string) => {
  return await api.user.getMetadata.query({ id });
});

export async function generateMetadata({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
  const meta = await getUserMeta(params.id);

  return {
    title: user.name,
    openGraph: {
      images: [
        {
          url: new URL(`${user.image}`, import.meta.url),
          width: 600,
          height: 600,
          alt: `Profile picture of ${user.name}`,
        },
      ],
      type: "profile",
    },
    description: `They've created ${meta.recipeCount} ${
      meta.recipeCount === 1 ? "recipe" : "recipes"
    }, are followed by ${meta.followedByCount} people, and follow ${
      meta.followingCount
    } people.`,
  };
}

export default async function UserLayout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const user = await getUser(params.id);
  if (!user) {
    notFound();
  }

  return (
    <div>
      <UserCard user={user} />
      <Divider className="my-4" />
      {children}
    </div>
  );
}
