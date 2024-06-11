import React from "react";

const PacienteEncaminhado = ({nome}) => {
  return (
    <div className="tabela">
      <div style={{ width: 200 }}>
        <p style={{ fontSize: 20 }}>{nome}</p>
      </div>
    </div>
  );
};

export default PacienteEncaminhado;
