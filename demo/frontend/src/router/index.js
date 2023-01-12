import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout";
import Detail from "../pages/detail";
import Home from "../pages/home";
import Login from "../pages/login";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/detail",
        element: <Detail />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
