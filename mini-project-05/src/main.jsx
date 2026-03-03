import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css'
import App from './App.jsx'
import './components/Navbar.css'
import './components/Footer.css'

import MainRouter from "./routes/MainRouter.jsx";
import Loader from "./components/Loader.jsx";

const router = createBrowserRouter(MainRouter);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider
            router={router}
            hydrateFallbackElement={() => <Loader /> }
        />
    </StrictMode>,
);
