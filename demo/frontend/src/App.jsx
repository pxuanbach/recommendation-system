import { RouterProvider } from "react-router-dom";
import MainLayout from "./layout";
import Home from "./pages/home";
import { router } from "./router";
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
