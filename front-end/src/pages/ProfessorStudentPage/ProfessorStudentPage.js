import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import useGetStudentInfoInClass from "../../hooks/api/useGetStudentInfoInClass";
import ProjectContext from "../../contexts/ProjectContext";
import { orderReports } from "../../functions/orderReports";
import { formatDate } from "../../functions/formatDate";
import ProfessorReportInfoComponent from "../../components/ProfessorStudentPageComponents/ProfessorReportInfoComponent";
import { portugueseStudentStatus } from "../../functions/portugueseStudentStatus";
import Backdrop from "../../components/AuxiliaryComponents/Backdrop";
import DefineReportStatusModal from "../../components/ModalComponents/DefineReportStatusModal";
import DefineStudentStatusModal from "../../components/ModalComponents/DefineStudentStatusModal";
import updateCrumbArray from "../../functions/updateCrumbArray";
import CrumbsContext from "../../contexts/CrumbsContext";

export default function ProfessorStudentPage() {
	const { studentId, classId } = useParams();
	const { showModal, setShowModal, reloadPage } =
		useContext(ProjectContext);
	const { getStudentInfoInClass } = useGetStudentInfoInClass();
	const { crumbs, setCrumbs } = useContext(CrumbsContext);
	const [studentData, setStudentData] = useState({});
	const [loadingComplete, setLoadingComplete] = useState(false);
	const [reports, setReports] = useState([]);
	const [targetReportId, setTargetReportId] = useState(0);
	const [buttonClicked, setButtonClicked] = useState("");

	useEffect(() => {
		let tempStudentData = {};
		async function retrieveStudentData() {
			try {
				tempStudentData = await getStudentInfoInClass(
					studentId,
					classId
				);

				setStudentData(tempStudentData);
				setLoadingComplete(true);
				const sortedReports = orderReports(tempStudentData.reportInfo);
				setReports(sortedReports);

				const crumbIndex = 2;
				const pageName = "Controle de Relatórios";
				const pageRoute = `/class/${classId}/student/${studentId}`;
				updateCrumbArray(
					crumbs,
					setCrumbs,
					crumbIndex,
					pageName,
					pageRoute
				);
			} catch (err) {
				console.log(err);
			}
		}

		retrieveStudentData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reloadPage]);

	function startDefineStudentStatus() {
		setButtonClicked("student");
		setShowModal(true);
	}

	if (loadingComplete === false) {
		return <></>;
	}

	return (
		<StyledPage>
			{showModal ? (
				<>
					<Backdrop />
					{buttonClicked === "report" ? (
						<DefineReportStatusModal
							reportId={targetReportId}
						/>
					) : (
						<DefineStudentStatusModal
							studentId={studentId}
							classId={classId}
						/>
					)}
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
					<strong>Status do Estudante: </strong>{" "}
					{portugueseStudentStatus(
						studentData.studentInfo.studentStatus
					)}
				</p>
			</StudentInfoField>

			<StudentInfoField>
				<p>
					<strong>Matriculado em: </strong>{" "}
					{studentData.studentInfo.className}
				</p>
			</StudentInfoField>

			<StudentInfoField>
				<p>
					<strong>Empresa do Estágio: </strong>{" "}
					{studentData.internshipInfo.companyName}
				</p>
			</StudentInfoField>

			<StudentInfoField>
				<p>
					<strong>Data de Início do Estágio: </strong>{" "}
					{formatDate(studentData.internshipInfo.internshipStartDate)}
				</p>
			</StudentInfoField>

			<StudentInfoField>
				<p>
					<strong>Horas Semanais de Estágio: </strong>{" "}
					{studentData.internshipInfo.weeklyHours} horas
				</p>
			</StudentInfoField>
			<ReportsContainer>
				{reports.map((report, idx) => (
					<ProfessorReportInfoComponent
						key={idx}
						reportId={report.id}
						order={idx}
						deliveredDate={report.deliveredDate}
						dueDate={report.dueDate}
						reportStatus={report.reportStatus}
						setTargetReportId={setTargetReportId}
						setButtonClicked={setButtonClicked}
					/>
				))}
			</ReportsContainer>
			<DefineStudentStatusButton onClick={startDefineStudentStatus}>
				<p>Alterar Status do Estudante</p>
			</DefineStudentStatusButton>
			<BlankSpace />
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

const ReportsContainer = styled.div`
	margin-top: 15px;
	display: flex;
	justify-content: space-around;

	@media (max-width: 400px) {
		flex-direction: column;
		align-items: center;
	}
`;

const DefineStudentStatusButton = styled.button`
	margin: 30px auto;
	width: 300px;
	min-height: 120px;
	background-color: #127e71;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;

	p {
		font-family: "Lato", sans-serif;
		color: white;
		font-size: 25px;
		width: 80%;
	}

	@media (max-width: 400px) {
		min-height: 80px;
		width: 250px;

		p {
			font-size: 20px;
		}
	}
`;

const BlankSpace = styled.div`
	min-height: 10px;
`;
