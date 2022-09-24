import { useState } from "react";
import { motion } from "framer-motion";
import "./NewNote.css";

interface IProps {
	layoutId: string; // potentially use array.index[] and then stringify to convert int to string to be usable by layout props
	addNote: any;
	cancelNote: () => void;
}

interface IState {
	note: { title: string; content: string };
}

export default function NewNote(props: IProps) {
	const [note, setNote] = useState<IState["note"]>({ title: "", content: "" });

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
		setNote({ title: "", content: "" });
		props.cancelNote();
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
			className="note-form-wrapper"
			animate={{ scale: 1, opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ type: "spring", stiffness: 115, damping: 15 }}>
			{/* <motion.form> */}
			<motion.div className="note-form-title">
				<input
					onChange={handleChange}
					name="title"
					value={note.title}
					type="text"
					placeholder="Note Title"
					maxLength={25}></input>
			</motion.div>
			<motion.div className="note-form-content">
				<textarea
					onChange={handleChange}
					name="content"
					value={note.content}
					placeholder="Type your note here"
					maxLength={500}></textarea>
			</motion.div>
			<button onClick={abortNote}>Cancel</button>
			<button onClick={saveNote}>Save</button>
			{/* </motion.form> */}
		</motion.div>
	);
}
