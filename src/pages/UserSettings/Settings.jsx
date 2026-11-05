import { Outlet } from "react-router-dom";
import { PageSwitcher } from "../../components/PageSwitcher/PageSwitcher";
import { StyledSettings } from "./Settings.styled";

export const Settings = () => {

    return (
        <StyledSettings>
            <p>Settings</p>
            <PageSwitcher pages={[
              { url: "/profile", text: "Profile" },
              { url: "/appearance", text: "Appearance" },
            ]} base={"/settings"} />
            <Outlet />
        </StyledSettings>
    )
}
