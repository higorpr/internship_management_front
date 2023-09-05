import { useContext, useState } from "react";
import styled from "styled-components";
import ProjectContext from "../contexts/ProjectContext";
import usePostClass from "../hooks/api/usePostClass";
import UserContext from "../contexts/UserContext";

export default function NewClassModal() {
	const { setShowModal } = useContext(ProjectContext);
	const { userData } = useContext(UserContext);
	const [form, setForm] = useState({
		className: "",
		startDate: "",
		endDate: "",
		classType: "",
		ownerId: "",
	});
	const { postClass } = usePostClass();
	function handleForm(event) {
		event.preventDefault();
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	async function createClass(event) {
		event.preventDefault();
		if (form.startDate > form.endDate) {
			alert("Uma turma não pode ter o seu término antes do seu início.");
			return;
		}

		try {
			const body = {
				name: form.className,
				startDate: form.startDate,
				endDate: form.endDate,
				classType:
					form.classType === "Turma de Estágio Obrigatório"
						? "MANDATORY_INTERNSHIP"
						: "REC",
				ownerId: userData.user.id,
			};

			const newClass = await postClass(body);
			alert(`Você criou ${newClass.name} com sucesso!`);
			setShowModal(false);
		} catch (err) {
			console.log(err);
			alert(err.response.data);
		}
	}

	function checkKey(event) {
		if (event.key === "Escape") {
			setShowModal(false);
		}

		if (event.key === "Enter") {
			createClass();
		}
	}

	return (
		<StyledModal onKeyUp={checkKey}>
			<h1>Criação de Nova Turma</h1>
			<StyledForm onSubmit={createClass}>
				<label htmlFor="class-name">Nome da Turma</label>
				<input
					id="class-name"
					type="text"
					name="className"
					placeholder="Ex.: Turma de Estágio 2023/1"
					value={form.className}
					onChange={handleForm}
					required
				/>
				<label htmlFor="start-date">Data de Início da Turma</label>
				<input
					id="start-date"
					type="date"
					name="startDate"
					placeholder="dd-mm-yyyy"
					value={form.startDate}
					onChange={handleForm}
					required
				/>
				<label>Data de Término da Turma</label>
				<input
					type="date"
					name="endDate"
					value={form.endDate}
					onChange={handleForm}
					required
				/>
				<label htmlFor="class-type">Tipo de Turma</label>
				<select
					id="class-type"
					onChange={handleForm}
					name="classType"
					required
				>
					<option value="">
						-- Escolha um tipo de turma de estágio --
					</option>
					<option value="Turma de Estágio Obrigatório">
						Turma de Estágio Obrigatório
					</option>
					<option value="Turma de Recuperação (RRP)">
						Turma de Recuperação
					</option>
				</select>
				<button type="submit">Criar Turma</button>
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
	}

	@media (max-width: 400px) {
		button {
			width: 250px;
			font-size: 20px;
			height: 50px;
		}
	}
`;
