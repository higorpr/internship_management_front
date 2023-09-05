import { useParams } from "react-router-dom";
import useGetStudentInfoInClass from "../../hooks/api/useGetStudentInfoInClass";
import { useContext, useEffect, useState } from "react";
import ProjectContext from "../../contexts/ProjectContext";
import styled from "styled-components";
import Backdrop from "../../components/Backdrop";
import InternshipCreationModal from "../../components/InternshipCreationModal";
import ReportInfoComponent from "../../components/ReportInfoComponent";
import { formatDate } from "../../functions/formatDate";
import { orderReports } from "../../functions/orderReports";
import SendReportModal from "../../components/SendReportModal";
import updateCrumbArray from "../../functions/updateCrumbArray";
import CrumbsContext from "../../contexts/CrumbsContext";

export default function StudentClassPage() {
	const { showModal, setShowModal } = useContext(ProjectContext);
	const { crumbs, setCrumbs } = useContext(CrumbsContext);
	const { studentId, classId } = useParams();
	const { getStudentInfoInClass } = useGetStudentInfoInClass();
	const [loadingComplete, setLoadingComplete] = useState(false);
	const [studentData, setStudentData] = useState({});
	const [reloadPage, setReloadPage] = useState(0);
	const [formattedStartDate, setFormattedStartDate] = useState("");
	const [reports, setReports] = useState([]);
	const [internshipCreated, setInternshipCreated] = useState(false);
	const [targetReportId, setTargetReportId] = useState(0);

	useEffect(() => {
		retrieveStudentData();

		const crumbIndex = 1;
		const pageName = "Controle de Relatórios";
		const pageRoute = `/studentclassPage/${studentId}/${classId}`;
		updateCrumbArray(crumbs, setCrumbs, crumbIndex, pageName, pageRoute);
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reloadPage]);

	async function retrieveStudentData() {
		try {
			let tempStudentData = {};
			tempStudentData = await getStudentInfoInClass(studentId, classId);

			const sortedReports = orderReports(tempStudentData.reportInfo);
			setReports(sortedReports);

			if (Object.keys(tempStudentData.internshipInfo).length !== 0) {
				setInternshipCreated(true);
				const tempDate = formatDate(
					tempStudentData.internshipInfo.internshipStartDate
				);
				setFormattedStartDate(tempDate);
				setInternshipCreated(true);
			}
			setStudentData(tempStudentData);
			setLoadingComplete(true);
		} catch (err) {
			console.log(err);
		}
	}

	if (loadingComplete === false) {
		return <></>;
	}

	return (
		<StyledPage>
			{showModal ? (
				<>
					<Backdrop />
					{internshipCreated ? (
						<SendReportModal
							reloadPage={reloadPage}
							setReloadPage={setReloadPage}
							reportId={targetReportId}
							classId={classId}
						/>
					) : (
						<InternshipCreationModal
							classId={classId}
							reloadPage={reloadPage}
							setReloadPage={setReloadPage}
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
					<strong>Matriculado na classe: </strong>{" "}
					{studentData.studentInfo.className}
				</p>
			</StudentInfoField>

			{Object.keys(studentData.internshipInfo).length !== 0 ? (
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
								reportId={report.id}
								order={id}
								deliveredDate={report.deliveredDate}
								dueDate={report.dueDate}
								reportStatus={report.reportStatus}
								setTargetReportId={setTargetReportId}
								reloadPage={reloadPage}
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
	height: 100%;
	width: 100%;
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

	@media (max-width: 400px) {
		width: 300px;
		height: 50px;
		font-size: 20px;
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
