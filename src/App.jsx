import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { GlobalStyle } from "./components/GlobalStyle";
import { Register } from "./pages/Login/Register";
import MakePost from "./pages/MakePost/MakePost";
import { ProfileOrPost } from "./components/ProfileOrPost";
import { Following } from "./pages/Home/Following";
import { NotFound } from "./pages/NotFound/NotFound";
import Search from "./pages/Search/Search";
import { VerifyEmail } from "./pages/Login/VerifyEmail";
import { Settings } from "./pages/UserSettings/Settings";
import { ProfileSettings } from "./pages/UserSettings/ProfileSettings";
import { ThemeSettings } from "./pages/UserSettings/ThemeSettings";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/following" element={<Following />} />
          <Route path="/:id" element={<ProfileOrPost />} />
          <Route path="/newpost" element={<MakePost />} />
          <Route path="/search" element={<Search />} />
          <Route path="/settings" element={<Settings />}>
            <Route index path="/settings/profile" element={<ProfileSettings />} />
            <Route path="/settings/appearance" element={<ThemeSettings />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to="/error" state={{ code: 404 }} />}
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/error" element={<NotFound />} />
      </Routes>
      <GlobalStyle />
    </>
  );
}

export default App;
