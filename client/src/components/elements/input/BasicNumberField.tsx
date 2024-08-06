import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme } from "@mui/material/styles";
import { PermissionsState } from "../../../slices/auth/permissionSlice";

interface BasicNumberFieldProps {
  id: number;
  placeholder: string;
  value: string | null;
  disabled?: boolean;
  role?: PermissionsState;
  maxNumber?: number;
  required?: boolean;
  format: boolean; // カンマ区切りにするかどうか
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValidationChange?: null | ((isValid: boolean) => void);
}

const BasicNumberField: React.FC<BasicNumberFieldProps> = ({
  id,
  placeholder,
  value,
  disabled = false,
  role,
  maxNumber = 4294967295,
  required = true,
  format = false,
  onChange,
  onValidationChange,
}) => {
  const checkMaxNumber = (inputValue: string) => {
    const numericValue = parseInt(inputValue, 10);
    if (!isNaN(numericValue) && numericValue > maxNumber) {
      return maxNumber.toString();
    }
    return inputValue;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/[^\d]/g, ""); // 数字以外を除外
    newValue = checkMaxNumber(newValue);
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
        newValue === "0" ||
        newValue === "00" ||
        newValue === null ||
        newValue === undefined) &&
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

  const formatValue = (value: string | null) => {
    if (value === null || value === "0" || value === "" || value === "00")
      return "";
    const numericValue = parseInt(value, 10);
    return new Intl.NumberFormat("ja-JP").format(numericValue);
  };

  return (
    <Box
      sx={{
        "& > :not(style)": { width: "100%" },
        width: "100%",
      }}
    >
      <TextField
        id={`${placeholder}_${id}_number`}
        type="text" // テキストフィールドに変更
        label={placeholder}
        onChange={handleChange}
        value={format ? formatValue(value) : value || ""}
        variant="outlined"
        disabled={disabled || role === "スタッフ"}
        inputProps={{ max: maxNumber, required: required }}
        error={
          (!value || value === "0" || value === "00" || value === null) &&
          required
        } // 必須項目で空の場合エラー表示
        helperText={
          required
            ? "必須項目です。半角数字でお願いします。"
            : "任意項目です。半角数字でお願いします。"
        }
        sx={{
          "& .MuiInputBase-input": {
            fontWeight: "bold",
            color: `${
              (!value || value === "0" || value === "00" || value === null) &&
              required
                ? theme.palette.error.light
                : "black"
            }`,
          },
          "& .MuiInputLabel-root": {
            fontWeight: "bold",
            color: `${
              (!value || value === "0" || value === "00" || value === null) &&
              required
                ? theme.palette.error.main
                : theme.palette.primary.main
            }`,
          },
          "& .MuiFormHelperText-root": {
            color: `${
              (!value || value === "0" || value === "00" || value === null) &&
              required
                ? theme.palette.error.main
                : theme.palette.primary.main
            }`,
          },
        }}
      />
    </Box>
  );
};

export default BasicNumberField;
