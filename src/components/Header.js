import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { unifesoLogo } from "../assets/images";
import headerText from "../functions/headerText";

export default function Header() {
	const location = useLocation();

	const text = headerText(location.pathname);

	return (
		<StyledHeader>
			<img
				src={unifesoLogo}
				alt="Logo Unifeso"
			/>
			<p>{text}</p>
		</StyledHeader>
	);
}

const StyledHeader = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	display: flex;
	height: 60px;
	width: 100%;
	align-items: center;
	background-color: white;
	border-bottom: 1px solid rgba(156, 150, 153, 0.5);
	p {
		/* color: white; */
		font-size: 20px;
		font-weight: 700;
		margin: 20px 0px 0px 20px;
		font-family: "Roboto", sans-serif;
		/* background-color: red; */
	}
	img {
		height: 80%;
		margin-left: 10px;
	}
`;
