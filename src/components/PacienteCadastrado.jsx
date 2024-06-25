import React, { useState, useRef, useEffect } from "react";
import InformacoesDoPaciente from "./Informacoesodpaciete/InformacoesPacientes";

const PacienteCadastrado = ({ nome, dataCadastro }) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  return (
    <div className="tabela">
      <div style={{ width: 200 }}>
        <p style={{ fontSize: 20 }}>{nome}</p>
      </div>
      <p style={{ fontSize: 20 }}>Cadastro: {dataCadastro}</p>
      <p
        style={{ fontSize: 20, fontWeight: "bold", cursor: "pointer" }}
        onClick={togglePopup}
      >
        Alterar dados
      </p>

      {showPopup && (
        <div className="popup">
          <div className="popup-content" ref={popupRef}>
            <span className="close" onClick={togglePopup}>
              &times;
            </span>
            <InformacoesDoPaciente />
          </div>
        </div>
      )}
    </div>
  );
};

export default PacienteCadastrado;
