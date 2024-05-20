import React from "react";
import "./Style/paciente.css";

const Paciente = () => {
  return (
    <div className="v18_2">
      <div className="v18_3"></div>
      <div className="v18_5"></div>
      <span className="v18_27">CADASTROS</span>
      <span className="v18_26">
        <a href="dashboard.html">Dashboard</a>
      </span>
      <span className="v18_7">HOME</span>
      <span className="v18_29">MONITORAMENTO</span>
      <span className="v18_30">Pacientes encaminhados</span>
      <span className="v18_31">Pacientes absenteístas</span>
      <span className="v18_32">SOBREVIDAS ACS</span>
      <div className="v18_33"></div>
      <span className="v18_37">PROFISSIONAL DE SAÚDE</span>
      <span className="v18_35">Joãozinho</span>
      <div className="v18_38"></div>
      <span className="v18_39">VERSÃO DEMO</span>
      <span className="v25_23">Paciente</span>
      <div className="v25_24"></div>
      <span className="v25_25">Paciente</span>
      <span className="v25_26">Nome do paciente *</span>
      <div className="v25_27">
        <input
          type="text"
          className="input-text"
          placeholder="Digite o nome do paciente"
        />
      </div>
      <span className="v25_28">CPF *</span>
      <div className="v25_31">
        <input
          type="text"
          className="input-text"
          placeholder="Digite o CPF do paciente"
        />
      </div>
      <span className="v25_33">Data de nascimento *</span>
      <div className="v25_34">
        <input type="date" className="input-text" placeholder="__/__/____" />
      </div>
      <div className="v83_9"></div>
      <span className="v25_37">Sexo *</span>
      <div className="v25_39">
        <input type="radio" id="masculino" name="sexo" value="masculino" />
        <label htmlFor="masculino">MASCULINO</label>
      </div>

      <div className="v25_41">
        <input type="radio" id="feminino" name="sexo" value="feminino" />
        <label htmlFor="feminino">FEMININO</label>
      </div>

      <span className="v25_43">Telefone Celular *</span>
      <div className="v25_44">
        <input type="tel" className="input-text" placeholder="(xx)xxxxx-xxxx" />
      </div>
      <div className="v25_47"></div>
      <div className="v234_2"></div>
      <span className="v25_48">E-mail (opcional) </span>
      <div className="v25_49">
        <input
          type="text"
          className="input-text"
          placeholder="Digite o email"
        />
      </div>
      <span className="v25_50">Nome da mãe *</span>
      <div className="v25_51">
        <input
          type="text"
          className="input-text"
          placeholder="Digite o nome da mãe do paciente"
        />
      </div>
      <span className="v25_53">CEP *</span>
      <div className="v25_54">
        <input type="text" className="input-text" placeholder="Digite o CEP" />
      </div>
      <span className="v25_55">Estado</span>
      <span className="v25_56">Cidade</span>
      <div className="v25_57">
        <input type="text" className="input-text" placeholder="UF" />
      </div>
      <div className="v25_58">
        <input
          type="text"
          className="input-text"
          placeholder="Digite a Cidade"
        />
      </div>
      <span className="v25_59">Endereço *</span>
      <div className="v25_60">
        <input
          type="text"
          className="input-text"
          placeholder="Digite o Endereço"
        />
      </div>
      <span className="v25_61">Fator de risco *</span>
      <div className="v25_62" tabIndex="0">
        <input type="checkbox" />
        <div className="box-content"></div>
      </div>
      <span className="v25_70">Homem &gt; 40 anos</span>
      <div className="v25_63" tabIndex="0">
        <input type="checkbox" />
        <div className="box-content"></div>
      </div>
      <div className="v25_64" tabIndex="0">
        <input type="checkbox" />
        <div className="box-content"></div>
      </div>
      <span className="v25_68">Etilista</span>
      <div className="v25_65" tabIndex="0">
        <input type="checkbox" />
        <div className="box-content"></div>
      </div>
      <span className="v25_69">Lesão suspeita</span>
      <span className="v25_67">Tabagista</span>
      <span className="v83_10">Data de Cadastro</span>
      <div className="v83_12">
        <input type="date" className="input-text" placeholder="__/__/____" />
      </div>
      <span className="v87_62">Pacientes cadastrados</span>
      <div className="v99_2"></div>
      <div className="v99_3"></div>
      <div className="v99_4"></div>
      <a href="dashboard.html">
        <div className="v99_5"></div>
        <div className="v99_8">Salvar</div>
      </a>
      <div className="v99_6"></div>
      <div className="v99_8"></div>
      <span className="v99_9">Cancelar</span>
      <a href="dashboard.html">
        <div className="v99_6"></div>
        <div className="v99_9">Cancelar</div>
      </a>
      <div className="v99_10"></div>
      <div className="v225_8">
        <span className="v225_2">cadastrar imagem</span>
        <div className="v225_5"></div>
      </div>
      <span className="v234_3">Microárea*</span>
      <div className="v234_4">
        <input
          type="text"
          className="input-text"
          placeholder="Digite a Microárea"
        />
      </div>
    </div>
  );
};

export default Paciente;
