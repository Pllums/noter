import { motion } from "framer-motion";
import "./NewNoteButton.css";

interface IProps {
	openNew: () => void;
}

export default function NewNoteButton(props: IProps) {
	return (
		<>
			<motion.div
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				// initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				// exit={{ scale: 0, opacity: 0 }}
				onClick={props.openNew}
				layoutId="newNote"
				className="plus-circle">
				<i className="fa-solid fa-plus"></i>
			</motion.div>
		</>
	);
}
