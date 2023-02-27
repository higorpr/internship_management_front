import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { imageRepository } from "../../assets/imageUrls";
import ProjectContext from "../../constants/Context";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { IconContext } from "react-icons";
import StudentEntry from "../../components/StudentEntry";

export default function SingleClassPage() {
	const { classId } = useParams();
	const { setPage } = useContext(ProjectContext);
	const [isActive, setIsActive] = useState(true);

	const classCode = "G0w62k";
	const studentList = [
		{
			studentName: "Higor P. R. de Faria",
			lastReportStatus: "Aguardando",
		},
		{
			studentName: "Tatiane Pilar de Almeida",
			lastReportStatus: "Atrasado",
		},
		{
			studentName: "Ticiane Pilar",
			lastReportStatus: "Entregue",
		},
		{
			studentName: "Dilma Dolores Pêgas",
			lastReportStatus: "Aguardando",
		},
		{
			studentName: "Kazuzinho Pilar Rosa",
			lastReportStatus: "Atrasado",
		},
	];

	useEffect(() => {
		setPage(`Turma ${classId}`);
	});

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
						<p>{classCode}</p>
					</ClassCodeContainer>
					<ToggleIcon>
						<h1>Ativar / Desativar Turma</h1>
						{isActive ? (
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
						<p>Status dos Relatórios</p>
					</StudentListTitles>
					<StudentList>
						{studentList.map((student, id) => (
							<StudentEntry
								key={id}
								studentName={student.studentName}
								lastReportStatus={student.lastReportStatus}
								colorCode={id}
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
	/* background-color: yellow; */
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
	/* background-color: red; */
	width: 60%;
	margin-top: 15px;
`;

const LeftMenu = styled.div`
	display: flex;
	flex-direction: column;
	/* background-color: blue; */
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
	/* position: absolute; */
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
	/* background-color: pink; */
`;

const StudentListTitles = styled.div`
	display: flex;
	justify-content: space-between;
	/* font-size: px; */
	font-weight: 700;
	/* background-color: #f0efee; */
`;

const StudentList = styled.ul`
	border-top: 1px solid black;
`;
