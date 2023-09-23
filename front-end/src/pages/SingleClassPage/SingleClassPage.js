import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { imageRepository } from "../../assets/imageUrls";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { TbFileDownload } from "react-icons/tb";
import { IconContext } from "react-icons";
import StudentEntry from "../../components/SingleClassPageComponents/StudentEntry";
import useGetClassInfo from "../../hooks/api/useGetClassInfo";
import CrumbsContext from "../../contexts/CrumbsContext";
import updateCrumbArray from "../../functions/updateCrumbArray";
import LoadingPage from "../LoadingPage/LoadingPage";

export default function SingleClassPage() {
	const { classId } = useParams();
	const { getClassInfo } = useGetClassInfo();

	const [isActive, setIsActive] = useState();
	const [studentsInfo, setStudentsInfo] = useState([]);
	const [loadingComplete, setLoadingComplete] = useState(false);
	const [classInfo, setClassInfo] = useState({
		className: "",
		isActive: false,
		classCode: "",
		classType: "",
		nReports: 0,
	});
	// Estado para disparar a atualização da página, se necessário

	const { crumbs, setCrumbs } = useContext(CrumbsContext);

	useEffect(() => {
		setLoadingComplete(false);
		fetchClassInfo();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function fetchClassInfo() {
		try {
			const response = await getClassInfo(classId);
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

			const crumbIndex = 1;
			const pageName = response.name;
			const pageRoute = `/class/${classId}`;
			updateCrumbArray(
				crumbs,
				setCrumbs,
				crumbIndex,
				pageName,
				pageRoute
			);
			setLoadingComplete(true);
		} catch (err) {
			console.log(err);
		}
	}

	function toggleActivateClass() {
		setIsActive(!isActive);
	}

	if (!loadingComplete) {
		return <LoadingPage iconHeight={200} iconWidth={200} />;
	}

	return (
		<StyledPage>
			<PageHeader>
				<img
					src={imageRepository.classThumbnail}
					alt="class thumbnail"
				/>
				<h1>{classInfo.className}</h1>
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
								value={{ color: "#127e71", size: "40px" }}
							>
								<BsToggleOn onClick={toggleActivateClass} />
							</IconContext.Provider>
						) : (
							<IconContext.Provider value={{ size: "40px" }}>
								<BsToggleOff onClick={toggleActivateClass} />
							</IconContext.Provider>
						)}
					</ToggleIcon>
					<ToggleIcon>
						<h1>Gerar Planilha de Controle</h1>
						<IconContext.Provider
							value={{ color: "#127e71", size: "40px" }}
						>
							<TbFileDownload onClick={toggleActivateClass} />
						</IconContext.Provider>
					</ToggleIcon>
				</LeftMenu>
				<StudentsContainer>
					<StudentListTitles>
						<p>Estudante</p>
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

	@media (max-width: 400px) {
		width: 95%;

		h1 {
			font-size: 25px;
		}
	}
`;

const PageBody = styled.div`
	display: flex;
	width: 60%;
	margin-top: 15px;

	@media (max-width: 400px) {
		width: 95%;
	}
`;

const LeftMenu = styled.div`
	display: flex;
	flex-direction: column;
	width: 20%;
	margin-right: 20px;

	@media (max-width: 400px) {
		margin-right: 5px;
	}
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

	@media (max-width: 400px) {
		h1 {
			font-size: 15px;
			text-align: center;
			margin-bottom: 5px;
		}

		p {
			font-size: 18px;
		}
	}
`;

const ToggleIcon = styled.div`
	border: 1px solid black;
	border-radius: 15px;
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 5px;

	h1 {
		font-size: 18px;
		font-family: "Lato", sans-serif;
		margin-top: 5px;
	}

	@media (max-width: 400px) {
		h1 {
			font-size: 15px;
			text-align: center;
			margin-bottom: 5px;
		}
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

	@media (max-width: 400px) {
		p {
			font-size: 14px;
			text-align: center;
		}
	}
`;

const StudentList = styled.ul`
	border-top: 1px solid black;
`;
