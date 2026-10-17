import { useEffect, useState } from "react";
import PostList from "../../components/PostList/PostList";
import {
  Buttons,
  Counters,
  ProfileInfo,
  StyledProfile,
} from "./Profile.styled";
import { follow, getUserById, unfollow } from "../../service/api";
import { Loader } from "../../components/Loader";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useLogin } from "../../components/LoginContext";

const Profile = ({ user }) => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const { loggedIn } = useLogin();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    getUserById(user)
      .then(setInfo)
      .catch((err) => console.error(err))
      .finally(setLoading(false));
  }, [user]);

  if (loading || !info) return <Loader />;

  const handleClick = (e) => {
    const button = e.target.closest("[data-action]");
    if (!button) return;

    if (!loggedIn) {
      promptLogin();
      return;
    }

    const { action, user: authorId } = button.dataset;
    if (action === "follow") {
      follow(authorId);
    } else {
      unfollow(authorId);
    }
    setInfo((p) => {
      return {
        ...p,
        isFollowing: !p.isFollowing,
        followers: p.followers + (p.isFollowing ? -1 : 1),
      };
    });
  };

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

  const userId = JSON.parse(localStorage.getItem("account"))?.id ?? "";

  return (
    <StyledProfile>
      <Link
        to={location.state?.from ?? "/"}
        style={{ padding: 20, paddingBottom: 0, marginRight: "auto" }}
      >
        <MdOutlineArrowBackIos />
      </Link>
      <ProfileInfo onClick={handleClick}>
        <h2>@{username}</h2>
        <p>{!!bio ? bio : "No bio"}</p>
        <p>Joined: {joined.slice(0, 10)}</p>
        <Counters>
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
        </Counters>
        <Buttons className={isFollowing && "following"}>
          <button
            type="button"
            className={isFollowing ? "followed" : ""}
            data-action={userId === id || isFollowing ? null : "follow"}
            data-user={id}
          >
            {userId === id
              ? "This is you"
              : isFollowing
                ? "Following"
                : "Follow"}
          </button>
          {isFollowing && (
            <button type="button" data-action="unfollow" data-user={id}>
              Unfollow
            </button>
          )}
        </Buttons>
      </ProfileInfo>
      <PostList user={user} />
    </StyledProfile>
  );
};

export default Profile;
