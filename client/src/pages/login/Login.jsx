import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalAuthContext } from "../../hooks";
import "./Login.css";
import StyledButton from "../../components/styledButton/StyledButton";
import Input from "../../components/input/Input";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch, currentUser } = useGlobalAuthContext();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/admin/manageArticles");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>WELCOME.</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email Address:</label>
          <Input
            name="email"
            label="Input Your Email here"
            type="email"
            handleChange={(e) => setEmail(e.target.value)}
            error="please input valid email"
            value={email}
          />
          <input
            type="email"
            placeholder="jhonnyappleseeds@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Appleseeds123456"
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledButton color="blue" onclick={handleLogin}>
            Login
          </StyledButton>
          {error && <span>{error}</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;
