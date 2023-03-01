import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";
import Logo from "../../img/logo.png";

const BaseUrl ="https://tudestinoapp-api-production.up.railway.app/api"


const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(BaseUrl+"/auth/login", credentials);
      if (res.data.isAdmin) {
        const user = {
          details: res.data.details,
          isAdmin: res.data.isAdmin
        }
        dispatch({ type: "LOGIN_SUCCESS", payload: user });

        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="header">

        <div className="headerimg">
        <img className="cellImg" src={Logo} alt="logo tu destino app" />
        </div>

        <div className="headertext">
          <buttom>Bienvenido!</buttom>
        </div>

      </div>

      <div className="lContainer">
        <div className="containertitle">
          <h4>Login to Dashboard Admin</h4>
        </div>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
