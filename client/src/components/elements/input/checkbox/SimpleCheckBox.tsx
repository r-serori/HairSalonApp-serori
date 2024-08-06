import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import FormControlLabel from "@mui/material/FormControlLabel";
import { PermissionsState } from "../../../../slices/auth/permissionSlice";

interface ControlledCheckboxProps {
  type?: string;
  checked: boolean;
  onChanger: (newValue: boolean) => void;
  label: string; // ラベルの追加
  role?: PermissionsState;
}

const ControlledCheckbox: React.FC<ControlledCheckboxProps> = ({
  type,
  checked,
  onChanger,
  label, // ラベルの追加
  role,
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={type === "disabled" ? true : checked}
          onChange={(newValue) => {
            onChanger(newValue.target.checked);
          }}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          disabled={
            type === "disabled" || type === "times" || role === "スタッフ"
          } // typeがdisabledの場合はユーザーが変更できないようにする
        />
      }
      label={label} // ラベルを設定
      labelPlacement="start" // チェックボックスを右側に配置
    />
  );
};

export default ControlledCheckbox;
