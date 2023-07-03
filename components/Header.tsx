import { Link } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface HeaderProps {
  showAnotherHeader?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  showAnotherHeader = false,
}) => {
  return (
    <Box
      component="header"
      sx={{
        position: "relative",
        zIndex: 1,
        display: "block",
      }}
    >
      <Box
        sx={{
          backgroundColor: showAnotherHeader ? "#0846a8" : "transaprent",
          backgroundImage: showAnotherHeader
            ? "none"
            : "linear-gradient(to bottom,rgba(0,0,0,.7) 0,rgba(0,0,0,.5) 50%,rgba(0,0,0,0) 100%)",
          padding: ["18px 0", "1.5rem 0"],
          textAlign: "center",
          fontFamily: "inherit",
          fontWeight: 500,
          lineHeight: 1.1,
          color: "#666",
          fontSize: "16px",
        }}
      >
        <Link
          sx={{
            display: "inline-block",
            background: "0 0",
          }}
          href="#"
        >
          <Box
            sx={{
              width: showAnotherHeader ? ["24px", "32px"] : "220px",
              height: showAnotherHeader ? ["24px", "32px"] : "2rem",
              margin: "0 auto",
              textAlign: "center",
              background: `url(${
                showAnotherHeader
                  ? `/images/logoTransparent.png`
                  : `/images/logo.png`
              }) no-repeat`,
              backgroundImage: `url(${
                showAnotherHeader
                  ? `/images/logoTransparent.png`
                  : `/images/logoSVG.svg`
              })`,
              backgroundPosition: "center center",
              backgroundSize: showAnotherHeader ? "cover" : "initial",
            }}
          />
          <Box
            component="span"
            sx={{
              position: "absolute",
              clip: "rect(.0625rem,.0625rem,.0625rem,.0625rem)",
              padding: "0",
              border: "0",
              height: ".0625rem",
              width: ".0625rem",
              overflow: "hidden",
            }}
          />
        </Link>
      </Box>
    </Box>
  );
};
