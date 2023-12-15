import { useState, type KeyboardEvent } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "@nextui-org/shared-icons";
import { type SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

interface FormValues {
  search: string;
}

const SearchInput = () => {
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string | null>(
    search ? search.get("q") : "",
  );
  const router = useRouter();

  const onSearch: SubmitHandler<FormValues> = (data) => {
    const encodedSearchQuery = encodeURI(data.search);
    router.push(`explore/search?q=${encodedSearchQuery}`);
    console.log("searching for:  " + data.search);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch({ search: searchQuery ?? "" });
    }
  };

  return (
    <Input
      fullWidth
      type="text"
      value={searchQuery ?? ""}
      onChange={(event) => setSearchQuery(event.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Search recipes..."
      endContent={
        <SearchIcon
          name="search"
          onClick={() => onSearch({ search: searchQuery ?? "" })}
        />
      }
    />
  );
};
export default SearchInput;
