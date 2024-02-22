import NextLink from "next/link";
import { Link } from "@nextui-org/react";

export default function Footer() {
  return (
    <footer className="flex justify-center bg-primary-400/30 p-4">
      <div className="flex flex-row space-x-1">
        <span className="text-lg font-medium">
          © 2024 Goose Chef |{" "}
          <Link
            as={NextLink}
            href="/about"
            color="foreground"
            underline="hover"
            className="text-lg"
          >
            About us
          </Link>
        </span>
      </div>
    </footer>
  );
}
