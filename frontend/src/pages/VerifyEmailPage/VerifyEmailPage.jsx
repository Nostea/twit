import { useState } from "react";
import { backendUrl } from "../../api/api.jsx";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const VerifyEmailPage = ({ user, token }) => {
  console.log(user.email);
  // * To Send Verification Email
  //const [authenticatedUserId, setAuthenticatedUserId] = useState();

  // * For Email Verification
  const [sixDigitCode, setSixDigitCode] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // * Function Send Verification Email
  const navigate = useNavigate();

  const sendVerificationEmail = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/users/sendVerificationEmail`, {
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
      method: "POST",
    });

    const data = await res.json();

    if (!data.result) return setErrorMessage(data.message || "Failed to send email");

    setErrorMessage("");
    setSuccessMessage(data.result.message);
    console.log(data);
  };

  // * Function Email Verification

  const verifyUserEmail = async () => {
    console.log(user);
    const res = await fetch(`${backendUrl}/api/v1/users/verifyEmail`, {
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
      method: "POST",
      body: JSON.stringify({ sixDigitCode }),
    });

    const data = await res.json();

    if (!data.result) return setErrorMessage(data.message || "Failed verify email");

    setErrorMessage("");
    setSuccessMessage(data.result.message);
    console.log(data);
    navigate(`/dashboard`);
  };

  return (
    <>
      <h3>You are logged in. In order to tweet pleaes verify your Email.</h3>
      <button onClick={sendVerificationEmail}>Send Verification Email</button>
      <input
        type="text"
        name="sixdigitcode"
        id="sixdigitcode"
        placeholder="six digit code"
        value={sixDigitCode}
        onChange={(e) => setSixDigitCode(e.target.value)}
      />
      <input type="submit" value="Verify Email" onClick={verifyUserEmail} />
    </>
  );
};

export default VerifyEmailPage;
