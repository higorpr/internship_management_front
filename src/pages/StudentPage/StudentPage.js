import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { useEffect } from "react";
import useGetStudentInfoInClass from "../../hooks/api/useGetStudentInfoInClass";
import ProjectContext from "../../contexts/ProjectContext";

export default function StudentPage() {
	const { studentId, classId } = useParams();
	const { userData } = useContext(UserContext);
	const { setPage } = useContext(ProjectContext);
	const { getStudentInfoInClass } = useGetStudentInfoInClass();
	const [studentData, setStudentData] = useState({});
	const [updatePage, setUpdatePage] = useState(false);
	const [loadingComplete, setLoadingComplete] = useState(false);
	console.log(studentData);

	useEffect(() => {
		let tempStudentData = {};
		async function retrieveStudentData() {
			try {
				tempStudentData = await getStudentInfoInClass(
					studentId,
					classId
				);
				setPage(
					`Página do Aluno ${tempStudentData.studentInfo.studentName}`
				);
				setStudentData(tempStudentData);
				setLoadingComplete(true);
			} catch (err) {
				console.log(err);
			}
		}

		function translatePageInfo() {}

		retrieveStudentData();
		translatePageInfo();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updatePage]);

	if (loadingComplete === false) {
		return <></>;
	}

	return (
		<StyledPage>
			<HeaderOffset />
			<StudentInfoField>
				<p>
					<strong>Nome: </strong>{" "}
					{studentData.studentInfo.studentName}
				</p>
			</StudentInfoField>

			<StudentInfoField>
				<p>
					<strong>Status do Aluno: </strong> {"Teste"}
				</p>
			</StudentInfoField>

			<StudentInfoField>
				<p>
					<strong>Empresa do Estágio: </strong> {"Teste"}
				</p>
			</StudentInfoField>

			<StudentInfoField>
				<p>
					<strong>Data de Início do Estágio: </strong> {"Teste"}
				</p>
			</StudentInfoField>

			<StudentInfoField>
				<p>
					<strong>Horas Semanais de Estágio: </strong> {"Teste"}
				</p>
			</StudentInfoField>
		</StyledPage>
	);
}

const StyledPage = styled.div`
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	height: 100vh;
	width: 100vw;
`;

const HeaderOffset = styled.div`
	margin-top: 60px;
`;

const StudentInfoField = styled.div`
	display: flex;
	margin: 10px;

	p {
		font-family: "Lato", sans-serif;
		font-size: 18px;
		font-weight: 500;
	}
`;
