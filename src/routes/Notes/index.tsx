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
		setNotes((prevNotes) => {
			return [...prevNotes, newNote];
		});
		window.localStorage.setItem("NOTER_NOTE_LIST", JSON.stringify(notes));
		setClicked(false);
	}

	function deleteNote(note: any) {
		setNotes((prevNotes) => {
			return prevNotes.filter((noteItem, index) => {
				return index !== note;
			});
		});
	}
	function cancelNote() {
		setClicked(false);
	}
	const notesList: [{ title: string; content: string }] = JSON.parse(
		localStorage.getItem("NOTER_NOTE_LIST") || "{}"
	);
	return (
		<section id="notes-page">
			<div className="notes-grid">
				<AnimatePresence>
					{notesList.map((note, key: number) => (
						<SavedNote
							key={key}
							position={key}
							title={note.title}
							content={note.content}
							deleteNote={deleteNote}
						/>
					))}
				</AnimatePresence>
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
