import { Tooltip } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ProjectContext from "../../contexts/ProjectContext";
import styled from "styled-components";

export default function AddIcon() {
	const location = useLocation();
	const { userData } = useContext(UserContext);
	const { setShowModal, reloadPage, setReloadPage } =
		useContext(ProjectContext);
	const [page, setPage] = useState(null);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const locationList = location.pathname.split("/");
		if (locationList.includes("studentclasspage")) {
			setPage("studentInternship");
			setMessage("Criar novo estágio");
		} else if (locationList.includes("allclasses")) {
			setPage("allClasses");
			setMessage(
				userData.user.user_types.id === 1
					? "Adicionar nova turma"
					: "Ingressar em uma nova turma"
			);
		} else {
			setPage(null);
		}
	}, [location]);

	function addClick() {
		if (page === "studentInternship") {
		} else if (page === "allClasses") {
			setShowModal(true);
		}
	}

	return (
		<div>
			{page ? (
				<Tooltip
					shouldWrapChildren
					label={message}
					placement="bottom"
					hasArrow
				>
					<IconHolder>
						<AiOutlinePlusCircle onClick={addClick} />
					</IconHolder>
				</Tooltip>
			) : (
				<BlankBlock />
			)}
		</div>
	);
}

const IconHolder = styled.div`
	cursor: pointer;
`;

const BlankBlock = styled.div`
	width: 30px;
`;
