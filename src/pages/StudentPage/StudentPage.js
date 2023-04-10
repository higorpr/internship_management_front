import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { useEffect } from "react";
import useGetStudentInfoInClass from "../../hooks/api/useGetStudentInfoInClass";

export default function StudentPage() {
	const { studentId, classId } = useParams();
	const { userData } = useContext(UserContext);
	const { getStudentInfoInClass } = useGetStudentInfoInClass();
	const [studentData, setStudentData] = useState({});
	console.log(studentData);

	useEffect(() => {
		async function retrieveStudentData() {
			const tempStudentData = await getStudentInfoInClass(
				studentId,
				classId
			);
			setStudentData(tempStudentData);
		}

		retrieveStudentData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<StyledPage>
			<p>{`Hello ${userData.user.name} from class ${classId}`}</p>
		</StyledPage>
	);
}

const StyledPage = styled.div`
	margin-top: 60px;
`;
