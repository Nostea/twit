import { Link } from "react-router-dom";
import Feed from "../../components/Feed/Feed";
import NavBar from "../../components/NavBar/NavBar";
import "./DashboardPage.css";
import WriteTweet from "../../components/WriteTweet/WriteTweet.jsx";

const DashboardPage = ({ token, user }) => {
  return (
    <>
      <div className="dashboard-layout">
        <NavBar />

        <section className="feed-section">
          <Link to="/verifyEmail">
            <button>Verify Email</button>
          </Link>
          <WriteTweet />

          <Feed token={token} user={user} />
        </section>
      </div>
    </>
  );
};

export default DashboardPage;
