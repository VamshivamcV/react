import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NotFound from "../components/NotFound";
import { baseUrl } from "../shared";

export default function Customer() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [customerr, setCustomerr] = useState();
	const [notFound, setNotFound] = useState(false);
	const [tempCustomer, setTempCustomer] = useState();
	const [changed, setChanged] = useState(false);
    const [error, setError] = useState();

	useEffect(() => {
		if (!customerr) return;
		if (!customerr) return;
		let equal = true;
		if (customerr.name !== tempCustomer.name) equal = false;
		if (customerr.industry !== tempCustomer.industry) equal = false;
		if (equal) setChanged(false);
	});

	useEffect(() => {
		const url = baseUrl + "/api/customers/" + id;
		fetch(url)
			.then((response) => {
				if (response.status === 404) {
					setNotFound(true);
				}

                if (!response.ok){
                    console.log('response', response);
                    throw new Error('Something went wrong, try again later');
                }

				return response.json();
			})
			.then((data) => {
				// if (data === null) {
				// 	return null;
				// }
				setCustomerr(data.customer);
				setTempCustomer(data.customer);
                setError(undefined);
			})
            .catch((e) => {
                setError(e.message);
            });
	}, []);

	function updateCustomer(e) {
        e.preventDefault();
		const url = baseUrl + "api/customers/" + id;
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(tempCustomer),
		})
			.then((response) => {
                console.log('response', response);
                if (!response.ok) throw new Error('somthing went wrong');
				return response.json();
			})
			.then((data) => {
				console.log(data);
				setChanged(false);
                setCustomerr(data.customer);
                setError(undefined);
			})
			.catch((e) => {
                console.log('e', e);
                setError(e.message);
            });
	}

	return (
		<div className="p-3">
			{notFound ? <p>The customer with id: {id} was not found</p> : null}

			{customerr ? (
				<>
				    <form 
                        id="customer" 
                        onSubmit={updateCustomer}
                        className="w-full max-w-sm"
                    >
						<div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">       
                                <label 
                                    for="name"
                                    className="block text-gray-500 font-bold mb-1 md:mb-0 pl-2"
                                >Name</label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    id="name"
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    type="text"
                                    value={tempCustomer.name}
                                    onChange={(e) => {
                                        setChanged(true);
                                        setTempCustomer({
                                            ...tempCustomer,
                                            name: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3">
                                <label 
                                    for="industry"
                                    className="block text-gray-500 font-bold mb-1 md:mb-0 pl-2"
                                >Industry</label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    id="industry"
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    type="text"
                                    value={tempCustomer.industry}
                                    onChange={(e) => {
                                        setChanged(true);
                                        setTempCustomer({
                                            ...tempCustomer,
                                            industry: e.target.value,
                                        });
                                    }}
                                    />
                            </div>
                        </div>
                    </form>

					{changed ? (
						<>
							<button
								className="bg-slate-400 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded my-4 mx-2"
								onClick={(e) => {
									setTempCustomer({ ...customerr });
									setChanged(false);
								}}
							>
								Cancel
							</button>
							<button
                                form="customer"
								className="bg-purple-400 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded my-4 mx-2"
							>
								Save
							</button>
						</>
					) : null}
					<br />
					<button
						className="bg-slate-200 hover:bg-red-300 text-black font-bold py-1 px-2 my-2 rounded"
						onClick={() => {
							const url = baseUrl + "api/customers/" + id;
							fetch(url, {
								method: "DELETE",
								headers: { "Content-type": "application/json" },
							})
								.then((response) => {
									if (!response.ok) {
										throw new Error("Something went wrong");
									}
									navigate("/Customers");
								})
								.catch((e) => {
                                    setError(e.message)
								});
						}}
					>
						Delete
					</button>
				</>
			) : null}
            {error ? <p className="m-2">{error}</p> : null}
			<br />
			<Link 
                to="/Customers"> 
                <button 
                className="no-underline bg-purple-400 hover:bg-purple-700 text-white py-2 px-4 rounded"
                >
                ← Go Back    
                </button></Link>
		</div>
	);
}
