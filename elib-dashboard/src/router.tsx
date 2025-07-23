import { createBrowserRouter } from "react-router-dom";
import Loginpage from "@/pages/LoginPage";
import HomePage from "@/pages/Home";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./Layout/DashboardLayout";
import Books from "./pages/Books";


 const router = createBrowserRouter([
    {
        path: 'dashboard',
        element: <DashboardLayout />,
        children : [
            {
                path: 'home',
                element: <HomePage />
            },
            {
                path: 'books',
                element: <Books />
            }
        ]
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