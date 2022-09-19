import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";

function App() {
	// interface IState {
	// 	user: { name: string };
	// }

	// const [name, setName] = useState<IState["user"]>();
	// const [user, setUser] = useState("");
	// const handleChange = (e) => {
	// 	const newName = e.target.value;
	// 	setName(newName);
	// };

	// function handleNewUser(){
	// 	setUser(name);
	// }

	return (
		<div className="App">
			<header className="App-header">
				<div>
					<form>
						<input
							name="name"
							type="text"
							placeholder="Enter your name"></input>
						<button>Submit</button>
					</form>
				</div>
			</header>
		</div>
	);
}

export default App;
