import { useEffect, useState } from "react";
import { Loader } from "../Loader";
import { getFollowSuggest } from "../../service/api";

export const FollowSuggestions = () => {
  const [suggests, setSuggests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getFollowSuggest()
      .then(setSuggests)
      .catch((err) => console.error(err));
    setLoading(false);
  }, []);

  if (error) return <h3>Error: {error}</h3>;
  if (loading) return <Loader />;
  if (suggests == false) return <p>Nobody to follow!</p>;

  return (
    <ul>
      {suggests.map((user) => (
        <li key={user.id}>
          <a href={`/@${user.username}`}>
            {user.username} <button type="button">follow</button>
          </a>
        </li>
      ))}
    </ul>
  );
};
