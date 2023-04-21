import styled from "styled-components";
import { FaCheck, FaHourglassHalf } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
import { ImClock2 } from "react-icons/im";
import { useState } from "react";

export default function ReportStatusContainer({ reportStatus }) {
	const [status, setStatus] = useState(reportStatus);
	const statesObj = {
		tbd: {
			icon: (
				<FaHourglassHalf
					style={{ color: "#7677fb", fontSize: "20px" }}
					onClick={() => showReportTooltip(status)}
				/>
			),
			state: "A Ser Definido",
		},
		waiting: {
			icon: (
				<ImClock2
					style={{ color: "#d8b31b", fontSize: "20px" }}
					onClick={() => showReportTooltip(status)}
				/>
			),
			state: "Aguardando",
		},
		delivered: {
			icon: (
				<ImClock2
					style={{ color: "3ea83c", fontSize: "20px" }}
					onClick={() => showReportTooltip(status)}
				/>
			),
			state: "Entregue",
		},
		late: {
			icon: (
				<ImClock2
					style={{ color: "c01013", fontSize: "20px" }}
					onClick={() => showReportTooltip(status)}
				/>
			),
			state: "Atrasado",
		},
		accepted: {
			icon: (
				<FaCheck
					style={{ color: "3ea83c", fontSize: "20px" }}
					onClick={() => showReportTooltip(status)}
				/>
			),
			state: "Aceito",
		},
		refused: {
			icon: (
				<BsXLg
					style={{ color: "c01013", fontSize: "20px" }}
					onClick={() => showReportTooltip(status)}
				/>
			),
			state: "Recusado",
		},
	};

	function showReportTooltip(status) {
		// console.log(status);
		// setStatus("waiting");
	}

	return (
		<Container>
			<IconHolder onClick={() => showReportTooltip(status)}>
				{statesObj[status].icon}
			</IconHolder>
		</Container>
	);
}

const Container = styled.div`
	width: 25%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const IconHolder = styled.div`
	width: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
