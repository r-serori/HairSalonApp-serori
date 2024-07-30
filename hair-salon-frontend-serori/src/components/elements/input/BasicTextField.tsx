import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme } from "@mui/material/styles";
import { PermissionsState } from "../../../slices/auth/permissionSlice";

interface BasicTextFieldProps {
  id: number;
  placeholder: string;
  value: string | null;
  disabled?: boolean;
  role?: PermissionsState;
  decideLength?: number;
  multiline?: boolean;
  rows?: number;
  regex?: RegExp;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValidationChange?: null | ((isValid: boolean) => void);
}

const BasicTextField: React.FC<BasicTextFieldProps> = ({
  id,
  placeholder,
  value,
  disabled = false,
  role,
  decideLength = 100,
  multiline = false,
  rows = 1,
  regex = /[<>&'"\\;\s--]/g,
  required = true,
  onChange,
  onValidationChange,
}) => {
  const removeInvalidChars = (str: string) => {
    return str.replace(regex, "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = removeInvalidChars(e.target.value);
    onChange({
      ...e,
      target: { ...e.target, value: newValue },
    });
    if (
      !required ||
      onValidationChange === undefined ||
      onValidationChange === null
    ) {
      return;
    } else if (
      required &&
      (newValue === "" ||
        newValue === null ||
        newValue === undefined ||
        newValue === " ") &&
      onValidationChange
    ) {
      onValidationChange(false);
    } else {
      onValidationChange(true);
    }
  };

  const theme = createTheme({
    palette: {
      error: {
        main: "#f44336",
        light: "#e57373",
      },
      primary: {
        main: "#1976d2",
      },
    },
  });

  return (
    <Box
      sx={{
        "& > :not(style)": { width: "100%" },
        width: "100%",
      }}
    >
      <TextField
        id={`${id}`}
        type="text"
        label={placeholder}
        onChange={handleChange}
        value={value === null ? "" : value}
        variant="outlined"
        disabled={disabled || role === "スタッフ"}
        multiline={multiline}
        rows={multiline ? rows : undefined}
        inputProps={{ maxLength: decideLength, required }}
        error={!value && required} // 必須項目で空の場合エラー表示
        helperText={required ? `必須` : "任意"}
        sx={{
          width: "100%",
          "& .MuiInputBase-input": {
            fontWeight: "bold",
            color: `${
              !value && required ? theme.palette.error.light : "black"
            }`,
          },
          "& .MuiInputLabel-root": {
            fontWeight: "bold",
            color: `${
              !value && required
                ? theme.palette.error.main
                : theme.palette.primary.main
            }`,
          },
          "& .MuiFormHelperText-root": {
            color: `${
              !value && required
                ? theme.palette.error.main
                : theme.palette.primary.main
            }`,
          },
        }}
      />
    </Box>
  );
};

export default BasicTextField;
