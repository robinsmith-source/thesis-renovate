"use client";
import React from "react";
import { Tab, Tabs } from "@nextui-org/react";
import { usePathname } from "next/navigation";
export default function RecipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <main>
      <h1>Recipe Layout</h1>
      <Tabs aria-label="Options" selectedKey={pathname}>
        <Tab key="public" title="Public" href="public"></Tab>
        <Tab key="private" title="Private" href="private"></Tab>
      </Tabs>
      {children}
    </main>
  );
}
