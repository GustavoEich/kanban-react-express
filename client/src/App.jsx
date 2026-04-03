import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Board from "./pages/Board.jsx";
import { checkAuthStatus } from "./utils/auth.js";

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      const user = await checkAuthStatus(); // Your logic to check session
      if (user) return redirect("/board");
      return null;
    },
    element: <Home />,
  },
	{
    path: "/board",
    loader: async () => {
      const user = await checkAuthStatus(); // Your logic to check session
      if (!user) return redirect("/");
      return null;
    },
    element: <Board />,
  },
  { path: "/about", element: <About /> },

]);

function App() {
	return <RouterProvider router={router} />
}


export default App