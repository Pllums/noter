const savedNotes = [
	{ key: 0, title: "test", content: "test content" },
	{ key: 1, title: "test 1", content: "test content 1" },
	{ key: 2, title: "test 2", content: "test content 2" },
	{ key: 3, title: "test 3", content: "test content 3" },
	{ key: 4, title: "test 4", content: "test content 4" },
	{ key: 5, title: "test 5", content: "test content 5" },
	{ key: 6, title: "test 6", content: "test content 6" },
	{ key: 7, title: "test 7", content: "test content 7" },
	{ key: 8, title: "test 8", content: "test content 8" },
	{ key: 9, title: "test 9", content: "test content 9" },
];

function pushNote() {
	savedNotes.push({ key: 11, title: "test 11", content: "test content 11" });
}

export default savedNotes;

export { pushNote };
