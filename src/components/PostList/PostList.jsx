import { useEffect, useState } from "react";
import Post from "../Post/Post";
import {
  follow,
  getFeed,
  getFollowing,
  getUserPostsById,
  like,
  save,
} from "../../service/api";
import { useLogin } from "../LoginContext";
import { StyledPosts, ThatsIt } from "./PostList.styled";
import { Loader } from "../Loader";
import { useInfiniteScroll } from "../../service/useInfiniteScroll";
import { Link } from "react-router-dom";
import { useTheme } from "styled-components";

const actions = {
  like: {
    scope: "post",
    api: like,
    toggle: (p) => ({
      ...p,
      liked: !p.liked,
      likes: p.likes + (p.liked ? -1 : 1),
    }),
  },
  save: {
    scope: "post",
    api: save,
    toggle: (p) => ({ ...p, saved: !p.saved }),
  },
  follow: {
    scope: "user",
    api: follow,
    toggle: (p) => ({
      ...p,
      author: { ...p.author, followed: !p.author.followed },
    }),
  },
};

const PostList = ({ user, following }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [snapshot, setSnapshot] = useState(null);

  const theme = useTheme();

  const { promptLogin, loggedIn } = useLogin();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setPage(1);
    setSnapshot(null);
    setHasMore(false);

    const request = user
      ? getUserPostsById(user, 1)
      : following
        ? getFollowing(1)
        : getFeed(1);

    request
      .then(({ posts, hasMore, snapshot }) => {
        if (!cancelled) {
          setPosts(posts);
          setHasMore(hasMore);
          setSnapshot(snapshot);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error(err);
          setPosts([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user, following]);

  const loadMore = () => {
    if (!hasMore || loading) return;
    setLoading(true);

    const nextPage = page + 1;
    const request = user
      ? getUserPostsById(user, nextPage, snapshot)
      : following
        ? getFollowing(nextPage, snapshot)
        : getFeed(nextPage, snapshot);

    request
      .then(({ posts: newPosts, hasMore }) => {
        setPosts((prev) => {
          const seen = new Set(prev.map((p) => p.id));
          return [...prev, ...newPosts.filter((p) => !seen.has(p.id))];
        });
        setHasMore(hasMore);
        setPage(nextPage);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInteract = (e) => {
    const button = e.target.closest("[data-action]");
    if (!button) return;

    if (!loggedIn) {
      promptLogin();
      return;
    }

    const { action, post, user: authorId } = button.dataset;
    const config = actions[action];
    if (!config) return;

    const isUserScope = config.scope === "user";
    const targetId = isUserScope ? authorId : post;

    const matches = (p) =>
      isUserScope
        ? String(p.author.id) === targetId
        : String(p.id) === targetId;

    const apply = () =>
      setPosts((prev) => prev.map((p) => (matches(p) ? config.toggle(p) : p)));

    apply();

    config.api(targetId).catch((err) => {
      console.error(err);
      apply();
    });
  };

  const sentinelRef = useInfiniteScroll(
    loadMore,
    hasMore && !loading,
    posts.length,
  );

  if (loading) return <Loader />;

  return (
    <>
      <StyledPosts onClick={handleInteract}>
        {posts.map((post) => (
          <Post key={post.id} content={post} user={!!user} />
        ))}
      </StyledPosts>
      {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
      {loading && <p>Loading...</p>}
      {!hasMore && (
        <ThatsIt>
          <h2>Thats it for today!</h2>
          <p>There are no more posts found</p>
          <Link to="/newpost" style={{ color: theme.colors.accent }}>
            Make your own
          </Link>
        </ThatsIt>
      )}
    </>
  );
};

export default PostList;
