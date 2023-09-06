import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import BackDrop from "../AuxiliaryComponents/Backdrop";
import ClassThumb from "../AuxiliaryComponents/ClassThumb";
import ProjectContext from "../../contexts/ProjectContext";
import StudentClassEnrollModal from "../ModalComponents/StudentClassEnrollModal";
import useGetStudentClasses from "../../hooks/api/useGetStudentClasses";
import UserContext from "../../contexts/UserContext";

export default function StudentClasses() {
	const { showModal, setShowModal } = useContext(ProjectContext);
	const { userData } = useContext(UserContext);
	const [classes, setClasses] = useState([]);
	const { getStudentClasses } = useGetStudentClasses();

	useEffect(() => {
		async function retrieveStudentClasses() {
			try {
				const tempClasses = await getStudentClasses();
				setClasses(tempClasses);
			} catch (err) {
				console.log(err);
			}
		}
		retrieveStudentClasses();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showModal]);
	return (
		<StyledPage>
			{showModal ? (
				<>
					<BackDrop />
					<StudentClassEnrollModal />
				</>
			) : (
				""
			)}
			{classes.length === 0 ? (
				<StyledButtonBody>
					<StyledClassEnrollButton
						onClick={() => setShowModal(!showModal)}
					>
						Registrar-se em uma turma
					</StyledClassEnrollButton>
				</StyledButtonBody>
			) : (
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
			)}
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

const StyledClassEnrollButton = styled.button`
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
