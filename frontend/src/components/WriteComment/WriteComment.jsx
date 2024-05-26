import { useState } from "react";
import "./WriteComment.css";
import { backendUrl } from "../../api/api.jsx";

const WriteComment = ({ user, token, tweet, forceRefreshCount, setForceRefreshCount }) => {
  const [commentText, setCommentText] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const writeComment = async () => {
    const res = await fetch(`${backendUrl}/api/v1/comments`, {
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
      method: "POST",
      body: JSON.stringify({ userId: user._id, tweetId: tweet._id, text: commentText }),
    });
    const data = await res.json();

    if (!data) {
      console.log("Error posting comment");
    }
    setCommentText("");
    document.getElementById("commentbox").value = "";
    setButtonDisabled(true);

    setForceRefreshCount(++forceRefreshCount);
  };

  const toggleButtonAndSetTweetText = (text) => {
    setCommentText(text);
    if (text.length > 0) {
      setButtonDisabled(false);
      console.log("button enabled");
    } else {
      setButtonDisabled(true);
      console.log("button disabled");
    }
  };

  return (
    <article className="comment-card">
      <textarea placeholder="Write a comment" value={commentText} onChange={(e) => toggleButtonAndSetTweetText(e.target.value)}></textarea>
      <button type="button" id="commentbox" onClick={writeComment} disabled={buttonDisabled}>
        Comment
      </button>
    </article>
  );
};

export default WriteComment;
