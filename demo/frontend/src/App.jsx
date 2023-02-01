import { RouterProvider } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MainLayout from "./layout";
import Home from "./pages/home";
import { router } from "./router";
import { UserContext } from "./UserContext";
import axiosInstance from "./services/httpService";
import { getUserByIdEndPoint } from "./services/endpointService";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('userId'));
        const res = await axiosInstance.get(
          getUserByIdEndPoint({
            userId: userId
          })
        );
        const data = res.data;
        //console.log(data)
        setUser(data);
      } catch (error) {
        console.log(error)
      }
    }
    verifyUser();
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
