/* eslint-disable no-unused-vars */
import { ThemeProvider } from "@mui/material/styles";
import "../cssFiles/App.css";
import MainComponent from "./MainComponent";
import { theme } from "./theme";
import AddEditOverlay from "./AddEditOverlay";
import { ModeProvider } from "../contexts/ModeContext";
import { TasksDataListProvider } from "../contexts/TasksDataListContext";
import { TaskProvider } from "../contexts/TaskContext";
import { TypeProvider } from "../contexts/TypeContext";

function App() {
	return (
		<>
			<TypeProvider>
				<TasksDataListProvider>
					<TaskProvider>
						<ModeProvider>
							<ThemeProvider theme={theme}>
								<MainComponent />
								<AddEditOverlay />
							</ThemeProvider>
						</ModeProvider>
					</TaskProvider>
				</TasksDataListProvider>
			</TypeProvider>
		</>
	);
}

export default App;
