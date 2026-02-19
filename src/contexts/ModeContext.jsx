/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const ModeContext = createContext({
	mode: "default",
	setMode: () => {},
});

export function ModeProvider({ children }) {
	const [mode, setMode] = useState("default");

	return (
		<ModeContext.Provider value={{ mode, setMode }}>
			{children}
		</ModeContext.Provider>
	);
}
