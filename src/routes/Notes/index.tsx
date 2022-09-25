import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import NewNote from "../../components/Notes/NewNote";
import NewNoteButton from "../../components/Notes/NewNoteButton";
import SavedNote from "../../components/Notes/SavedNote";
import { useTheme, Theme } from "../../components/ThemeProvider/ThemeContext";

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

	const { theme, setTheme } = useTheme();

	useEffect(() => {
		const data = localStorage.getItem("NOTES_LIST");
		if (data !== null) {
			setNotes(JSON.parse(data!));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("NOTES_LIST", JSON.stringify(notes));
	}, [notes]);

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

	return (
		<section id="notes-page">
			<header>
				<button onClick={() => setTheme(Theme.Dark)}>Dark Mode</button>
				<button onClick={() => setTheme(Theme.Light)}>Light Mode</button>
			</header>
			<div className="notes-grid">
				<AnimatePresence>
					{notes.map((note, key: number) => (
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
