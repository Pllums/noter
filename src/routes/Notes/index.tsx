import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import NewNote from "../../components/Notes/NewNote";
import NewNoteButton from "../../components/Notes/NewNoteButton";
import SavedNote from "../../components/Notes/SavedNote";
import "./Notes.css";

interface IState {
	layoutId: string;
	clicked: boolean;
	notesArray: { title: string; content: string }[];
	singleNote: { title: string; content: string };
}

export default function NotesPage() {
	const [clicked, setClicked] = useState<IState["clicked"]>(false);

	const [layoutId, setLayoutId] = useState<IState["layoutId"]>("");

	const [notes, setNotes] = useState<IState["notesArray"]>([]);

	function handleOpen() {
		setLayoutId("newNote");
		setClicked(true);
	}

	function handleSave(newNote: any) {
		// stop the function from adding an empty note to the notes array
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
				{notes.map((note, key: number) => (
					<SavedNote
						key={key}
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
				{clicked && (
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
