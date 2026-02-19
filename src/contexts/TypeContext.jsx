/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const TypeContext = createContext({ type: "all", setType: () => {} });

export function TypeProvider({ children }) {
	const [type, setType] = useState("all");

	return (
		<TypeContext.Provider value={{ type, setType }}>
			{children}
		</TypeContext.Provider>
	);
}
