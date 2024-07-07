import "./Style/dashboard.css";
import mapagoiania from "../assets/mapagoiania.webp";
import Header from "../components/Header";
import home from "../assets/home.jpg";
import usuario from "../assets/Usuário.png";
import logout from "../assets/logout.jpg";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
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
          <div className="paciente-cadastrado">
            <p>Pacientes cadastrados </p>
          </div>
          <div className="paciente-encaminhado">
            <p>Pacientes encaminhados</p>
          </div>
          <div className="paciente-absenteista">
            <p>Pacientes absenteístas</p>
          </div><br />
          <div className="qntd-cadastrado">Null</div>
          <div className="qntd-encaminhado">Null</div>
          <div className="qntd-absenteista">Null</div>
          <div className="mapa">
            <h2>Mapa dos pacientes cadastrados</h2>
            <img src={mapagoiania} alt="Mapa de Goiânia" className="logo2" />
          </div>
          <div className="fator-risco">
            <h2>Pacientes por fator de risco</h2>
            <div className="row">
              <div className="idade">
                <h4>Homem maior de 40 anos</h4>
                <p>Null</p>
              </div>
              <div className="etilista">
                <h4>Etilista</h4>
                <p>Null</p>
              </div>
            </div>
            <div className="row">
              <div className="fumante">
                <h4>Tabagista</h4>
                <p>Null</p>
              </div>
              <div className="lesao">
                <h4>Lesão suspeita</h4>
                <p>Null</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
