import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
  User,
} from "@nextui-org/react";
import ReviewRating from "~/app/_components/ReviewRating";

type ReviewCardProps = {
  review: {
    id: string;
    rating: number;
    comment: string | null;
    author?: {
      id: string;
      name: string | null;
      image: string | null;
    };
  };
  handleEditClick?: () => void;
};

export default function ReviewCard({
  review,
  handleEditClick,
}: ReviewCardProps) {
  const { rating, comment, author } = review;

  return (
    <Card className="w-[36rem]">
      <CardHeader className="-mb-4">
        <ReviewRating rating={rating} />
      </CardHeader>
      {comment && <CardBody className="px-6">{comment}</CardBody>}
      <CardFooter className="flex justify-end">
        {author && (
          <User
            name={
              <Link
                color="secondary"
                href={`/user/${author.id}`}
                showAnchorIcon
                size="sm"
              >
                {author.name}
              </Link>
            }
            avatarProps={{
              src: author.image ?? undefined,
              showFallback: true,
              size: "sm",
            }}
          />
        )}
        {handleEditClick && (
          <Button onClick={handleEditClick} color="secondary">
            Edit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
