import { useEffect, useRef } from "react";
import { backendUrl } from "../../api/api.jsx";
import { useNavigate } from "react-router-dom"


const UserRefreshSimple = ({ user, token, setUser, setToken }) => {
  /*
    pure technical component. No html will be rendered, but this component will handle the refreshing of a logged in user by cylic calling the backend endpoint with the correct data.
 */

  const navigate = useNavigate();
  const setIntervalId = useRef(null);

  // when the component is rendered the first time, we want to start a cycle that will try to refresh the token every 30 seconds
  useEffect(() => {
    setIntervalId.current = setInterval(() => {
      refreshTokenForUser(user, token);
    }, 30 * 1000);

    return () => {
        clearInterval(setIntervalId.current);
    }
  }, [user]);

  // this is the function that will be called every second after first rendering of our component
  async function refreshTokenForUser(user, token) {
    if (!user) {
      // no user logged in yet, we do nothing
      console.log("no logged in user yet!");
    } else {
      const refreshTokenResponse = await fetch(`${backendUrl}/api/v1/users/refreshToken`, {
          headers: { authorization: `Bearer ${token}`},
          method: "POST",
          credentials: "include",
        });
      if (refreshTokenResponse.ok) {
          // our server said, we are authenticated and we get a new access_token. Let's set it in the state
          const responseJson = await refreshTokenResponse.json();
          setToken(responseJson.result)
      } else {
          // User logout, since the server said, we are not authenticated. We reset the states. we also navigate back to the landing page
          setUser(null)
          setToken("")
          navigate("/login")
      }
    }
  }

  return <></>;
};

export default UserRefreshSimple;
