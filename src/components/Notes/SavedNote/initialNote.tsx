import { useState } from "react";
import { motion } from "framer-motion";
import { Theme, useTheme } from "../../ThemeProvider/ThemeContext";

import "./SavedNote.css";

interface IProps {
	// title: string;
	// content: string;
	deleteNote: any;
	// position: number | null;
}

let noteWrapperClasses: string = "saved-note-wrapper";
let noteDarkMode: string = " saved-note-dark-mode";

function InitialNote(props: IProps) {
	const { theme, setTheme } = useTheme();
	const [isShown, setIsShown] = useState(true);

	if (theme === Theme.Dark) {
		noteWrapperClasses += noteDarkMode;
	} else {
		noteWrapperClasses = "saved-note-wrapper";
	}
	function handleDelete() {
		props.deleteNote(false);
	}

	return (
		<motion.div
			drag={true}
			dragMomentum={false}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={noteWrapperClasses}>
			<h2 className="note-title">Hey there 👋</h2>
			<hr />
			<p className="note-content">
				"I'm a note. You can drag me around or delete me if you wish. Oh, and
				don't forget to make new notes by hitting the plus sign in the corner of
				the page!"
			</p>
			<div className="delete-wrapper">
				<motion.button
					whileTap={{ scale: 0.9 }}
					whileHover={{ scale: 1.1 }}
					className="delete-button"
					onClick={() => handleDelete()}>
					DELETE
				</motion.button>
				{/* input an "X" button here later  */}
			</div>
		</motion.div>
	);
}

export default InitialNote;
