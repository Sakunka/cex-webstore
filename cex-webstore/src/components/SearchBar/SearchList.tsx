import { useState } from "react";
import SearchItem from "./SearchItem";

export default function SearchList({ results }) {
  const items = results?.results;
  const [open, setOpen] = useState(true);

  return (
    <>
      {open ? (
        <div className="absolute overflow-auto w-full md:top-11 z-100 bg-white text-black min-h hover:cursor-pointer">
          <ul>
            {items?.map((item) => (
              <SearchItem item={item} setOpen={setOpen} />
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
