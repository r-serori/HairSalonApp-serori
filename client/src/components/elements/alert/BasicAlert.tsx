import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { AlertColor } from "@mui/material/Alert";

interface BasicAlertsProps {
  type: string;
  message: string;
  space: number;
  padding: number;
  size?: string;
  iconSize?: string;
}

const BasicAlerts: React.FC<BasicAlertsProps> = ({
  type,
  message,
  space,
  padding,
  size = "1rem",
  iconSize = "1rem",
}) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={space}>
      {/* success:緑チェック,info:青i,warning:黄三角!,error:赤円!のどれかを入れてください。 */}
      <Alert
        severity={type as AlertColor}
        sx={{
          padding: padding,
          fontWeight: "bold",
          fontSize: `${size}`,
          "& .MuiAlert-icon": {
            // アイコンのスタイルを設定
            fontSize: iconSize,
          },
        }}
      >
        {message}
      </Alert>
    </Stack>
  );
};

export default BasicAlerts;
