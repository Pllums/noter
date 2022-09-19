import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./NewNote.css";

interface IProps {
	addNote: () => void;
}

export default function NewNote(props: IProps) {
	return (
		<motion.div
			layoutId="newNote"
			className="note-form-wrapper"
			initial={{ scale: 0, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}>
			<motion.div className="note-form-title">
				<input type="text" placeholder="Note Title"></input>
			</motion.div>
			<motion.div className="note-form-content">
				<input type="textarea" placeholder="Type your note here"></input>
			</motion.div>
			<button onClick={props.addNote}>Save</button>
		</motion.div>
	);
}
