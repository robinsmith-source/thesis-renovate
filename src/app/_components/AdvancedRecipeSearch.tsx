"use client";

import { useState, type ChangeEvent } from "react";
import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
  Tab,
  Tabs,
  Input,
  Chip,
} from "@nextui-org/react";
import { FaMagnifyingGlass, FaFilter, FaTag } from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

type queryInput =
  | Partial<{
      name?: string;
      difficulty?: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
      labels?: string[];
      tags?: string[];
      authorId?: string;
    }>
  | undefined;

export default function AdvancedRecipeSearch({
  allLabels = [],
}: {
  allLabels?: { name: string; category: string }[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  // search parameters
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<queryInput>();
  const [selectedSearchMode, setSelectedSearchMode] = useState("public");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  //const allLabelNames: string[] = allLabels.map((label) => label.name);
  //const allLabelCategories: string[] = allLabels.map((label) => label.category);

  const handleSearch = useDebouncedCallback(
    (searchFilters: queryInput) => {
      const params = new URLSearchParams(searchParams);

      if (searchFilters) {
        const { name, difficulty, labels, tags, authorId } = searchFilters;

        name && params.set("name", name ?? "");
        difficulty && params.set("difficulty", difficulty ?? "");
        labels && params.set("labels", labels?.join() ?? "");
        tags && params.set("tags", tags?.join() ?? "");
        authorId && params.set("authorId", authorId ?? "");
      }

      router.replace(`${pathname}?${params.toString()}`);
    },
    333, // debounce time in ms
  );

  return (
    <>
      <div className="flex w-full flex-row-reverse justify-end">
        <Input
          fullWidth
          type="text"
          defaultValue={searchParams.get("name")?.toString()}
          placeholder="Search recipes..."
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const name = event.target.value;
            setSearchQuery((prevQuery) => ({ ...prevQuery, name }));
            handleSearch({ ...searchQuery, name });
          }}
          endContent={<FaMagnifyingGlass />}
        />
        <Tabs
          className="mr-4"
          size="lg"
          aria-label="searchmode"
          selectedKey={selectedSearchMode}
          onSelectionChange={(selectedTab) => {
            if (selectedTab) {
              setSelectedSearchMode(selectedTab.toString());
            }
          }}
        >
          <Tab key="public" title="public" />
          <Tab key="private" title="private" />
        </Tabs>
      </div>
      <Accordion className="mt-0" isCompact>
        <AccordionItem
          startContent={<FaFilter />}
          title="Advanced"
          key="filters"
          aria-label="filters"
        >
          <div className="flex flex-col flex-wrap items-start justify-start sm:flex-row sm:items-center">
            <Autocomplete
              className="mb-4 sm:mb-0 sm:w-1/3 md:w-1/4 lg:w-1/5"
              label="Labels"
              labelPlacement="outside-left"
              startContent={<FaTag />}
              placeholder="add any number"
              multiple
              onInputChange={(selectedLabelName: string) => {
                if (
                  selectedLabelName &&
                  allLabels.some((label) => label.name === selectedLabelName) &&
                  !selectedLabels.includes(selectedLabelName)
                ) {
                  setSearchQuery((prevQuery) => ({
                    ...prevQuery,
                    labels: [...(prevQuery?.labels ?? []), selectedLabelName],
                  }));

                  setSelectedLabels((prevLabels) => [
                    ...prevLabels,
                    selectedLabelName,
                  ]);
                  handleSearch({
                    ...searchQuery,
                    labels: [...(searchQuery?.labels ?? []), selectedLabelName],
                  });
                }
              }}
            >
              {}
            </Autocomplete>
          </div>
          {/* Display the selected labels as a chip list */}
          <div className="flex flex-row flex-wrap items-center justify-start">
            {selectedLabels.map((label) => (
              <Chip
                key={label}
                color="secondary"
                variant="flat"
                className="m-1"
                onClose={() => {
                  setSelectedLabels((prevLabels) =>
                    prevLabels.filter((prevLabel) => prevLabel !== label),
                  );
                }}
              >
                {label}
              </Chip>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </>
  );
}
