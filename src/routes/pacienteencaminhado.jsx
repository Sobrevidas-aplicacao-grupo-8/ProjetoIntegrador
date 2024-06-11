import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "./Style/pacienteencaminhado.css";
import PacienteEncaminhado from "../components/PacienteEncaminhado";
import React, { useState, useEffect } from "react";

const PacientesEncaminhados = () => {
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
      <div className="v196_132">voltar</div>
      <div className="v196_167">Pacientes encaminhados</div>
      <div className="input-container2" style={{ marginTop: 80 }}>
        <input
          className="custom-input"
          placeholder="Digite o nome do paciente... "
          value={filtro}
          onChange={handleChange}
        ></input>
      </div>

      {pacientesFiltrados.map((paciente, index) => (
        <PacienteEncaminhado
          key={index}
          nome={paciente.nome}
          dataCadastro={new Date(paciente.data_cadastro).toLocaleDateString()}
        />
      ))}
    </div>
  );
};

export default PacientesEncaminhados;