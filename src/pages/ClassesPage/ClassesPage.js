import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Backdrop from "../../components/Backdrop";
import ClassThumb from "../../components/ClassThumb";
import NewClassModal from "../../components/NewClassModal";
import ProjectContext from "../../constants/Context";
import UserContext from "../../contexts/UserContext";
import useGetAllClasses from "../../hooks/api/useGetClasses";
import useUserToken from "../../hooks/useUserToken";

export default function ClassesPage() {
	const { showModal, setPage } = useContext(ProjectContext);
	const { userData } = useContext(UserContext);
	const { getAllClasses } = useGetAllClasses();
	const [classes, setClasses] = useState([]);
	const [changePage, setChangePage] = useState(false);

	useEffect(() => {
		setPage("Turmas");
		async function retrieveClasses() {
			try {
				const tempClasses = await getAllClasses();
				console.log(tempClasses);
				setClasses(tempClasses);
			} catch (err) {
				console.log(err);
			}
		}
		retrieveClasses();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [changePage]);
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
					<ClassThumb key={c.id} className={c.name} />
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
