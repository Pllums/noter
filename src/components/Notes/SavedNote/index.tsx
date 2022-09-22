import { motion } from "framer-motion";

interface IProps {
	title: string;
	content: string;
	// deleteNote: () => void;
}

function SavedNote(props: IProps) {
	return (
		<motion.div className="saved-note-wrapper">
			<h2 className="note-title">{props.title}</h2>
			<hr />
			<p className="note-content">{props.content}</p>
			<div className="close-button">
				<button>DELETE</button>
				{/* <button onClick={props.deleteNote}>DELETE</button> */}

				{/* input an "X" button here later  */}
			</div>
		</motion.div>
	);
}

export default SavedNote;
