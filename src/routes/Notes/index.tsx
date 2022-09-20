import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import NewNote from "../../components/Notes/NewNote";
import NewNoteButton from "../../components/Notes/NewNoteButton";
import SavedNote from "../../components/Notes/SavedNote";
import savedNotes from "../../components/Notes/SavedNote/savedNotes";
import "./Notes.css";

export default function NotesPage() {
	interface IState {
		clicked: boolean;
	}
	const [clicked, setClicked] = useState<IState["clicked"]>(false);

	function handleOpen() {
		setClicked(true);
		console.log(clicked);
	}
	function handleSave() {
		setClicked(false);
	}

	return (
		<section id="notes-page">
			<div className="notes-grid">
				{savedNotes.map((note) => (
					<SavedNote title={note.title} content={note.content} />
				))}
			</div>
			<AnimatePresence>
				<NewNoteButton openNew={handleOpen} />
			</AnimatePresence>
			<AnimatePresence>
				{clicked && <NewNote addNote={handleSave} />}
			</AnimatePresence>
		</section>
	);
}
