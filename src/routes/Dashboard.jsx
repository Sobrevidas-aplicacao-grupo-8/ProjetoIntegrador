import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Style/dashboard.css";
import mapagoiania from "../assets/mapagoiania.webp";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [pacientesCadastrados, setPacientesCadastrados] = useState(null);
  const [pacientesEncaminhados, setPacientesEncaminhados] = useState(null);
  const [pacientesAbsenteistas, setPacientesAbsenteistas] = useState(null);
  const [homensMaiorQuarenta, setHomensMaiorQuarenta] = useState(null);
  const [etilistas, setEtilistas] = useState(null);
  const [tabagistas, setTabagistas] = useState(null);
  const [lesoes, setLesoes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCadastrados = await axios.get(
          "http://localhost:8080/contar-pacientes"
        );
        const resEncaminhados = await axios.get(
          "http://localhost:8080/contar-pacientes-encaminhados"
        );
        const resAbsenteistas = await axios.get(
          "http://localhost:8080/contar-pacientes-nao-encaminhados"
        );
        const resMaiorQuarenta = await axios.get(
          "http://localhost:8080/contar-pacientes-maior-quarenta"
        );
        const resEtilistas = await axios.get(
          "http://localhost:8080/contar-pacientes-etilistas"
        );
        const resTabagistas = await axios.get(
          "http://localhost:8080/contar-pacientes-tabagistas"
        );
        const resLesoes = await axios.get(
          "http://localhost:8080/contar-pacientes-lesao"
        );

        setPacientesCadastrados(resCadastrados.data);
        setPacientesEncaminhados(resEncaminhados.data);
        setPacientesAbsenteistas(resAbsenteistas.data);
        setHomensMaiorQuarenta(resMaiorQuarenta.data);
        setEtilistas(resEtilistas.data);
        setTabagistas(resTabagistas.data);
        setLesoes(resLesoes.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="maincountainer">
        <div className="barra-lateral">
          <div className="versao">
            <h3>Número da versão</h3>
          </div>
          <div className="home">
            <h2>Home</h2>
          </div>
          <div className="dashboard">
            <p>Dashboard</p>
          </div>
          <div className="cadastro">
            <h2>Cadastros</h2>
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
        <div className="principal">
          <div className="form">
            <input
              type="text"
              list="flavors"
              name="flavor"
              placeholder="Selecione a Microrregião"
            />
            <datalist id="flavors">
              <option value="Microrregião 1"></option>
              <option value="Microrregião 2"></option>
              <option value="Microrregião 3"></option>
              <option value="Microrregião 4"></option>
              <option value="Microrregião 5"></option>
              <option value="Microrregião 6"></option>
              <option value="Microrregião 7"></option>
            </datalist>
          </div>
          <div className="containernumeros">
            <div className="paciente-cadastrado">
              <p>Pacientes cadastrados </p>
              <div className="qntd-cadastrado">{pacientesCadastrados}</div>
            </div>
            <div className="paciente-encaminhado">
              <p id="encaminhado">Pacientes encaminhados</p>
              <div className="qntd-encaminhado">{pacientesEncaminhados}</div>
            </div>
            <div className="paciente-absenteista">
              <p id="absenteistas">Pacientes absenteístas</p>
              <div className="qntd-absenteista">{pacientesAbsenteistas}</div>
            </div>
          </div>
          <br />
          <div className="mapa">
            <h2>Mapa dos pacientes cadastrados</h2>
            <img src={mapagoiania} alt="Mapa de Goiânia" className="logo2" />
          </div>
          <div className="fator-risco">
            <div className="row">
              <div className="idade">
                <h4>Homem maior de 40 anos</h4>
                <p>{homensMaiorQuarenta}</p>
              </div>
              <div className="etilista">
                <h4>Etilista</h4>
                <p>{etilistas}</p>
              </div>
            </div>
            <div className="row">
              <div className="fumante">
                <h4>Tabagista</h4>
                <p>{tabagistas}</p>
              </div>
              <div className="lesao">
                <h4>Lesão suspeita</h4>
                <p>{lesoes}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
