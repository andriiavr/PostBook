import { InfinitySpin } from "react-loader-spinner";
import { useTheme } from "styled-components";

export const Loader = () => {
  const theme = useTheme();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <InfinitySpin
        width={200}
        color={theme.colors.accent}
      />
    </div>
  );
};
