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

	function handleChange(e: any) {
		const { name, value } = e.target;
		setNote((prevNote) => {
			return { ...prevNote, [name]: value };
		});
	}

	function abortNote() {
		setNote({ title: "", content: "" });
		props.cancelNote();
	}

	function saveNote(note: any) {
		props.addNote(note);
	}

	return (
		<motion.div
			layoutId={props.layoutId}
			className="note-form-wrapper"
			animate={{ scale: 1, opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ type: "spring", stiffness: 115, damping: 13 }}>
			{/* <motion.form> */}
			<motion.div className="note-form-title">
				<input
					onChange={handleChange}
					name="title"
					value={note.title}
					type="text"
					placeholder="Note Title"></input>
			</motion.div>
			<motion.div className="note-form-content">
				<input
					onChange={handleChange}
					name="content"
					value={note.content}
					type="textarea"
					placeholder="Type your note here"></input>
			</motion.div>
			<button onClick={abortNote}>Cancel</button>
			<button onClick={props.addNote(note)}>Save</button>
			{/* </motion.form> */}
		</motion.div>
	);
}
