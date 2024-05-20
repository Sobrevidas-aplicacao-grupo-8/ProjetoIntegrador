import "./Style/Login.css";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="login-container">
        <img src={Logo} className="logo" />
      </div>
      <div className="input-container2">
        <input className="custom-input" placeholder="Digite seu login"></input>
      </div>
      <div className="input-container2">
        <input
          className="custom-input"
          placeholder="Digite sua Senha"
          type="password"
        ></input>
      </div>
      <div className="login-container2">
        <button className="button" onClick={() => navigate("/paciente")}>
          Entrar
        </button>
      </div>
      <div className="login-container2">
        <p className="escrita">esqueci a senha</p>
        <p className="escrita" onClick={() => navigate("/cadastro")}>
          criar login
        </p>
      </div>
    </>
  );
};

export default Login;
