import { motion } from "framer-motion";
import "./SavedNote.css";

interface IProps {
	title: string;
	content: string;
	deleteNote: any;
	position: number;
}

function SavedNote(props: IProps) {
	const note = { title: props.title, content: props.content };
	// console.log(props.position);

	function handleDelete() {
		props.deleteNote(props.position);
	}

	return (
		<motion.div
			drag={true}
			exit={{ opacity: 0 }}
			layoutId={note.title}
			className="saved-note-wrapper">
			<h2 className="note-title">{note.title}</h2>
			<hr />
			<p className="note-content">{note.content}</p>
			<div className="close-button">
				<button onClick={handleDelete}>DELETE</button>
				{/* input an "X" button here later  */}
			</div>
		</motion.div>
	);
}

export default SavedNote;
