import styled from "styled-components";
import ReportStatusContainer from "./ReportStatusContainer";


export default function StudentEntry({
	studentName,
	reportOneStatus,
	reportTwoStatus,
	reportThreeStatus,
	colorCode,
}) {
	const bcolor = colorCode % 2 !== 0 ? "#F0EFEE" : "#ffffff";

	return (
		<StyledLi bcolor={bcolor}>
			<NameContainer>{studentName}</NameContainer>

			<ReportStatusContainer reportStatus={reportOneStatus}/>
			<ReportStatusContainer reportStatus={reportTwoStatus}/>
			<ReportStatusContainer reportStatus={reportThreeStatus}/>
			{/* <ReportStatusContainer>
				{statesObj[reportOneStatus].icon}
			</ReportStatusContainer> */}

			{/* <ReportStatusContainer>
				{statesObj[reportTwoStatus].icon}
			</ReportStatusContainer> */}

			{/* <ReportStatusContainer>
				{statesObj[reportThreeStatus].icon}
			</ReportStatusContainer> */}
		</StyledLi>
	);
}

const StyledLi = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
	/* border-bottom: 1px solid black; */
	/* margin: 5px 0; */
	background-color: ${(props) => props.bcolor};
`;

const NameContainer = styled.p`
	font-family: "Lato", sans-serif;
	font-size: 16px;
	font-weight: 500;
	margin: 3px 0;
	width: 25%;
	/* background-color: yellow; */
`;
