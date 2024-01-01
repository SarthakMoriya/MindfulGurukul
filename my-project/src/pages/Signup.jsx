/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { notify } from "../utils/notification";
import { motion } from "framer-motion";

const cities = {
  mumbai: ["1", "2", "3"],
  pune: ["x", "y", "z"],
  ahemdabad: ["A", "B", "XC"],
};

const Signup = () => {
  const [userState, setUserState] = useState("mumbai");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [contacted, setContacted] = useState({
    linkedIn: false,
    jobPortal: false,
    friends: false,
    others: false,
  });
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleCheckboxChange = (checkboxName) => {
    setContacted((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxName]: !prevCheckboxes[checkboxName],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password, email, gender, phone, contacted);
    await fetch("https://mindfulgurukulbackend.onrender.com/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        email,
        gender,
        phone,
        contacted: JSON.stringify(contacted),
      }),
    }).then(async (res) => {
      const data=await res.json();
      console.log(data)
      if(res.ok){
        navigate('/signin')
      }else{
        alert(data.message)
      }
    });
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-primary h-auto w-full">
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
        <motion.div className="flex flex-col items-center justify-center px-6 py-8  md:h-auto  h-auto md:mt-4 md:mb-8">
          <motion.div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-secondary border-2">
            <motion.div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <motion.h1
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="text-xl font-bold leading-tight tracking-tight text-blue md:text-2xl "
              >
                Create your account
              </motion.h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                {/* USERNAME FIELD */}
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-blue "
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                </motion.div>
                {/* EMAIL FIELD */}
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                >
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-blue "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                </motion.div>
                {/* PASSWORD FIELD */}
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                >
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-blue "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </motion.div>
                {/* PHONENUMBER FIELD */}
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                >
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-blue "
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </motion.div>
                {/* GENDER FIELD */}
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                  className="flex  gap-1 flex-col"
                >
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-blue "
                  >
                    Gender
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value={"male"}
                      onChange={(e) => {
                        setGender(e.target.value);
                        console.log(e.target.value);
                      }}
                      placeholder="••••••••"
                    />
                    Male
                    <input
                      type="radio"
                      name="gender"
                      value={"female"}
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                      placeholder="••••••••"
                    />
                    Female
                  </div>
                </motion.div>
                {/* CHECKBOX FIELD */}
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                >
                  <label
                    htmlFor="contacted"
                    className="block mb-2 text-sm font-medium text-blue "
                  >
                    How did you heard about us
                  </label>
                  <div className="">
                    <div className="">
                      <input
                        type="checkbox"
                        name="scheckbox"
                        id="contacted"
                        value={username}
                        onChange={() => handleCheckboxChange("linkedIn")}
                        placeholder="••••••••"
                      />
                      LinkedIn
                    </div>
                    <div className="">
                      <input
                        type="checkbox"
                        name="scheckbox"
                        id="scheckbox"
                        placeholder="••••••••"
                        onChange={() => handleCheckboxChange("jobPortal")}
                      />
                      Job Portals
                    </div>
                    <div className="">
                      <input
                        type="checkbox"
                        name="scheckbox"
                        id="scheckbox"
                        placeholder="••••••••"
                        onChange={() => handleCheckboxChange("friends")}
                      />
                      Friends
                    </div>
                    <div className="">
                      <input
                        type="checkbox"
                        name="scheckbox"
                        id="scheckbox"
                        placeholder="••••••••"
                      />
                      Others
                    </div>
                  </div>
                </motion.div>
                {/* STATE FIELD */}
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                >
                  <label
                    htmlFor="state"
                    className="block mb-2 text-sm font-medium text-blue "
                  >
                    State
                  </label>
                  <select
                    name=""
                    id="state"
                    onChange={(e) => {
                      setUserState(e.target.value);
                      console.log(e.target.value);
                      console.log(cities[e.target.value]);
                    }}
                  >
                    <option value="mumbai">Mumbai</option>
                    <option value="pune">Pune</option>
                    <option value="ahemdabad">Ahemdabad</option>
                  </select>
                </motion.div>
                {/* City FIELD */}
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                >
                  <label
                    htmlFor="state"
                    className="block mb-2 text-sm font-medium text-blue "
                  >
                    City
                  </label>
                  <select
                    name=""
                    id="city"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  >
                    {cities[userState]?.map((city) => {
                      return (
                        <option value={city} key={city}>
                          {city}
                        </option>
                      );
                    })}
                  </select>
                </motion.div>
                {/* SIGNUP BUTTON */}
                <motion.button
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 1.9, ease: "easeInOut" }}
                  type="submit"
                  className="w-full text-blue bg-secondary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-gray-500"
                >
                  Sign up
                </motion.button>
                <motion.p
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="text-sm font-light text-blue dark:text-gray-400"
                >
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign In
                  </Link>
                </motion.p>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Signup;
