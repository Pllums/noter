import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Greeting from "../Greeting";
import Header from "../../components/Header";
import NewNote from "../../components/Notes/NewNote";
import ViewedNote from "../../components/Notes/ViewedNote";
import NewNoteButton from "../../components/Notes/NewNoteButton";
import SavedNote from "../../components/Notes/SavedNote";
import { useTheme, Theme } from "../../components/ThemeProvider/ThemeContext";

import { motion } from "framer-motion";
import "./Notes.css";
import InitialNote from "../../components/Notes/SavedNote/initialNote";

interface IState {
	layoutId: string;
	newClicked: boolean;
	editClicked: boolean;
	notesArray: { title: string; content: string }[];
	singleNote: { title: string; content: string };
}

let notesPageClasses: string = "notes-page";
const notesPageDark: string = " notes-page-dark-mode";

export default function NotesPage() {
	const [newClicked, setNewClicked] = useState<IState["newClicked"]>(false); // state for new note button click
	const [editClicked, setEditClicked] = useState<IState["editClicked"]>(false); // state for edit note button click
	const [editedNote, setEditedNote] = useState({ title: "", content: "" });
	const [layoutId, setLayoutId] = useState<IState["layoutId"]>("");
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
		setLayoutId("newNote");
		setNewClicked(true);
	}

	// Save and Delete Notes and Initial Note
	function handleSave(newNote: any) {
		setNotes((prevNotes) => {
			return [...prevNotes, newNote];
		});
		setNewClicked(false);
	}

	//Editing and Deleting of existing Notes

	function deleteNote(note: any) {
		alert("Are you sure you want to delete this note?"); //Create a user check to prevent someone from accidentally deleting a note
		setNotes((prevNotes) => {
			return prevNotes.filter((noteItem, index) => {
				return index !== note;
			});
		});
	}

	function handleEdit(note: { title: string; content: string }) {
		// Change layoutId later
		setLayoutId("test");
		setEditClicked(true);
		setEditedNote(note);
		console.log(note);
	}

	function hideInitial() {
		setShowInitNote(!showInitNote);
	}

	function cancelNote() {
		if (newClicked) {
			setNewClicked(!newClicked);
		}
		if (editClicked) {
			setEditClicked(!editClicked);
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
									<SavedNote
										key={key}
										position={key}
										layoutId={key}
										title={note.title}
										content={note.content}
										deleteNote={deleteNote}
										editNote={() => handleEdit(note)}
									/>
								))}
							</AnimatePresence>
							<AnimatePresence>
								{editClicked && (
									<ViewedNote
										layoutId={"test"}
										currentTitle={editedNote.title}
										currentContent={editedNote.content}
										cancelNote={cancelNote}
										addNote={handleSave}
									/>
								)}
							</AnimatePresence>
						</div>
						<AnimatePresence>
							<NewNoteButton openNew={handleOpen} />
						</AnimatePresence>
						<AnimatePresence>
							{newClicked && (
								<NewNote
									layoutId={layoutId}
									cancelNote={cancelNote}
									addNote={handleSave}
								/>
							)}
						</AnimatePresence>
					</>
				)}
			</AnimatePresence>

			{/* <>
				<Header toggleTheme={toggleTheme} />
				<div className="notes-grid">
					{showInitNote ? <InitialNote deleteNote={hideInitial} /> : null}
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
					{newClicked && (
						<NewNote
							layoutId={layoutId}
							cancelNote={cancelNote}
							addNote={handleSave}
						/>
					)}
				</AnimatePresence>
			</> */}
		</section>
	);
}
