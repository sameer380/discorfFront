import login from "./Login.module.css"; // Import CSS for snowflake styling
import "../src/style.scss"; // SCSS for animations or snowflakes
import axios from "axios";
import { toast } from "react-toastify";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";



const Login = () => {
	const navigate = useNavigate(); // Ensure you have a Router component wrapping this component

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	const notifyA = (message) => toast.error(message);
	const notifyB = (message) => toast.success(message);

	const postData = async () => {
		
		
		if (!emailRegex.test(email)) {
			notifyA("Invalid Email");
			return;
		}
		try {
			const response = await axios.post("https://discordback.onrender.com/login", {
				email,
				password,
			});

     console.log(response);
			if (response.data.error) {
				notifyA(response.data.error);
			} else {
				notifyB("Signed In Successfully");
				console.log(response.data);
				localStorage.setItem("jwt", response.data.token);
				localStorage.setItem("user", JSON.stringify(response.data.user));

				// Redirect after login
				navigate("/");
			}
		} catch (error) {
			if (error.response?.data?.error) {
				console.log(error.response.data.error);
				
				notifyA(error.response.data.error);
			} else {
				console.error(error);
				notifyA("An error occurred during the request.");
			}
		}
	};

	return (
		<div className="snowflake-container">
			{/* Generate 50 snowflakes dynamically */}
			{Array.from({ length: 50 }).map((_, index) => (
				<div className="snowflake" key={index}></div>
			))}

			<div style={{ width: "100vw" }}>
				<div className={login.signinContainer}>
					<div className={login.signinBox}>
						<button
							type="button"
							className={login.backButton}
							onClick={() => navigate(-1)} // Go back to the previous page
						>
								<GoArrowLeft style={{ marginTop: "-3px" }} />
								<span style={{ marginLeft: "5px" }}> Back</span>
						</button>
						<h2 className={login.signinHeading}>Sign in to your account</h2>
						<form
							className={login.signinForm}
							onSubmit={(e) => {
								e.preventDefault(); // Prevent default form submission
								postData();
							}}
						>
						
					<div className={login.inputGroup}>
								<input
									type="email"
									className={login.signinInput}
									placeholder="Email address"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className={login.inputGroup}>
								<input
									type="password"
									className={login.signinInput}
									placeholder="Password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<a href="/forgot-password" className={login.forgotPasswordLink}>
								Forgot your password?
							</a>
							<button type="submit" className={login.LoginButton}>
								LOG IN
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
