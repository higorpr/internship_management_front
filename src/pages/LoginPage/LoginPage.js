import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { unifesoLogo } from "../../assets/images";

export default function LoginPage() {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	async function login() {}

	function handleForm(event) {
		event.preventDefault();
		setForm({ ...form, [event.target.name]: event.target.value });
	}
	return (
		<StyledPage>
			<StyledImage src={unifesoLogo} alt="Logo Unifeso" />
			<StyledP>Plataforma de Controle de Relatórios de Estágio</StyledP>
			<StyledForm>
				<input
					type="email"
					name="email"
					placeholder="Digite seu E-mail"
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
				<button>Login</button>
			</StyledForm>
			<p>
				<Link>Se ainda não tem uma conta cadastrada, clique aqui</Link>
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
	margin-top: 100px;
	width: 30vw;
`;

const StyledP = styled.p`
	font-family: "Lato", sans-serif;
	margin: 20px 0 30px 0;
	font-size: 30px;
	font-weight: 700;
`;
