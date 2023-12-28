"use client";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";

enum Modes {
  CREATE,
  EDIT,
  VIEW,
}

export default function ReviewFormHandler({
  recipeId,
  myReviewQuery,
}: {
  recipeId: string;
  myReviewQuery: {
    id: string;
    rating: number;
    comment: string | null;
  } | null;
}) {
  const [mode, setMode] = useState<Modes>();
  const [submittedReview, setSubmittedReview] = useState<{
    id: string;
    rating: number;
    comment: string | null;
  } | null>(null);

  useEffect(() => {
    if (myReviewQuery) {
      setMode(Modes.VIEW);
      setSubmittedReview({
        id: myReviewQuery.id,
        rating: myReviewQuery.rating,
        comment: myReviewQuery.comment,
      });
    } else {
      setMode(Modes.CREATE);
    }
  }, [myReviewQuery]);

  const onCreate = (data: { rating: number; comment: string | null }) => {
    createMutation.mutate({
      rating: data.rating,
      comment: data.comment ?? "",
      recipeId: recipeId,
    });
  };

  const createMutation = api.review.create.useMutation({
    onSuccess: (data) => {
      toast.success("Review submitted successfully");
      setSubmittedReview({
        id: data.id,
        rating: data.rating,
        comment: data.comment,
      });
      setMode(Modes.VIEW);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onEdit = (data: { rating: number; comment: string | null }) => {
    editMutation.mutate({
      rating: data.rating,
      comment: data.comment ?? "",
      recipeId: recipeId,
    });
  };

  const editMutation = api.review.update.useMutation({
    onSuccess: (data) => {
      toast.success("Review edited successfully");
      setSubmittedReview({
        id: data.id,
        rating: data.rating,
        comment: data.comment,
      });
      setMode(Modes.VIEW);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      {mode === Modes.CREATE && <ReviewForm submit={onCreate} formValue={{}} />}
      {mode === Modes.EDIT && submittedReview && (
        <ReviewForm submit={onEdit} formValue={submittedReview} />
      )}
      {mode === Modes.VIEW && submittedReview && (
        <ReviewCard
          review={submittedReview}
          handleEditClick={() => {
            setMode(Modes.EDIT);
          }}
        />
      )}
    </>
  );
}
