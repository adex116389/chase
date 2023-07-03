import { Box, Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CustomCheckboxProps extends CheckboxProps {
  label: string;
  register?: UseFormRegisterReturn;
  errors: {
    [x: string]: any;
  };
  floatRight?: boolean;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  floatRight,
  ...props
}) => {
  return (
    <Box
      sx={{
        width: "50%",
        float: "left",
        position: "relative",
        minHeight: ".0625rem",
        paddingLeft: "12px",
        paddingRight: "12px",
      }}
    >
      <Box
        sx={{
          float: floatRight ? "right" : "initial",
          marginTop: ".1875rem",
          marginBottom: ".1875rem",
        }}
      >
        <FormControlLabel
          label={label}
          control={<Checkbox disableRipple {...props} />}
          sx={{
            padding: 0,
            margin: 0,
            "& .MuiCheckbox-root": {
              padding: 0,
              margin: 0,
              flexShrink: 0,
              width: "1.25rem",
              height: "1.25rem",
            },
            "& .MuiFormControlLabel-label": {
              color: "#666",
              fontSize: ".875rem",
              whiteSpace: "nowrap",
              paddingTop: "3px",
              paddingLeft: ".625rem",
              position: "relative",
              bottom: ".0625rem",
              display: "inline-block",
              letterSpacing: 0,
              textDecoration: "none",
            },
            ":focus": {
              outline: ".0625rem dashed #717171",
            },
          }}
        />
      </Box>
    </Box>
  );
};
