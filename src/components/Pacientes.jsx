import React from "react";

const Pacientes = ({ nome }) => {
  return (
    <div className="tabela">
      <div style={{ width: 200 }}>
        <p style={{ fontSize: 20 }}>{nome}</p>
      </div>
    </div>
  );
};

export default Pacientes;
