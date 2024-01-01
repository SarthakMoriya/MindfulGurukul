/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { initialValuesRecord, recordSchema } from "../schemas/recordSchema";
import { ToastContainer ,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { motion } from "framer-motion";
import { setRecords } from "../state";
import { fetchAllRecords } from "../utils/fetchRecord";

const Create = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const handleRecordSubmit = async (values, onSubmitProps) => {
    await fetch("http://localhost:8000/record/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        phoneNo: values.phoneNo,
      }),
    });
    toast.success("Record Created")
    setTimeout(()=>{navigate('/')},2000)
    // UPDATE NEW RECORDS
    const records=await fetchAllRecords();
    dispatch(setRecords({ records: records }));
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
              Add a new Record
            </motion.h2>

            <Formik
              onSubmit={handleRecordSubmit}
              initialValues={initialValuesRecord}
              validationSchema={recordSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                // setFieldValue,
                // resetForm,
              }) => (
                <form onSubmit={handleSubmit}>
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
                        className="bg-blue-50 border border-gray-300 text-blue sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none text-blue-500"
                        placeholder="Type user name"
                        onBlur={handleBlur}
                        value={values.username}
                        onChange={handleChange}
                        error={
                          Boolean(touched.username) && Boolean(errors.username)
                        }
                        helperText={touched.username && errors.username}
                      />
                      {touched.username && errors.username && (
                        <motion.div className="text-primary text-md my-1 ml-2">
                          {errors.username}
                        </motion.div>
                      )}
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
                        className="bg-blue-50 border border-gray-300 text-blue sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none text-blue-500"
                        placeholder="Type emailaddress"
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                      {touched.email && errors.email && (
                        <motion.div className="text-primary text-md my-1 ml-2">
                          {errors.email}
                        </motion.div>
                      )}
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
                        className="bg-blue-50 border border-gray-300 text-blue sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none text-blue-500"
                        placeholder="Type phoneNo"
                        onBlur={handleBlur}
                        value={values.phoneNo}
                        onChange={handleChange}
                        error={
                          Boolean(touched.phoneNo) && Boolean(errors.username)
                        }
                        helperText={touched.phoneNo && errors.phoneNo}
                      />
                      {touched.phoneNo && errors.phoneNo && (
                        <motion.div className="text-primary text-md my-1 ml-2">
                          {errors.phoneNo}
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                  <motion.button
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 1.4, ease: "easeInOut" }}
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-400 duration-300 ease-in focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-1"
                  >
                    Add Record
                  </motion.button>
                </form>
              )}
            </Formik>
          </motion.div>
        </section>
      </motion.div>
    </>
  );
};

export default Create;
