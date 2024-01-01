import { Link } from "react-router-dom";
import { setRecords } from "../state";
import { useDispatch } from "react-redux";

const RecordRow = ({ record, setAllRecords, allRecords }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    const filteredResults = allRecords.filter((rec) => rec?._id != record?._id);
    setAllRecords(filteredResults);
    dispatch(setRecords({ records: filteredResults }));
    await fetch(`https://mindfulgurukulbackend.onrender.com/record/delete/${record?._id}`, {
      method: "DELETE",
    }).catch(() => alert("Error deleting"));
  };
  return (
    <div className="flex items-center  justify-between bg-blue-500 border-b border-blue-400">
      <img src="" alt="" className="w-[20" />
      <div className="w-[20%] px-6 py-4 font-medium text-blue-50 whitespace-nowrap ">
        {record?.username}
      </div>
      <div className="w-[30%] text-sm text-left px-6 py-3 text-blue-50">
        {record?.email}
      </div>
      <div className="w-[10%] text-sm text-left px-6 py-3 text-blue-50">
        {record?.phoneNo}
      </div>
      <div className="buttons flex gap-4 w-[20%]">
        <Link to={`/view/${record?._id}`}>
          <button className="bg-blue-400 px-4 py-1 rounded-lg border border-blue-300 text-blue-200 hover:bg-blue-600 duration-500 ease-in">
            View
          </button>
        </Link>
        <Link to={`/edit/${record?._id}`}>
          <button className="bg-blue-400 px-4 py-1 rounded-lg border border-blue-300 text-blue-200 hover:bg-blue-600 duration-500 ease-in">
            Edit
          </button>
        </Link>
        <button
          onClick={handleDelete}
          className="bg-blue-400 px-4 py-1 rounded-lg border border-blue-300 text-blue-200 hover:bg-blue-600 duration-500 ease-in"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecordRow;
