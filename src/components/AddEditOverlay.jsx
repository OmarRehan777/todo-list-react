import "../cssFiles/AddEditOverlay.css";
import { ModeContext } from "../contexts/ModeContext";
import { TasksDataListContext } from "../contexts/TasksDataListContext";
import { TaskContext } from "../contexts/TaskContext";
import { useContext } from "react";

export default function AddEditOverlay() {
	let { mode, setMode } = useContext(ModeContext);
	let { tasksDataList, setTasksDataList } = useContext(TasksDataListContext);
	let { taskData, setTaskData } = useContext(TaskContext);

	// setting the title of the overlay based on the mode
	let title;
	if (mode === "add") {
		title = "إضافة مهمة";
	} else if (mode === "edit") {
		title = "تعديل مهمة ";
	}

	// function for switching to default mode
	const defaultModeHandler = () => {
		setMode("default");
	};

	// function for switching to default mode when clicking outside the add/edit window
	const defaultModeHandlerForOverlay = (e) => {
		if (e.target.classList.contains("full-screen")) {
			setMode("default");
		}
	};

	// function for adding a new task
	const addHandler = () => {
		// if neither the title nor the description is empty
		if (taskData.title && taskData.description) {
			let newTask = {
				...taskData,
				id: crypto.randomUUID(),
				progress: "unfinished",
			};
			setTasksDataList((prev) => [...prev, newTask]);
		}
		// if the title or the description is empty, just ignore
		// In all cases switch to default mode
		defaultModeHandler();
	};

	// function for editing an existing task
	const editHandler = () => {
		const originalTaskData = tasksDataList.find(
			(task) => task.id === taskData.id,
		);

		if (!originalTaskData) {
			defaultModeHandler();
			return;
		}

		// if there is no change in the task, just ignore
		if (
			originalTaskData.title === taskData.title &&
			originalTaskData.description === taskData.description
		) {
			defaultModeHandler();
			return;
		}

		// if there is a change in the task, update
		else {
			setTasksDataList((prev) =>
				prev.map((task) =>
					task.id === taskData.id
						? {
								...task,
								title: taskData.title,
								description: taskData.description,
							}
						: task,
				),
			);
			defaultModeHandler();
		}
	};

	const confirmButtonHandler = () => {
		if (mode === "add") {
			addHandler();
		} else if (mode === "edit") {
			editHandler();
		} else {
			defaultModeHandler();
		}
	};

	//inputs handlers
	const inputHandler = (e) => {
		setTaskData({ ...taskData, title: e.target.value });
	};
	const textAreaHandler = (e) => {
		setTaskData({ ...taskData, description: e.target.value });
	};

	return (
		<div
			className="full-screen"
			style={
				mode === "default" ? { display: "none" } : { display: "flex" }
			}
			onClick={defaultModeHandlerForOverlay}
		>
			<div className="add-window">
				<div className="title">{title}</div>

				<label htmlFor="name" className="name-label">
					العنوان
				</label>

				<input
					type="text"
					className="name field"
					id="name"
					value={taskData.title}
					onChange={inputHandler}
				/>

				<label htmlFor="description" className="description-label">
					الوصف
				</label>

				<textarea
					type="text"
					className="description field"
					id="description"
					value={taskData.description}
					onChange={textAreaHandler}
				/>

				<button
					className="cancel-btn btn-effect"
					onClick={defaultModeHandler}
				>
					إلغاء
				</button>
				<button
					className="add-edit-btn btn-effect"
					onClick={confirmButtonHandler}
				>
					تأكيد
				</button>
			</div>
		</div>
	);
}
