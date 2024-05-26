import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../../api/api.jsx";

const LoginPage = ({ setToken, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/users/login`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (!data.result) return setErrorMessage(data.message || "Failed verify email");
    console.log(errorMessage);
    navigate("/dashboard");

    // save token --> "logged in"
    setToken(data.result.tokens.accessToken);
    setUser(data.result.user);
  };

  return (
    <>
      <h1>Log in down below!</h1>
      <form>
        <input type="email" name="email" id="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" name="password" id="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="submit" value="Log in" onClick={loginUser} />
      </form>
      <p>
        Do you want to <Link to={"/register"}>register</Link> instead?
      </p>
    </>
  );
};

export default LoginPage;
