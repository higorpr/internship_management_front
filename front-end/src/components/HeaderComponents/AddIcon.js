import { Tooltip } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ProjectContext from "../../contexts/ProjectContext";
import styled from "styled-components";
import useDeleteInternship from "../../hooks/api/useDeleteInternship";

export default function AddIcon() {
	const location = useLocation();
	const { userData, setUserData } = useContext(UserContext);
	const { setShowModal, reloadPage, setReloadPage } =
		useContext(ProjectContext);
	const [page, setPage] = useState(null);
	const [message, setMessage] = useState("");
	const [hasInternship, setHasInternship] = useState(false);
	const { deleteInternship } = useDeleteInternship();

	useEffect(() => {
		const locationList = location.pathname.split("/");
		if (locationList.includes("studentclasspage")) {
			setPage("studentInternship");
			setMessage("Criar novo estágio");

			if (userData.hasOwnProperty("internshipInfo")) {
				setHasInternship(true);
			} else {
				setHasInternship(false);
			}
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
	}, [location, reloadPage, userData]);

	async function addClick() {
		if (page === "studentInternship") {
			const confirmation = window.confirm(
				"O estágio atual será apagado. \nGostaria de continuar? "
			);
			if (confirmation) {
				try {
					const internshipId = userData.internshipInfo.id;
					await deleteInternship(internshipId);
					const tempUserData = { ...userData };
					delete tempUserData.internshipInfo;
					setUserData(tempUserData);
					setReloadPage(!reloadPage);
					setShowModal(true);
				} catch (err) {
					console.log(err);
				}
			}
		} else if (page === "allClasses") {
			setShowModal(true);
		}
	}

	return (
		<div>
			{page && hasInternship ? (
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
