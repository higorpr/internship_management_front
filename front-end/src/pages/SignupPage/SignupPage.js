import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { imageRepository } from "../../assets/imageUrls";
import useSignUp from "../../hooks/api/useSignUp";

export default function SignupPage() {
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		passwordConfirmation: "",
	});
	const navigate = useNavigate();

	const { signUp } = useSignUp();

	function handleForm(event) {
		event.preventDefault();
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	async function signUpUser(event) {
		event.preventDefault();
		if (form.password !== form.passwordConfirmation) {
			alert("A senha e a confirmação de senha devem ser as mesmas");
			return;
		}

		try {
			const fullName = `${form.firstName} ${form.lastName}`;
			await signUp(fullName, form.email, form.password);
			alert("Usuário criado com sucesso!");
			navigate("/");
		} catch (err) {
			alert(err.response.data);
			console.log(err);
		}
	}

	return (
		<StyledPage>
			<StyledImage src={imageRepository.logo} alt="Logo Unifeso" />
			<StyledH1>Plataforma de Controle de Relatórios de Estágio</StyledH1>
			<StyledForm onSubmit={signUpUser} autoComplete="on">
				<input
					type="text"
					name="firstName"
					placeholder="Nome"
					value={form.firstName}
					onChange={handleForm}
					required
				/>
				<input
					type="text"
					name="lastName"
					placeholder="Sobrenome Completo"
					value={form.lastName}
					onChange={handleForm}
					required
				/>
				<input
					type="email"
					name="email"
					placeholder="E-mail"
					value={form.email}
					onChange={handleForm}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Senha"
					value={form.password}
					onChange={handleForm}
					required
				/>
				<input
					type="password"
					name="passwordConfirmation"
					placeholder="Confirmar Senha"
					value={form.passwordConfirmation}
					onChange={handleForm}
					required
				/>
				<button type="submit">Criar Conta</button>
			</StyledForm>
			<StyledP>
				<StyledLink to={"/"}>
					Se já possui uma conta, faça o login
				</StyledLink>
			</StyledP>
		</StyledPage>
	);
}

const StyledPage = styled.div`
	margin-top: 60px;
	display: flex;
	flex-direction: column;
	font-family: "Lato", sans-serif;
	font-weight: 400;
	font-size: 20px;
	height: 100%;
	justify-content: center;
	align-items: center;
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

	@media (max-width: 400px) {
		width: 100vw;
		input {
			width: 90%;
		}

		button {
			width: 70%;
		}
	}
`;

const StyledImage = styled.img`
	margin-top: 60px;
	width: 30vw;

	@media (max-width: 400px) {
		width: 80%;
	}
`;

const StyledH1 = styled.h1`
	font-family: "Lato", sans-serif;
	margin: 20px 0 30px 0;
	font-size: 30px;
	font-weight: 700;

	@media (max-width: 400px) {
		text-align: center;
	}
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: black;
`;

const StyledP = styled.p`
	text-align: center;
`;
