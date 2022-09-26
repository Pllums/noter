import { motion } from "framer-motion";
import { Theme, useTheme } from "../../ThemeProvider/ThemeContext";
import "./NewNoteButton.css";

interface IProps {
	openNew: () => void;
}

let buttonClasses: string = "plus-circle";
const buttonClassesDark: string = " plus-circle-dark";

export default function NewNoteButton(props: IProps) {
	const { theme } = useTheme();

	if (theme === Theme.Dark) {
		buttonClasses += buttonClassesDark;
	} else {
		buttonClasses = "plus-circle";
	}

	return (
		<>
			<motion.div
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				// initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				// exit={{ scale: 0, opacity: 0 }}
				onClick={props.openNew}
				layoutId="newNote"
				className={buttonClasses}>
				<i className="fa-solid fa-plus"></i>
			</motion.div>
		</>
	);
}
