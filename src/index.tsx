import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
// import NotesPage from "./routes/Notes";

const router = createBrowserRouter([{ path: "/", element: <App /> }]);

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	// <React.StrictMode>
	<RouterProvider router={router} />
	// </React.StrictMode>
);
