import { Navigate, Outlet } from "react-router-dom";
import { Content, RightSidebar, Wrapper } from "./Layout.styled";
import SideBar from "../SideBar/SideBar";
import { useEffect, useState } from "react";
import { useLogin } from "../LoginContext";
import { Loader } from "../Loader";
import { FollowSuggestions } from "../FollowSuggestions/FollowSuggestions";

export const Layout = () => {
  const { online, checkLogin, checkServer } = useLogin();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    checkServer();
    checkLogin()
      .catch((err) => {
        console.warn(err.response);
        if (!err.response) {
          setError("Can't reach the server. Is it running?");
        } else if (err.response.status !== 401) {
          setError("Something went wrong on the server.");
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader />;
  if (!online) return <Navigate to="/error" state={{ code: 503 }} />;

  return (
    <Wrapper>
      <SideBar />
      <Content>
        <Outlet />
      </Content>
      <RightSidebar>
        <div>
          <h2>Follow</h2>
          <FollowSuggestions />
        </div>
      </RightSidebar>
    </Wrapper>
  );
};
