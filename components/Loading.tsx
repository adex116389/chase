import { Box } from "@mui/system";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import React from "react";

interface LoadingProps extends CircularProgressProps {}

export const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: "white",
        position: "fixed",
        zIndex: 999,
      }}
    >
      <Box
        sx={{
          position: "relative",
        }}
      >
        <CircularProgress
          variant="determinate"
          sx={{
            color: "#eeeeee",
          }}
          size={30}
          thickness={8}
          {...props}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={{
            color: "#0060f0",
            animationDuration: "550ms",
            position: "absolute",
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
          }}
          size={30}
          thickness={8}
          {...props}
        />
      </Box>
    </Box>
  );
};
