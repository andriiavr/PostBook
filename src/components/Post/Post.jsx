import { Link, useLocation } from "react-router-dom";
import { Author, Button, FollowText, Interactions, StyledPost } from "./Post.styled";
import { FiHeart, FiBookmark } from "react-icons/fi";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";

const Post = (props) => {
  const { age_hours, id, body, author, likes, liked, saved } = props.content;
  const { username, followed } = author;
  const location = useLocation()

  const userId = JSON.parse(localStorage.getItem('account'))?.id ?? ''

  const postTime = () => {
    const age_minutes = age_hours * 60;
    const age_seconds = age_minutes * 60;
    const age_days = age_hours / 24;
    const hour_suffix = Math.floor(age_hours) % 10 == 1 ? "hour" : "hours";
    const day_suffix = Math.floor(age_days) % 10 == 1 ? "day" : "days";

    if (age_seconds < 60) return `${Math.floor(age_seconds)} sec`;
    else if (age_minutes < 60) return `${Math.floor(age_minutes)} min`;
    else if (age_hours < 24) return `${Math.floor(age_hours)} ${hour_suffix}`;
    else if (age_days < 15) return `${Math.floor(age_days)} ${day_suffix}`;
    else return ``;
  };

  return (
    <StyledPost>
      <Author>
        <Link to={`/@${username}`} state={{from: location}}>
          <h4>{username}</h4>
        </Link>
        <Link to={`/@${username}`}>@{username}</Link> · {postTime()}
        {!props.user && userId !== author.id && (
          <button
            type="button"
            className={followed ? "followed" : ""}
            data-action={followed ? null : "follow"}
            data-user={author.id}
          >
            {followed ? <><FaUserCheck /> <FollowText>Following</FollowText></> : <><FaUserPlus /> <FollowText>Follow</FollowText></>}
            
          </button>
        )}
      </Author>
      <div>{body}</div>
      <Interactions>
        <Button
          type="button"
          className={liked ? "active" : ""}
          data-post={id}
          data-action="like"
        >
          <FiHeart />
          {likes}
        </Button>
        <Button
          type="button"
          className={saved ? "active" : ""}
          data-post={id}
          data-action="save"
        >
          <FiBookmark />0
        </Button>
      </Interactions>
    </StyledPost>
  );
};

export default Post;
