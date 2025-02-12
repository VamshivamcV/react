import { useEffect, useState, useContext } from "react";
import { baseUrl } from "../shared";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

export default function Register() {
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const location = useLocation();
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useContext(LoginContext);

	useEffect(()=>{
		localStorage.clear();
		setLoggedIn(false);
	}, []);

	function login(e) {
		e.preventDefault();
		const url = baseUrl + "api/register/";
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				username: username,
				password: password,
			}),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				localStorage.setItem("access", data.access);
				localStorage.setItem("refresh", data.refresh);
                setLoggedIn(true);
                navigate(
                    location?.state?.previousUrl 
                    ? location.state.previousUrl 
                    : '/Customers'
                );
			});
	}

	return (
		<form id="customer" onSubmit={login} className="m-2 w-full max-w-sm">

<div className="md:flex md:items-center mb-6">
				<div className="md:w-1/3">
					<label
						htmlFor="email"
						className="block text-gray-500 font-bold mb-1 md:mb-0 pl-2"
					>
						Email
					</label>
				</div>
				<div className="md:w-2/3">
					<input
						id="email"
						className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						type="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
				</div>
			</div>
			<div className="md:flex md:items-center mb-6">
				<div className="md:w-1/3">
					<label
						htmlFor="username"
						className="block text-gray-500 font-bold mb-1 md:mb-0 pl-2"
					>
						Username
					</label>
				</div>
				<div className="md:w-2/3">
					<input
						id="username"
						className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						type="text"
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>
				</div>
			</div>
			<div className="md:flex md:items-center mb-6">
				<div className="md:w-1/3">
					<label
						htmlFor="password"
						className="block text-gray-500 font-bold mb-1 md:mb-0 pl-2"
					>
						Password
					</label>
				</div>
				<div className="md:w-2/3">
					<input
						id="password"
						className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						type="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</div>
			</div>
			<button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
				Register
			</button>
		</form>
	);
}
