import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { baseUrl } from "../shared";

export default function Customers() {
	const [customers, setCustomers] = useState();

	useEffect(() => {
		console.log("Featching...");
		fetch(baseUrl +"/api/customers/" )
			.then((response) => response.json())
			.then((data) => {
				console.log(data, data.customers[0].name);
				setCustomers(data.customers);
			});
	}, []);
	return (
		<>
			<h1>Here are our customers!</h1>
			{customers
				? customers.map((customer) => {
						return (
						<ul>
							<li>
							<Link to={"/Customers/" + customer.id}>{customer.name}</Link>
							</li>
						</ul>);
				  })
				: null}
		</>
	);
}
