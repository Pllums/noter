import { useState } from "react";
import NewNote from "../../components/Notes/NewNote";
import NewNoteButton from "../../components/Notes/NewNoteButton";
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
	function handleClose() {
		setClicked(false);
	}

	return (
		<section id="notes-page">
			<NewNote addNote={handleClose} />
			<NewNoteButton openNew={handleOpen} />
		</section>
	);
}
