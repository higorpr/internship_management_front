import { useContext, useState } from "react";
import styled from "styled-components";
import ProjectContext from "../../contexts/ProjectContext";
import useUpdateStudentStatus from "../../hooks/api/useUpdateStudentStatus";

export default function DefineStudentStatusModal({
	studentId,
	classId,
	reloadPage,
	setReloadPage,
}) {
	const { setShowModal } = useContext(ProjectContext);
	const { updateStudentStatusLoading, updateStudentStatus } =
		useUpdateStudentStatus();
	const [form, setForm] = useState({
		studentStatus: "",
	});

	function handleForm(event) {
		event.preventDefault();
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	async function defineStudentStatus(event) {
		event.preventDefault();
		try {
			const body = {
				studentId: studentId,
				classId: classId,
				studentStatus: form.studentStatus,
			};

			await updateStudentStatus(body);
			alert("Status do estudante definido");
			setReloadPage(!reloadPage);
			setShowModal(false);
		} catch (err) {
			console.log(err);
			// alert(err.response.data);
		}
	}

	function checkKey(event) {
		if (event.key === "Escape") {
			setShowModal(false);
		}

		if (event.key === "Enter") {
			defineStudentStatus();
		}
	}

	return (
		<StyledModal onKeyUp={checkKey}>
			<h1>Definição do Status do Estudante</h1>
			<StyledForm onSubmit={defineStudentStatus}>
				<label htmlFor="student-status">Status</label>
				<select
					id="student-status"
					onChange={handleForm}
					name="studentStatus"
					required
				>
					<option value="">
						-- Escolha um status para o estudante --
					</option>
					<option value="ENROLLED">Matriculado</option>
					<option value="APPROVED">Aprovado</option>
					<option value="REPROVED">Reprovado</option>
				</select>
				<button type="submit" disabled={updateStudentStatusLoading}>
					Salvar
				</button>
			</StyledForm>
		</StyledModal>
	);
}

const StyledModal = styled.div`
	position: fixed;
	width: 600px;
	height: auto;
	top: 50vh;
	left: 50vw;
	margin: -300px 0 0 -300px;
	border: 1px solid black;
	border-radius: 10px;
	background-color: white;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
	padding: 20px;
	box-sizing: border-box;
	z-index: 3;
	display: flex;
	flex-direction: column;

	h1 {
		font-family: "Lato", sans-serif;
		font-size: 30px;
		font-weight: 700;
		margin-bottom: 10px;
		text-align: center;
	}

	@media (max-width: 400px) {
		width: 360px;
		margin: -300px 0 0 -180px;
	}
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;

	label {
		text-align: left;
		width: 100%;
		margin-top: 10px;
		font-family: "Lato", sans-serif;
		font-size: 15px;
	}

	select {
		width: 100%;
		background-color: white;
		border: 1px solid;
		height: 30px;
		font-family: "Lato", sans-serif;
		font-size: 15px;
	}

	option {
		font-family: "Lato", sans-serif;
		font-size: 15px;
	}

	input {
		margin: 1px 0px;
		border: 1px solid #000000;
		width: 100%;
		height: 40px;
		text-indent: 5px;
		border-radius: 10px;
		font-family: "Lato", sans-serif;
		font-size: 15px;

		&::placholder {
			color: #dbdbdb;
		}
	}

	button {
		margin: 30px 0 0 0;
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
	}

	@media (max-width: 400px) {
		button {
			width: 250px;
			font-size: 20px;
			height: 50px;
		}
	}
`;
