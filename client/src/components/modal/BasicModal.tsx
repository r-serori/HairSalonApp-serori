import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ModalForm from "../elements/form/ModalForm";
import AttendanceTimesShotForm from "../elements/form/attendances/AttendanceTimesShotForm";
import RouterButton from "../elements/button/RouterButton";
import { PermissionsState } from "../../slices/auth/permissionSlice";
import { UserState } from "../../slices/auth/userSlice";
import { CourseState } from "../../slices/courses/courseSlice";
import { OptionState } from "../../slices/options/optionSlice";
import { MerchandiseState } from "../../slices/merchandises/merchandiseSlice";
import { HairstyleState } from "../../slices/hairstyles/hairstyleSlice";
import { AttendanceTimeShotsNodes } from "../../types/interface";
import { Attendance_timeState } from "../../slices/attendance_times/attendance_timesSlice";
import { AttendancesNodes } from "../../types/interface";
import { StockNodes } from "../../types/interface";
import { Stock_categoryState } from "../../slices/stocks/stock_categories/stock_categorySlice";
import { CustomerNodes } from "../../types/interface";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "70vw",
  maxHeight: "70vh",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  whiteSpace: "pre-wrap", // 改行とスペースを保持
  wordBreak: "break-all", // 任意の場所で折り返し
};

const AttendanceStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  height: "65vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  whiteSpace: "pre-wrap", // 改行とスペースを保持
  wordBreak: "break-all", // 任意の場所で折り返し
};

interface BasicModalProps {
  type: string;
  editValue?: any;
  editNode?:
    | UserState[]
    | CourseState[]
    | OptionState[]
    | MerchandiseState[]
    | HairstyleState[]
    | AttendanceTimeShotsNodes[]
    | Attendance_timeState[]
    | AttendancesNodes[]
    | StockNodes[]
    | Stock_categoryState[]
    | CustomerNodes[]
    | any;

  NodesProp: string;
  link: string;
  role?: PermissionsState;
}

const BasicModal: React.FC<BasicModalProps> = ({
  type,
  editValue,
  editNode,
  NodesProp,
  link,
  role,
}) => {
  // const dispatch = useDispatch();
  // const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [openAttendance, setOpenAttendance] = React.useState(false);

  const handleOpen = () => {
    if (role !== "スタッフ") {
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("ja-JP").format(value);
  };

  return (
    <>
      {link === "/attendanceTimeShots" ||
      link === "/attendanceTimeStart" ||
      link === "/attendanceTimeEnd" ? (
        <Button
          onClick={() => setOpenAttendance(true)}
          className="w-full y-full font-bold text-md "
        >
          <span className="font-bold text-md break-comma">{editValue}</span>
        </Button>
      ) : (
        <Button
          onClick={handleOpen}
          className="
          text-gray-900 pointer hover:bg-gray-400 
          hover:text-white focus:ring-4 focus:ring-gray-300 
          font-medium text-md dark:bg-gray-600 dark:hover:bg-gray-700  
          dark:focus:ring-gray-800 font-bold overflow-y-auto"
        >
          <span className="max-w-60 max-h-16 min-w-28 min-h-8 px-2 whitespace-pre-wrap text-md font-bold ">
            {type === "number" && NodesProp !== "phone_number"
              ? formatPrice(editValue)
              : editValue}
          </span>
        </Button>
      )}

      {link === "/attendanceTimeShots" ||
      link === "/attendanceTimeStart" ||
      link === "/attendanceTimeEnd" ? (
        <Modal
          open={openAttendance}
          onClose={() => setOpenAttendance(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={AttendanceStyle} className="rounded-xl">
            {/* モーダルのタイトル */}
            <div className="flex justify-between items-center md:mx-4 ">
              <div className="text-3xl bold">{editValue}</div>
              <div className="items-center mr-2 ">
                <RouterButton onChanger={() => setOpenAttendance(false)} />
              </div>
            </div>
            {/* モーダルの内容 */}
            <AttendanceTimesShotForm
              node={editNode}
              link={link}
              startOrEnd={editValue}
              open={openAttendance}
              setOpen={setOpenAttendance}
              editValue={editValue}
            />
          </Box>
        </Modal>
      ) : (
        <Modal open={open} onClose={handleClose} className="break-all">
          <Box sx={style} className="rounded-xl">
            {/* モーダルのタイトル */}
            <ModalForm
              type={type}
              editValue={editValue}
              editNode={editNode}
              NodesProp={NodesProp}
              link={link}
              open={open}
              setOpen={setOpen}
            />
            <RouterButton onChanger={handleClose} />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default BasicModal;
