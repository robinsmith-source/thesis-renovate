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
      <CardHeader>
        <ReviewRating rating={rating} />
        {handleEditClick && <Button onClick={handleEditClick}>Edit</Button>}
      </CardHeader>
      {comment && <CardBody>{comment}</CardBody>}
      {author && (
        <CardFooter className="flex justify-end">
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
        </CardFooter>
      )}
    </Card>
  );
}
