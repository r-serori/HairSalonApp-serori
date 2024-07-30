import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createTheme } from "@mui/material/styles";

interface PasswordFieldProps {
  id: number;
  placeholder: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValidationChange: (isValid: boolean) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  placeholder,
  value,
  required = true,
  onChange,
  onValidationChange,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange({
      ...e,
      target: { ...e.target, value: newValue },
    });
    onValidationChange(passwordRegex.test(newValue));
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
        type={showPassword ? "text" : "password"}
        id={`${placeholder}_${id}_password`}
        label={placeholder}
        value={value}
        onChange={handleChange}
        variant="outlined"
        inputProps={{
          maxLength: 100, // 任意の最大文字数を設定
          sx: {
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
          },
        }}
        error={!passwordRegex.test(value)}
        helperText={
          !passwordRegex.test(value)
            ? "パスワードには英小文字、英大文字、数字、特殊文字(@$!%*?&_)をそれぞれ少なくとも1つ含み、8文字以上にする必要があります"
            : ""
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        autoComplete="on"
      />
    </Box>
  );
};

export default PasswordField;
