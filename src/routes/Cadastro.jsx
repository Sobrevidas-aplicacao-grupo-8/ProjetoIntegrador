import React from "react";
import "./Style/Cadastro.css";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const navigate = useNavigate();

  const handleCpfChange = (event) => {
    let cpf = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (cpf.length > 3 && cpf.length <= 6) {
        cpf = cpf.substring(0, 3) + '.' + cpf.substring(3);
    } else if (cpf.length > 6 && cpf.length <= 9) {
        cpf = cpf.substring(0, 3) + '.' + cpf.substring(3, 6) + '.' + cpf.substring(6);
    } else if (cpf.length > 9) {
        cpf = cpf.substring(0, 3) + '.' + cpf.substring(3, 6) + '.' + cpf.substring(6, 9) + '-' + cpf.substring(9);
    }
    event.target.value = cpf;
  };

  const handleTelefoneChange = (event) => {
    let telefone = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (telefone.length > 2 && telefone.length <= 7) {
        telefone = '(' + telefone.substring(0, 2) + ') ' + telefone.substring(2);
    } else if (telefone.length > 7) {
        telefone = '(' + telefone.substring(0, 2) + ') ' + telefone.substring(2, 7) + '-' + telefone.substring(7);
    }
    event.target.value = telefone;
  };

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
        <input
          type="text"
          id="cpf"
          className="input-field"
          placeholder="CPF"
          onChange={handleCpfChange}
          maxLength="14"
        />
      </div>

      <div className="input-container">
        <input
          type="tel"
          id="telefone"
          className="input-field"
          placeholder="Telefone"
          onChange={handleTelefoneChange}
          maxLength="15"
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
          Concluir
        </button>
      </div>
    </div>
  );
};

export default Cadastro;
