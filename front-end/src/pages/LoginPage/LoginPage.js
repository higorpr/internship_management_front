import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { imageRepository } from "../../assets/imageUrls";
import useLogin from "../../hooks/api/useLogin";
import UserContext from "../../contexts/UserContext";
import CrumbsContext from "../../contexts/CrumbsContext";
import ProjectContext from "../../contexts/ProjectContext";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { setCrumbs } = useContext(CrumbsContext);
  const { newLogin, setNewLogin } = useContext(ProjectContext);
  const { loginLoading, login } = useLogin();
  const { setUserData } = useContext(UserContext);

  useEffect(() => {
    setForm({
      email: "",
      password: "",
    });
    setCrumbs([]);
  }, [newLogin]);

  const navigate = useNavigate();

  function handleForm(event) {
    event.preventDefault();
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function loginUser(event) {
    event.preventDefault();
    try {
      const receivedUserData = await login(form.email, form.password);
      if (receivedUserData.response.validatedEmail === false) {
        const tempUserData = { email: form.email };
        setUserData(tempUserData);
        navigate("/emailConfirmation");        
      } else {
        setUserData(receivedUserData.response.userInfo);
        navigate("/allclasses");
      }
      setNewLogin(!newLogin);
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
  }
  return (
    <StyledPage>
      <StyledImage src={imageRepository.logo} alt="Logo Unifeso" />
      <StyledH1>Plataforma de Controle de Relatórios de Estágio</StyledH1>
      <StyledForm onSubmit={loginUser} autoComplete="on">
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
        <button type="submit" disabled={loginLoading}>
          Login
        </button>
      </StyledForm>
      <StyledP>
        <StyledLink to={"/signup"}>
          <span> Se ainda não tem uma conta cadastrada, clique aqui</span>
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const StyledP = styled.p`
  text-align: center;
`;
