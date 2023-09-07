import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { imageRepository } from "../../assets/imageUrls";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import useValidateEmail from "../../hooks/api/useValidateEmail";
import ProjectContext from "../../contexts/ProjectContext";

export default function MailConfirmationPage() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    confirmationCode: "",
  });
  const [loading, setLoading] = useState(false);
  const { newLogin, setNewLogin } = useContext(ProjectContext);
  const { validateEmail } = useValidateEmail();

  function handleForm(event) {
    event.preventDefault();
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function mailValidation(event) {
    event.preventDefault();
    setLoading(true);

    if (form.confirmationCode.trim() === "") {
      alert("Por favor insira o cádigo de confirmação");
      setLoading(false);
      return;
    }
    try {
      const receivedMailData = await validateEmail(
        userData.email,
        form.confirmationCode
      );
      if (receivedMailData.status === 202) {
        alert(
          "E-mail validado com sucesso! Por favor faça o login na página inicial"
        );
        setLoading(false);
        navigate("/");
        setNewLogin(!newLogin);
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
        Insira o código de confirmação enviado para o seu e-mail
      </StyledH2>
      <StyledForm onSubmit={mailValidation}>
        <input
          type="text"
          name="confirmationCode"
          placeholder="------"
          value={form.confirmationCode}
          onChange={handleForm}
          required
        />
        <button type="submit" disabled={loading}>
          Validar E-mail
        </button>
      </StyledForm>
      <StyledP>
        <StyledLink to={"/"}>
          <span> Clique aqui para entrar com outro e-mail</span>
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
    text-align: center;

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
