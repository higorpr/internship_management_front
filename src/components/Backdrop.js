import { useContext } from "react";
import styled from "styled-components";
import ProjectContext from "../constants/Context";

export default function Backdrop() {
	const { setShowModal } = useContext(ProjectContext);
	return (
		<StyledBackdrop onClick={() => setShowModal(false)}></StyledBackdrop>
	);
}

const StyledBackdrop = styled.div`
	z-index: 2;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	position: fixed;
	background-color: #000;
	opacity: 0.7;
`;
