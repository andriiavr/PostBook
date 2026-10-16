import { useEffect, useState } from "react";
import {
  Wrapper,
  LoginForm,
  Background,
  Input,
  SubmitBtn,
} from "./Login.styled";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logIn } from "../../service/api";

export const Login = () => {
  const [identifier, setIdent] = useState("");
  const [password, setPass] = useState("");
  const location = useLocation()
  const navigate = useNavigate();

  useEffect(() => {
    if (!!localStorage.getItem("token")) navigate("/", { replace: true });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(identifier, password);
    const token = await logIn({ identifier, password })
      .then((res) => res)
      .catch((err) => {
        throw new Error(err);
      });
    localStorage.setItem("token", token.token);
    localStorage.setItem("account", JSON.stringify(token.user));
    navigate(location.state?.from ?? "/", { replace: true });
  };

  return (
    <Background>
      <Wrapper>
        <LoginForm action="" onSubmit={handleSubmit}>
          <h2>Log in</h2>
          <Input
            type="text"
            id="ident"
            value={identifier}
            onChange={(e) => setIdent(e.target.value)}
            placeholder="Username or email"
          />
          <Input
            type="password"
            id="pass"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Password"
          />
          <p>
            New? <Link to="/register">Sign Up instead</Link>
          </p>
          <SubmitBtn type="submit">Submit</SubmitBtn>
        </LoginForm>
      </Wrapper>
    </Background>
  );
};
