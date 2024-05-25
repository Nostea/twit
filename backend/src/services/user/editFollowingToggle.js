import { User } from "../../models/User.js";

export async function editFollowing(authenticatedUserId, userId) {
  //* authenticatedUserId = das ist man selber/hauptuser
  //* userId = der User dem man folgen möchte
  /*
   Step by step
1. button follow user clicken
2. der andere User wird in das array following vom Hauptuser gepusht
3. return geupdatete Info
*/
  // * Email Verified Check
  const user = await User.findById(authenticatedUserId);
  if (!user?.isEmailVerified) throw new Error("Email not verified, you cannot start following user");
  // * Email Verified Check

  // * Array/Eimer für alle user die ich followe holen
  const mainUserFollowingArray = user.following;

  //  userId der person der ich followen möchte herausfinden
  const userFollowing = await User.findById(userId);
  if (!userFollowing) {
    throw new Error("User you want to follow doesn't exist");
  }

  if (userFollowing._id.toString() === authenticatedUserId) {
    throw new Error("You can't follow yourself");
  }

  const containsThisUserId = mainUserFollowingArray.includes(userId);

  if (!containsThisUserId) {
    const updatedFollowingArray = [...mainUserFollowingArray, userId];
    user.following = updatedFollowingArray;
    await user.save();
  } else {
    const updatedFollowingArray = mainUserFollowingArray.filter((arrayItem) => arrayItem !== userId);
    user.following = updatedFollowingArray;
    await user.save();
  }

  return user.following;
}
