import { Link } from "react-router-dom";
import Feed from "../../components/Feed/Feed";
import NavBar from "../../components/NavBar/NavBar";
import "./DashboardPage.css";
import WriteTweet from "../../components/WriteTweet/WriteTweet.jsx";
import User from "../../components/User/User.jsx";
import { useState } from "react";

const DashboardPage = ({ token, user }) => {
  const [forceRefreshCount, setForceRefreshCount] = useState(0);
  return (
    <>
      <div className="dashboard-layout">
        <User user={user} />
        <NavBar />

        <section className="feed-section">
          <Link to="/verifyEmail">
            <button>Verify Email</button>
          </Link>
          <WriteTweet token={token} user={user} forceRefreshCount={forceRefreshCount} setForceRefreshCount={setForceRefreshCount} />

          <Feed token={token} user={user} forceRefreshCount={forceRefreshCount} setForceRefreshCount={setForceRefreshCount} />
        </section>
      </div>
    </>
  );
};

export default DashboardPage;
