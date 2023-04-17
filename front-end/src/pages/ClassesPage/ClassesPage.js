import { useContext, useEffect } from "react";
import ProjectContext from "../../contexts/ProjectContext";
import UserContext from "../../contexts/UserContext";
import ProfessorClasses from "../../components/ProfessorClasses";
import StudentClasses from "../../components/StudentClasses";

export default function ClassesPage() {
	const { setPage } = useContext(ProjectContext);
	const { userData } = useContext(UserContext);

	useEffect(() => {
		setPage("Turmas");

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			{userData.user.user_types.name === "PROFESSOR" ? (
				<ProfessorClasses />
			) : (
				<StudentClasses />
			)}
		</>
	);
}
