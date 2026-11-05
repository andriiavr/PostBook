import { useEffect, useState } from "react";
import {
  Wrapper,
  LoginForm,
  Background,
  Input,
  SubmitBtn,
  ShowPass,
} from "./Login.styled";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logIn } from "../../service/api";
import { PageSwitcher } from "../../components/PageSwitcher/PageSwitcher";
import { Loader } from "../../components/Loader";

export const Login = () => {
  const [identifier, setIdent] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!localStorage.getItem("token")) navigate("/", { replace: true });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await logIn({ identifier, password });

      localStorage.setItem("token", res.token);
      localStorage.setItem("account", JSON.stringify(res.user ?? null));

      navigate(location.state?.from ?? "/", { replace: true });
    } catch (err) {
      const code = err.response?.status;
      setError(err.response.data.error);

      if (code === 403) {
        navigate("/verify", {
          replace: true,
          state: {
            from: location,
            email: identifier,
          },
        });
        return;
      }

      throw new Error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <Wrapper>
        <LoginForm action="" onSubmit={handleSubmit}>
          <PageSwitcher
            pages={[
              { url: "/login", text: "Log In" },
              { url: "/register", text: "Sign Up" },
            ]}
          />
          <h2>Log in</h2>
          <Input
            type="text"
            id="ident"
            value={identifier}
            onChange={(e) => setIdent(e.target.value)}
            placeholder="Username or email"
            maxLength="50"
            autoFocus
          />
          <Input
            type={showPassword ? "text" : "password"}
            id="pass"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            autoComplete="off"
            minLength={8}
            maxLength={18}
            required
            placeholder="Password"
          />
          <ShowPass onClick={(e) => setShowPassword(!showPassword)}>
            <input
              type="checkbox"
              name="showpass"
              checked={showPassword}
              style={{ width: 16, height: 16 }}
            />
            <label htmlFor="showpass">Show password</label>
          </ShowPass>
          {error && <p style={{ color: "#f00" }}>{error}</p>}
          <p style={{ textAlign: "center" }}>
            New? <Link to="/register">Sign Up instead</Link>
          </p>
          {!loading ? <SubmitBtn type="submit">Log in</SubmitBtn> : <Loader />}
        </LoginForm>
      </Wrapper>
    </Background>
  );
};
