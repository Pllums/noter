import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { UserContext } from "../../App";
import { Theme, useTheme } from "../ThemeProvider/ThemeContext";
import "./Header.css";

interface IProps {
	toggleTheme: () => void;
}

// const buttonVariants = {
// 	hidden: {
// 		opacity: 0,
// 		x: 50,
// 	},
// 	visible: { opacity: 1, x: 0 },
// };

let headerClasses: string = "";
const headerDarkMode: string = " header-dark-mode";

export default function Header(props: IProps) {
	const { theme } = useTheme();
	const { session } = useContext(UserContext);

	if (theme === Theme.Dark) {
		headerClasses += headerDarkMode;
	} else {
		headerClasses = "";
	}
	return (
		<header className={headerClasses}>
			<div className="header-grid">
				<div className="header-title">
					<motion.h1 layoutId="noter">Noter</motion.h1>
				</div>
				<div>{session?.user ? "User is logged in" : "User is logged out"}</div>
				<div className="header-theme" onClick={props.toggleTheme}>
					<span>Toggle Theme:</span>{" "}
					<AnimatePresence>
						<button className="theme-button">
							{theme === Theme.Dark ? (
								<motion.div>
									<motion.i className="fa-solid fa-sun"></motion.i>
								</motion.div>
							) : (
								<motion.div>
									<motion.i className="fa-regular fa-moon"></motion.i>
								</motion.div>
							)}
						</button>
					</AnimatePresence>
				</div>
			</div>
		</header>
	);
}
