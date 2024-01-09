"use client";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { Button, useDisclosure } from "@nextui-org/react";
import ShoppingListFormModal from "~/app/_components/ShoppingListFormModal";
import { FaPenToSquare, FaPlus, FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Modes } from "~/app/lib/shoppingListModes";
import UniversalModal from "~/app/_components/UniversalModal";

export type ShoppingListFormType = {
  name: string;
  description?: string | null;
};

type ShoppingListFormHandlerProps = {
  buttonSize?: "sm" | "md" | "lg";
} & (
  | {
      mode: Modes.CREATE;
    }
  | {
      mode: Modes.EDIT;
      shoppingList: {
        id: string;
      } & ShoppingListFormType;
    }
  | {
      mode: Modes.DELETE;
      shoppingList: {
        id: string;
      };
    }
);
export default function ShoppingListFormHandler(
  props: ShoppingListFormHandlerProps,
) {
  const { mode, buttonSize } = props;
  const { onOpen, isOpen, onOpenChange, onClose } = useDisclosure();
  const router = useRouter();

  const onCreate = (data: ShoppingListFormType) => {
    createMutation.mutate({
      name: data.name,
      description: data.description ?? "",
    });
  };

  const createMutation = api.shoppingList.create.useMutation({
    onSuccess: () => {
      toast.success("Shopping list submitted successfully");
      router.refresh();
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onEdit = (data: ShoppingListFormType) => {
    if (mode === Modes.EDIT && props.shoppingList.id) {
      editMutation.mutate({
        shoppingListId: props.shoppingList.id,
        name: data.name,
        description: data.description ?? "",
      });
    }
  };

  const editMutation = api.shoppingList.update.useMutation({
    onSuccess: () => {
      toast.success("Shopping list edited successfully");
      router.refresh();
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDelete = (shoppingListId: string) => {
    deleteMutation.mutate({
      shoppingListId,
    });
  };

  const deleteMutation = api.shoppingList.delete.useMutation({
    onSuccess: () => {
      toast.success("Shopping list deleted");
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error deleting shopping list");
    },
  });

  switch (mode) {
    case Modes.CREATE:
      return (
        <>
          <Button isIconOnly color="success" size={buttonSize} onPress={onOpen}>
            <FaPlus />
          </Button>
          <ShoppingListFormModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title="Create Shopping List"
            submit={onCreate}
          />
        </>
      );
    case Modes.EDIT:
      return (
        <>
          <Button
            isIconOnly
            color="secondary"
            size={buttonSize}
            onPress={onOpen}
          >
            <FaPenToSquare />
          </Button>
          <ShoppingListFormModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title="Edit Shopping List"
            formValue={{
              ...props.shoppingList,
            }}
            submit={onEdit}
          />
        </>
      );
    case Modes.DELETE:
      return (
        <>
          <Button isIconOnly color="danger" size={buttonSize} onPress={onOpen}>
            <FaTrash />
          </Button>

          <UniversalModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onConfirm={() => {
              onDelete(props.shoppingList.id);
              onClose();
            }}
            title="Delete Shopping List"
            submitColor="danger"
          >
            <p>
              Are you sure you want to delete this shopping list?
              <br />{" "}
              <span className="font-semibold">
                This action cannot be undone.
              </span>
            </p>
          </UniversalModal>
        </>
      );
    default:
      throw new Error("Invalid mode");
  }
}
