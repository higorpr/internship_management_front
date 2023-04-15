import { BsXLg } from "react-icons/bs";
import { FaCheck, FaHourglassHalf } from "react-icons/fa";
import { ImClock2 } from "react-icons/im";
import { formatDate } from "../functions/formatDate";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { portugueseReportStatus } from "../functions/portugueseReportStatus";

export default function ProfessorReportInfoComponent({
	deliveredDate,
	dueDate,
	reportStatus,
	order,
}) {
	const [translatedStatus, setTranslatedStatus] = useState("");
	const [formattedDeliveryDate, setFormattedDeliveryDate] = useState("");

	const statesObj = {
		TBD: {
			icon: (
				<FaHourglassHalf
					style={{ color: "#7677fb", fontSize: "100px" }}
				/>
			),
		},
		WAITING: {
			icon: <ImClock2 style={{ color: "#d8b31b", fontSize: "100px" }} />,
		},
		DELIVERED: {
			icon: <ImClock2 style={{ color: "3ea83c", fontSize: "100px" }} />,
		},
		LATE: {
			icon: <ImClock2 style={{ color: "c01013", fontSize: "100px" }} />,
		},
		ACCEPTED: {
			icon: <FaCheck style={{ color: "3ea83c", fontSize: "100px" }} />,
		},
		REFUSED: {
			icon: <BsXLg style={{ color: "c01013", fontSize: "100px" }} />,
		},
	};

	useEffect(() => {
		const tempStatus = portugueseReportStatus(reportStatus);
		setTranslatedStatus(tempStatus);
		if (deliveredDate) {
			setFormattedDeliveryDate(formatDate(deliveredDate));
		} else {
			setFormattedDeliveryDate("-");
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<StyledComponent>
			<Title>
				Status do Relatório {order + 1}: {translatedStatus}
			</Title>
			<div>{statesObj[reportStatus].icon}</div>
			<DueDate>
				<p>Data Limite de Entrega: {formatDate(dueDate)}</p>
			</DueDate>
			<DeliveryDate>
				<p>Entregue em: {formattedDeliveryDate}</p>
			</DeliveryDate>
			<DefineReportStatusButton disabled={!deliveredDate}>
				<p>Definir Status do Relatório</p>
			</DefineReportStatusButton>
		</StyledComponent>
	);
}

const StyledComponent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	/* justify-content: center; */
	/* height: 500px; */
	width: 500px;
	border: 1px solid #bdbdbd;
	border-radius: 15px;
`;

const Title = styled.h1`
	font-family: "Lato", sans-serif;
	font-size: 20px;
	font-weight: 700;
	margin: 10px 0px 30px 0px;
`;

const DueDate = styled.div`
	margin-top: 30px;
	p {
		font-family: "Lato", sans-serif;
		font-size: 18px;
		font-weight: 500;
	}
`;

const DeliveryDate = styled.div`
	margin-top: 30px;
	p {
		font-family: "Lato", sans-serif;
		font-size: 18px;
		font-weight: 500;
	}
`;

const DefineReportStatusButton = styled.button`
	margin: 30px 0 20px 0;
	min-width: 300px;
	min-height: 100px;
	background-color: #127e71;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	p {
		font-family: "Lato", sans-serif;
		color: white;
		font-size: 25px;
		width: 80%;
	}

	&:disabled {
		background-color: #bdbdbd;
	}
`;
