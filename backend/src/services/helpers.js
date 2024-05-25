export function userToView(user) {
  return {
    _id: user._id,
    bio: user.bio,
    username: user.username,
    email: user.email,
  };
}
