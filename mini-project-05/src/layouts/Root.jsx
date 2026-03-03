import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000} theme="dark" />
      <Outlet />
    </>
  );
};

export default Root;
