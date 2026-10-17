import { useLocation } from "react-router-dom";
import {
  Logo,
  Wrapper,
  Pages,
  Page,
  PageName,
  ButtonWrapper,
} from "./SideBar.styled";
import { useLogin } from "../LoginContext";
import LoginButton from "../Buttons/LoginButton";
import PostButton from "../Buttons/PostButton";
import { GrHomeRounded } from "react-icons/gr";
import { FiSearch, FiSettings, FiUser } from "react-icons/fi";

const SideBar = () => {
  const location = useLocation()
  const { loggedIn, account } = useLogin()

  return (
    <Wrapper>
      <Logo>PostBook</Logo>
      <Pages>
        <li>
          <Page to="/">
            <GrHomeRounded /> <PageName>Home</PageName>
          </Page>
        </li>
        <li>
          <Page to="/search">
            <FiSearch /> <PageName>Search</PageName>
          </Page>
        </li>
        <li>
          <Page to={!account.username ? `/login` : `/@${account.username}`} state={{from: location}}>
            <FiUser /> <PageName>Profile</PageName>
          </Page>
        </li>
        <li>
          <Page to="/settings">
            <FiSettings /> <PageName>Settings</PageName>
          </Page>
        </li>
      </Pages>
      <ButtonWrapper>
        {loggedIn ? <PostButton /> : <LoginButton />}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default SideBar;
