import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../App";
import Dashboard from "../Pages/Dashboard";
import NotFound from "../Pages/NotFound";
import SignUp from "../Pages/SignUp";
import LogIn from "../Pages/LogIn";
import PrivateRoute from "../routes/PrivateRoute.jsx";
import Unauthorized from "../Pages/Unauthorized.jsx";



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
        element: <SignUp />,
      },
      {
        path: "login",
        element: <LogIn />,
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
