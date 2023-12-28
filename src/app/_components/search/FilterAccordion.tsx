"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
  Chip,
  Card,
} from "@nextui-org/react";
import { FaTag } from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DifficultyInput from "./DifficultyInput";

type Label = {
  name: string;
  category: {
    name: string;
  };
};

type LabelCategory = {
  name: string;
};

export default function FilterAccordion({
  labels,
  categories,
}: {
  labels?: Label[];
  categories?: LabelCategory[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [labelInput, setLabelInput] = useState<string[]>([]);

  function handleLabelFilter(selectedLabels: string[]) {
    const params = new URLSearchParams(searchParams);
    selectedLabels && params.set("labels", selectedLabels.join());
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Accordion className="w-full" variant="light" hideIndicator>
      <AccordionItem key="filters" aria-label="filters" title="Search Filters">
        <div className="flex w-full flex-col flex-wrap items-start justify-start">
          <div className="flex w-full flex-col flex-wrap items-center justify-start sm:flex-row">
            <Autocomplete
              className="mb-4 mr-2 sm:mb-0 sm:w-1/3 md:w-1/4"
              label={<span className="font-bold text-default-600">Labels</span>}
              labelPlacement="outside-left"
              startContent={<FaTag />}
              onInputChange={(value: string) => {
                if (
                  !labelInput.includes(value) &&
                  value !== "" &&
                  labels?.some((label) => label.name === value)
                ) {
                  const newLabelInput = [...labelInput, value];
                  setLabelInput(newLabelInput);
                  handleLabelFilter(newLabelInput);
                  console.log("newLabelInput", newLabelInput);
                }
              }}
            >
              {categories?.map((category) => (
                <AutocompleteSection
                  showDivider
                  className="font-bold"
                  key={category.name}
                  title={category.name}
                >
                  {labels
                    ?.filter((label) => label.category.name === category.name)
                    .map((label) => (
                      <AutocompleteItem key={label.name}>
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
                  <AutocompleteItem
                    key="noElements"
                    className="text-danger-500"
                  >
                    No labels found!
                  </AutocompleteItem>
                </AutocompleteSection>
              )}
            </Autocomplete>
            <div className="flex flex-row flex-wrap items-center justify-start">
              {
                // for each label in labelInput, create a chip that can be removed
                labelInput.map((label) => (
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
                      console.log("newLabelInput", newLabelInput);
                    }}
                  >
                    {label}
                  </Chip>
                ))
              }
            </div>
          </div>
          <div className="flex flex-row items-center justify-start">
            <span className="text-default">Difficulty</span>
            <Card>
              <DifficultyInput />
            </Card>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
