import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NotFound from "../components/NotFound";
import { baseUrl } from "../shared";

export default function Customer() {
	const [customerr, setCustomerr] = useState();
    const [notFound, setNotFound] = useState(false);
	const { id } = useParams();

	useEffect(() => {
        const url = baseUrl +"/api/customers/" + id ;
		fetch(url)
			.then((response) =>{ 
                if(response.status === 404){
                    setNotFound(true)
                    return null
                }
                
                return response.json()})
			.then((data) => {
                if(data === null){
                    return null
                }
				setCustomerr(data.customer);
			});
	}, []);

	return (
		<>  
            {notFound ? <p>The customer with id: {id} was not found</p> : null }
			
			{customerr ? (<>
                        <h5>Here is our customer details!</h5>
						<p>id: {customerr.id}</p>
                        <p>name: {customerr.name}</p>
                        <p>industry: {customerr.industry}</p>
                        </>)
				  : null
                  
                  
                  }
            <Link to="/Customers">Go Back</Link>
		</>
	);
}
