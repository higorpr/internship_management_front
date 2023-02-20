import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { imageRepository } from "../assets/imageUrls";
import headerText from "../functions/headerText";
import { AiOutlineUser, AiOutlinePlusCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { Tooltip } from "@chakra-ui/react";
import { useContext } from "react";
import ProjectContext from "../constants/Context";

export default function Header() {
	const location = useLocation();
	const { setShowModal } = useContext(ProjectContext);

	const text = headerText(location.pathname);

	return (
		<IconContext.Provider value={{ size: "30px" }}>
			<StyledHeader>
				<HeaderLeft>
					<StyledImage
						src={imageRepository.logo}
						alt="Logo Unifeso"
					/>
					<StyledText>{text}</StyledText>
				</HeaderLeft>
				<HeaderRight>
					<Tooltip
						label="Adicionar nova turma"
						placement="bottom"
						hasArrow
					>
						<div>
							<AiOutlinePlusCircle
								onClick={() => setShowModal(true)}
							/>
						</div>
					</Tooltip>
					<AiOutlineUser />
				</HeaderRight>
			</StyledHeader>
		</IconContext.Provider>
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
	justify-content: space-between;
	background-color: white;
	border-bottom: 1px solid rgba(156, 150, 153, 0.5);
`;

const HeaderLeft = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
`;

const StyledImage = styled.img`
	height: 80%;
	margin-left: 10px;
`;

const StyledText = styled.p`
	/* color: white; */
	color: #545454;
	font-size: 25px;
	font-weight: 700;
	margin: 12px 0px 0px 20px;
	font-family: "Lato", sans-serif;
	/* background-color: red; */
`;

const HeaderRight = styled.div`
	display: flex;
	justify-content: space-between;
	width: 70px;
	margin-right: 10px;
`;
