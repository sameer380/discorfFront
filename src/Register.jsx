import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterPage.css";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

export default function Register() {
	// State to manage user inputs
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const notifyError = (message) => toast.error(message); // Toastify for errors
	const notifySuccess = (message) => toast.success(message); // Toastify for success

	// Function to handle form submission
	const handleRegister = async (e) => {
		e.preventDefault(); // Prevent default form submission
		try {
			// Call the API endpoint with user details
			const response = await axios.post("http://localhost:5000/register", {
				username,
				email,
				password,
			});

			// Handle the API response
			if (response.data.error) {
				notifyError(response.data.error); // Show error toast
			} else {
				notifySuccess(response.data.message); // Show success toast
				// Optionally, redirect to login page or clear the form
				setEmail("");
				setUsername("");
				setPassword("");
			}
		} catch (error) {
			// Handle API errors
			if (error.response && error.response.data && error.response.data.error) {
				notifyError(error.response.data.error);
			} else {
				notifyError("An unexpected error occurred.");
			}
		}
	};

	return (
		<div className="snowflake-container">
			{/* Generate 50 snowflakes dynamically */}
			{Array.from({ length: 50 }).map((_, index) => (
				<div className="snowflake" key={index}></div>
			))}

			<div className="register-container">
				<div className="register-box">
					<Link className="back-button" to="/home">
						<GoArrowLeft style={{ marginTop: "-3px" }} /> <span style={{marginLeft:"5px"}}> Back</span>
					</Link>
					<h2 className="register-heading">Create an account</h2>
					<form
						className="register-form"
						onSubmit={handleRegister} // Attach handleRegister to form submission
					>
						<div className="input-group">
							<input
								type="email"
								className="register-input"
								placeholder="Email address"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)} // Update email state
							/>
						</div>
						<div className="input-group">
							<input
								type="text"
								className="register-input"
								placeholder="Username"
								required
								value={username}
								onChange={(e) => setUsername(e.target.value)} // Update username state
							/>
						</div>
						<div className="input-group">
							<input
								type="password"
								className="register-input"
								placeholder="Password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)} // Update password state
							/>
						</div>
						<button type="submit" className="register-button">
							REGISTER
						</button>
					</form>
					<p className="already-account">
						Already have an account? {"  "}
						<a href="/login" className="login-link">
							Log in
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
