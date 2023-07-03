import { Box } from "@mui/system";
import React from "react";

interface ContentProps {
  children?: React.ReactNode
}

export const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: ["column", "row"],
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      {children}
    </Box>
  );
};
