import { useEffect, useState } from "react";
import PostList from "../../components/PostList/PostList";
import { StyledProfile } from "./Profile.styled";
import { getUserById } from "../../service/api";
import { Loader } from "../../components/Loader";

const Profile = ({ user }) => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserById(user)
      .then(setInfo)
      .catch((err) => console.error(err))
      .finally(setLoading(false));
  }, [user]);

  console.log(info);
  if (loading || !info) return <Loader />;

  const {
    id,
    username,
    bio,
    joined,
    followers,
    following,
    posts,
    isFollowing,
  } = info;

  const userId = JSON.parse(localStorage.getItem('account')).id

  return (
    <StyledProfile>
      <div>
        <h2>@{username}</h2>
        <p>{!!bio ? bio : "No bio"}</p>
        <p>Joined: {joined.slice(0, 10)}</p>
        <div>
          <div>
            <p>Following</p>
            <p>{following}</p>
          </div>
          <div>
            <p>Followers</p>
            <p>{followers}</p>
          </div>
          <div>
            <p>Posts</p>
            <p>{posts}</p>
          </div>
        </div>
        <button
          type="button"
          className={isFollowing ? "followed" : ""}
          data-action="follow"
          data-user={id}
        >
          {userId === id ? 'This is you' : isFollowing ? "Following" : "Follow"}
        </button>
        {isFollowing && <button type="button">Unfollow</button>}
      </div>
      <PostList user={user} />
    </StyledProfile>
  );
};

export default Profile;
