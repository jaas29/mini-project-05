import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import './index.css'
import './components/Navbar.css'
import './components/Footer.css'

import router from "./routes/MainRouter.jsx";
import Loader from "./components/Loader.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider
                router={router}
                fallbackElement={<Loader />}
            />
        </AuthProvider>
    </StrictMode>,
);
