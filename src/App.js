import "./index.css";
import Employee from "./components/Employee";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";

function App() {
	const [employees, setEmployees] = useState([
		{
			id: 1,
			name: "Honey",
			role: "Developer",
			img: "https://images.pexels.com/photos/7013617/pexels-photo-7013617.jpeg",
		},
		{
			id: 2,
			name: "Devang",
			role: "DevOps Engineer",
			img: "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg",
		},
		{
			id: 3,
			name: "Sal",
			role: "Azure Admin",
			img: "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg",
		},
		{
			id: 4,
			name: "Eshwar",
			role: "Business Analyst",
			img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
		},
		{
			id: 5,
			name: "Varshi",
			role: "Manager",
			img: "https://images.pexels.com/photos/1832959/pexels-photo-1832959.jpeg",
		},
		{
			id: 6,
			name: "Harsha",
			role: "AI Engineer",
			img: "https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg",
		},
	]);

	function updateEmployee(id, newName, newRole) {
		const updatedEmployees = employees.map((employee) => {
			if (id == employee.id) {
				return {
					...employee,
					name: newName,
					role: newRole,
				};
			}

			return employee;
		});
		setEmployees(updatedEmployees);
	}

	function newEmployee(name, role, img) {
		const newEmployees = {
			id: uuidv4(),
			name: name,
			role: role,
			img: img,
		};
		setEmployees([...employees, newEmployees]);
	}

	const showEmployees = true;
	return (
		<div className="App">
			{showEmployees ? (
				<>
					<div className="flex flex-wrap justify-center">
						{employees.map((employee) => {
							const editEmployee = (
								<EditEmployee
									id={employee.id}
									name={employee.name}
									role={employee.role}
									updateEmployee={updateEmployee}
								/>
							);
							return (
								<Employee
									key={employee.id}
									id={employee.id}
									name={employee.name}
									role={employee.role}
									img={employee.img}
									editEmployee={editEmployee}
								/>
							);
						})}
					</div>
					<AddEmployee newEmployee={newEmployee} />
				</>
			) : (
				<p>you cannot see the employees</p>
			)}
		</div>
	);
}

export default App;
