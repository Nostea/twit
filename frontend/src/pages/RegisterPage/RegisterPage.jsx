import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../../api/api.jsx";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/users/register`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!data.result) return setErrorMessage(data.message || "Failed to register, please try again");

    const userInfo = data.result;

    navigate(`/login`); // weiterleiten zu login page
  };

  return (
    <>
      <h1>Sign up down below!</h1>
      <form>
        <input type="text" name="username" id="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" name="email" id="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" name="password" id="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="submit" value="Sign up" onClick={registerUser} />
      </form>
      <p>
        Do you want to <Link to={"/login"}>log in</Link> instead?
      </p>
    </>
  );
};

export default RegisterPage;
