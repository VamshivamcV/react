import "./index.css";
import Employee from "./components/Employee";
import { useState } from "react";
import {v4 as uuidv4} from 'uuid';

function App() {
	const [role, setRole] = useState("dev");
	const [employees, setEmployees] = useState([
		{
			name: "Honey",
			role: "Developer",
			img: "https://images.pexels.com/photos/7013617/pexels-photo-7013617.jpeg",
		},
		{
			name: "Devang",
			role: "DevOps Engineer",
			img: "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg",
		},
		{
			name: "Sal",
			role: "Azure Admin",
			img: "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg",
		},
		{
			name: "Eshwar",
			role: "Business Analyst",
			img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
		},
		{
			name: "Varshi",
			role: "Manager",
			img: "https://images.pexels.com/photos/1832959/pexels-photo-1832959.jpeg",
		},
		{
			name: "Harsha",
			role: "AI Engineer",
			img: "https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg",
		},
	]);
	const showEmployees = true;
	return (
		<div className="App">
			{showEmployees ? (
				<>
					<input
						type="text"
						onChange={(e) => {
							console.log(e.target.value);
							setRole(e.target.value);
						}}
					/>
					<div className="flex flex-wrap justify-center">
						{employees.map((employee) => {
							console.log(uuidv4());
							return (
								<Employee
									key={uuidv4()}
									name={employee.name}
									role={employee.role}
									img={employee.img}
								/>
							);
						})}
					</div>
				</>
			) : (
				<p>you cannot see the employees</p>
			)}
		</div>
	);
}

export default App;
