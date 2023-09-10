import { useContext, useState } from "react";
import styled from "styled-components";
import ProjectContext from "../../contexts/ProjectContext";
import useUpdateReportStatus from "../../hooks/api/useUpdateReportStatus";

export default function DefineReportStatusModal({ reportId }) {
	const { setShowModal, reloadPage, setReloadPage } =
		useContext(ProjectContext);
	const { updateReportStatus } = useUpdateReportStatus();
	const [form, setForm] = useState({
		reportStatus: "",
	});
	const [loading, setLoading] = useState(false);

	function handleForm(event) {
		event.preventDefault();
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	async function defineReportStatus(event) {
		event.preventDefault();
		setLoading(true);
		try {
			const body = {
				reportId: reportId,
				reportStatus: form.reportStatus,
			};
			await updateReportStatus(body);
			alert("Status do relatório definido");
			setLoading(false);
			setReloadPage(!reloadPage);
			setShowModal(false);
		} catch (err) {
			console.log(err);
			alert("Erro ao definir o status desse relatório.");
			setLoading(false);
		}
	}

	function checkKey(event) {
		if (event.key === "Escape") {
			setShowModal(false);
		}

		if (event.key === "Enter") {
			defineReportStatus();
		}
	}

	return (
		<StyledModal onKeyUp={checkKey}>
			<h1>Definição do Status do Relatório</h1>
			<StyledForm onSubmit={defineReportStatus}>
				<label htmlFor="report-status">Status</label>
				<select
					id="report-status"
					onChange={handleForm}
					name="reportStatus"
					required
				>
					<option value="">
						-- Escolha uma situação para o Relatório --
					</option>
					<option value="ACCEPTED">Aceito</option>
					<option value="REFUSED">Recusado</option>
				</select>
				<button type="submit" disabled={loading}>
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
		margin: -180px 0 0 -180px;
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
