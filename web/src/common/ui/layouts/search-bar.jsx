"use client";

import { isEmpty } from "@/utils";
import { InputAdornment, TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useDebounce } from "react-use";

export const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const [input, setInput] = useState("");

  const value = search.get("search");

  useDebounce(
    () => {
      if (isEmpty(input) && !isEmpty(value)) {
        router.replace("/?page=1&pageSize=12");
        return;
      }
      if (isEmpty(input)) return;
      const search = `/?page=1&pageSize=12&search=${input}`;
      if (pathname === "/") {
        router.replace(search);
        return;
      }
      router.push(search);
    },
    500,
    [input, pathname, router, value]
  );

  const handleChange = (event) => {
    const { value } = event.target;
    setInput(value);
  };

  return (
    <h1>Search bar</h1>
    // <TextField
    //   id="search"
    //   label=""
    //   variant="outlined"
    //   type="text"
    //   onChange={handleChange}
    //   value={input}
    //   InputProps={{
    //     startAdornment: (
    //       <InputAdornment position="start">
    //         <MdOutlineSearch />
    //       </InputAdornment>
    //     ),
    //   }}
    // />
  );
};
