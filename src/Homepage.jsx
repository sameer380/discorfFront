import React from 'react'
import "./homepage.css"
import { Link } from 'react-router-dom';
function Homepage() {
	return (
	    <div className="snowflake-container">
			{/* Generate 50 snowflakes dynamically */}
			{Array.from({ length: 50 }).map((_, index) => (
				<div className="snowflake" key={index}></div>
			))}

		<div>
			<div className="app">
				{/* Logo Section */}
				<div className="logo-container">
					<img
						src="https://www.therealworld-tate.info/wp-content/uploads/2023/05/the-real-world-andrew-tate-logo.png" // Replace with your logo's path
						alt="Logo"
						className="logo"
					/>
					<h1 className="title">THE REAL WORLD</h1>
				</div>

				{/* Login Section */}
				<div className="login-container" style={{display:"flex", flexDirection:"column"}}>
					<Link className="no-account-text" to="/register">I don’t have an account</Link>
					<Link className="login-button" to="/login">LOG IN</Link>
				</div>
			</div>
			</div>
			</div>
	);
}

export default Homepage
