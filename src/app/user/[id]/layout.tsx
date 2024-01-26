import { Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";
import UserCard from "~/app/_components/UserCard";
import { api } from "~/trpc/server";
import { cache } from "react";

const getUser = cache(async (id: string) => {
  return await api.user.get.query({ id });
});

export async function generateMetadata({ params }: { params: { id: string } }) {
  const recipe = await getUser(params.id);

  return {
    title: recipe.name,
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
