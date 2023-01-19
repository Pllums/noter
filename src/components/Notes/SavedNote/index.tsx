import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ViewedNote from "../ViewedNote";
import { Theme, useTheme } from "../../ThemeProvider/ThemeContext";

import "./SavedNote.css";

interface IProps {
	title: string;
	content: string;
	deleteNote: any;
	editNote: any;
	position: number | null;
	layoutId: string;
}

let noteWrapperClasses: string = "saved-note-wrapper";
let noteDarkMode: string = " saved-note-dark-mode";

function SavedNote(props: IProps) {
	const note = { title: props.title, content: props.content };
	const { theme, setTheme } = useTheme();
	const [editClicked, setEditClicked] = useState(false);

	if (theme === Theme.Dark) {
		noteWrapperClasses += noteDarkMode;
	} else {
		noteWrapperClasses = "saved-note-wrapper";
	}
	function handleDelete() {
		props.deleteNote(props.position);
	}

	//Handle editing the note after creation

	function handleEdit(note: {}) {
		props.editNote();
	}

	return (
		<motion.div
			drag={true}
			dragMomentum={false}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			layoutId={props.layoutId}
			className={noteWrapperClasses}>
			<h2 className="note-title">{note.title}</h2>
			<hr />
			<p className="note-content">{note.content}</p>
			<div className="edit-wrapper">
				<motion.button
					whileTap={{ scale: 0.9 }}
					whileHover={{ scale: 1.1 }}
					className="edit-button"
					onClick={handleEdit}>
					EDIT
				</motion.button>
			</div>
			<div className="delete-wrapper">
				<motion.button
					whileTap={{ scale: 0.9 }}
					whileHover={{ scale: 1.1 }}
					className="delete-button"
					onClick={handleDelete}>
					DELETE
				</motion.button>
				{/* input an "X" button here later  */}
			</div>
		</motion.div>
	);
}

export default SavedNote;
