/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setRecords } from "../state";
import { fetchAllRecords } from "../utils/fetchRecord";

const Edit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const records = useSelector((state) => state.record.records);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const fetchRecord = async () => {
    const res = await fetch(`http://localhost:8000/record/getrecord/${id}`, {
      method: "GET",
    });
    const { data } = await res.json();
    setPhoneNo(data.phoneNo);
    setEmail(data.email);
    setUsername(data.username);
    setCreatedAt(data.createdAt);
  };
  useEffect(() => {
    fetchRecord();
  }, []);

  const handleRecordSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8000/record/edit/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        phoneNo,
      }),
    }).then(async (res) => {
      if (res.ok) {
        const records = await fetchAllRecords();
        dispatch(setRecords({ records }));
        toast.success("Record Updated");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error("Failed To Update Record");
      }
    });

    // dispatch(setRecords({ records: newRecords }));
  };
  return (
    <>
      <motion.div className="">
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
        <section className="  h-auto  text-xs md:text-base lg:text-lg">
          <motion.div className="  bg-white py-8 px-4 mx-auto max-w-2xl lg:py-16 my-4 md:rounded-md">
            <motion.h2
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="mb-4 text-2xl text-center md:text-left md:text-3xl lg:text-4xl font-bold text-primary"
            >
              Update Record
            </motion.h2>

            <form onSubmit={handleRecordSubmit}>
              <motion.div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {/* STUDENT NAME */}
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="sm:col-span-2"
                >
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-primary"
                  >
                    USERNAME
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    className="bg-blue-50 border border-gray-300 text-blue sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none text-blue-500"
                    placeholder="Type Username"
                  />
                </motion.div>
                {/* EMAIL */}
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="sm:col-span-2"
                >
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-primary"
                  >
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="bg-blue-50 border border-gray-300 text-blue sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none text-blue-500"
                    placeholder="Type Email Address"
                  />
                </motion.div>
                {/* Phone Number */}
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="sm:col-span-2"
                >
                  <label
                    htmlFor="phoneNo"
                    className="block mb-2 text-sm font-medium text-primary"
                  >
                    PHONE NUMBER
                  </label>
                  <input
                    type="number"
                    name="phoneNo"
                    id="phoneNo"
                    value={phoneNo}
                    onChange={(e) => {
                      setPhoneNo(e.target.value);
                    }}
                    className="bg-blue-50 border border-gray-300 text-blue sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none text-blue-500"
                    placeholder="Type PhoneNo"
                  />
                </motion.div>
              </motion.div>
              <motion.button
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-400 duration-300 ease-in focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-1"
              >
                Update Record
              </motion.button>
            </form>
          </motion.div>
        </section>
      </motion.div>
    </>
  );
};

export default Edit;
