"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function SimpleRecipeSearch() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>();

  function handleSearch(searchFilter: string) {
    const params = new URLSearchParams(searchParams);

    searchFilter ? params.set("name", searchFilter) : params.delete("name");

    if (pathname !== "/recipe/search") {
      router.push(`recipe/search?${params.toString()}`);
    }
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSearch(searchQuery ?? "");
    }
  }

  return (
    <>
      <Input
        type="text"
        className="w-full"
        defaultValue={searchParams.get("name") ?? ""}
        placeholder="Search recipes..."
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleInputKeyDown}
        endContent={
          <Button
            color="success"
            onClick={() => handleSearch(searchQuery ?? "")}
            endContent={
              <FaMagnifyingGlass size={40} />
            }
          >
            <span className="hidden md:block">Search</span>
          </Button>
        }
      />
    </>
  );
}
