import { motion } from "framer-motion";
import "./NewNote.css";

interface IProps {
	addNote: () => void;
}

export default function NewNote(props: IProps) {
	return (
		<motion.div
			layoutId="newNote"
			className="note-form-wrapper"
			animate={{ scale: 1, opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ type: "spring", stiffness: 115, damping: 13 }}>
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
