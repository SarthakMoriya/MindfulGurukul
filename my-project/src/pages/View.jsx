import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { setRecords } from "../state";

const View = () => {
  const [record, setRecord] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state?.auth);
  const records = useSelector((state) => state.record.records);
  useEffect(() => {
    document.title = `MindfulGurukul | View Record`;
  }, [location.pathname]);

  const fetchRecord = async () => {
    let currentRecord = records.filter((rec) => rec._id === id);
    if (currentRecord) {
      setRecord(currentRecord);
    } else {
      alert("Record not found");
    }
    try {
      const res = await fetch(`http://localhost:8000/record/getrecord/${id}`);
      if (res.ok) {
        const { data } = await res.json();
        setRecord(data);
        console.log(data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  const handleEdit = (id) => {
    navigate("/edit/" + id);
  };
  const handleDelete = async () => {
    await fetch(`http://localhost:8000/record/delete/${id}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        console.log(res);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          const filteredResults = records.filter((rec) => rec._id !== id);
          console.log(filteredResults);
          dispatch(setRecords({ records: filteredResults }));
          navigate("/");
        } else {
          alert("Failed To Delete Record");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <>
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="bg-blue-600 text-white  mt-5 mx-6 md:mx-12 lg:mx-24"
      >
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {/* STUDENT DETAILS AND BUTTONS */}
        <div className="flex items-center justify-center">
          <div className=" border-b-4  text-2xl font-semibold text-blue mb-4">
            STUDENT DETAILS
          </div>
        </div>
        <motion.div className="flex">
          <motion.div className="flex w-full border md:flex-row flex-col">
            {/* STUDENT IMAGE */}
            {/* <motion.div className="flex  text-white md:w-[20%]  w-full">
              <img
                src={
                  "https://th.bing.com/th?q=Blank+Profile&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247"
                }
                alt=""
                className="w-full"
              />
            </motion.div> */}

            {/* STUDENT DETAILS */}
            <motion.div className="info flex flex-col  w-full text-white  ">
              <motion.div className="px-4 py-2 font-normal  text-sm md:text-base lg:text-xl border">
                StudentId: {record?._id}
              </motion.div>
              <motion.div className="px-4 py-2 font-normal  text-sm md:text-base lg:text-xl border">
                Name: {record?.username}
              </motion.div>
              <motion.div className="px-4 py-2 font-normal text-sm md:text-base lg:text-xl capitalize  border">
                DOJ: {record?.createdAt?.slice(0, 10)}
              </motion.div>
              <motion.div className="px-4 py-2 font-normal text-sm md:text-base lg:text-xl capitalize  border">
                UpdatedAt:{" "}
                {record?.updatedAt?.split("T")[0] +
                  "---" +
                  record?.updatedAt?.split("T")[1]?.slice(0, 8)}
              </motion.div>
              <motion.div className="px-4 py-2 font-normal text-sm md:text-base lg:text-xl capitalize  border">
                Email: {record?.email}
              </motion.div>
              <motion.div className="px-4 py-2 font-normal text-sm md:text-base lg:text-xl capitalize  border">
                PhoneNo: {record?.phoneNo}
              </motion.div>

              {/* BUTTONS TO DELETE VIEW ... */}
              <motion.div>
                {user && (
                  <div className="flex items-center p-4 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        handleEdit(record?._id);
                      }}
                      className="bg-blue-400 px-4 py-1 rounded-lg border border-blue-300 text-blue-200 hover:bg-blue-600 duration-500 ease-in"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="bg-blue-400 px-4 py-1 rounded-lg border border-blue-300 text-blue-200 hover:bg-blue-600 duration-500 ease-in"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default View;
