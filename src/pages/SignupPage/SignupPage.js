import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { imageRepository } from "../../assets/imageUrls";

export default function SignupPage() {
	const [form, setForm] = useState({
		fullName: "",
		email: "",
		password: "",
		passwordConfirmation: "",
	});
	async function login() {}

	function handleForm(event) {
		event.preventDefault();
		setForm({ ...form, [event.target.name]: event.target.value });
	}
	return (
		<StyledPage>
			<StyledImage src={imageRepository.logo} alt="Logo Unifeso" />
			<StyledP>Plataforma de Controle de Relatórios de Estágio</StyledP>
			<StyledForm>
				<input
					type="text"
					name="fullName"
					placeholder="Nome Completo"
					value={form.fullName}
					onChange={handleForm}
				/>
				<input
					type="email"
					name="email"
					placeholder="E-mail"
					value={form.email}
					onChange={handleForm}
				/>
				<input
					type="password"
					name="password"
					placeholder="Senha"
					value={form.password}
					onChange={handleForm}
				/>
				<input
					type="password"
					name="passwordConfirmation"
					placeholder="Confirmar Senha"
					value={form.passwordConfirmation}
					onChange={handleForm}
				/>
				<button>Criar Conta</button>
			</StyledForm>
			<p>
				<StyledLink to={"/"}>
					Se já possui uma conta, faça o login
				</StyledLink>
			</p>
		</StyledPage>
	);
}

const StyledPage = styled.div`
	margin-top: 60px;
	display: flex;
	flex-direction: column;
	/* color: white; */
	font-family: "Lato", sans-serif;
	font-weight: 400;
	font-size: 20px;
	height: 100%;
	justify-content: center;
	align-items: center;
	/* background-color: pink; */
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;

	input {
		margin: 10px 0px;
		border: 1px solid #000000;
		width: 450px;
		height: 65px;
		text-indent: 5px;
		border-radius: 10px;

		&::placholder {
			color: #dbdbdb;
		}
	}

	button {
		margin: 10px 0;
		width: 400px;
		height: 65px;
		background-color: #127e71;
		font-family: "Lato", sans-serif;
		color: white;
		font-size: 25px;
		border-radius: 10px;
	}
`;

const StyledImage = styled.img`
	margin-top: 60px;
	width: 30vw;
`;

const StyledP = styled.p`
	font-family: "Lato", sans-serif;
	margin: 20px 0 30px 0;
	font-size: 30px;
	font-weight: 700;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: black;
`;
