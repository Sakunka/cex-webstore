import { FaSearch } from "react-icons/fa";
import SearchList from "./SearchList";

export default function SearchBar({ searchTerm, setSearchTerm, results }) {
  return (
    <>
      <form>
        <input
          className={`bg-white pl-10 w-full h-11 text-black ${
            searchTerm.length > 3 ? "rounded-t-4xl" : "rounded-4xl"
          }`}
          type="text"
          placeholder="What do you want to buy?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch
          color="black"
          className="absolute left-8 top-25 md:left-3 md:top-3 pointer-events-none"
        />
      </form>
      {searchTerm.length > 3 ? <SearchList results={results} /> : null}
    </>
  );
}
