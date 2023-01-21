import { useState } from "react";
import { motion } from "framer-motion";
import { Theme, useTheme } from "../../ThemeProvider/ThemeContext";
import DeleteCheck from "../DeleteCheck";
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
	const [deleteOption, setDeleteOption] = useState(Boolean);
	const { theme } = useTheme();

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
					initial={{ scale: 2 }}
					whileTap={{ scale: 1.5 }}
					whileHover={{ scale: 2.1 }}
					className="edit-button"
					onClick={handleEdit}>
					<i className="fa-regular fa-pen-to-square"></i>
				</motion.button>
				<motion.button
					initial={{ scale: 2 }}
					whileTap={{ scale: 1.5 }}
					whileHover={{ scale: 2.1 }}
					className="delete-button"
					onClick={handleDelete}>
					<i className="fa-solid fa-trash-can"></i>
				</motion.button>
			</div>
		</motion.div>
	);
}

export default SavedNote;
