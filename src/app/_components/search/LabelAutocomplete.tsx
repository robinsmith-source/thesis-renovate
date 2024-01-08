"use client";

import { FaTag } from "react-icons/fa6";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
  Chip,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Label = {
  name: string;
  category: {
    name: string;
  };
};

export default function DifficultyInput({ labels }: { labels?: Label[] }, className?: string) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [labelInput, setLabelInput] = useState<string[]>([]);
  if (!className) className = "mb-4 mr-2 sm:mb-0 sm:w-1/3 md:w-1/4";

  // Extract unique categories from labels
  const uniqueCategories = Array.from(
    new Set(labels?.map((label) => label.category.name)),
  );

  function handleLabelFilter(selectedLabels: string[]) {
    const params = new URLSearchParams(searchParams);
    selectedLabels && params.set("labels", selectedLabels.join());
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="ml-3 flex w-full flex-col flex-wrap items-center justify-start sm:flex-row">
      <Autocomplete
        size="sm"
        className={className}
        startContent={<FaTag />}
        placeholder="Enter or select labels"
        onInputChange={(value: string) => {
          if (
            !labelInput.includes(value) &&
            value !== "" &&
            labels?.some((label) => label.name === value)
          ) {
            const newLabelInput = [...labelInput, value];
            setLabelInput(newLabelInput);
            handleLabelFilter(newLabelInput);
          }
        }}
      >
        {uniqueCategories?.map((categoryName) => (
          <AutocompleteSection
            showDivider
            className="font-bold"
            key={categoryName}
            title={categoryName}
          >
            {labels
              ?.filter((label) => label.category.name === categoryName)
              .map((label) => (
                <AutocompleteItem
                  key={label.name}
                  className="text-foreground-400"
                >
                  {label.name}
                </AutocompleteItem>
              )) ?? (
              <AutocompleteItem key="noElements">
                <span className="text-danger-500">No labels found!</span>
              </AutocompleteItem>
            )}
          </AutocompleteSection>
        )) ?? (
          <AutocompleteSection
            key="noSections"
            className="text-danger-500"
            title="No categories found!"
          >
            <AutocompleteItem key="noElements" className="text-danger-500">
              No labels found!
            </AutocompleteItem>
          </AutocompleteSection>
        )}
      </Autocomplete>
      <div className="flex flex-row flex-wrap items-center justify-start">
        {labelInput.map((label) => (
          <Chip
            variant="solid"
            key={label}
            className="m-1"
            onClose={() => {
              const newLabelInput = labelInput.filter(
                (input) => input !== label,
              );
              setLabelInput(newLabelInput);
              handleLabelFilter(newLabelInput);
            }}
          >
            {label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
