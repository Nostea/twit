import { useEffect, useRef } from "react";
import { backendUrl } from "../../api/api.jsx";
import { useNavigate } from "react-router-dom";



const UserRefresh = ({ user, token, setUser, setToken }) => {
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
      // user is logged in, lets refresh the accessToken whenever we think it's useful

      //  we want to calculate the expiration date of the access_token. If it is near it's end (e.g. it only lives for less than a minute), we want to refresh the token
      // the expiration date is part of the payload of a jwt token. A token follows the format "HEADER.PAYLOAD.SIGNATURE". So we have a string with three parts divided by dots.
      // the payload itself is a json encoded with Base64. So what we have to do:
      // 1. get the payload part from the token
      // 2. decode the base64 into a json-string
      // 3. parse the json-string into a json-object
      // 4. retrieve the expiration date from the json-object

      const payloadPartEncoded = token.split(".")[1]; // step1: second string after splitting the token into 3 strings with delimiter "."
      const payloadPartDecoded = atob(payloadPartEncoded); // step2: decoding using html standard decoding method
      const payloadPartJson = JSON.parse(payloadPartDecoded); // step3: lets create a json object from the decoded string
      const expirationDateTimestamp = payloadPartJson.exp; // step4: get the expirationDate, with is a timestamp in seconds
      // with this, we can calculate the difference from now
      const nowTimestamp = (new Date()).getTime() // this is the timestamp in milliseconds for the current time
      const timestampDiffs = expirationDateTimestamp*1000 - nowTimestamp // the token is valid for this amount of milliseconds

      // let's say we want to refresh the token, when the current accessToken is valid for less than a minute. we need to know, how much milliseconds this is
      const oneMinuteAsMilliseconds = 60 * 1000 // a minute has 60 seconds. a second has 1000 milliseconds

      // if our timestampDiff is smaller than this value, we want to refresh
      if (timestampDiffs < oneMinuteAsMilliseconds) {
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
  }

  return <></>;
};

export default UserRefresh;
