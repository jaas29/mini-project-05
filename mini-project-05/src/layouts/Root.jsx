import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000} theme="dark" />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
