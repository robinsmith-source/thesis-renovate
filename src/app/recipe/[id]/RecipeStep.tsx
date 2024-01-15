import type { Prisma } from "@prisma/client";
import { RecipeStepType } from "@prisma/client";
import { convertUnit } from "../../utils";
import { Chip } from "@nextui-org/react";
import React from "react";

type RecipeStep = Prisma.RecipeStepGetPayload<{
  include: { ingredients: true };
}>;

export default function RecipeStep({ step }: { step: RecipeStep }) {
  const stepTypeColor = (step: RecipeStepType) => {
    switch (step) {
      case RecipeStepType.PREP:
        return "bg-green-500";
      case RecipeStepType.MIX:
        return "bg-teal-600";
      case RecipeStepType.COOK:
        return "bg-amber-500";
      case RecipeStepType.REST:
        return "bg-orange-500";
      case RecipeStepType.SEASON:
        return "bg-purple-500";
      case RecipeStepType.SERVE:
        return "bg-fuchsia-800";
      default:
        return "default";
    }
  };

  return (
    <tr>
      <td className="py-2 pr-4 text-right align-top lg:w-48">
        <ul>
          {step.ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.quantity} {convertUnit(ingredient.unit)}{" "}
              {ingredient.name}
            </li>
          ))}
        </ul>
      </td>
      <td className="py-2 align-top">
        <Chip
          size="md"
          classNames={{
            base: stepTypeColor(step.stepType),
            content: "drop-shadow shadow-black text-white",
          }}
        >
          {step.stepType.toLowerCase()}
        </Chip>
        <p className="text-black-foreground text-sm font-bold">
          {step.duration} {step.duration === 1 ? "minute" : "minutes"}{" "}
        </p>
        <p className="font-medium">{step.description}</p>
      </td>
    </tr>
  );
}
