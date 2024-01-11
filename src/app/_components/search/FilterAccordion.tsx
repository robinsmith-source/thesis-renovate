"use client";

import { Accordion, AccordionItem, Card } from "@nextui-org/react";
import DifficultyInput from "./DifficultyInput";
import LabelSelect from "./LabelSelect";

type Label = {
  name: string;
  category: {
    name: string;
  };
};

export default function FilterAccordion(
  {
    labels,
  }: {
    labels?: Label[];
  },
  className?: string,
) {
  if (!className) className = "w-full mb-2";

  return (
    <Accordion className={className} variant="light" hideIndicator>
      <AccordionItem key="filters" aria-label="filters" title="Search Filters">
        <div className="flex w-full flex-col flex-wrap items-start justify-start">
          <div>
            <span className="font-bold text-default-600">Labels</span>
            <LabelSelect labels={labels} />
          </div>
          <div>
            <span className="font-bold text-default-600">Difficulty</span>
            <Card>
              <DifficultyInput />
            </Card>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
