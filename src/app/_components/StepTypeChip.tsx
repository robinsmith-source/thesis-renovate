import { Chip } from "@nextui-org/react";
import { RecipeStepType } from "@prisma/client";

export default function StepTypeChip({
  stepType,
}: {
  stepType: RecipeStepType;
}) {
  let stepIcon = "";
  switch (stepType) {
    case RecipeStepType.REST:
      stepIcon = "Rest";
      break;
    case RecipeStepType.COOK:
      stepIcon = "Cook";
      break;
    case RecipeStepType.PREP:
      stepIcon = "Prep";
      break;
    case RecipeStepType.SERVE:
      stepIcon = "Serve";
      break;
    case RecipeStepType.MIX:
      stepIcon = "Mix";
      break;
    case RecipeStepType.SEASON:
      stepIcon = "Season";
      break;
  }
  return <Chip className="capitalize">{stepIcon}</Chip>;
}
