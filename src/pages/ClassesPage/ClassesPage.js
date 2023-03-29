import { useContext, useEffect } from "react";
import styled from "styled-components";
import Backdrop from "../../components/Backdrop";
import ClassThumb from "../../components/ClassThumb";
import NewClassModal from "../../components/NewClassModal";
import ProjectContext from "../../constants/Context";
import UserContext from "../../contexts/UserContext";

export default function ClassesPage() {
	const { showModal, setPage } = useContext(ProjectContext);
	const classes = [
		"Teste 1",
		"Teste 2",
		"Teste 3",
		"Turma de Recuperação - Estágio Final",
	];

	const { userData } = useContext(UserContext);
	console.log(userData);
	useEffect(() => {
		setPage("Turmas");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
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
				{classes.map((c, id) => (
					<ClassThumb key={id} className={c} />
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
`;
