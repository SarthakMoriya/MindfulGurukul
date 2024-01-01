/* eslint-disable react-hooks/rules-of-hooks */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRecords } from "./state";
import View from "./pages/View";

const App = () => {
  const dispatch = useDispatch();

  const fetchRecords = async () => {
    await fetch(
      "https://mindfulgurukulbackend.onrender.com/record/getrecords"
    ).then(async (res) => {
      const data = await res.json();
      dispatch(setRecords({ records: data }));
    });
  };

  useEffect(() => {
    fetchRecords();
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/view/:id" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
