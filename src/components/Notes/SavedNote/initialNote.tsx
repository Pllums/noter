import { useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { Theme, useTheme } from "../../ThemeProvider/ThemeContext";

import "./SavedNote.css";

interface IProps {
	// title: string;
	// content: string;
	deleteNote: any;
	// position: number | null;
}
let noteWrapperClasses: string = "saved-note-wrapper";
let noteDarkMode: string = " saved-note-dark-mode";

function InitialNote(props: IProps) {
	const { theme } = useTheme();
	const [isShown, setIsShown] = useState(true);

	const dragControls = useDragControls();
	function startDrag(event: any) {
		dragControls.start(event);
	}

	if (theme === Theme.Dark) {
		noteWrapperClasses += noteDarkMode;
	} else {
		noteWrapperClasses = "saved-note-wrapper";
	}
	function handleDelete() {
		props.deleteNote(false);
	}

	return (
		<motion.div
			drag
			dragMomentum={false}
			dragControls={dragControls}
			dragListener={false}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={noteWrapperClasses}>
			<div className="drag-div" onPointerDown={startDrag}></div>
			<h2 className="note-title">Hey there 👋</h2>
			<hr />
			<p className="note-content">
				You can drag me around or delete me if you wish. New notes are created
				by hitting the plus sign in the corner of the this card!
			</p>
			<div className="edit-wrapper">
				<motion.button
					initial={{ scale: 2 }}
					whileTap={{ scale: 1.5 }}
					whileHover={{ scale: 2.1 }}
					className="delete-button"
					onClick={() => handleDelete()}>
					<i className="fa-solid fa-trash-can"></i>
				</motion.button>
			</div>
		</motion.div>
	);
}

export default InitialNote;
