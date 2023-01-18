import { useState } from "react";
import { motion } from "framer-motion";
import "./ViewedNote.css";
import { Theme, useTheme } from "../../ThemeProvider/ThemeContext";

interface IProps {
	layoutId: string; // potentially use array.index[] and then stringify to convert int to string to be usable by layout props
	addNote: any;
	currentTitle: string;
	currentContent: string;
	cancelNote?: () => void;
}

interface IState {
	note: { title: string; content: string };
}

let newNoteClasses: string = "note-form-wrapper";
const newNoteDarkMode: string = " dark";

const dragConstraints = { top: 0, right: 0, bottom: 0, left: 0 };

export default function ViewedNote(props: IProps) {
	//Setting beginning state of each editable note

	const [note, setNote] = useState<IState["note"]>({
		title: props.currentTitle,
		content: props.currentContent,
	});

	const { theme } = useTheme();

	if (theme === Theme.Dark) {
		newNoteClasses += newNoteDarkMode;
	} else {
		newNoteClasses = "note-form-wrapper";
	}

	//Update the note title and content

	function handleChange(
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) {
		const { name, value } = e.target;
		setNote((prevNote) => {
			return { ...prevNote, [name]: value };
		});
	}

	//Cancel saving the note
	function abortNote() {
		setNote({ title: note.title, content: note.content });
		// props.cancelNote();
	}

	// No blank notes
	function saveNote() {
		if (note.title !== "" && note.content !== "") {
			props.addNote(note);
		} else console.log("One or more fields is empty. Note not saved.");
	}

	return (
		<motion.div
			layoutId={props.layoutId}
			className={newNoteClasses}
			animate={{ scale: 1, opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ type: "spring", stiffness: 115, damping: 15 }}>
			{/* <motion.form> */}
			<h2>Need to make a change?</h2>
			<motion.div className="note-input-wrapper">
				<input
					className="new-note-input"
					onChange={handleChange}
					name="title"
					value={note.title}
					type="text"
					placeholder="Note Title"
					maxLength={25}></input>
				<textarea
					className="new-note-input"
					onChange={handleChange}
					name="content"
					value={note.content}
					placeholder="Type your note here"
					maxLength={500}></textarea>
			</motion.div>
			<div className="button-grid">
				<div className="note-form-button">
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={abortNote}>
						Cancel
					</motion.button>
				</div>
				<div className="note-form-button">
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={saveNote}>
						Save
					</motion.button>
				</div>
			</div>
			{/* </motion.form> */}
		</motion.div>
	);
}
