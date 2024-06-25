import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <h1 onClick={() => navigate("/")}>Sobrevidas ACS</h1>
      <div className="usuariodisplay" onClick={() => navigate("/login")}>
        <h2>Joãosinho</h2>
        <p>profissional da saúde</p>
      </div>
    </header>
  );
};

export default Header;
