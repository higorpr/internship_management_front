import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Backdrop from "./Backdrop";
import ClassThumb from "./ClassThumb";
import ProjectContext from "../contexts/ProjectContext";
import useGetAllClasses from "../hooks/api/useGetClasses";
import NewClassModal from "./NewClassModal";
import UserContext from "../contexts/UserContext";

export default function ProfessorClasses() {
	const { showModal, setPage } = useContext(ProjectContext);
	const { getAllClasses } = useGetAllClasses();
	const [classes, setClasses] = useState([]);
	const { userData } = useContext(UserContext);

	useEffect(() => {
		setPage("Turmas");
		async function retrieveClasses() {
			try {
				const tempClasses = await getAllClasses();
				setClasses(tempClasses);
			} catch (err) {
				console.log(err);
			}
		}
		retrieveClasses();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showModal]);
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
