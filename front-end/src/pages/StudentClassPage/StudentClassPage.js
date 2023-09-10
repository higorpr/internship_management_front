import { useParams } from "react-router-dom";
import useGetStudentInfoInClass from "../../hooks/api/useGetStudentInfoInClass";
import { useContext, useEffect, useState } from "react";
import ProjectContext from "../../contexts/ProjectContext";
import styled from "styled-components";
import Backdrop from "../../components/AuxiliaryComponents/Backdrop";
import InternshipCreationModal from "../../components/ModalComponents/InternshipCreationModal";
import ReportInfoComponent from "../../components/StudentClassPageComponents/ReportInfoComponent";
import { formatDate } from "../../functions/formatDate";
import { orderReports } from "../../functions/orderReports";
import SendReportModal from "../../components/ModalComponents/SendReportModal";
import updateCrumbArray from "../../functions/updateCrumbArray";
import CrumbsContext from "../../contexts/CrumbsContext";
import UserContext from "../../contexts/UserContext";
import ColorRingIcon from "../../components/AuxiliaryComponents/ColorRingIcon";

export default function StudentClassPage() {
	const { showModal, setShowModal, reloadPage } = useContext(ProjectContext);
	const { userData, setUserData } = useContext(UserContext);
	const { crumbs, setCrumbs } = useContext(CrumbsContext);
	const { studentId, classId } = useParams();
	const { getStudentInfoInClass } = useGetStudentInfoInClass();
	const [loadingComplete, setLoadingComplete] = useState(false);
	const [studentData, setStudentData] = useState({});
	const [formattedStartDate, setFormattedStartDate] = useState("");
	const [reports, setReports] = useState([]);
	const [internshipCreated, setInternshipCreated] = useState(null);
	const [targetReportId, setTargetReportId] = useState(0);
	const [localReload, setLocalReload] = useState(false);
	console.log(internshipCreated);

	useEffect(() => {
		setLoadingComplete(false);
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

			if (tempStudentData.hasOwnProperty("internshipInfo")) {
				const tempDate = formatDate(
					tempStudentData.internshipInfo.internshipStartDate
				);
				setFormattedStartDate(tempDate);
				setInternshipCreated(true);

				const testData = {
					...userData,
					internshipInfo: tempStudentData.internshipInfo,
				};
				setUserData(testData);
			} else {
				setInternshipCreated(false);
			}
			setStudentData(tempStudentData);
			setLoadingComplete(true);
			setLocalReload(!localReload);
		} catch (err) {
			console.log(err);
		}
	}

	if (loadingComplete === false) {
		return (
			<StyledPage>
				<ColorRingIcon height={200} width={200} />
			</StyledPage>
		);
	}

	return (
		<StyledPage>
			{showModal ? (
				<>
					<Backdrop />
					{internshipCreated ? (
						<SendReportModal
							reportId={targetReportId}
							classId={classId}
						/>
					) : (
						<InternshipCreationModal classId={classId} />
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

			{internshipCreated ? (
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
