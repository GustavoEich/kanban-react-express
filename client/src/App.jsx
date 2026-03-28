import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";

const router = createBrowserRouter([
	{ path: "/", element: <Home /> },
	{ path: "/about", element: <About /> },
]);

// path: "/mycanvas", 
//     // Logic: If no token in localStorage, send to login
//     element: localStorage.getItem("token") ? <Canvas /> : <Navigate to="/login" />


function App() {
	return <RouterProvider router={router} />
}


export default App