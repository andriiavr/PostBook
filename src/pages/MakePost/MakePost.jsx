import { useState } from "react";
import { createPost } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { PostInput, StyledPost } from "./MakePost.styled";
import { useLogin } from "../../components/LoginContext";

const MakePost = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { loggedIn } = useLogin()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    createPost(content)
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
        navigate('/')
      });
  };

  if (!loggedIn) navigate('/')
  if (isLoading) return <h2>Loading...</h2>;

  return (
    <StyledPost>
      <h2>Make your own post</h2>
      <form action="" onSubmit={handleSubmit}>
        <PostInput
          name="content"
          id=""
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></PostInput>
        <button type="submit">Send</button>
      </form>
    </StyledPost>
  );
};

export default MakePost;
