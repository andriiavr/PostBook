import { useEffect, useState } from "react";
import {
  Wrapper,
  LoginForm,
  Input,
  SubmitBtn,
  Background,
} from "./Login.styled";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { resendVerify, verifyEmail } from "../../service/api";
import { MdOutlineArrowBackIos } from "react-icons/md";

export const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email ?? "");
  const [code, setCode] = useState("");

  const handleResend = async () => {
    await resendVerify(email)
      .then((res) => res)
      .catch((err) => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    if (code.length === 6) {
      verifyEmail(email, code)
        .then((res) => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("account", JSON.stringify(res.user));
          navigate("/", { replace: true });
        })
        .catch((err) => console.error(err));
    }
  }, [code]);

  return (
    <Background>
      <Wrapper>
        <LoginForm action="">
          <Link to={location.state?.from ?? "/register"}>
            <MdOutlineArrowBackIos /> back
          </Link>
          <h2>Verify with code</h2>
          <p>A verification code has been sent to your email address</p>
          <b>Dont forget to check the spam box</b>
          <p>{email}</p>
          <label htmlFor="otp">Verification code:</label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            inputMode="numeric"
            pattern="[0-9]{6}"
            autoComplete="one-time-code"
            maxLength="6"
            required
          />
          {/* {error && <p style={{ color: "#f00" }}>{error}</p>} */}
          <SubmitBtn type="button" onClick={handleResend}>
            Resend
          </SubmitBtn>
        </LoginForm>
      </Wrapper>
    </Background>
  );
};
