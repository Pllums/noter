import { useState } from "react";
import { motion } from "framer-motion";
import { Theme, useTheme } from "../../components/ThemeProvider/ThemeContext";
import "./Greeting.css";
interface IProps {
	closeGreeting: () => void;
}
export default function Greeting(props: IProps) {
	const [startGreeting, setStartGreeting] = useState(true);

	let greetingClasses: string = "greeting-wrapper";
	const greetingDarkMode: string = " greeting-dark-mode";

	const { theme } = useTheme();
	if (theme === Theme.Dark) {
		greetingClasses += greetingDarkMode;
	} else {
		greetingClasses = "greeting-wrapper";
	}

	return (
		<>
			{startGreeting ? (
				<motion.div
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
					className={greetingClasses}>
					<div>
						<motion.h1
							onClick={props.closeGreeting}
							initial={{ opacity: 1, x: "-.5rem" }}
							animate={{ opacity: 1, x: "-.5rem", rotate: [-20, 20, -20] }}
							transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}>
							👋
						</motion.h1>
						<motion.h2
							layoutId="noter"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.75, duration: 0.5 }}>
							Hi, I'm Noter
						</motion.h2>
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1 }}>
							High-five me to get started
						</motion.p>
					</div>
				</motion.div>
			) : null}
		</>
	);
}
