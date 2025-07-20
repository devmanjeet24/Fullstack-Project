import { createBrowserRouter } from "react-router-dom";
import Loginpage from "@/pages/LoginPage";
import HomePage from "@/pages/Home";
import RegisterPage from "./pages/RegisterPage";


 const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/login',
        element: <Loginpage />
    },
     {
        path: '/register',
        element: <RegisterPage />
    },
  
]);

export default router;