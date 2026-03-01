import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/App";
import Signup from "../pages/SignUp";
import Login from "../pages/LogIn";
import Dashboard from "../pages/Dashboard";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        element: <Unauthorized />,
      },
      {
        path: "watch",
        element: <Unauthorized />,
      },
      {
        path: "unauthorized",
        element: <Unauthorized />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
