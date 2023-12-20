"use client";

import React, { useState } from "react";
import { Accordion, AccordionItem, Button, Input } from "@nextui-org/react";
import { FaFilter, FaMagnifyingGlass } from "react-icons/fa6";
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

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<queryInput>();

  function handleSearch(searchFilters: queryInput) {
    const params = new URLSearchParams(searchParams);

    if (searchFilters) {
      const { name, difficulty, authorId } = searchFilters;

      name ? params.set("name", name) : params.delete("name");
      difficulty
        ? params.set("difficulty", difficulty)
        : params.delete("difficulty");
      authorId ? params.set("authorId", authorId) : params.delete("authorId");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  return (
    <>
      <Input
        type="text"
        defaultValue={searchParams.get("name")?.toString()}
        placeholder="Search recipes..."
        onChange={(event) => {
          setSearchQuery((prevQuery) => ({
            ...prevQuery,
            name: event.target.value,
          }));
        }}
        onKeyDown={handleInputKeyDown}
        endContent={
          <Button
            color="success"
            onClick={() => handleSearch(searchQuery)}
            endContent={
              <FaMagnifyingGlass className="hidden md:flex" size={20} />
            }
          >
            Search
          </Button>
        }
      />
      <Accordion className="mt-0" isCompact>
        <AccordionItem
          startContent={<FaFilter />}
          title="Advanced"
          key="filters"
          aria-label="filters"
        ></AccordionItem>
      </Accordion>
    </>
  );
}
