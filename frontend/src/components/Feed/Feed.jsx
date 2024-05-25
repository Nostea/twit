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

      if (!data.result) return setErrorMessage(data.message || "Could not load tweets");

      setTweets(data.result);
      setErrorMessage(""); // reset error message (zur sicherheit)
    }

    fetchTweets();
    // fetchUser();
  }, []);

  return (
    <>
      <SearchBar />
      <h3>Feed</h3>

      <div></div>

      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
    </>
  );
};

export default Feed;
