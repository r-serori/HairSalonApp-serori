import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createTheme } from "@mui/material/styles";
import { PermissionsState } from "../../../../slices/auth/permissionSlice";

interface SingleCheckBoxProps {
  value?: string;
  onChange: (newValue: string) => void;
  getOptions: string[];
  nodeId?: string;
  role?: PermissionsState;
  required?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

const SingleCheckBox: React.FC<SingleCheckBoxProps> = ({
  value,
  onChange,
  getOptions,
  nodeId,
  role,
  required = true,
  onValidationChange,
}) => {
  // labelに応じてoptionsを設定

  const changeValue = (newValue: string) => {
    onChange(newValue);
    if (
      !required ||
      onValidationChange === undefined ||
      onValidationChange === null
    ) {
      return;
    } else if (required && newValue === "" && onValidationChange) {
      onValidationChange(false);
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
    <div className="w-full mt-1 border-gray-300 focus:outline-none focus:border-blue-500 ">
      <Autocomplete
        disablePortal
        id={nodeId}
        options={getOptions}
        value={value}
        onChange={(event, newValue) => {
          if (newValue !== null) {
            changeValue(newValue);
          }
        }} // オプションが選択されたときにonChangeを呼び出す
        clearOnEscape={false} // 追加
        clearIcon={null} // 追加
        renderInput={(params) => (
          <TextField
            {...params}
            label={`${getOptions.length === 0 ? "選択肢がありません" : value}`}
            required={required} // TextField に required を設定
            inputProps={{
              ...params.inputProps,
              readOnly: true, // 追加
            }}
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
        )}
        renderOption={(props, option) => (
          <li
            {...props}
            style={{
              fontWeight: "bold",
            }}
          >
            {option}
          </li>
        )}
        disabled={
          role === "スタッフ" || getOptions.length === 0 || value === "オーナー"
            ? true
            : false
        }
        sx={{
          "& .MuiInputBase-input": {
            fontWeight: "bold",
          },
          "& .MuiInputLabel-root": {
            fontWeight: "bold",
          },
        }}
      />
    </div>
  );
};

export default SingleCheckBox;
