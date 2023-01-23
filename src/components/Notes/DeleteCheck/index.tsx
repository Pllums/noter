// import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Theme, useTheme } from "../../ThemeProvider/ThemeContext";
import "./DeleteCheck.css";

interface IProps {
	noButton: any;
	yesButton: any;
}

let deleteWrapperClasses = "delete-check-wrapper";
let deleteDarkMode = " dark";

export default function DeleteCheck(props: IProps) {
	const { theme } = useTheme();

	if (theme === Theme.Dark) {
		deleteWrapperClasses += deleteDarkMode;
	} else {
		deleteWrapperClasses = "delete-check-wrapper";
	}

	return (
		<AnimatePresence>
			<motion.div
				className={deleteWrapperClasses}
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.3 }}>
				<h2>Confirm Delete?</h2>
				<div className="delete-options">
					<motion.button
						className="options-buttons"
						onClick={props.noButton}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}>
						No, keep it
					</motion.button>
					<motion.button
						className="options-buttons"
						onClick={props.yesButton}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}>
						Yes, trash it
					</motion.button>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
