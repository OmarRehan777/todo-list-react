/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const TasksDataListContext = createContext({
	tasksDataList: [],
	setTasksDataList: () => {},
});

export function TasksDataListProvider({ children }) {
	const localStorageValueFetchingHandler = () => {
		const localStorageValue = localStorage.getItem("tasksDataList");
		return localStorageValue ? JSON.parse(localStorageValue) : [];
	};

	const [tasksDataList, setTasksDataList] = useState(
		localStorageValueFetchingHandler,
	);

	useEffect(() => {
		localStorage.setItem("tasksDataList", JSON.stringify(tasksDataList));
	}, [tasksDataList]);

	return (
		<TasksDataListContext.Provider
			value={{ tasksDataList, setTasksDataList }}
		>
			{children}
		</TasksDataListContext.Provider>
	);
}
