import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
  Link,
} from "@nextui-org/react";
import NextImage from "next/image";

export default function About() {
  const team = [
    "Tobias Messner",
    "Deniz Gazitepe",
    "Robin Schmidt",
    "Sabrina Turni",
    "Elena Roller",
  ];

  const tags = ["#studentWork", "#team", "#HdM", "#aboutUs"];

  return (
    <main className="flex flex-col items-center">
      <Card className="w-full p-2 sm:max-w-md">
        <CardHeader>
          <div className="text-xl font-bold">
            That&apos;s the team behind GooseChef:
          </div>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex flex-col">
            <ul>
              {team.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
            <Image
              as={NextImage}
              width={300}
              height={300}
              priority
              src="/images/GooseChef.png"
              alt="Logo"
              className="h-120 w-100 -mt-16"
            />
          </div>

          <p className="font-semibold">
            This project was made for the{" "}
            <Link
              isExternal
              href="https://www.hdm-stuttgart.de/block?sgname=Medieninformatik+%28Bachelor%2C+7+Semester%29&sgblockID=2573372&sgang=550033&blockname=Software-Entwicklung+3"
            >
              software development 3 class
            </Link>{" "}
            at{" "}
            <Link isExternal href="https://www.hdm-stuttgart.de/">
              Hochschule der Medien Stuttgart.
            </Link>
          </p>
        </CardBody>
        <CardFooter>
          <ul className="flex w-full flex-wrap justify-evenly gap-4">
            {tags.map((tag, index) => (
              <li key={index}>
                <Chip>{tag}</Chip>
              </li>
            ))}
          </ul>
        </CardFooter>
      </Card>
    </main>
  );
}
