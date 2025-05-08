export function appearingTasksListReducer(
	currentAppearingTasksList,
	{ type, tasksDataList }
) {
	let tmp = [];

	if (type == "all") {
		tmp = [...tasksDataList];
	} else if (type == "finished") {
		tmp = tasksDataList.filter((task) => task.progress == "finished");
	} else if (type == "unfinished") {
		tmp = tasksDataList.filter((task) => task.progress == "unfinished");
	}

	tmp.sort((a, b) => {
		if (a.progress === "unfinished" && b.progress === "finished") return -1;
		if (a.progress === "finished" && b.progress === "unfinished") return 1;
		if (!a.title || !b.title) return 0; // التعامل مع القيم الناقصة
		return a.title.localeCompare(b.title);
	});

	// console.log(
	// 	"appearingTasksListReducer is working fine !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
	// );
	return tmp;
}
