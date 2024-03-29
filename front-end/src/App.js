import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/HeaderComponents/Header";
import ProjectContext from "./contexts/ProjectContext";
import { UserProvider } from "./contexts/UserContext";
import ClassesPage from "./pages/ClassesPage/ClassesPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import SingleClassPage from "./pages/SingleClassPage/SingleClassPage";
import ProfessorStudentPage from "./pages/ProfessorStudentPage/ProfessorStudentPage";
import GlobalStyle from "./theme/globalStyle";
import StudentClassPage from "./pages/StudentClassPage/StudentClassPage";
import { CrumbsProvider } from "./contexts/CrumbsContext";
import MailConfirmationPage from "./pages/MailConfirmationPage/MailConfirmationPage";
import ForgottenPasswordPage from "./pages/ForgottenPasswordPage/ForgottenPasswordPage";
import NewPasswordPage from "./pages/NewPasswordPage/NewPasswordPage";

function App() {
	const [showModal, setShowModal] = useState(false);
	const [newLogin, setNewLogin] = useState(false);
	const [reloadPage, setReloadPage] = useState(false);

	useEffect(() => {
		// Clear local storage the first time the app opens
		window.localStorage.clear();
	});

	return (
		<CrumbsProvider>
			<ProjectContext.Provider
				value={{
					showModal,
					setShowModal,
					newLogin,
					setNewLogin,
					reloadPage,
					setReloadPage,
				}}
			>
				<BrowserRouter>
					<GlobalStyle />
					<UserProvider>
						<ChakraProvider>
							<Header />
							<Routes>
								<Route
									path="/"
									element={<Navigate to="/login" />}
								/>
								<Route path="/login" element={<LoginPage />} />
								<Route
									path="/emailconfirmation"
									element={<MailConfirmationPage />}
								/>
								<Route
									path="/signup"
									element={<SignupPage />}
								/>
								<Route
									path="/forgottenpassword"
									element={<ForgottenPasswordPage />}
								/>
								<Route
									path="/newpassword/:receivedToken"
									element={<NewPasswordPage />}
								/>
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
									element={<ProfessorStudentPage />}
								/>
								<Route
									path="/studentclasspage/:studentId/:classId"
									element={<StudentClassPage />}
								/>
							</Routes>
						</ChakraProvider>
					</UserProvider>
				</BrowserRouter>
			</ProjectContext.Provider>
		</CrumbsProvider>
	);
}

export default App;
