import React, { createContext, useState } from "react";
import {
	NoterUserInfo,
	useSession,
} from "./components/CustomHooks/use-seesion";
import { ThemeContext, Theme } from "./components/ThemeProvider/ThemeContext";
import NotesPage from "./routes/Notes";
import "./App.css";

export const UserContext = createContext<NoterUserInfo>({
	session: null,
	profile: null,
});

function App() {
	const [theme, setTheme] = useState(Theme.Light);

	const noterUserInfo = useSession();
	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			<UserContext.Provider value={noterUserInfo}>
				<NotesPage />
			</UserContext.Provider>
		</ThemeContext.Provider>
	);
}

export default App;
