"use client";

import { Accordion, AccordionItem, Card } from "@nextui-org/react";
import DifficultyInput from "./DifficultyInput";
import LabelAutocomplete from "./LabelAutocomplete";

type Label = {
  name: string;
  category: {
    name: string;
  };
};

export default function FilterAccordion({
  labels,
}: {
  labels?: Label[];
}, className?: string) {

  if (!className) className = "w-full mb-2";

  return (
    <Accordion className={className} variant="light" hideIndicator>
      <AccordionItem key="filters" aria-label="filters" title="Search Filters">
        <div className="flex w-full flex-col flex-wrap items-start justify-start">
          <div className="flex w-full flex-row items-center justify-start">
            <span className="font-bold text-default-600">Labels</span>
            <LabelAutocomplete labels={labels} />
          </div>
          <div className="flex flex-row items-center justify-start">
            <span className="font-bold text-default-600">Difficulty</span>
            <Card className="mt-3 ml-3">
              <DifficultyInput />
            </Card>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
