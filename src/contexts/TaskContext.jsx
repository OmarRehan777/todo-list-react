/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const emptyTask = {
	title: "",
	description: "",
	id: "",
	progress: "unfinished",
};

export const TaskContext = createContext({
	taskData: emptyTask,
	setTaskData: () => {},
});

export function TaskProvider({ children }) {
	const [taskData, setTaskData] = useState(emptyTask);

	return (
		<TaskContext.Provider value={{ taskData, setTaskData }}>
			{children}
		</TaskContext.Provider>
	);
}
