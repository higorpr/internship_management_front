import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReportStatusContainer from "./ReportStatusContainer";

export default function StudentEntry({
	studentName,
	studentId,
	reportOneStatus,
	reportTwoStatus,
	reportThreeStatus,
	colorCode,
}) {
	const bcolor = colorCode % 2 !== 0 ? "#F0EFEE" : "#ffffff";
	const navigate = useNavigate();
	return (
		<StyledLi bcolor={bcolor}>
			<NameContainer>
				<p
					onClick={() => {
						navigate(`/student/${studentId}`);
					}}
				>
					{studentName}
				</p>
			</NameContainer>

			<ReportStatusContainer
				reportStatus={reportOneStatus.toLowerCase()}
			/>
			<ReportStatusContainer
				reportStatus={reportTwoStatus.toLowerCase()}
			/>
			<ReportStatusContainer
				reportStatus={reportThreeStatus.toLowerCase()}
			/>
		</StyledLi>
	);
}

const StyledLi = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${(props) => props.bcolor};
`;

const NameContainer = styled.div`
	margin: 3px 0;
	width: 25%;
	/* background-color: red; */
	p {
		font-family: "Lato", sans-serif;
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
	}
`;
