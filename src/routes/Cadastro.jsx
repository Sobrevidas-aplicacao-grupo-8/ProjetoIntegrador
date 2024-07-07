import React, { useState } from "react";
import axios from "axios";
import "./Style/Cadastro.css";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cpf: "",
    telefone: "",
    username: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleCpfChange = (event) => {
    let cpf = event.target.value.replace(/\D/g, "");
    if (cpf.length > 3 && cpf.length <= 6) {
      cpf = cpf.substring(0, 3) + "." + cpf.substring(3);
    } else if (cpf.length > 6 && cpf.length <= 9) {
      cpf =
        cpf.substring(0, 3) +
        "." +
        cpf.substring(3, 6) +
        "." +
        cpf.substring(6);
    } else if (cpf.length > 9) {
      cpf =
        cpf.substring(0, 3) +
        "." +
        cpf.substring(3, 6) +
        "." +
        cpf.substring(6, 9) +
        "-" +
        cpf.substring(9);
    }
    setFormData({ ...formData, cpf });
  };

  const handleTelefoneChange = (event) => {
    let telefone = event.target.value.replace(/\D/g, "");
    if (telefone.length > 2 && telefone.length <= 7) {
      telefone = "(" + telefone.substring(0, 2) + ") " + telefone.substring(2);
    } else if (telefone.length > 7) {
      telefone =
        "(" +
        telefone.substring(0, 2) +
        ") " +
        telefone.substring(2, 7) +
        "-" +
        telefone.substring(7);
    }
    setFormData({ ...formData, telefone });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/criar-usuario",
        formData
      );
      setMessage("Usuário cadastrado com sucesso!");
      setTimeout(() => navigate("/login"), 2000); // Navega para a página de login após 2 segundos
    } catch (error) {
      setMessage("Erro ao cadastrar usuário: " + error.response.data);
    }
  };

  return (
    <div className="container">
      <span className="title">Cadastro</span>

      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="email"
            id="email"
            className="input-field"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-container">
          <input
            type="password"
            id="password"
            className="input-field"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-container">
          <input
            type="text"
            id="cpf"
            className="input-field"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleCpfChange}
            maxLength="14"
            required
          />
        </div>

        <div className="input-container">
          <input
            type="tel"
            id="telefone"
            className="input-field"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleTelefoneChange}
            maxLength="15"
            required
          />
        </div>

        <div className="input-container">
          <input
            type="text"
            id="username"
            className="input-field"
            placeholder="Nome de usuário"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="button-container">
          <button type="submit" className="button-text">
            Concluir
          </button>
        </div>
      </form>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Cadastro;
