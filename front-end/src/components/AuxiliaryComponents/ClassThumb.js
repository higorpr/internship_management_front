import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function ClassThumb({
	classId,
	userId,
	userType,
	className,
	backgroundColor,
	isActive,
}) {
	const navigate = useNavigate();

	function rerouteToCorrectPage() {
		if (userType === "PROFESSOR") {
			navigate(`/class/${classId}`);
		} else {
			navigate(`/studentclasspage/${userId}/${classId}`);
		}
	}

	return (
		<StyledListEntry>
			{!isActive ? <Overlay onClick={rerouteToCorrectPage} /> : ""}
			<ThumbHeader onClick={rerouteToCorrectPage}>
				<Background backcolor={backgroundColor} />
				<Title>{className}</Title>
			</ThumbHeader>
		</StyledListEntry>
	);
}

const StyledListEntry = styled.li`
	display: flex;
	flex-direction: column;
	height: 250px;
	width: 250px;
	/* background-color: red; */
	border: 1px solid rgba(156, 150, 153, 0.3);
	box-sizing: border-box;
	margin: 0px 30px 20px 0px;
	border-radius: 10px;
`;

const Overlay = styled.div`
	position: fixed;
	width: 250px;
	height: 250px;
	border-radius: 10px;
	background-color: grey;
	opacity: 0.4;
	z-index: 1;
	border: 1px solid rgba(156, 150, 153, 0.3);
	cursor: pointer;
`;

const ThumbHeader = styled.div`
	width: 100%;
	height: 35%;
	position: relative;
	cursor: pointer;
`;

const Background = styled.div`
	background-color: ${(props) => props.backcolor};
	height: 100%;
	width: 100%;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	img {
		width: 100%;
		height: 100%;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}
`;

const Title = styled.p`
	color: white;
	font-size: 20px;
	font-weight: 700;
	font-family: "Lato", sans-serif;
	position: absolute;
	top: 15px;
	left: 10px;
	width: 90%;
	height: 70px;
	overflow-wrap: break-word;
`;
