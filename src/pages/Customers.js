import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";

export default function Customers() {
	const [customers, setCustomers] = useState();

	const [show, setShow] = useState(false);

	function toggleShow(){
		setShow(!show);
	}


	useEffect(() => {
		// console.log("Featching...");
		fetch(baseUrl +"/api/customers/" )
			.then((response) => response.json())
			.then((data) => {
				// console.log(data, data.customers[0].name);
				setCustomers(data.customers);
			});
	}, []);

	function newCustomer(name, industry){
		const data = {name: name, industry: industry};
		const url = baseUrl + 'api/customers/';
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then((response)=>{
			if(!response.ok){
				throw new Error('something went wrong');
			}
			return response.json();
		})
		.then((data) => {
			toggleShow();
			console.log(data);
			console.log([...customers]);
			setCustomers([...customers, data.customer]);
		})
		.catch((e) => console.log(e));
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
