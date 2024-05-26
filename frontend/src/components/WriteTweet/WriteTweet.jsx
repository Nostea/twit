import { useState } from "react";
import "./WriteTweet.css";
import { backendUrl } from "../../api/api.jsx";

const WriteTweet = ({ user, token, forceRefreshCount, setForceRefreshCount }) => {
  const [tweetText, setTweetText] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const writeTweet = async () => {
    const res = await fetch(`${backendUrl}/api/v1/tweets`, {
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
      method: "POST",
      body: JSON.stringify({ userId: user._id, text: tweetText }),
    });
    const data = await res.json();

    if (!data) {
      console.log("Error posting tweet");
    }
    setTweetText("");
    document.getElementById("tweetbox").value = "";
    setButtonDisabled(true);

    setForceRefreshCount(++forceRefreshCount);
  };

  const toggleButtonAndSetTweetText = (text) => {
    setTweetText(text);
    if (text.length > 0) {
      setButtonDisabled(false);
      console.log("button enabled");
    } else {
      setButtonDisabled(true);
      console.log("button disabled");
    }
  };

  return (
    <div className="write-tweet">
      <h4>Write a new tweet</h4>
      <textarea id="tweetbox" placeholder="Write a tweet" value={tweetText} onChange={(e) => toggleButtonAndSetTweetText(e.target.value)}></textarea>
      <button type="button" id="postbutton" onClick={writeTweet} disabled={buttonDisabled}>
        post Tweet
      </button>
    </div>
  );
};

export default WriteTweet;
