import { Link } from "react-router-dom";
import { StyledButton, ButtonText } from "./Buttons.styled";
import { FiPlusCircle } from "react-icons/fi";

const PostButton = () => {
  return (
    <Link to="/newpost">
      <StyledButton type="button">
        <FiPlusCircle /> <ButtonText>Make post</ButtonText>
      </StyledButton>
    </Link>
  );
};

export default PostButton;
