import { Link, useLocation } from "react-router-dom";
import { useLogin } from "../LoginContext";
import { ButtonText, StyledButton } from "./Buttons.styled";
import { MdLogin } from "react-icons/md";

const LoginButton = () => {
  const { loginHighlight, clearLoginHighlight } = useLogin();
  const location = useLocation();

  return (
    <Link to="/login" state={{ from: location }}>
      <StyledButton
        type="button"
        className={`${loginHighlight ? "highlight" : ""}`}
        onAnimationEnd={clearLoginHighlight}
      >
        <MdLogin />
        <ButtonText>Login</ButtonText>
      </StyledButton>
    </Link>
  );
};

export default LoginButton;
