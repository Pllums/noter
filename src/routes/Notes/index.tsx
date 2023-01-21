import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Greeting from "../Greeting";
import Header from "../../components/Header";
import NewNote from "../../components/Notes/NewNote";
import ViewedNote from "../../components/Notes/ViewedNote";
import NewNoteButton from "../../components/Notes/NewNoteButton";
import SavedNote from "../../components/Notes/SavedNote";
import { useTheme, Theme } from "../../components/ThemeProvider/ThemeContext";
import InitialNote from "../../components/Notes/SavedNote/initialNote";
import DeleteCheck from "../../components/Notes/DeleteCheck";
import "./Notes.css";

interface IState {
	layoutId: string;
	newClicked: boolean;
	editClicked: boolean;
	editedKey: number;
	notesArray: { title: string; content: string }[];
	singleNote: { title: string; content: string };
}

let notesPageClasses: string = "notes-page";
const notesPageDark: string = " notes-page-dark-mode";

export default function NotesPage() {
	const [newClicked, setNewClicked] = useState<IState["newClicked"]>(false); // state for new note button click
	const [editClicked, setEditClicked] = useState<IState["editClicked"]>(false); // state for edit note button click
	const [editedNote, setEditedNote] = useState({ title: "", content: "" });
	const [editedKey, setEditedKey] = useState<IState["editedKey"]>(0);
	const [deleteClicked, setDeleteClicked] = useState(false);
	const [deleteChoice, setDeleteChoice] = useState(Number);

	const [notes, setNotes] = useState<IState["notesArray"]>([]); // state to hold array of notes before push to LS
	const { theme, setTheme } = useTheme(); // custom hook to distribute theme using useContext
	const [startGreeting, setStartGreeting] = useState(true); // state to control the opending greeting
	const [showInitNote, setShowInitNote] = useState(true); // state allowing deletion of initial note

	if (theme === Theme.Dark) {
		notesPageClasses += notesPageDark;
	} else {
		notesPageClasses = "notes-page";
	}

	//Local Storage for Notes List
	useEffect(() => {
		const data = localStorage.getItem("NOTES_LIST");
		if (data !== null) {
			setNotes(JSON.parse(data!));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("NOTES_LIST", JSON.stringify(notes));
	}, [notes]);

	// Local Storage for Theme Preference
	useEffect(() => {
		const data = localStorage.getItem("THEME_PREF");
		if (data !== null) {
			setTheme(JSON.parse(data!));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("THEME_PREF", JSON.stringify(theme));
	}, [theme]);

	//Local Storage for Initial note / Currently set to render initial note every load
	// useEffect(() => {}
	// 	const data = localStorage.getItem("SHOW_INITIAL_NOTE");
	// 	if (data !== null) {
	// 		setShowInitNote(JSON.parse(data!));
	// 	}
	// }, []);

	// useEffect(() => {
	// 	localStorage.setItem("SHOW_INITIAL_NOTE", JSON.stringify(showInitNote));
	// }, [showInitNote]);

	//Open the New Note Form
	function handleOpen() {
		setNewClicked(true);
	}

	function handleEdit(note: { title: string; content: string }, key: number) {
		setEditClicked(true);
		setEditedNote(note);
		setEditedKey(key);
	}

	// Save and Delete Notes and Initial Note
	function handleSave(newNote: { title: string; content: string }) {
		// console.log(newNote);

		if (newClicked) {
			setNotes((prevNotes) => {
				return [...prevNotes, newNote];
			});
			setNewClicked(false);
		} else if (editClicked) {
			notes[editedKey].title = newNote.title;
			notes[editedKey].content = newNote.content;
			console.log(notes[editedKey]);
			setEditClicked(!editClicked);
		}
	}

	//Editing and Deleting of existing Notes

	function clickDelete(position: number) {
		setDeleteClicked(!deleteClicked);
		setDeleteChoice(position);
	}

	function checkDelete(key: number) {
		console.log(deleteChoice);

		if (key >= 0) {
			deleteNote(deleteChoice);
			setDeleteClicked(!deleteClicked);
		} else alert("Note was not deleted.");
		setDeleteClicked(!deleteClicked);
	}

	function deleteNote(note: any) {
		setNotes((prevNotes) => {
			return prevNotes.filter((noteItem, index) => {
				return index !== note;
			});
		});
	}
	function hideInitial() {
		setShowInitNote(!showInitNote);
	}

	function cancel() {
		if (newClicked) {
			setNewClicked(!newClicked);
		}
		if (editClicked) {
			setEditClicked(!editClicked);
		}
		if (deleteClicked) {
			alert("Note was not deleted");
			setDeleteClicked(!deleteClicked);
		}
	}

	//Setting the Theme
	function toggleTheme() {
		if (theme === Theme.Light) {
			setTheme(Theme.Dark);
		} else {
			setTheme(Theme.Light);
		}
	}

	return (
		<section id="notes-page" className={notesPageClasses}>
			<AnimatePresence>
				{startGreeting ? (
					<Greeting closeGreeting={() => setStartGreeting(false)} />
				) : (
					<>
						<Header toggleTheme={toggleTheme} />
						<div className="notes-grid">
							{showInitNote ? <InitialNote deleteNote={hideInitial} /> : null}
							<AnimatePresence>
								{notes.map((note, key: number) => (
									<>
										<SavedNote
											key={key}
											position={key}
											layoutId={key.toString()}
											title={note.title}
											content={note.content}
											deleteNote={clickDelete}
											editNote={() => handleEdit(note, key)}
										/>
										{deleteClicked && (
											<DeleteCheck
												noButton={cancel}
												yesButton={() => checkDelete(deleteChoice)}
											/>
										)}
										<AnimatePresence>
											{editClicked && (
												<ViewedNote
													key={key}
													layoutId={editedKey.toString()}
													currentTitle={editedNote.title}
													currentContent={editedNote.content}
													cancelNote={cancel}
													saveEdit={handleSave}
												/>
											)}
										</AnimatePresence>
									</>
								))}
							</AnimatePresence>
						</div>
						<AnimatePresence>
							<NewNoteButton openNew={handleOpen} />
						</AnimatePresence>
						<AnimatePresence>
							{newClicked && (
								<NewNote
									layoutId={"newNote"}
									cancelNote={cancel}
									addNote={handleSave}
								/>
							)}
						</AnimatePresence>
					</>
				)}
			</AnimatePresence>
		</section>
	);
}
