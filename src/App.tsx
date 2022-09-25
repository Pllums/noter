import React, { useState } from "react";
import "./App.css";
// import Header from "./components/Header";
import { ThemeContext, Theme } from "./components/ThemeProvider/ThemeContext";
import NotesPage from "./routes/Notes";

function App() {
	const [theme, setTheme] = useState(Theme.Light);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			<NotesPage />
		</ThemeContext.Provider>
	);
}

export default App;
