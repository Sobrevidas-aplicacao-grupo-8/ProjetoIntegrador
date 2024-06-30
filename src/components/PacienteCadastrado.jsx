import React from "react";

const PacienteCadastrado = ({ nome, dataCadastro }) => {
  return (
    <div className="tabela">
      <div style={{ width: 200 }}>
        <p style={{ fontSize: 20 }}>{nome}</p>
      </div>
      <p style={{ fontSize: 20 }}>Cadastro: {dataCadastro}</p>
      <p style={{ fontSize: 20, fontWeight: "bold" }}>Alterar dados</p>
    </div>
  );
};

export default PacienteCadastrado;
