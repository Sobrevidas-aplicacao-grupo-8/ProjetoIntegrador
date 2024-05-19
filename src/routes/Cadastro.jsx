import React from "react";
import "./Style/Cadastro.css";
import { useNavigate } from "react-router-dom";
const Cadastro = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <span className="title">Cadastro</span>

      <div className="input-container">
        <input
          type="email"
          id="email"
          className="input-field"
          placeholder="Email"
        />
      </div>

      <div className="input-container">
        <input
          type="password"
          id="password"
          className="input-field"
          placeholder="Senha"
        />
      </div>

      <div className="input-container">
        <input type="text" id="cpf" className="input-field" placeholder="CPF" />
      </div>

      <div className="input-container">
        <input
          type="tel"
          id="telefone"
          className="input-field"
          placeholder="Telefone"
        />
      </div>

      <div className="input-container">
        <input
          type="text"
          id="username"
          className="input-field"
          placeholder="Nome de usuário"
        />
      </div>

      <div className="button-container">
        <button className="button-text" onClick={() => navigate("/")}>
          concluir
        </button>
      </div>
    </div>
  );
};

export default Cadastro;
