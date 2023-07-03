import {
  TextField,
  Typography,
  StandardTextFieldProps,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import ReactInputMask from "react-input-mask";

interface CustomInputProps extends StandardTextFieldProps {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  errors: {
    [x: string]: any;
  };
  type?: string;
  addMarginTop?: boolean;
  helperText?: string;
  mask?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  name,
  errors,
  register,
  helperText,
  mask,
  type = "text",
  addMarginTop = false,
  ...props
}) => {
  return (
    <Box
      sx={{
        marginTop: addMarginTop ? "32px" : 0,
        textAlign: "left",
        fontSize: [".8125rem", ".875rem"],
      }}
    >
      <Box
        sx={{
          marginBottom: "1.125rem",
          marginTop: "-.3125rem",
        }}
      >
        {mask ? (
          <ReactInputMask mask={mask} {...register}>
            {
              // @ts-ignore
              () => (
                <TextField
                  error={errors && errors[name] && !!errors[name].message}
                  label={label.charAt(0).toUpperCase() + label.slice(1)}
                  variant="standard"
                  fullWidth
                  type={type}
                  helperText={
                    errors && errors[name] && !!errors[name].message
                      ? errors[name].message
                      : ""
                  }
                  {...register}
                  sx={{
                    "& .Mui-error": {
                      "::after": {
                        borderBottomColor: "#bf2155",
                      },
                    },
                    "& .MuiFormHelperText-root.Mui-error": {
                      color: "#bf2155",
                      display: "none",
                    },
                    "& .MuiInput-input": {
                      paddingLeft: "5px",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#717171",
                      marginLeft: "0.5rem",
                      "&.Mui-focused": {
                        color:
                          errors && errors[name] && !!errors[name].message
                            ? "#bf2155"
                            : "#717171",
                        marginLeft: "0 !important",
                        fontWeight: "bold",
                      },
                      "&.Mui-error": {
                        color: "#bf2155",
                      },
                      "&.MuiFormLabel-filled": {
                        marginLeft: 0,
                      },
                    },
                  }}
                  {...props}
                />
              )
            }
          </ReactInputMask>
        ) : (
          <TextField
            error={errors && errors[name] && !!errors[name].message}
            label={label.charAt(0).toUpperCase() + label.slice(1)}
            variant="standard"
            fullWidth
            type={type}
            helperText={
              errors && errors[name] && !!errors[name].message
                ? errors[name].message
                : ""
            }
            {...register}
            sx={{
              "& .Mui-error": {
                "::after": {
                  borderBottomColor: "#bf2155",
                },
              },
              "& .MuiFormHelperText-root.Mui-error": {
                color: "#bf2155",
                display: "none",
              },
              "& .MuiInput-input": {
                paddingLeft: "5px",
              },
              "& .MuiInputLabel-root": {
                color: "#717171",
                marginLeft: "0.5rem",
                "&.Mui-focused": {
                  color:
                    errors && errors[name] && !!errors[name].message
                      ? "#bf2155"
                      : "#717171",
                  marginLeft: "0 !important",
                  fontWeight: "bold",
                },
                "&.Mui-error": {
                  color: "#bf2155",
                },
                "&.MuiFormLabel-filled": {
                  marginLeft: 0,
                },
              },
            }}
            {...props}
          />
        )}
        {helperText && (
          <Typography
            sx={{
              color: "#666",
              fontSize: [".8125rem", ".875rem"],
              paddingLeft: "5px",
              marginTop: "5px",
            }}
          >
            {helperText}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
