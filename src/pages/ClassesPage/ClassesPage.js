import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Backdrop from "../../components/Backdrop";
import ClassThumb from "../../components/ClassThumb";
import NewClassModal from "../../components/NewClassModal";
import ProjectContext from "../../contexts/ProjectContext";
import UserContext from "../../contexts/UserContext";
import useGetAllClasses from "../../hooks/api/useGetClasses";

export default function ClassesPage() {
	const { showModal, setPage } = useContext(ProjectContext);
	const { userData } = useContext(UserContext);
	const { getAllClasses } = useGetAllClasses();
	const [classes, setClasses] = useState([]);

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
						id={c.id}
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
`;
