import { FaSearch } from "react-icons/fa";
import SearchList from "./SearchList";

export default function SearchBar({ searchTerm, setSearchTerm, results }) {
  return (
    <div className="relative w-full">
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
          className="absolute left-4 top-4 md:left-4 md:top-4 pointer-events-none"
        />
      </form>
      {searchTerm.length > 3 ? <SearchList results={results} /> : null}
    </div>
  );
}
