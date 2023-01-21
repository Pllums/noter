import { useState } from "react";
import { motion } from "framer-motion";
import { Theme, useTheme } from "../../ThemeProvider/ThemeContext";
import "./DeleteCheck.css";

interface IProps {
	noButton: any;
	yesButton: any;
}

let deleteWrapperClasses = "delete-check-wrapper";
let deleteDarkMode = " delete-dark-mode";

export default function DeleteCheck(props: IProps) {
	const { theme } = useTheme();

	if (theme === Theme.Dark) {
		deleteWrapperClasses += deleteDarkMode;
	} else {
		deleteWrapperClasses = "delete-check-wrapper";
	}

	return (
		<motion.div className={deleteWrapperClasses}>
			<h2>Confirm Delete?</h2>
			<div className="delete-options">
				<motion.button className="options-buttons" onClick={props.noButton}>
					No, keep it
				</motion.button>
				<motion.button className="options-buttons" onClick={props.yesButton}>
					Yes, trash it
				</motion.button>
			</div>
		</motion.div>
	);
}
