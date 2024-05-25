import "./Tweet.css";

const Tweet = ({ username, text }) => {
  return (
    <article className="tweet-container">
      <img
        src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww"
        alt=""
      />
      <div>
        <p>{username}</p>
        <p>{text}</p>
        <div>
          <button>comment</button>
        </div>
      </div>
    </article>
  );
};

export default Tweet;
