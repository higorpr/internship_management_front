import importGoogleFonts from "import-google-fonts";
import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import ProjectContext from "./constants/Context";
import LoginPage from "./pages/LoginPage/LoginPage";
import GlobalStyle from "./theme/globalStyle";

function App() {

	return (
		<ProjectContext.Provider>
			<BrowserRouter>
				<GlobalStyle />
				<Header />
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/sign-up/:userType" />
					<Route path="/allclasses" />
					<Route path="/class/:classId" />
					<Route path="/student/:studentId" />
					<Route path="/internship/internshipId" />
				</Routes>
			</BrowserRouter>
		</ProjectContext.Provider>
	);
}

export default App;
