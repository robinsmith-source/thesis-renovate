"use client";

import { useState, type KeyboardEvent } from "react";
import { Button, Input } from "@nextui-org/react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type queryInput =
  | Partial<{
      name?: string;
      difficulty?: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
      labels?: string[];
      tags?: string[];
      authorId?: string;
    }>
  | undefined;

export default function RecipeSearchbar() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<queryInput>();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(searchFilters: queryInput) {
    const params = new URLSearchParams(searchParams);

    if (searchFilters) {
      const { name, difficulty, labels, tags, authorId } = searchFilters;

      name && params.set("name", name ?? "");
      difficulty && params.set("difficulty", difficulty ?? "");
      labels && params.set("labels", labels?.join(",") ?? "");
      tags && params.set("tags", tags?.join(",") ?? "");
      authorId && params.set("authorId", authorId ?? "");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSearch({});
    }
  }

  return (
    <Input
      fullWidth
      type="text"
      value={searchQuery?.name ?? ""}
      onChange={(event) =>
        setSearchQuery({ ...searchQuery, name: event.target.value })
      }
      onKeyDown={handleKeyDown}
      placeholder="Search recipes..."
      endContent={
        <Button
          onClick={() => handleSearch(searchQuery)}
          endContent={<FaMagnifyingGlass size={30} />}
        >
          Search
        </Button>
      }
    />
  );
}
