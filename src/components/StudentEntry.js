import styled from "styled-components";
import { MdWatchLater } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { IconContext } from "react-icons";
import { BsXCircleFill, BsXLg } from "react-icons/bs";
import { ImClock2 } from "react-icons/im";

export default function StudentEntry({
	studentName,
	reportOneStatus,
	reportTwoStatus,
	reportThreeStatus,
	colorCode,
}) {
	const bcolor = colorCode % 2 !== 0 ? "#F0EFEE" : "#ffffff";
	const statesObj = {
		waiting: {
			icon: <ImClock2 style={{ color: "#FFFB00", fontSize: "20px" }} />,
			state: "Aguardando",
		},
		delivered: {
			icon: <ImClock2 style={{ color: "green", fontSize: "20px" }} />,
			state: "Entregue",
		},
		late: {
			icon: <ImClock2 style={{ color: "red", fontSize: "20px" }} />,
			state: "Atrasado",
		},
		accepted: {
			icon: <FaCheck style={{ color: "green", fontSize: "20px" }} />,
			state: "Aceito",
		},
		refused: {
			icon: <BsXLg style={{ color: "red", fontSize: "20px" }} />,
			state: "Recusado",
		},
	};

	return (
		<StyledLi bcolor={bcolor}>
			<NameContainer>{studentName}</NameContainer>

			<ReportStatusContainer>
				{statesObj[reportOneStatus].icon}
			</ReportStatusContainer>

			<ReportStatusContainer>
				{statesObj[reportTwoStatus].icon}
			</ReportStatusContainer>

			<ReportStatusContainer>
				{statesObj[reportThreeStatus].icon}
			</ReportStatusContainer>
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

const ReportStatusContainer = styled.div`
	/* font-size: 16px; */
	/* font-weight: 500; */
	width: 25%;
	/* background-color: blue; */
	display: flex;
	align-items: center;
	justify-content: center;
`;
