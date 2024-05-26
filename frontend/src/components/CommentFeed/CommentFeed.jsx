import { useEffect, useState } from "react";
import Comment from "../Comment/Comment.jsx";
import { backendUrl } from "../../api/api.jsx";
import WriteComment from "../WriteComment/WriteComment.jsx";

const CommentFeed = ({ user, token, tweet }) => {
  const [comments, setComments] = useState([]);
  const [forceCommentFeedReloadCount, setForceCommentFeedReloadCount] = useState(0);

  useEffect(() => {
    async function fetchComments() {
      const res = await fetch(`${backendUrl}/api/v1/comments?tweetId=${tweet._id}`, {
        headers: { authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!data.result) return console.log("Could not load comments");

      setComments(data.result);
      // reset error message (zur sicherheit)
    }

    fetchComments();
    // fetchUser();
  }, [forceCommentFeedReloadCount]);

  return (
    <>
      <WriteComment
        user={user}
        token={token}
        tweet={tweet}
        forceCommentFeedReloadCount={forceCommentFeedReloadCount}
        setForceCommentFeedReloadCount={setForceCommentFeedReloadCount}
      />
      <div className="comment-grid">
        {comments.map((item, index) => (
          <Comment key={index} user={user} comment={item} />
        ))}
      </div>
    </>
  );
};

export default CommentFeed;
