/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export let TasksDataListContext = createContext([]);

export function TasksDataListProvider({ children }) {
	// function for fetching the saved tasks from local storage
	const localStorageValueFetchingHandler = () => {
		let localStorageValue = localStorage.getItem("tasksDataList");
		return localStorageValue ? JSON.parse(localStorageValue) : [];
	};

	const [tasksDataList, tasksDataListDispatch] = useState(
		localStorageValueFetchingHandler
	);

	// storing data into local storage
	useEffect(() => {
		localStorage.setItem("tasksDataList", JSON.stringify(tasksDataList));
	}, [tasksDataList]);

	return (
		<TasksDataListContext.Provider
			value={{ tasksDataList, tasksDataListDispatch }}
		>
			{" "}
			{children}{" "}
		</TasksDataListContext.Provider>
	);
}


export const tasksDataListReducer =  (currentTasksDataList, action) => {


}