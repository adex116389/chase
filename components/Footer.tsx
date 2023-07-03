import { Link, List, ListItem } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <Box component="footer" display="block">
      <Box
        sx={{
          position: "static",
          background: "#fff",
          fontSize: "16px",
          padding: "1em 0",
          marginTop: "50px",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Box
          sx={{
            width: ["100%", "964px", "1164px"],
            marginRight: "auto",
            marginLeft: "auto",
            paddingLeft: "12px",
            paddingRight: "12px",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              borderBottom: "1px solid #ccc",
              paddingTop: "6px",
              paddingBottom: "12px",
              marginBottom: "26px",
              marginLeft: "-12px",
              marginRight: "-12px",
              "::before": {
                display: "table",
                content: '" "',
              },
              "::after": {
                clear: "both",
                display: "table",
                content: '" "',
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                float: "left",
                position: "relative",
                minHeight: ".0625rem",
                paddingLeft: "12px",
                paddingRight: "12px",
              }}
            >
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  fontSize: "1.125em",
                  color: "#717171",
                }}
              >
                Follow us:
              </Box>
              <List
                sx={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  margin: "0 auto",
                  listStyle: "none",
                  padding: 0,
                }}
              >
                <ListItemIcon
                  text="Facebook: Opens dialog"
                  className="flaticon-facebook"
                />
                <ListItemIcon
                  text="Instagram: Opens dialog"
                  className="flaticon-instagram-social-network-logo-of-photo-camera"
                />
                <ListItemIcon
                  text="Twitter: Opens dialog"
                  className="flaticon-twitter"
                />
                <ListItemIcon
                  text="YouTube: Opens dialog"
                  className="flaticon-youtube"
                />
                <ListItemIcon
                  text="LinkedIn: Opens dialog"
                  className="flaticon-linkedin"
                />
              </List>
            </Box>
          </Box>
          <Box
            sx={{
              marginLeft: "-12px",
              marginRight: "-12px",
              "::before": {
                display: "table",
                content: '" "',
              },
              "::after": {
                clear: "both",
                display: "table",
                content: '" "',
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                float: "left",
                position: "relative",
                minHeight: ".0625rem",
                paddingLeft: "12px",
                paddingRight: "12px",
              }}
            >
              <List
                sx={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  textAlign: "center",
                }}
              >
                <FooterListItem text="Contact us" />
                <FooterListItem text="Privacy" />
                <FooterListItem text="Security" />
                <FooterListItem text="Terms of use" />
                <FooterListItem text="Accessibility" />
                <FooterListItem text="SAFE Act: Chase Mortgage Loan Originators" />
                <FooterListItem text="Fair Lending" />
                <FooterListItem text="About Chase" />
                <FooterListItem text="J.P. Morgan" />
                <FooterListItem text="JPMorgan Chase & Co." />
                <FooterListItem text="Careers" />
                <FooterListItem text="Español" />
                <FooterListItem text="Chase Canada" />
                <FooterListItem text="Site map" />
                <ListItem
                  sx={{
                    marginBottom: "10px",
                    color: "#757575",
                    fontSize: ".65625rem",
                    width: "fit-content",
                    padding: 0,
                    margin: 0,
                    display: "inline-block",
                    marginRight: "16px",
                  }}
                >
                  Member FDIC
                </ListItem>
                <ListItem
                  sx={{
                    marginBottom: "10px",
                    color: "#757575",
                    fontSize: ".65625rem",
                    width: "fit-content",
                    padding: 0,
                    margin: 0,
                    display: "inline-block",
                    marginRight: "16px",
                  }}
                >
                  Equal Housing Lender
                </ListItem>
                <ListItem
                  sx={{
                    marginBottom: "10px",
                    color: "#757575",
                    fontSize: ".65625rem",
                    padding: 0,
                    margin: 0,
                    display: "inline-block",
                    marginRight: "16px",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  © 2021 JPMorgan Chase & Co.
                </ListItem>
              </List>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const ListItemIcon = ({
  text,
  className,
}: {
  text: string;
  className: string;
}) => {
  return (
    <ListItem
      sx={{
        padding: 0,
        margin: 0,
        marginLeft: "10px",
        marginRight: 0,
        width: "1.4rem",
        verticalAlign: "middle",
        display: "inline-block",
      }}
    >
      <Box component="span">
        <Link
          href="#"
          sx={{
            color: "#717171",
            display: "inline-block",
            textDecoration: "none",
            transition: "color .4s ease",
            background: "0 0",
          }}
        >
          <Box
            component="span"
            sx={{
              position: "absolute",
              clip: "rect(.0625rem .0625rem .0625rem .0625rem)",
              padding: 0,
              border: 0,
              height: ".0625rem",
              width: ".0625rem",
              overflow: "hidden",
            }}
          >
            {text}
          </Box>
          <Box
            component="i"
            className={className}
            sx={{
              color: "#666",
              fontSize: "1.4rem",
              fontStyle: "normal",
              fontWeight: 400,
              fontVariant: "normal",
              textTransform: "none",
              lineHeight: 1,
              textDecoration: "none",
              display: "inline-block",
              padding: 0,
              ":hover": {
                color: "#0092ff",
              },
            }}
          />
        </Link>
      </Box>
    </ListItem>
  );
};

const FooterListItem = ({ text }: { text: string }) => {
  return (
    <ListItem
      sx={{
        padding: 0,
        margin: 0,
        marginBottom: "10px",
        color: "#757575",
        fontSize: ".65625rem",
        display: "inline-block",
        marginRight: "16px",
        width: "fit-content",
      }}
    >
      <Box
        component="span"
        sx={{
          fontSize: [".8125rem", ".875rem"],
          fontWeight: 400,
          color: "#126bc5",
          letterSpacing: 0,
          textDecoration: "none",
        }}
      >
        <Link
          href="#"
          sx={{
            textDecoration: "underline",
            transition: "color .4s ease",
            color: "#757575",
            fontSize: ".65625rem",
            fontWeight: 400,
          }}
        >
          {text}
        </Link>
      </Box>
    </ListItem>
  );
};
