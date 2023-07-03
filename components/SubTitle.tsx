import { Typography } from "@mui/material";
import React from "react";

interface SubTitleProps {
  subTitle: string;
}

export const SubTitle: React.FC<SubTitleProps> = ({ subTitle }) => {
  return (
    <Typography
      component="p"
      sx={{
        fontSize: [".8125rem", ".875rem"],
        marginBottom: "1rem",
        color: "#666",
      }}
    >
      {subTitle}
    </Typography>
  );
};
