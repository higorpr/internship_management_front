import { useContext, useState } from "react";
import styled from "styled-components";
import ProjectContext from "../../contexts/ProjectContext";
import usePostEnrollStudent from "../../hooks/api/usePostEnrollStudent";
import ColorRingIcon from "../AuxiliaryComponents/ColorRingIcon";

export default function StudentClassEnrollModal() {
	const { setShowModal, reloadPage, setReloadPage } =
		useContext(ProjectContext);

	const [form, setForm] = useState({
		classCode: "",
	});
	const [loading, setLoading] = useState(false);

	const { postEnrollStudent } = usePostEnrollStudent();

	function handleForm(event) {
		event.preventDefault();
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	async function classEnrollement(event) {
		event.preventDefault();
		setLoading(true);
		try {
			const body = {
				classCode: form.classCode,
			};

			const targetClass = await postEnrollStudent(body);
			alert(`Você entrou na ${targetClass.className} com sucesso!`);
			setLoading(false);
			setShowModal(false);
			setReloadPage(!reloadPage);
		} catch (err) {
			console.log(err);
			alert(err.response.data);
			setLoading(false);
		}
	}

	function checkKey(event) {
		if (event.key === "Escape") {
			setShowModal(false);
		}

		if (event.key === "Enter") {
			classEnrollement();
		}
	}

	return (
		<StyledModal onKeyUp={checkKey}>
			<h1>Registro em Turma</h1>
			<StyledForm onSubmit={classEnrollement}>
				<label htmlFor="class-code">Código da Turma</label>
				<input
					id="class-code"
					type="text"
					name="classCode"
					value={form.classCode}
					onChange={handleForm}
					required
				/>
				<button type="submit" disabled={loading}>
					{loading ? (
						<ColorRingIcon height={50} width={50} />
					) : (
						"Entrar na Turma"
					)}
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
		display: flex;
		align-items: center;
		justify-content: center;
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
