import { useEffect, useState } from "react";
import {
  Wrapper,
  LoginForm,
  Input,
  SubmitBtn,
  Background,
  ShowPass,
} from "./Login.styled";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signUp } from "../../service/api";
import { PageSwitcher } from "../../components/PageSwitcher/PageSwitcher";
import { Loader } from "../../components/Loader";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [conpassword, setConPass] = useState("");
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
    if (conpassword !== password) {
      setError("Passwords does not match");
      return;
    }
    setLoading(true);
    await signUp({ username, email, password, conpassword })
      .then((res) => res)
      .catch((err) => {
        setError(err.response.data.error);
        setLoading(false);
        throw new Error(err);
      });

    navigate("/verify", { replace: true, state: { from: location, email } });
    setLoading(false);
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
          <h2>Sign Up</h2>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            placeholder="Username"
            maxLength={24}
            required
            autoFocus
          />
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
            placeholder="Email"
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
          <Input
            type={showPassword ? "text" : "password"}
            id="conpass"
            value={conpassword}
            onChange={(e) => setConPass(e.target.value)}
            autoComplete="off"
            minLength={8}
            maxLength={18}
            required
            placeholder="Confirm password"
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
            Have an account? <Link to="/login">Login instead</Link>
          </p>
          {!loading ? <SubmitBtn type="submit">Sign up</SubmitBtn> : <Loader />}
        </LoginForm>
      </Wrapper>
    </Background>
  );
};
