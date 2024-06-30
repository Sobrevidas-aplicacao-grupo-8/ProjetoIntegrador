import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "./Style/PacienteCadastrado.css";
import PacienteCadastrado from "../components/PacienteCadastrado";
import React, { useState, useEffect } from "react";

const PacientesCadastrados = () => {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("");
  const [pacientes, setPacientes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/pacientes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar pacientes");
        }
        return response.json();
      })
      .then((data) => setPacientes(data))
      .catch((error) => console.error(error));
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
        ></input>
      </div>

      {pacientesFiltrados.map((paciente, index) => (
        <PacienteCadastrado
          key={index}
          nome={paciente.nome}
          dataCadastro={new Date(paciente.data_cadastro).toLocaleDateString()}
        />
      ))}
    </div>
  );
};

export default PacientesCadastrados;
