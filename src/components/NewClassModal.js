import { useContext, useState } from "react";

import styled from "styled-components";
import ProjectContext from "../constants/Context";

export default function NewClassModal() {
	const { showModal, setShowModal } = useContext(ProjectContext);
	const [form, setForm] = useState({
		className: "",
		startDate: "",
		endDate: "",
		reportFrequency: "",
		reportQuantity: "",
	});

	function handleForm(event) {
		event.preventDefault();
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	function createClass(event) {
		event.preventDefault();
		if (form.startDate > form.endDate) {
			alert("Uma turma não pode ter o seu término antes do seu início.");
		}
	}

	function checkKey(event) {
		console.log(event.key);
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
				<p>Nome da Turma</p>
				<input
					type="text"
					name="className"
					placeholder="Ex.: Turma de Estágio 2023/1"
					value={form.className}
					onChange={handleForm}
					required
				/>
				<p>Data de Início da Turma</p>
				<input
					type="date"
					name="startDate"
					placeholder="dd-mm-yyyy"
					value={form.startDate}
					onChange={handleForm}
					required
				/>
				<p>Data de Término da Turma</p>
				<input
					type="date"
					name="endDate"
					value={form.endDate}
					onChange={handleForm}
					required
				/>
				<p>Periodicidade da Entrega dos Relatórios (em dias)</p>
				<input
					type="number"
					name="reportFrequency"
					placeholder="Ex.: 30"
					value={form.reportFrequency}
					onChange={handleForm}
					required
				/>
				<p>Número de Relatórios a Serem Entregues pelos Alunos</p>
				<input
					type="number"
					name="reportQuantity"
					placeholder="Ex.: 3"
					value={form.reportQuantity}
					onChange={handleForm}
					required
				/>
				<button type="submit">Criar Turma</button>
			</StyledForm>
		</StyledModal>
	);
}

const StyledModal = styled.div`
	position: fixed;
	width: 600px;
	height: 600px;
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
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;

	p {
		text-align: left;
		width: 100%;
		margin-top: 10px;
	}

	input {
		margin: 1px 0px;
		border: 1px solid #000000;
		width: 100%;
		height: 40px;
		text-indent: 5px;
		border-radius: 10px;

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
`;
