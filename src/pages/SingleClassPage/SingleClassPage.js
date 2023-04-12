import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { imageRepository } from "../../assets/imageUrls";
import ProjectContext from "../../contexts/ProjectContext";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { IconContext } from "react-icons";
import StudentEntry from "../../components/StudentEntry";
import useGetClassInfo from "../../hooks/api/useGetClassInfo";

export default function SingleClassPage() {
	const { classId } = useParams();
	const { setPage } = useContext(ProjectContext);
	const { getClassInfo } = useGetClassInfo();

	const [isActive, setIsActive] = useState();
	const [studentsInfo, setStudentsInfo] = useState([]);
	const [classInfo, setClassInfo] = useState({
		className: "",
		isActive: false,
		classCode: "",
		classType: "",
		nReports: 0,
	});
	// Estado para disparar a atualização da página, se necessário
	const [updateLocalPage, setUpdateLocalPage] = useState(false);
	console.log(classInfo);
	console.log(studentsInfo);

	useEffect(() => {
		async function fetchClassInfo() {
			try {
				const response = await getClassInfo(classId);
				console.log(response);
				// Refatorar o back end para entregar um objeto mais bem estruturado
				setClassInfo({
					...classInfo,
					className: response.name,
					isActive: response.is_active,
					classCode: response.class_code,
					classType: response.class_type.name,
					nReports: response.class_type.number_reports,
				});

				setStudentsInfo(response.students);
			} catch (err) {
				console.log(err);
			}
		}
		fetchClassInfo();
		setPage(`Turma ${classId}`);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateLocalPage]);

	function toggleActivateClass() {
		setIsActive(!isActive);
	}

	return (
		<StyledPage>
			<PageHeader>
				<img
					src={imageRepository.classThumbnail}
					alt="class thumbnail"
				/>
				<h1>{`Turma ${classId}`}</h1>
			</PageHeader>
			<PageBody>
				<LeftMenu>
					<ClassCodeContainer>
						<h1>Código da Turma:</h1>
						<p>{classInfo.classCode}</p>
					</ClassCodeContainer>
					<ToggleIcon>
						<h1>Ativar / Desativar Turma</h1>
						{classInfo.isActive ? (
							<IconContext.Provider
								value={{ color: "green", size: "40px" }}
							>
								<BsToggleOn onClick={toggleActivateClass} />
							</IconContext.Provider>
						) : (
							<IconContext.Provider value={{ size: "40px" }}>
								<BsToggleOff onClick={toggleActivateClass} />
							</IconContext.Provider>
						)}
					</ToggleIcon>
				</LeftMenu>
				<StudentsContainer>
					<StudentListTitles>
						<p>Nome do Aluno</p>
						<p>Relatório 1</p>
						<p>Relatório 2</p>
						<p>Relatório 3</p>
					</StudentListTitles>
					<StudentList>
						{studentsInfo.map((student, order) => (
							<StudentEntry
								key={student.studentId}
								studentName={student.studentName}
								studentId={student.studentId}
								classId={classId}
								reportOneStatus={student.reportOneStatus}
								reportTwoStatus={student.reportTwoStatus}
								reportThreeStatus={student.reportThreeStatus}
								colorCode={order}
							/>
						))}
					</StudentList>
				</StudentsContainer>
			</PageBody>
		</StyledPage>
	);
}

const StyledPage = styled.div`
	margin-top: 60px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

const PageHeader = styled.div`
	width: 60%;
	margin-top: 30px;
	position: relative;
	display: flex;
	justify-content: center;
	img {
		border-radius: 10px;
		width: 100%;
	}

	h1 {
		position: absolute;
		bottom: 10px;
		left: 30px;
		font-family: "Lato", sans-serif;
		font-weight: 700;
		font-size: 30px;
		color: white;
	}
`;

const PageBody = styled.div`
	display: flex;
	width: 60%;
	margin-top: 15px;
`;

const LeftMenu = styled.div`
	display: flex;
	flex-direction: column;
	width: 20%;
	margin-right: 20px;
`;

const ClassCodeContainer = styled.div`
	width: 100%;
	border: 1px solid black;
	height: 100px;
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		font-size: 18px;
		font-family: "Lato", sans-serif;
		margin-top: 5px;
	}

	p {
		font-weight: 700;
		font-family: "Roboto", sans-serif;
		font-size: 30px;
	}
`;

const ToggleIcon = styled.div`
	border: 1px solid black;
	border-radius: 15px;
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		font-size: 18px;
		font-family: "Lato", sans-serif;
		margin-top: 5px;
	}
`;

const StudentsContainer = styled.div`
	width: 80%;
`;

const StudentListTitles = styled.div`
	display: flex;
	justify-content: space-between;
	p {
		font-family: "Lato", sans-serif;
		width: 25%;
		display: flex;
		justify-content: center;
		font-weight: 700;
		font-size: 18px;
	}
`;

const StudentList = styled.ul`
	border-top: 1px solid black;
`;
