import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import ProfessorClasses from "../../components/ClassesPageComponents/ProfessorClasses";
import StudentClasses from "../../components/ClassesPageComponents/StudentClasses";
import CrumbsContext from "../../contexts/CrumbsContext";
import updateCrumbArray from "../../functions/updateCrumbArray";

export default function ClassesPage() {
	const { userData } = useContext(UserContext);
	const { crumbs, setCrumbs } = useContext(CrumbsContext);

	useEffect(() => {
		const crumbIndex = 0;
		const pageName = "Turmas";
		const pageRoute = `/allclasses`;
		updateCrumbArray(crumbs, setCrumbs, crumbIndex, pageName, pageRoute);

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
