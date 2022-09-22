import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import NewNote from "../../components/Notes/NewNote";
import NewNoteButton from "../../components/Notes/NewNoteButton";
import SavedNote from "../../components/Notes/SavedNote";
import savedNotes from "../../components/Notes/SavedNote/savedNotes";
import "./Notes.css";

export default function NotesPage() {
	interface IState {
		layoutId: string;
		clicked: boolean;
		notesArray: { title: string; content: string }[];
		singleNote: { title: string; content: string };
	}

	const [clicked, setClicked] = useState<IState["clicked"]>(false);

	const [layoutId, setLayoutId] = useState<IState["layoutId"]>("");

	const [notes, setNotes] = useState<IState["notesArray"]>([
		{ title: "", content: "" },
	]);

	function handleOpen() {
		setLayoutId("newNote");
		setClicked(true);
	}

	function handleSave(newNote: any) {
		setNotes((prevNotes) => {
			return [...prevNotes, newNote];
		});
		setClicked(false);
	}

	function cancelNote() {
		setClicked(false);
	}

	return (
		<section id="notes-page">
			<div className="notes-grid">
				{savedNotes.map((note) => (
					<SavedNote
						title={note.title}
						content={note.content}
						// deleteNote={deleteNote}
					/>
				))}
			</div>
			<AnimatePresence>
				<NewNoteButton openNew={handleOpen} />
			</AnimatePresence>
			<AnimatePresence>
				{clicked === true && (
					<NewNote
						layoutId={layoutId}
						cancelNote={cancelNote}
						addNote={handleSave}
					/>
				)}
			</AnimatePresence>
		</section>
	);
}
