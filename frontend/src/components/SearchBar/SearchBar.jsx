import { useState } from "react";
import "./SearchBar.css";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const searchUser = async (e) => {
    e.preventDefault();
    console.log("search user placeholder");
  };

  return (
    <div>
      <input type="text" name="searchbar" id="searchbar" placeholder="find user" value={search} onChange={(e) => setSearch(e.target.value)} />
      <button type="button" onClick={searchUser}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
