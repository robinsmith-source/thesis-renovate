"use client";

import {
  Button,
  Card,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {
  FaFilter,
  FaMagnifyingGlass,
  FaArrowDownWideShort,
  FaListOl,
} from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import DifficultyInput from "./DifficultyInput";
import LabelSelect from "./LabelSelect";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type AdvancedRecipeSearchProps = {
  categories: { name: string; RecipeLabel: { name: string }[] }[];
};

export default function AdvancedRecipeSearch({
  categories,
}: AdvancedRecipeSearchProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

  // responsiveness
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallScreen(width < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [filtersCollapsed, setFiltersCollapsed] = useState(true);

  const sortOptions = [
    { label: "Newest", value: "NEWEST" },
    { label: "Oldest", value: "OLDEST" },
  ];
  const [selectedSorting, setSelectedSorting] = useState([
    searchParams.get("order") ?? "NEWEST",
  ]);

  const pageSizes = ["4", "6", "12"];
  const [selectedPageSize, setSelectedPageSize] = useState([
    searchParams.get("pageSize") ?? "12",
  ]);
  

  const handleSearch = ({
    name,
    sort,
    size,
  }: { name?: string; sort?: string; size?: string } = {}) => {
    const params = new URLSearchParams(searchParams);

    // reset page
    if (params.get("page") !== "1") {
      params.set("page", "1");
    }

    name ? params.set("name", name) : params.delete("name");
    sort ? params.set("order", sort) : params.delete("order");
    if (size) {
      params.set("pageSize", size);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleInput = useDebouncedCallback(
    (value: string) => {
      handleSearch({ name: value });
    },
    333, // delay in ms
  );

  return (
    <div className="mb-3 w-full justify-center">
      <Card>
        <div className="m-2 flex flex-row items-center justify-normal space-x-2">
          <Button
            size="lg"
            variant="flat"
            color="secondary"
            startContent={<FaFilter />}
            isIconOnly={isSmallScreen}
            onClick={() => setFiltersCollapsed(!filtersCollapsed)}
          >
            <span className="hidden sm:inline">Filters</span>
          </Button>
          <Input
            type="text"
            defaultValue={searchParams.get("name") ?? ""}
            startContent={<FaMagnifyingGlass className="mr-1" />}
            placeholder="Search recipes"
            onValueChange={(value: string) => handleInput(value)}
          />
          {isSmallScreen ? (
            <div className="flex-row items-center justify-between space-x-1">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly variant="flat" size="lg">
                    <FaArrowDownWideShort />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  selectionMode="single"
                  defaultSelectedKeys={selectedSorting}
                  onSelectionChange={(value) => {
                    setSelectedSorting([Array.from(value)[0]?.toString() ?? ""]);
                    handleSearch({
                      sort: Array.from(value)[0]?.toString() ?? "",
                    });
                  }}
                >
                  {sortOptions.map((option) => (
                    <DropdownItem
                      key={option.value}
                      onClick={() => handleSearch({ sort: option.value })}
                    >
                      {option.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly variant="flat" size="lg">
                    <FaListOl />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  selectionMode="single"
                  defaultSelectedKeys={selectedPageSize}
                  onSelectionChange={(value) => {
                    setSelectedPageSize([Array.from(value)[0]?.toString() ?? ""]);
                    handleSearch({
                      size: Array.from(value)[0]?.toString() ?? "",
                    });
                  }}
                >
                  {pageSizes.map((size) => (
                    <DropdownItem
                      key={size}
                      onClick={() => handleSearch({ size: size })}
                    >
                      {size}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <div className="flex-row items-center justify-around space-x-1">
              <Select
                fullWidth={false}
                size="sm"
                className="w-28"
                selectionMode="single"
                label="Sort by"
                disallowEmptySelection
                defaultSelectedKeys={selectedSorting}
                onSelectionChange={(value) => {
                  handleSearch({
                    sort: Array.from(value)[0]?.toString() ?? "",
                  });
                  setSelectedSorting([Array.from(value)[0]?.toString() ?? ""]);
                }}
              >
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                fullWidth={false}
                size="sm"
                className="w-28"
                selectionMode="single"
                label="pagesize"
                disallowEmptySelection
                defaultSelectedKeys={selectedPageSize}
                selectedKeys={selectedPageSize}
                onSelectionChange={(value) => {
                  handleSearch({
                    size: Array.from(value)[0]?.toString() ?? "",
                  });
                  setSelectedPageSize([Array.from(value)[0]?.toString() ?? ""]);
                }}
              >
                {pageSizes.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </Select>
            </div>
          )}
        </div>
        <motion.div
          className={
            !filtersCollapsed
              ? "mx-4 my-2 flex flex-col items-start justify-between lg:flex-row lg:items-center"
              : ""
          }
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: !filtersCollapsed ? 1 : 0,
            height: !filtersCollapsed ? "auto" : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex w-full flex-col">
            <Divider className="w-full bg-background-400" />
            <div className="mt-2 flex w-full flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-start md:w-1/2">
                <span className="font-bold text-default-600">Difficulty</span>
                <DifficultyInput />
              </div>
              <div className="mr-5 flex flex-row items-center justify-start md:w-1/2">
                <span className="font-bold text-default-600">Labels</span>
                <LabelSelect
                  categories={categories}
                  disabled={filtersCollapsed}
                  className="w-full lg:ml-2 lg:w-2/3"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </Card>
    </div>
  );
}
