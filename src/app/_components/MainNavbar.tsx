"use client";

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import NextLink from "next/link";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import ThemeSwitcher from "~/app/_components/ThemeSwitcher";
import NextImage from "next/image";
import { useState } from "react";

function LoginBar({ session }: { session: Session }) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={session.user.name ?? undefined}
          size="md"
          src={session.user.image ?? "https://placekitten.com/200/200"}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem
          textValue={`Signed in as ${session.user.name}`}
          key="profile"
          className="h-14 gap-2"
        >
          <p className="font-semibold">
            Signed in as <br />
            {session.user.name}
          </p>
        </DropdownItem>
        <DropdownItem
          as={NextLink}
          key="settings"
          href={`/user/${session.user.id}`}
        >
          My Profile
        </DropdownItem>
        <DropdownItem as={NextLink} key="create-recipe" href={`/recipe/create`}>
          Create Recipe
        </DropdownItem>
        <DropdownItem
          as={NextLink}
          key="logout"
          color="danger"
          href={"/api/auth/signout"}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default function MainNavbar() {
  const { data: session } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Explore Recipes", href: "/explore" },
    { name: "About(WIP)", href: "/about" },
    { name: "Contact(WIP)", href: "/contact" },
  ];

  return (
    <Navbar
      maxWidth="xl"
      className="bg"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarBrand>
          <NextLink href="/">
            <Image
              as={NextImage}
              width={50}
              height={50}
              src="/images/Logo_round_V2.png"
              alt="Logo"
            />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center" className="hidden sm:flex">
        <NavbarItem as={NextLink} href="/">
          <Button size="lg" variant="light">
            Home
          </Button>
        </NavbarItem>

        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button size="lg" variant="light">
                Explore
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="Recipes" href="/recipe/search" as={NextLink}>
                Recipes
              </DropdownItem>
              <DropdownItem key="Users" href="/users" as={NextLink}>
                Users
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          {session ? (
            <LoginBar session={session} />
          ) : (
            <Button
              as={NextLink}
              color="secondary"
              href={"/api/auth/signin"}
              variant="flat"
            >
              Sign in
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full text-default-600"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
