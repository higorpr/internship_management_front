import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { imageRepository } from "../../assets/imageUrls";
import { IconContext } from "react-icons";
import { Tooltip } from "@chakra-ui/react";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import BreadCrumbs from "./BreadCrumbs";
import IconMenu from "./IconMenu";
import AddIcon from "./AddIcon";

export default function Header() {
	const location = useLocation();
	const { userData } = useContext(UserContext);
	const [openedMenu, setOpenedMenu] = useState(false);
	// console.log(location.pathname.split("/").includes("studentclassPage"));
	// console.log(openedMenu);
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
					<AddIcon />
					{location.pathname !== "/" &&
					location.pathname !== "/signup" &&
					location.pathname !== "/emailConfirmation" ? (
						<Tooltip
							shouldWrapChildren
							label={userData.user.name}
							placement="bottom"
							hasArrow="true"
							isDisabled={openedMenu}
							// isDisabled="true"
						>
							<IconMenu setOpenedMenu={setOpenedMenu} />
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

const HeaderRight = styled.div`
	display: flex;
	justify-content: space-between;
	width: 70px;
	margin-right: 10px;
`;

const BlankBlock = styled.div`
	width: 30px;
`;
