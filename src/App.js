import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProjectContext from "./constants/Context";
import ClassesPage from "./pages/ClassesPage/ClassesPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import GlobalStyle from "./theme/globalStyle";

function App() {
	return (
		<ProjectContext.Provider value={{}}>
			<BrowserRouter>
				<GlobalStyle />
				<ChakraProvider>
					<Header />
					<Routes>
						<Route path="/" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="/allclasses" element={<ClassesPage />} />
						<Route path="/class/:classId" />
						<Route path="/student/:studentId" />
						<Route path="/internship/internshipId" />
					</Routes>
				</ChakraProvider>
			</BrowserRouter>
		</ProjectContext.Provider>
	);
}

export default App;
