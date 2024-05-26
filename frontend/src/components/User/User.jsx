import { Link } from "react-router-dom";
import "./User.css";

const User = ({ user }) => {

  const profileImgFallback = "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww"
  const profileImageSource = user?.profileImg ? user.profileImg : profileImgFallback

  return (
    <article className="user-container">
        { user ? 
            <>
                <img src={profileImageSource} alt="" />
                <div className="user-container-data">
                    <p>{user.username}</p>
                </div>
            </>
            : 
            <Link to="/login">
                <button>Login</button>
            </Link>
        }
    </article>
  )
};

export default User;
