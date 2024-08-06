import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme } from "@mui/material/styles";

interface EmailFieldProps {
  id: number;
  value: string;
  disabled?: boolean;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValidationChange: (isValid: boolean) => void;
}

const EmailField: React.FC<EmailFieldProps> = ({
  id,
  value,
  disabled = false,
  required = true,
  onChange,
  onValidationChange,
}) => {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toLowerCase(); // 強制的に小文字に変換
    onChange({
      ...e,
      target: { ...e.target, value: newValue },
    });
    onValidationChange(emailRegex.test(newValue));
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
        type="email"
        id={`email_${id}`}
        label="Email"
        value={value}
        disabled={disabled}
        onChange={handleChange}
        variant="outlined"
        inputProps={{ maxLength: 50 }} // 任意の最大文字数を設定
        error={!emailRegex.test(value)}
        helperText={
          !emailRegex.test(value)
            ? "正しいEmail形式かつ、小文字で入力してください"
            : ""
        }
        sx={{
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
        }}
      />
    </Box>
  );
};

export default EmailField;
