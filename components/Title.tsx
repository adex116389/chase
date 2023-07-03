import { Typography } from "@mui/material";
import React from "react";

interface TitleProps {
  title: string;
}

export const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <Typography
      component="h2"
      sx={{
        fontSize: [".8125rem", ".875rem"],
        fontWeight: "bold",
        marginBottom: "0.5rem",
      }}
    >
      {title}
    </Typography>
  );
};
