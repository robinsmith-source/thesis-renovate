"use client";

import { Button } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/trpc/react";

export default function RecipeSaveButton({
  recipeId,
  isSaved,
}: {
  recipeId: string;
  isSaved: boolean;
}) {
  const [savedStatus, setSavedStatus] = useState(isSaved);
  const [isSaving, setIsSaving] = useState(false);

  const saveMutation = api.recipe.save.useMutation({
    onSuccess: () => {
      setSavedStatus(true);
      setIsSaving(false);
    },
    onError: () => {
      toast.error("Failed to save user");
      setIsSaving(false);
    },
  });

  const unsaveMutation = api.recipe.unsave.useMutation({
    onSuccess: () => {
      setSavedStatus(false);
      setIsSaving(false);
    },
    onError: () => {
      toast.error("Failed to unsave user");
      setIsSaving(false);
    },
  });

  const onPress = () => {
    setIsSaving(true);
    if (savedStatus) {
      unsaveMutation.mutate({
        recipeId,
      });
    } else {
      saveMutation.mutate({
        recipeId,
      });
    }
  };

  return (
    <div className="flex justify-center">
      <Button onPress={onPress} isDisabled={isSaving}>
        {savedStatus ? "Unsave" : "Save"}
      </Button>
    </div>
  );
}
