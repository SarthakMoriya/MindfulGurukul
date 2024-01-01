import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRecords } from "../state";
const Search = ({
  setSearchResults,
  setAllRecords,
  setIsSearch,
  searchResults,
}) => {
  const records = useSelector((state) => state?.record?.records);
  console.log("search records" + [...records]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredResults = records?.filter((rec) => {
      const username = rec?.username.toLowerCase();
      const email = rec?.email?.toLowerCase();
      const phoneNo = rec?.phoneNo?.toLowerCase();
      return (
        username?.includes(search) ||
        email?.includes(search) ||
        phoneNo?.includes(search)
      );
    });
    setSearchResults(filteredResults); //
    setIsSearch(true);
  };
  const handleFilter = (e) => {
    let choice = e.target.value;
    let filteredResults = [...records];
    let filteredSearchResults = [...searchResults];

    if (choice === "a-z") {
      filteredResults.sort((a, b) => {
        const usernameA = a.username.toLowerCase();
        const usernameB = b.username.toLowerCase();
        if (usernameA <= usernameB) {
          return -1;
        } else {
          return 1;
        }
      });
      filteredSearchResults.sort((a, b) => {
        const usernameA = a.username.toLowerCase();
        const usernameB = b.username.toLowerCase();
        if (usernameA <= usernameB) {
          return -1;
        } else {
          return 1;
        }
      });
    } else if (choice === "z-a") {
      filteredResults.sort((a, b) => {
        const usernameA = a.username.toLowerCase();
        const usernameB = b.username.toLowerCase();
        if (usernameA <= usernameB) {
          return 1;
        } else {
          return -1;
        }
      });
      filteredSearchResults.sort((a, b) => {
        const usernameA = a.username.toLowerCase();
        const usernameB = b.username.toLowerCase();
        if (usernameA <= usernameB) {
          return 1;
        } else {
          return -1;
        }
      });
    } else if (choice === "li") {
      filteredResults.sort((a, b) => {
        return new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
          ? -1
          : 1;
      });
      filteredSearchResults.sort((a, b) => {
        return new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
          ? -1
          : 1;
      });
    } else if (choice === "lm") {
      filteredResults.sort((a, b) => {
        console.log(
          a.username + " " + new Date(a.updatedAt).getTime(),
          b.username + " ",
          new Date(b.updatedAt).getTime()
        );
        return new Date(a.updatedAt).getTime() > new Date(b.updatedAt).getTime()
          ? -1
          : 1;
      });
      filteredSearchResults.sort((a, b) => {
        console.log(
          a.username + " " + new Date(a.updatedAt).getTime(),
          b.username + " ",
          new Date(b.updatedAt).getTime()
        );
        return new Date(a.updatedAt).getTime() > new Date(b.updatedAt).getTime()
          ? -1
          : 1;
      });
    }
    console.log(filteredResults);
    setAllRecords(filteredResults);
    setSearchResults(filteredSearchResults);
    dispatch(setRecords({ records: filteredResults }));
  };
  return (
    <div className="flex border">
      <form className="w-[90%]" onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Name, Email, Phone Number"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div className="w-[10%]">
        <select name="" id="" className="w-full h-full" onChange={handleFilter}>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="li">Last Inserted</option>
          <option value="lm">Last Modified</option>
        </select>
      </div>
    </div>
  );
};

export default Search;
