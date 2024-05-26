const Comment = ({ user, comment }) => {
  const profileImgFallback =
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww";
  const profileImageSource = user?.profileImg ? user.profileImg : profileImgFallback;

  return (
    <article className="comment-card">
      <img src={profileImageSource} alt="profile img" />
      <div className="comment-card-content">
        <p>{user.username}</p>
        <p>{comment.text}</p>
      </div>
    </article>
  );
};

export default Comment;
