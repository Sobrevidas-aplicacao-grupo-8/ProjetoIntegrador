import React, { useState } from "react";
import axios from "axios";
import "./Style/Login.css";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
      setMessage("Login bem-sucedido!");
      navigate("/");
    } catch (error) {
      setMessage("Erro ao fazer login: " + error.response.data);
    }
  };

  return (
    <>
      <div className="login-container">
        <img src={Logo} className="logo" alt="Logo" />
      </div>
      <div className="input-container2">
        <input
          className="custom-input"
          placeholder="Digite seu login"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-container2">
        <input
          className="custom-input"
          placeholder="Digite sua Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="login-container2">
        <button className="button" onClick={handleLogin}>
          Entrar
        </button>
      </div>
      <div className="login-container2">
        {message && <p className="message">{message}</p>}
        <p className="escrita">esqueci a senha</p>
        <p className="escrita" onClick={() => navigate("/cadastro")}>
          criar login
        </p>
      </div>
    </>
  );
};

export default Login;
