import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Backdrop from "../AuxiliaryComponents/Backdrop";
import ClassThumb from "../AuxiliaryComponents/ClassThumb";
import ProjectContext from "../../contexts/ProjectContext";
import useGetAllClasses from "../../hooks/api/useGetClasses";
import NewClassModal from "../ModalComponents/NewClassModal";
import UserContext from "../../contexts/UserContext";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";

export default function ProfessorClasses() {
	const { showModal, setShowModal } = useContext(ProjectContext);
	const { getAllClasses } = useGetAllClasses();
	const [classes, setClasses] = useState([]);
	const { userData } = useContext(UserContext);
	const [loadingComplete, setLoadingComplete] = useState(false);

	useEffect(() => {
		setLoadingComplete(false);
		retrieveClasses();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showModal]);

	async function retrieveClasses() {
		try {
			const tempClasses = await getAllClasses();
			setClasses(tempClasses);
			setLoadingComplete(true);
		} catch (err) {
			console.log(err);
		}
	}

	if (loadingComplete === false) {
		return <LoadingPage iconHeight={200} iconWidth={200} />;
	}

	if (classes.length === 0 && showModal === false) {
		return (
			<StyledButtonBody>
				<StyledClassCreateButton
					onClick={() => setShowModal(!showModal)}
				>
					Criar nova turma
				</StyledClassCreateButton>
			</StyledButtonBody>
		);
	}
	return (
		<StyledPage>
			{showModal ? (
				<>
					<Backdrop />
					<NewClassModal />
				</>
			) : (
				""
			)}

			<ClassesContainer>
				{classes.map((c) => (
					<ClassThumb
						key={c.id}
						classId={c.id}
						userId={userData.user.id}
						userType={userData.user.user_types.name}
						className={c.name}
						backgroundColor={c.background_color}
						isActive={c.is_active}
					/>
				))}
			</ClassesContainer>
		</StyledPage>
	);
}

const StyledPage = styled.div`
	margin-top: 60px;
`;

const ClassesContainer = styled.ul`
	display: flex;
	padding-top: 20px;
	padding-left: 30px;
	box-sizing: border-box;
	flex-wrap: wrap;

	@media (max-width: 400px) {
		justify-content: center;
		align-items: center;
	}
`;

const StyledButtonBody = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 400px;
`;

const StyledClassCreateButton = styled.button`
	margin: 10px 0;
	width: 400px;
	height: 65px;
	background-color: #127e71;
	font-family: "Lato", sans-serif;
	color: white;
	font-size: 25px;
	border-radius: 10px;

	&:disabled {
		background-color: #bdbdbd;
	}

	@media (max-width: 400px) {
		width: 80%;
		font-size: 22px;
	}
`;
