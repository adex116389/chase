import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import ReactHtmlParser from "react-html-parser";

interface CustomErrorProps {
  message: string;
}

export const CustomError: React.FC<CustomErrorProps> = ({ message }) => {
  return (
    <Box>
      <Box
        sx={{
          border: "none",
          marginBottom: "1rem",
          padding: 0,
          opacity: 1,
          backgroundColor: "transparent",
          color: "#bf2155",
          position: "relative",
          borderRadius: "0.2rem",
        }}
      >
        <Box
          sx={{
            marginRight: "10px",
            position: "relative",
            fontSize: " 1.25rem",
            top: "0.4rem",
            float: "left",
          }}
        >
          <ErrorIcon
            color="primary"
            sx={{
              color: "#bf2155",
            }}
          />
        </Box>
        <Box
          sx={{
            paddingTop: "0.25rem",
            overflow: "visible",
            marginLeft: "2rem",
          }}
        >
          <Typography
            component="h2"
            sx={{
              paddingTop: 0,
              color: "#bf2155",
              outline: 0,
              width: "83.333%",
              lineHeight: 1.4,
              margin: "0.0625rem 0.0625rem 0.313rem 0",
              letterSpacing: 0,
              textDecoration: "none",
              fontSize: "1.0625rem",
              fontWeight: 400,
            }}
          >
            {ReactHtmlParser(message)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
