import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { follow, like, save, search } from "../../service/api";
import { Loader } from "../../components/Loader";
import Post from "../../components/Post/Post";
import {
  Filter,
  Filters,
  List,
  User,
  SearchBox,
  StyledSearch,
  Counters,
  UserData,
} from "./Search.styled";
import { useLogin } from "../../components/LoginContext";

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

const Search = () => {
  const [results, setResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams("");
  const query = searchParams.get("query") ?? "";
  const type = searchParams.get("type") ?? "all";
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const { loggedIn, promptLogin } = useLogin();
  const location = useLocation();

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
    setSearchParams(
      (p) => {
        if (!value) return;
        p.set("query", value.trim());
        return p;
      },
      { replace: true },
    );
  };

  const filterPick = (e) => {
    const button = e.target;
    if (!!button.id) {
      setSearchParams(
        (prev) => {
          prev.set("type", button.id);
          return prev;
        },
        { replace: true },
      );
    } else {
      setSearchParams(
        (prev) => {
          prev.delete("type");
          return prev;
        },
        { replace: true },
      );
    }
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
      setResults((prev) =>
        prev.map((p) => (matches(p) ? config.toggle(p) : p)),
      );

    apply();

    config.api(targetId).catch((err) => {
      console.error(err);
      apply();
    });
  };

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeoutId = setTimeout(async () => {
      const data = await search(query, 1, type);
      setResults(data.results);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, type]);

  useEffect(() => {
    document
      .querySelectorAll(".active-filter")
      .forEach((e) => e.classList.remove("active-filter"));
    document
      .querySelector(!type ? `#all` : `#${type}`)
      .classList.add("active-filter");
  }, [type]);

  const userId = JSON.parse(localStorage.getItem("account"))?.id ?? "";

  return (
    <StyledSearch>
      <form style={{ width: "100%", padding: "20px" }}>
        <SearchBox
          type="text"
          placeholder="Enter your search"
          value={input}
          onChange={handleChange}
          autoFocus
        />
        <Filters>
          <Filter
            type="button"
            id="all"
            className="active-filter"
            onClick={filterPick}
          >
            All
          </Filter>
          <Filter type="button" id="users" onClick={filterPick}>
            Users
          </Filter>
          <Filter type="button" id="posts" onClick={filterPick}>
            Posts
          </Filter>
        </Filters>
        <p>{!query ? `Search for ${type}` : "Search results for " + query}</p>
      </form>
      <List onClick={handleInteract}>
        {results.map((i, index) => {
          switch (i.type) {
            case "user": {
              console.log(i);
              return (
                <User key={index}>
                  <Link to={`/@${i.username}`} state={{ from: location }}>
                    <UserData>
                      <div>
                        <div></div>
                        <h4>{i.username}</h4>
                        <p>@{i.username}</p>
                      </div>
                      <Counters>
                        <div>
                          <p>Following</p>
                          <p>{i.following}</p>
                        </div>
                        <div>
                          <p>Followers</p>
                          <p>{i.followers}</p>
                        </div>
                        <div>
                          <p>Posts</p>
                          <p>{i.posts}</p>
                        </div>
                      </Counters>
                    </UserData>
                  </Link>
                  <button
                    type="button"
                    className={i.isFollowing ? "followed" : ""}
                    data-action={
                      userId === i.id || i.isFollowing ? null : "follow"
                    }
                    data-user={i.id}
                  >
                    Follow
                  </button>
                </User>
              );
            }
            case "post": {
              return <Post key={index} content={i} />;
            }
            default: {
              return;
            }
          }
        })}
      </List>

      {loading && <Loader />}
    </StyledSearch>
  );
};

export default Search;
