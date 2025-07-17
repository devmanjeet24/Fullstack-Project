import { createBrowserRouter } from "react-router-dom";
import Loginpage from "@/pages/Login";
import HomePage from "@/pages/Home";


 const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/login',
        element: <Loginpage />
    },
  
]);

export default router;