import { useNavigate } from "react-router-dom";
import { useLogin } from "../../components/LoginContext";
import { StyledButton } from "../../components/Buttons/Buttons.styled";

export const ProfileSettings = () => {
  const { account, loggedIn, signOut } = useLogin();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/", { replace: true });
  };

  return (
    <div>
      <p>username</p>
      <h2>{account.username}</h2>
      {loggedIn && (
        <StyledButton type="button" onClick={handleSignOut}>
          Sign out
        </StyledButton>
      )}
    </div>
  );
};
