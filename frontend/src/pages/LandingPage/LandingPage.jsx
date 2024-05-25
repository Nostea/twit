import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <h1>Welcome to TwitterClone!</h1>
      <h3>Sign up or log in down below.</h3>
      <div>
        <Link to="/register">
          <button>Sign up</button>
        </Link>
        <Link to="/login">
          <button>Log in</button>
        </Link>
      </div>
    </>
  );
};

export default LandingPage;
