import { useEffect, useState, useContext } from "react";
import {Link, useNavigate, useLocation} from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";
import { LoginContext } from "../App";

export default function Customers() {

	const [loggedIn, setLoggedIn] = useContext(LoginContext);

	const [customers, setCustomers] = useState();

	const [show, setShow] = useState(false);

	const navigate = useNavigate();

	const location = useLocation();


	function toggleShow(){
		setShow(!show);
	}


	useEffect(() => {
		const url = baseUrl + 'api/customers/';
		fetch(url, {
			method : 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization : 'Bearer ' + localStorage.getItem('access')
			}
		})
			.then((response) => {
				if(response.status === 401){
					setLoggedIn(false);
					navigate('/login', {
						state: {
							previousUrl: location.pathname,
						}
					});
				}
				return response.json();
			})
			.then((data) => {
				setCustomers(data.customers);
            });																																																			
	}, []);

	function newCustomer(name, industry){
		const data = {name: name, industry: industry};
		const url = baseUrl + 'api/customers/';
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization : 'Bearer ' + localStorage.getItem('access')
			},
			body: JSON.stringify(data)
		})
		.then((response)=>{
			if (response.status === 401) {
				navigate('/login', {
					state: {
						previousUrl: location.pathname,
					},
				});
			}
			if(!response.ok){
				throw new Error('something went wrong');
			}
			return response.json();
		})
		.then((data) => {
			toggleShow();
			setCustomers([...customers, data.customer]);
		});
	}

	return (
		<>
			<h1>Here are our customers!</h1>
				{customers
					? customers.map((customer) => {
							return (
								<div 
									className="m-2"
									key={customer.id}
								>
								<Link to={"/Customers/" + customer.id}>
									<button 
									className="no-underline bg-purple-100 hover:bg-purple-400 text-black py-2 px-4 rounded"
									>
									{customer.name}
									</button>
								</Link>
								</div>);
					})
					: null}
			<AddCustomer 
				newCustomer={newCustomer} 
				show = {show}
				toggleShow = {toggleShow}/>

		</>
	);
}
