import React, { useState } from "react";
import "./informacoesdopaciente.css";

const InformacoesDoPaciente = () => {
  const [formData, setFormData] = useState({
    paciente: "",
    cpf: "",
    dataNascimento: "",
    sexo: "",
    celular: "",
    cep: "",
    area: "",
    estado: "",
    cidade: "",
    endereco: "",
    email: "",
    mae: "",
    dataCadastro: "",
    imagem: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      imagem: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send formData to an API
    console.log(formData);
  };

  const handleReset = () => {
    setFormData({
      paciente: "",
      cpf: "",
      dataNascimento: "",
      sexo: "",
      celular: "",
      cep: "",
      area: "",
      estado: "",
      cidade: "",
      endereco: "",
      email: "",
      mae: "",
      dataCadastro: "",
      imagem: null,
    });
  };

  return (
    <div className="bodyinf">
      <form onSubmit={handleSubmit} className="forminf">
        <fieldset>
          <legend>Informações do Paciente</legend>

          <div className="form-group">
            <label htmlFor="paciente">Nome do paciente</label>
            <input
              type="text"
              id="paciente"
              name="paciente"
              placeholder="Insira o nome do paciente"
              value={formData.paciente}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              placeholder="999.999.999-99"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataNascimento">Data de nascimento</label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <p>Selecione o seu sexo:</p>
            <label htmlFor="masculino">
              <input
                type="radio"
                id="masculino"
                name="sexo"
                value="masculino"
                checked={formData.sexo === "masculino"}
                onChange={handleChange}
                required
              />
              Masculino
            </label>
            <label htmlFor="feminino">
              <input
                type="radio"
                id="feminino"
                name="sexo"
                value="feminino"
                checked={formData.sexo === "feminino"}
                onChange={handleChange}
                required
              />
              Feminino
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="celular">Telefone celular</label>
            <input
              type="tel"
              id="celular"
              name="celular"
              placeholder="(99) 99999-9999"
              value={formData.celular}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cep">CEP</label>
            <input
              type="number"
              id="cep"
              name="cep"
              placeholder="99999-999"
              value={formData.cep}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="area">Microárea</label>
            <input
              type="number"
              id="area"
              name="area"
              placeholder="Informe a Microárea"
              value={formData.area}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <input
              type="text"
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              placeholder="Informe sua cidade"
              value={formData.cidade}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endereco">Endereço</label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              placeholder="Informe seu endereço"
              value={formData.endereco}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail (Opcional)</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Informe seu e-mail"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mae">Nome da mãe</label>
            <input
              type="text"
              id="mae"
              name="mae"
              placeholder="Informe o nome da mãe"
              value={formData.mae}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataCadastro">Data de cadastro</label>
            <input
              type="date"
              id="dataCadastro"
              name="dataCadastro"
              value={formData.dataCadastro}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imagem">Imagem</label>
            <input
              type="file"
              id="imagem"
              name="imagem"
              onChange={handleFileChange}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Enviar" />
            <input type="reset" value="Cancelar" onClick={handleReset} />
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default InformacoesDoPaciente;
