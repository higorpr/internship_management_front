import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { imageRepository } from "../assets/imageUrls";
import { AiOutlineUser, AiOutlinePlusCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { Tooltip } from "@chakra-ui/react";
import { useContext } from "react";
import ProjectContext from "../contexts/ProjectContext";
import UserContext from "../contexts/UserContext";
import BreadCrumbs from "./HeaderComponents/BreadCrumbs";

export default function Header() {
	const location = useLocation();
	const { setShowModal } = useContext(ProjectContext);
	const { userData } = useContext(UserContext);
	const navigate = useNavigate();

	return (
		<IconContext.Provider value={{ size: "30px" }}>
			<StyledHeader>
				<HeaderLeft>
					<StyledImage
						src={imageRepository.logo}
						alt="Logo Unifeso"
					/>
					<BreadCrumbs />
				</HeaderLeft>
				<HeaderRight>
					{location.pathname === "/allclasses" ? (
						<Tooltip
							shouldWrapChildren
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
					) : (
						<BlankBlock />
					)}
					{location.pathname !== "/" &&
					location.pathname !== "/signup" ? (
						<Tooltip
							shouldWrapChildren
							label={userData.user.name}
							placement="bottom"
							hasArrow
						>
							<StyledAiOutlineUser
								onClick={() => {
									navigate("/");
								}}
							/>
						</Tooltip>
					) : (
						""
					)}
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
	margin: 0px 10px;

	@media (max-width: 400px) {
		height: 70%;
	}
`;

const StyledText = styled.span`
	color: #545454;
	font-size: 25px;
	font-weight: 700;
	margin: 12px 0px 0px 20px;
	font-family: "Lato", sans-serif;

	@media (max-width: 400px) {
		font-size: 17px;
	}
`;

const HeaderRight = styled.div`
	display: flex;
	justify-content: space-between;
	width: 70px;
	margin-right: 10px;
`;

const StyledAiOutlineUser = styled(AiOutlineUser)`
	cursor: pointer;
`;

const BlankBlock = styled.div`
	width: 30px;
`;
