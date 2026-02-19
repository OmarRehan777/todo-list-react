import "../cssFiles/MainComponent.css";
import Task from "./Task";
import ToggleButtons from "./ToggleButtons";
import { ModeContext } from "../contexts/ModeContext";
import { TasksDataListContext } from "../contexts/TasksDataListContext";
import { TaskContext } from "../contexts/TaskContext";
import { TypeContext } from "../contexts/TypeContext";
import { appearingTasksListReducer } from "../reducers/appearingTasksListReducer";
import { useContext, useEffect, useReducer } from "react";

export default function MainComponent() {
	let { setMode } = useContext(ModeContext);
	let { tasksDataList } = useContext(TasksDataListContext);
	let { setTaskData } = useContext(TaskContext);
	let { type } = useContext(TypeContext);

	// a reducer for the logic of (appearingTasksList)
	let [appearingTasksList, appearingTasksListDispatch] = useReducer(
		appearingTasksListReducer,
		[],
	);

	// view tasks list based on the state
	useEffect(() => {
		appearingTasksListDispatch({ type, tasksDataList });
	}, [type, tasksDataList]);

	// function for switching to add mode
	const addModeSwitcher = () => {
		setMode("add");
	};

	// this function is used when clicking the add button to make sure that the add/edit overlay will be empty when adding a new task
	const addButtonHandler = () => {
		setTaskData({
			title: "",
			description: "",
			id: "",
			progress: "unfinished",
		});
		addModeSwitcher();
	};

	return (
		<>
			<div className="window">
				<div className="window-header">
					<div className="title">قائمة المهام</div>
					<ToggleButtons />
				</div>

				<div className="tasks-list">
					{appearingTasksList.map((task) => (
						<Task
							title={task.title}
							description={task.description}
							id={task.id}
							progress={task.progress}
							key={task.id}
						/>
					))}
				</div>

				<button
					className="add-btn btn-effect"
					onClick={addButtonHandler}
				>
					إضافة مهمة
				</button>
			</div>
		</>
	);
}
