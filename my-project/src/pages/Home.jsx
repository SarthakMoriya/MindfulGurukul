import { useSelector } from "react-redux";
import RecordRow from "../components/RecordRow";
import Search from "../components/Search";
import { useEffect, useState } from "react";
import TableHeader from "../components/TableHeader";

const Home = () => {
  const [allRecords, setAllRecords] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const records = useSelector((state) => state?.record?.records);
  useEffect(() => {
    setAllRecords(records);
  }, []);

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // You can change this to 'auto' for an instant scroll
    });
  };
  return (
    <div className="mx-6 ">
      <Search
        setSearchResults={setSearchResults}
        setAllRecords={setAllRecords}
        setIsSearch={setIsSearch}
        searchResults={searchResults}
      />
      <div className="shadow-md rounded-lg my-4">
        {searchResults?.length > 0 && (
          <>
            <div className="w-full flex  justify-between">
              <div className="uppercase text-3xl  border-b-4 my-2">
                Search Results
              </div>
              <button
                className=" border-2 my-2 bg-blue-800 p-2 rounded-lg text-white"
                onClick={() => {
                  setIsSearch(false);
                  setSearchResults([]);
                }}
              >
                Clear
              </button>
            </div>
            <TableHeader />
          </>
        )}
        {searchResults?.length === 0 && isSearch && (
          <>
            <div className="w-full flex items-center justify-center">
              <div className="uppercase text-3xl  border-b-4 my-2">
                NO RECORS FOUND
              </div>
            </div>
          </>
        )}
        {/* MAP */}
        {searchResults?.length > 0
          ? searchResults?.map((rec) => (
              <RecordRow key={rec?._id} record={rec} />
            ))
          : ""}
      </div>
      <div className="w-full flex items-center ">
        <div className="uppercase text-3xl  border-b-4 my-2">ALL Records</div>
      </div>
      <div className="shadow-md rounded-lg mb-4">
        <TableHeader />
        {/* MAP */}
        {allRecords?.length > 0
          ? allRecords?.map((rec) => (
              <RecordRow
                key={rec?._id}
                record={rec}
                setAllRecords={setAllRecords}
                allRecords={allRecords}
              />
            ))
          : "NO RECORD FOUND"}
      </div>
      <div
        onClick={ScrollToTop}
        className="fixed z-10 w-10 h-10 bg-black bottom-2 right-10 rounded-full text-white flex items-center justify-center "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
          />
        </svg>
      </div>
    </div>
  );
};

export default Home;
