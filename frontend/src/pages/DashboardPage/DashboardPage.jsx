import { Link } from "react-router-dom";
import Feed from "../../components/Feed/Feed";
import NavBar from "../../components/NavBar/NavBar";

const DashboardPage = () => {
  return (
    <>
      <h1>Your personal feed</h1>
      <NavBar />
      <Link to="/verifyEmail">
        <button>Verify Email</button>
      </Link>
      <div>
        <h4>Write a new tweet</h4>
        <textarea placeholder="Write a tweet"></textarea>
      </div>
      <Feed />
    </>
  );
};

export default DashboardPage;
