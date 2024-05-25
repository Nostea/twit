import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Tweet from "../Tweet/Tweet.jsx";
import "./Feed.css";
import { backendUrl } from "../../api/api";

const Feed = ({ token, user }) => {
  const [tweets, setTweets] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchTweets() {
      const res = await fetch(`${backendUrl}/api/v1/tweets/feed?userId=${user._id}`, {
        headers: { authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!data) return setErrorMessage(data || "Could not load tweets");

      setTweets(data);
      setErrorMessage(""); // reset error message (zur sicherheit)
    }

    fetchTweets();
    // fetchUser();
  }, []);

  return (
    <div className="feed-container">
      <SearchBar />
      <h2>Feed</h2>

      <div className="tweet-grid">
        {tweets.map((item, index) => (
          <Tweet username={item.username} text={item.text} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
