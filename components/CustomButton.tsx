import { Box, Button, ButtonProps } from "@mui/material";
import React from "react";

interface CustomButtonProps extends ButtonProps {
  text: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  ...props
}) => {
  return (
    <Box
      sx={{
        marginLeft: "-12px",
        marginRight: "-12px",
        "::before": {
          display: "table",
          content: "' '",
        },
        "::after": {
          clear: "both",
          display: "table",
          content: '" "',
        },
      }}
    >
      <Button
        {...props}
        sx={{
          margin: ["25px 0 20px 0", "13px 0"],
          width: "100%",
          height: " 2.5rem",
          overflowX: "auto",
          backgroundColor: "#0b6efd",
          border: "none",
          borderRadius: ".3125rem",
          transition: "background-color .4s ease,border-color .4s ease",
          outline: ".0625rem solid transparent",
          color: "#414042",
          fontSize: "1rem",
          fontWeight: 400,
          overflow: "visible",
          textTransform: "none",
          "&.Mui-disabled": {
            opacity: 0.4,
          },
          ":hover": {
            backgroundColor: "#0a4386",
          },
          ":focus": {
            outline: ".0625rem dashed #717171",
          },
        }}
      >
        <Box
          component="span"
          sx={{
            lineHeight: "1.125rem",
            whiteSpace: "normal",
            margin: ".0625rem .75rem",
            fontSize: "1rem",
            fontWeight: 600,
            color: " #fff",
            letterSpacing: 0,
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          {text}
        </Box>
      </Button>
    </Box>
  );
};
