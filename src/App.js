import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProjectContext from "./contexts/ProjectContext";
import { UserProvider } from "./contexts/UserContext";
import ClassesPage from "./pages/ClassesPage/ClassesPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import SingleClassPage from "./pages/SingleClassPage/SingleClassPage";
import StudentPage from "./pages/StudentPage/StudentPage";
import GlobalStyle from "./theme/globalStyle";
import StudentClassPage from "./pages/StudentClassPage/StudentClassPage";

function App() {
	const [showModal, setShowModal] = useState(false);
	const [page, setPage] = useState("");

	return (
		<ProjectContext.Provider
			value={{ showModal, setShowModal, page, setPage }}
		>
			<BrowserRouter>
				<GlobalStyle />
				<UserProvider>
					<ChakraProvider>
						<Header />
						<Routes>
							<Route path="/" element={<LoginPage />} />
							<Route path="/signup" element={<SignupPage />} />
							<Route
								path="/allclasses"
								element={<ClassesPage />}
							/>
							<Route
								path="/class/:classId"
								element={<SingleClassPage />}
							/>
							<Route
								path="/class/:classId/student/:studentId"
								element={<StudentPage />}
							/>
							<Route
								path="/studentclassPage/:studentId/:classId"
								element={<StudentClassPage />}
							/>
						</Routes>
					</ChakraProvider>
				</UserProvider>
			</BrowserRouter>
		</ProjectContext.Provider>
	);
}

export default App;
