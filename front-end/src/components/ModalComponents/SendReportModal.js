import { useContext, useState } from "react";
import styled from "styled-components";
import ProjectContext from "../../contexts/ProjectContext";
import useSendReport from "../../hooks/api/useSendReport";

export default function SendReportModal({
	reportId,
	reloadPage,
	setReloadPage,
	classId,
}) {
	const { setShowModal } = useContext(ProjectContext);
	const { sendReportLoading, sendReport } = useSendReport();

	const [form, setForm] = useState({
		reportFile: undefined,
	});
	function handleForm(event) {
		event.preventDefault();
		const file = event.target.files[0];
		setForm({ ...form, [event.target.name]: file });
	}

	async function sendSingleReport(event) {
		event.preventDefault();
		try {
			const formData = new FormData();
			formData.append("files", form.reportFile);
			formData.append("reportId", reportId);
			formData.append("classId", classId);
			await sendReport(formData);
			alert("Relatório enviado com sucesso!");
			setReloadPage(reloadPage + 1);
			setShowModal(false);
		} catch (err) {
			if (err.response.status === 406) {
				alert(`${err.response.data}`);
			} else {
				alert(
					"Houve um erro no envio do relatório. Por favor, reinicie a página e tente novamente e avise o(a) professor(a)."
				);
			}
		}
	}

	function checkKey(event) {
		if (event.key === "Escape") {
			setShowModal(false);
		}

		if (event.key === "Enter") {
			sendSingleReport();
		}
	}

	return (
		<StyledModal onKeyUp={checkKey}>
			<h1>Envio do Relatório de Estágio</h1>
			<StyledForm onSubmit={sendSingleReport}>
				<label htmlFor="report-file"></label>
				<input
					id="report-file"
					type="file"
					accept=".pdf"
					name="reportFile"
					onChange={handleForm}
					required
				/>
				<button type="submit" disabled={sendReportLoading}>
					Enviar Relatório
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
		margin: -250px 0 0 -180px;
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
		/* border: 1px solid #000000; */
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
