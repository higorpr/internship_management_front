import { useContext, useState } from "react";
import styled from "styled-components";
import ProjectContext from "../contexts/ProjectContext";
import axios from "axios";
import useUserToken from "../hooks/UseUserToken";

export default function SendReportModal({
	reportId,
	reloadPage,
	setReloadPage,
}) {
	const { setShowModal } = useContext(ProjectContext);
	const token = useUserToken();

	const [form, setForm] = useState({
		reportId: 0,
		reportFile: undefined,
	});
	console.log(form);
	function handleForm(event) {
		event.preventDefault();
		const file = event.target.files[0];
		setForm({ ...form, [event.target.name]: file });
	}

	async function sendReport(event) {
		event.preventDefault();
		try {
			const formData = new FormData();
			formData.append("files", form.reportFile);
			formData.append("reportId", reportId);
			console.log(...formData);

			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			};

			axios
				.post(
					"http://localhost:4000/internship/sendReport",
					formData,
					config
				)
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});

			// // const internship = await postNewInternship(body);
			// // console.log(internship);
			// // alert("Estágio registrado com sucesso!");
			// setReloadPage(!reloadPage);
			// setShowModal(false);
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
			sendReport();
		}
	}

	return (
		<StyledModal onKeyUp={checkKey}>
			<h1>Envio do Relatório de Estágio</h1>
			<StyledForm onSubmit={sendReport}>
				<label htmlFor="report-file"></label>
				<input
					id="report-file"
					type="file"
					accept=".pdf"
					name="reportFile"
					onChange={handleForm}
					required
				/>
				<button type="submit">Enviar Relatório</button>
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
	}
`;
