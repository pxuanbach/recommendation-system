import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout";
import Detail from "../pages/detail";
import Home from "../pages/home";
import Login from "../pages/login";
import Movies from "../pages/movies";
import People from "../pages/people";
import SignUp from "../pages/signup";
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
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/people",
        element: <People />,
      },
      {
        path: "/movies/:movieId",
        element: <Detail />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  {
    path: "/signup",
    element: <SignUp />,
  },
]);
