import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { setLogout } from "../state";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const [isMobile, setIsMobile] = useState(false);

  const handleLogout = () => {
    dispatch(setLogout());
    setIsMobile(false);
  };
  return (
    <>
      {!location.pathname.includes("pdf") && (
        <nav className="bg-white border-gray-200  border-b-4 border-b-primary fixed w-full z-10">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
            <Link to="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                XYZ
              </span>
            </Link>
            {/* LOGGEDIN NAVBAR ABOVE 768PX*/}
            {user !== null && (
              <div
                className="hidden w-full md:block md:w-auto"
                id="navbar-default"
              >
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white  text-blue">
                  {/* CREATE RECORD */}
                  <li>
                    <Link
                      to="/create"
                      className="block py-2 pl-3 pr-4 rounded "
                      aria-current="page"
                    >
                      Create
                    </Link>
                  </li>
                  {/* LOGOUT */}
                  <li>
                    <Link
                      href="#"
                      onClick={handleLogout}
                      className="block py-2 pl-3 pr-4 text-gray-900 bg-secondary rounded  "
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            {/* LOGGEDIN NAVBAR Below 768PX*/}
            <div
              className="md:hidden"
              onClick={() => {
                setIsMobile(!isMobile);
              }}
            >
              III
            </div>
            {user !== null && isMobile && (
              <div className=" w-full " id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0  text-blue">
                  {/* CREATE RECORD */}
                  <li>
                    <Link
                      to="/create"
                      className="block py-2 pl-3 pr-4 rounded "
                      aria-current="page"
                      onClick={() => {
                        setIsMobile(!isMobile);
                      }}
                    >
                      Create
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      onClick={handleLogout}
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded  hover:bg-secondary duration-200 ease-in"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            {/* NAVBAR WITHOUT LOGIN ABOVE 768PX*/}
            {user === null && (
              <>
                <div
                  className="hidden w-full md:block md:w-auto"
                  id="navbar-default"
                >
                  <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white   dark:border-gray-700">
                    <li>
                      <Link
                        to="/signin"
                        className=" block  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 px-2 py-2"
                        aria-current="page"
                      >
                        Signin
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className="bg-secondary block  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  md:hover:text-blue-700 px-2 py-2 hover:border-secondary hover:border-2 border-2"
                      >
                        SignUp
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
            {/* NAVBAR WITHOUT LOGIN BELOW 768PX*/}
            {user === null && isMobile && (
              <>
                <div className=" w-full" id="navbar-default">
                  <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white   dark:border-gray-700">
                    <li>
                      <Link
                        to="/login"
                        className=" block  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 px-2 py-2"
                        aria-current="page"
                        onClick={() => {
                          setIsMobile(false);
                        }}
                      >
                        Signin
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className=" block  text-gray-900 rounded  px-2 py-2 "
                        onClick={() => {
                          setIsMobile(false);
                        }}
                      >
                        SignUp
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
