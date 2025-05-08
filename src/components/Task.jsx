/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import "../cssFiles/Task.css";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { ModeContext } from "../contexts/ModeContext";
import { TaskContext } from "../contexts/TaskContext";
import { TasksDataListContext } from "../contexts/TasksDataListContext";
import { useContext, useReducer } from "react";
// import { taskReducer } from "../contexts/TaskContext";

export default function Task({ title, description, id, progress }) {
	const theme = useTheme();
	let { setMode } = useContext(ModeContext);
	let { taskData, setTaskData } = useContext(TaskContext);
	let { tasksDataList, tasksDataListDispatch } =
    useContext(TasksDataListContext);
  
  // let { taskData2, taskDataDispatch } = useReducer(taskReducer);

	const finishedButtonHandler = () => {
		let newTasksDataList = tasksDataList.map((task) =>
			{
				if (task.id == id) {
					if (task.progress == "unfinished") {
						return { ...task, progress: "finished" };
					} else if (task.progress == "finished") {
						return { ...task, progress: "unfinished" };
					}
				} else {
					return task;
				}
			}
		);
		tasksDataListDispatch((prev) => newTasksDataList);
	};

	const editModeSwitcher = () => {
		setMode("edit");
	};

	const editButtonHandler = () => {
		editModeSwitcher();

		setTaskData({ title, description, id, progress });
	};

	const deleteButtonHandler = () => {
		tasksDataListDispatch((prev) =>
			tasksDataList.filter((task) => task.id != id)
		);
	};

	return (
		<div className="container">
			<div className="task-icons">
				<Tooltip title="حذف" placement="top" arrow>
					<IconButton
						className="iconBtn btn-effect"
						onClick={deleteButtonHandler}
					>
						<DeleteForeverIcon
							sx={{ fill: theme.palette.delete.main }}
							className="icon"
						/>
					</IconButton>
				</Tooltip>

				<Tooltip title="تعديل" placement="top" arrow>
					<IconButton
						className="iconBtn btn-effect"
						onClick={editButtonHandler}
					>
						<EditNoteIcon
							sx={{ fill: theme.palette.edit.main }}
							className="icon"
						/>
					</IconButton>
				</Tooltip>

				<Tooltip title="تم" placement="top" arrow>
					<IconButton
						className="iconBtn btn-effect"
						onClick={finishedButtonHandler}
					>
						<LibraryAddCheckIcon
							sx={{ fill: theme.palette.checked.main }}
							className="icon"
						/>
					</IconButton>
				</Tooltip>
			</div>
			<div className="task-data">
				<div className="task-title">{title}</div>
				<div className="task-description">{description}</div>
			</div>
		</div>
	);
}
