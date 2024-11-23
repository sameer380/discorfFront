import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login"
import "./index.css";
import Register from "./Register";
import Homepage from "./Homepage";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const App = () => {
  ReactDOM.createRoot(document.getElementById("root")).render(
		<React.StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/home" element={<Homepage />} />
				</Routes>
				<ToastContainer theme="dark" />
			</BrowserRouter>
		</React.StrictMode>
	);

}

export default App