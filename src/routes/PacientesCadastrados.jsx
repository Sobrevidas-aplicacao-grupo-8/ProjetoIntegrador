import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "./Style/PacienteCadastrado.css";
import PacienteCadastrado from "../components/PacienteCadastrado";
import React, { useState, useEffect } from "react";
import axios from "axios";

const PacientesCadastrados = () => {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("");
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/listar-nomes-datas-pacientes")
      .then((response) => {
        setPacientes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar pacientes:", error);
      });
  }, []);

  const handleChange = (event) => {
    setFiltro(event.target.value);
  };

  const pacientesFiltrados = pacientes.filter((paciente) =>
    paciente.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="color2" style={{ overflowX: "hidden" }}>
      <Header />
      <div className="input-container2" style={{ marginTop: 30 }}>
        <input
          className="custom-input"
          placeholder="Digite o nome do paciente... "
          value={filtro}
          onChange={handleChange}
        />
      </div>

      {pacientesFiltrados.map((paciente, index) => (
        <PacienteCadastrado
          key={index}
          nome={paciente.nome}
          dataCadastro={new Date(paciente.data_nascimento).toLocaleDateString()}
        />
      ))}
    </div>
  );
};

export default PacientesCadastrados;
