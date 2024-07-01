import React from "react";
import "./Style/paciente.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Paciente = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    data_nascimento: "",
    sexo: "M",
    telefone: "",
    email: "",
    nome_mae: "",
    cep: "",
    estado: "",
    cidade: "",
    endereco: "",
    microarea: "",
    homem_maior_quarenta: false,
    etilista: false,
    lesao_suspeita: false,
    tabagista: false,
    data_cadastro: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/cadastrar-paciente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response data
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Header />
      <div className="maincountainer2">
        <div className="barra-lateral2">
          <div className="versao">
            <h3>Número da versão</h3>
          </div>
          <div className="home">
            <h2>Home</h2>
          </div>
          <div className="dashboard">
            {/* <img src="img/home.jpg" alt="Acessar home da página" />*/}
            <p>Dashboard</p>
          </div>
          <div className="cadastro">
            <h2>Cadastros</h2>
            {/* <img src="img/Usuário.png" alt="Tela de cadastro de novo paciente" /> */}
          </div>
          <div className="paciente">
            <a href="#" onClick={() => navigate("/paciente")}>
              Adicionar paciente
            </a>
          </div>
          <div className="monitorar">
            <h2>Monitoramento</h2>
            <ul>
              <li>
                <a href="#" onClick={() => navigate("/pacienteencaminhado")}>
                  Pacientes encaminhados
                </a>
              </li>
              <li>
                <a href="#" onClick={() => navigate("/pacientesabsenteistas")}>
                  Pacientes absenteístas
                </a>
              </li>
              <li>
                <a href="#" onClick={() => navigate("/pacientescadastrados")}>
                  Pacientes cadastrados
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="formulario">
          <h1>Paciente</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome do paciente"
              required
              value={formData.nome}
              onChange={handleChange}
              className="grande"
            />
            <br />
            <br />

            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              placeholder="xxx.xxx.xxx-xx"
              required
              value={formData.cpf}
              onChange={handleChange}
              className="media"
            />

            <label htmlFor="data_nascimento">Data de Nascimento:</label>
            <input
              type="date"
              id="data_nascimento"
              name="data_nascimento"
              required
              value={formData.data_nascimento}
              onChange={handleChange}
              className="media"
            />
            <br />
            <br />

            <label htmlFor="sexo">Sexo:</label>
            <select
              id="sexo"
              name="sexo"
              required
              value={formData.sexo}
              onChange={handleChange}
              className="media"
            >
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>

            <label htmlFor="telefone">Telefone:</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              placeholder="(xx) xxxxx-xxxx"
              required
              value={formData.telefone}
              onChange={handleChange}
              className="media"
            />
            <br />
            <br />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email do paciente"
              required
              value={formData.email}
              onChange={handleChange}
              className="grande"
            />
            <br />
            <br />

            <label htmlFor="nome_mae">Nome da Mãe:</label>
            <input
              type="text"
              id="nome_mae"
              name="nome_mae"
              placeholder="Nome da mãe do paciente"
              required
              value={formData.nome_mae}
              onChange={handleChange}
              className="grande"
            />
            <br />
            <br />

            <label htmlFor="endereco">Endereço:</label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              placeholder="Endereço do paciente"
              value={formData.endereco}
              onChange={handleChange}
              className="grande"
            />
            <br />
            <br />

            <label htmlFor="microarea">Microárea:</label>
            <input
              type="text"
              id="microarea"
              name="microarea"
              placeholder="Microárea do paciente"
              value={formData.microarea}
              onChange={handleChange}
              className="media"
            />

            <label htmlFor="cep">CEP:</label>
            <input
              type="text"
              id="cep"
              name="cep"
              placeholder="cep do paciente"
              required
              value={formData.cep}
              onChange={handleChange}
              className="media"
            />
            <br />
            <br />

            <label htmlFor="estado">Estado:</label>
            <input
              type="text"
              id="estado"
              name="estado"
              placeholder="UF"
              required
              value={formData.estado}
              onChange={handleChange}
              className="pequeno"
            />

            <label htmlFor="cidade">Cidade:</label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              placeholder="Cidade do paciente"
              value={formData.cidade}
              onChange={handleChange}
              className="media"
            />
            <br />
            <br />

            <p>Fatores de Risco:</p>
            <br />

            <label htmlFor="homem_maior_quarenta">
              Homem maior de 40 anos:
            </label>
            <input
              type="checkbox"
              id="homem_maior_quarenta"
              name="homem_maior_quarenta"
              checked={formData.homem_maior_quarenta}
              onChange={handleChange}
            />
            <br />
            <br />

            <label htmlFor="etilista">Etilista:</label>
            <input
              type="checkbox"
              id="etilista"
              name="etilista"
              checked={formData.etilista}
              onChange={handleChange}
            />
            <br />
            <br />

            <label htmlFor="lesao_suspeita">Lesão Suspeita:</label>
            <input
              type="checkbox"
              id="lesao_suspeita"
              name="lesao_suspeita"
              checked={formData.lesao_suspeita}
              onChange={handleChange}
            />
            <br />
            <br />

            <label htmlFor="tabagista">Tabagista:</label>
            <input
              type="checkbox"
              id="tabagista"
              name="tabagista"
              checked={formData.tabagista}
              onChange={handleChange}
            />
            <br />
            <br />

            <label htmlFor="data_cadastro">Data de Cadastro:</label>
            <input
              type="date"
              id="data_cadastro"
              name="data_cadastro"
              required
              value={formData.data_cadastro}
              onChange={handleChange}
              className="media"
            />
            <br />
            <br />

            <button type="submit" className="botao">
              SALVAR
            </button>
            <button
              type="reset"
              className="botao2"
              onClick={() =>
                setFormData({
                  nome: "",
                  cpf: "",
                  data_nascimento: "",
                  sexo: "M",
                  telefone: "",
                  email: "",
                  nome_mae: "",
                  cep: "",
                  estado: "",
                  cidade: "",
                  endereco: "",
                  microarea: "",
                  homem_maior_quarenta: false,
                  etilista: false,
                  lesao_suspeita: false,
                  tabagista: false,
                  data_cadastro: "",
                })
              }
            >
              CANCELAR
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Paciente;
