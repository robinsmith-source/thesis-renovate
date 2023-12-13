import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import type { RecipeStepType } from "@prisma/client";
import { motion } from "framer-motion";

import IngredientCreator from "./IngredientCreator";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

export default function StepCreator() {
  const { control } = useFormContext();
  const { fields, swap, append, remove } = useFieldArray({
    control,
    name: "steps",
  });
  return (
    <>
      <div className="ml-8 space-y-4">
        <div className="flex gap-2">
          <div className="text-lg">Steps</div>
          <Button
            type="button"
            size="sm"
            onClick={() => append({ description: "" })}
          >
            Add Step
          </Button>
        </div>
        {fields.map((step, index) => (
          <motion.div
            key={step.id}
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Card>
              <CardHeader className="flex flex-col items-start">
                <Button
                  isIconOnly
                  startContent={<FaChevronUp />}
                  size="sm"
                  onClick={() => index > 0 && swap(index, index - 1)}
                />
                <Button
                  isIconOnly
                  startContent={<FaChevronDown />}
                  size="sm"
                  onClick={() =>
                    index < fields.length - 1 && swap(index, index + 1)
                  }
                />
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-[4fr_2fr] gap-x-2">
                  <Controller
                    control={control}
                    name={`steps.${index}.description`}
                    render={({ field, fieldState }) => (
                      <Textarea
                        className="row-span-2"
                        {...field}
                        label="Step Description"
                        variant="bordered"
                        isRequired
                        isInvalid={!!fieldState.error}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`steps.${index}.duration`}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        onChange={(event) => {
                          field.onChange(+event.target.value);
                        }}
                        type="number"
                        label="Duration"
                        variant="bordered"
                        isRequired
                        size="sm"
                        isInvalid={!!fieldState.error}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name={`steps.${index}.stepType`}
                    render={({ field, fieldState }) => (
                      <Select
                        {...field}
                        isRequired
                        label="Step Type"
                        variant="bordered"
                        selectedKeys={[field.value]}
                        defaultSelectedKeys={["PREP"]}
                        size="sm"
                        isInvalid={!!fieldState.error}
                        errorMessage={fieldState.error?.message}
                      >
                        {["PREP", "COOK", "REST", "SEASON", "SERVE", "MIX"].map(
                          (stepType) => (
                            <SelectItem
                              key={stepType}
                              value={stepType as RecipeStepType}
                              className="capitalize"
                            >
                              {stepType}
                            </SelectItem>
                          ),
                        )}
                      </Select>
                    )}
                  />
                </div>
                <div className="flex justify-end py-2">
                  <Button
                    className="place-self-stretch"
                    color="danger"
                    type="button"
                    variant="flat"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    Remove Step
                  </Button>
                </div>

                <IngredientCreator stepIndex={index} />
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
}
