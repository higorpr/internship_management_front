import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
import { ImClock2 } from "react-icons/im";
import { useState } from "react";
import ProjectContext from "../constants/Context";

export default function ReportStatusContainer({ reportStatus }) {
	const [status, setStatus] = useState(reportStatus);
	const statesObj = {
		waiting: {
			icon: (
				<ImClock2
					style={{ color: "#FFFB00", fontSize: "20px" }}
					onClick={() => showReportTooltip(status)}
				/>
			),
			state: "Aguardando",
		},
		delivered: {
			icon: (
				<ImClock2
					style={{ color: "green", fontSize: "20px" }}
					onClick={() => showReportTooltip(status)}
				/>
			),
			state: "Entregue",
		},
		late: {
			icon: (
				<ImClock2
					style={{ color: "red", fontSize: "20px" }}
					onClick={() => showReportTooltip(status)}
				/>
			),
			state: "Atrasado",
		},
		accepted: {
			icon: (
				<FaCheck
					style={{ color: "green", fontSize: "20px" }}
					onClick={() => showReportTooltip(status)}
				/>
			),
			state: "Aceito",
		},
		refused: {
			icon: (
				<BsXLg
					style={{ color: "red", fontSize: "20px" }}
					onClick={() => showReportTooltip(status)}
				/>
			),
			state: "Recusado",
		},
	};

	function showReportTooltip(status) {
		console.log(status);
		setStatus("delivered");
	}

	return (
		<Container onClick={() => showReportTooltip(status)}>
			{statesObj[status].icon}
		</Container>
	);
}

const Container = styled.div`
	/* font-size: 16px; */
	/* font-weight: 500; */
	width: 25%;
	/* background-color: blue; */
	display: flex;
	align-items: center;
	justify-content: center;
`;
