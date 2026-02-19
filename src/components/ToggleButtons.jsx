import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useContext } from "react";
import { TypeContext } from "../contexts/TypeContext";

const mapTypeToValue = (type) => {
	if (type === "unfinished") return "غير منجز";
	if (type === "finished") return "منجز";
	return "الكل";
};

const mapValueToType = (value) => {
	if (value === "غير منجز") return "unfinished";
	if (value === "منجز") return "finished";
	return "all";
};

export default function ToggleButtons() {
	const { type, setType } = useContext(TypeContext);

	const handleChange = (_, newValue) => {
		if (newValue === null) return;
		setType(mapValueToType(newValue));
	};

	return (
		<ToggleButtonGroup
			value={mapTypeToValue(type)}
			onChange={handleChange}
			exclusive
			aria-label="TasksType"
		>
			<ToggleButton className="ToggleButton btn-effect" value="غير منجز">
				غير منجز
			</ToggleButton>

			<ToggleButton className="ToggleButton btn-effect" value="منجز">
				منجز
			</ToggleButton>

			<ToggleButton className="ToggleButton btn-effect" value="الكل">
				الكل
			</ToggleButton>
		</ToggleButtonGroup>
	);
}
