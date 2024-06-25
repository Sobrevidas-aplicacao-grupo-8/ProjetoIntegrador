import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "./Style/pacienteencaminhado.css";
import Pacientes from "../components/Pacientes";
import React, { useState, useEffect } from "react";
import axios from "axios";

const PacientesAbsenteistas = () => {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("");
  const [pacientes, setPacientes] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/listar-pacientes-absenteistas")
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
      <div className="v196_132" onClick={() => navigate("/")}>
        voltar
      </div>
      <div className="v196_167">Pacientes absenteístas</div>
      <div className="input-container2" style={{ marginTop: 80 }}>
        <input
          className="custom-input"
          placeholder="Digite o nome do paciente... "
          value={filtro}
          onChange={handleChange}
        ></input>
      </div>

      {pacientesFiltrados.map((paciente, index) => (
        <Pacientes key={index} nome={paciente.nome} />
      ))}
    </div>
  );
};

export default PacientesAbsenteistas;
