import { useParams } from "react-router-dom";
import useGetStudentInfoInClass from "../../hooks/api/useGetStudentInfoInClass";
import { useContext, useEffect, useState } from "react";
import ProjectContext from "../../contexts/ProjectContext";
import styled from "styled-components";
import Backdrop from "../../components/Backdrop";
import InternshipCreationModal from "../../components/InternshipCreationModal";
import ReportInfoComponent from "../../components/ReportInfoComponent";
import { formatDate } from "../../functions/formatDate";

export default function StudentClassPage() {
	const { setPage, showModal, setShowModal } = useContext(ProjectContext);
	const { studentId, classId } = useParams();
	const { getStudentInfoInClass } = useGetStudentInfoInClass();
	const [loadingComplete, setLoadingComplete] = useState(false);
	const [studentData, setStudentData] = useState({});
	const [reloadPage, setReloadPage] = useState(false);
	const [formattedStartDate, setFormattedStartDate] = useState("");
	const [reports, setReports] = useState([]);
	console.log(studentData);
	console.log(reports);

	useEffect(() => {
		retrieveStudentData();

		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reloadPage]);

	async function retrieveStudentData() {
		try {
			let tempStudentData = {};
			tempStudentData = await getStudentInfoInClass(studentId, classId);
			setPage(
				`Página do Aluno ${tempStudentData.studentInfo.studentName}`
			);
			setStudentData(tempStudentData);
			setLoadingComplete(true);
			const sortedReports = orderReports(tempStudentData.reportInfo);
			setReports(sortedReports);

			if (tempStudentData.internshipInfo !== {}) {
				const tempDate = formatDate(
					tempStudentData.internshipInfo.internshipStartDate
				);
				setFormattedStartDate(tempDate);
			}
		} catch (err) {
			console.log(err);
		}
	}

	function orderReports(reportObj) {
		const reportKeys = Object.keys(reportObj);
		const order = ["firstReport", "secondReport", "thirdReport"];
		const sortedKeys = reportKeys.sort(
			(a, b) => order.indexOf(a) - order.indexOf(b)
		);
		const reportsArr = sortedKeys.map((key) => reportObj[key]);

		return reportsArr;
	}

	

	if (loadingComplete === false) {
		return <></>;
	}

	return (
		// Essa página deve possuir:
		// Nome do Aluno
		// Classe na qual ele está inscrito
		// Se não houver estágio para essa turma:
		// Botão de criação de estágio
		// Se houver estágio para a turma:
		// Informações do Estágio
		// Campo para Informações dos Relatórios:
		// Status de cada relatório
		// Se o relatório já foi entregue: data de quando foi entrege e versão do relatório entregue
		// Se o relatório não foi entregue: data limite de entrega
		<StyledPage>
			{showModal ? (
				<>
					<Backdrop />
					<InternshipCreationModal
						classId={classId}
						reloadPage={reloadPage}
						setReloadPage={setReloadPage}
					/>
				</>
			) : (
				""
			)}
			<HeaderOffset />
			<StudentInfoField>
				<p>
					<strong>Nome: </strong>{" "}
					{studentData.studentInfo.studentName}
				</p>
			</StudentInfoField>

			<StudentInfoField>
				<p>
					<strong>Matriculado na classe: </strong>{" "}
					{studentData.studentInfo.className}
				</p>
			</StudentInfoField>

			{studentData.internshipInfo !== {} ? (
				<>
					<StudentInfoField>
						<p>
							<strong>Empresa do Estágio: </strong>{" "}
							{studentData.internshipInfo.companyName}
						</p>
					</StudentInfoField>

					<StudentInfoField>
						<p>
							<strong>Data de Início do Estágio: </strong>{" "}
							{formattedStartDate}
						</p>
					</StudentInfoField>

					<StudentInfoField>
						<p>
							<strong>Horas Semanais de Estágio: </strong>{" "}
							{`${studentData.internshipInfo.weeklyHours} horas`}
						</p>
					</StudentInfoField>

					<ReportsContainer>
						{reports.map((report, id) => (
							<ReportInfoComponent
								key={id}
								order={id}
								deliveredDate={report.deliveredDate}
								dueDate={report.dueDate}
								reportStatus={report.reportStatus}
							/>
						))}
					</ReportsContainer>
				</>
			) : (
				<ButtonContainer>
					<InternshipRegistrationButton
						onClick={() => setShowModal(true)}
					>
						Registrar Estágio
					</InternshipRegistrationButton>
				</ButtonContainer>
			)}
		</StyledPage>
	);
}

const StyledPage = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
	padding: 10px;
	box-sizing: border-box;
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

const ButtonContainer = styled.div`
	display: flex;
	width: 100vw;
	justify-content: center;
	margin-top: 20px;
`;

const InternshipRegistrationButton = styled.button`
	margin: 10px 0;
	width: 400px;
	height: 65px;
	background-color: #127e71;
	font-family: "Lato", sans-serif;
	color: white;
	font-size: 25px;
	border-radius: 10px;

	&:disabled {
		background-color: #bdbdbd;
	}
`;

const ReportsContainer = styled.div`
	margin-top: 15px;
	display: flex;
	justify-content: space-around;
	/* background-color: red; */
`;
