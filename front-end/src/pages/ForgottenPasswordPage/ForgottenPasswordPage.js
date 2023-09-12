import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { imageRepository } from "../../assets/imageUrls";
import { useState } from "react";
import ColorRingIcon from "../../components/AuxiliaryComponents/ColorRingIcon";
import useRequestNewPassword from "../../hooks/api/useRequestNewPassword";

export default function ForgottenPasswordPage() {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		email: "",
	});
	const [loading, setLoading] = useState(false);
	const { requestNewPassword } = useRequestNewPassword();

	function handleForm(event) {
		event.preventDefault();
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	async function sendUserMail(event) {
		event.preventDefault();
		setLoading(true);

		if (form.email.trim() === "") {
			alert("Por favor insira seu email cadastrado");
			setLoading(false);
			return;
		}
		try {
			const receivedMailData = await requestNewPassword(form.email);
			if (receivedMailData.status === 200) {
				alert(
					"Por favor verifique o seu e-mail usado para o cadastro na plataforma."
				);
				setLoading(false);
				navigate("/login");
			}
		} catch (err) {
			console.log(err);
			alert(err.response.data);
			setLoading(false);
		}
	}
	return (
		<StyledPage>
			<StyledImage src={imageRepository.logo} alt="Logo Unifeso" />
			<StyledH1>Plataforma de Controle de Relatórios de Estágio</StyledH1>
			<StyledH2>
				Informe o seu e-mail para enviarmos instruções da criação de uma
				nova senha
			</StyledH2>
			<StyledForm onSubmit={sendUserMail}>
				<input
					type="email"
					name="email"
					placeholder="E-mail"
					value={form.email}
					onChange={handleForm}
					required
				/>
				<button type="submit" disabled={loading}>
					{loading ? (
						<ColorRingIcon height={50} width={50} />
					) : (
						"Confirmar E-mail"
					)}
				</button>
			</StyledForm>
			<StyledP>
				<StyledLink to={"/login"}>
					<span> Voltar para a página de Login</span>
				</StyledLink>
			</StyledP>
		</StyledPage>
	);
}

const StyledImage = styled.img`
	margin-top: 100px;
	width: 30vw;

	@media (max-width: 400px) {
		width: 80%;
	}
`;

const StyledPage = styled.div`
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
		text-align: left;

		&::placholder {
			color: #dbdbdb;
		}
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 10px 0;
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
		width: 100vw;
		input {
			width: 90%;
		}

		button {
			width: 70%;
		}
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

const StyledH2 = styled.h2`
	font-family: "Lato", sans-serif;
	margin: 0px 0 15px 0;
	font-size: 20px;
	font-weight: 600;
	width: 500px;
	text-align: center;

	@media (max-width: 400px) {
		text-align: center;
		width: auto;
	}
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: black;
`;

const StyledP = styled.p`
	text-align: center;
`;
