import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Backdrop from "./Backdrop";
import ClassThumb from "./ClassThumb";
import ProjectContext from "../contexts/ProjectContext";
import StudentClassEnrollModal from "./StudentClassEnrollModal";
import useGetStudentClasses from "../hooks/api/useGetStudentClasses";

export default function StudentClasses() {
	const { showModal, setShowModal } = useContext(ProjectContext);
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
					<Backdrop />
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
							id={c.id}
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
`;