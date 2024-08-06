import * as React from "react";
import { useDispatch } from "react-redux";
import { deleteAttendanceTime } from "../../slices/attendance_times/attendance_timesSlice";
import { deleteCourse } from "../../slices/courses/courseSlice";
import { deleteCustomer } from "../../slices/customers/customerSlice";
import { deleteHairstyle } from "../../slices/hairstyles/hairstyleSlice";
import { deleteMerchandise } from "../../slices/merchandises/merchandiseSlice";
import { deleteOption } from "../../slices/options/optionSlice";
import { deleteSchedule } from "../../slices/schedules/scheduleSlice";
import { deleteStock } from "../../slices/stocks/stockSlice";
import { deleteStockCategory } from "../../slices/stocks/stock_categories/stock_categorySlice";
import { deleteDaily_sales } from "../../slices/daily_sales/daily_saleSlice";
import { deleteMonthly_sales } from "../../slices/monthly_sales/monthly_saleSlice";
import { deleteYearly_sales } from "../../slices/yearly_sales/yearly_saleSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import PrimaryButton from "../elements/button/PrimaryButton";
import DeleteButton from "../elements/button/DeleteButton";
import { AppDispatch } from "../../redux/store";
import BasicAlert from "../elements/alert/BasicAlert";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "70vw",
  maxHeight: "70vh",
  width: "100%",
  overflowY: "auto", // 縦方向のスクロールを可能にする
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface DeleteManProps {
  id: number;
  link: string;
  value?: string;
}

const DeleteMan: React.FC<DeleteManProps> = ({ id, link }) => {
  const dispatch: AppDispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleDeleteMan = async () => {
    // 適切な link によって条件分岐して削除処理を行う
    switch (link) {
      case "/attendance_times" ||
        "/attendanceTimeShots" ||
        "/attendanceTimeStart" ||
        "/attendanceTimeEnd":
        await dispatch(deleteAttendanceTime(id) as any);
        break;
      case "/courses":
        await dispatch(deleteCourse(id) as any);
        break;
      case "/customers":
        await dispatch(deleteCustomer(id) as any);
        break;
      case "/hairstyles":
        await dispatch(deleteHairstyle(id) as any);
        break;
      case "/merchandises":
        await dispatch(deleteMerchandise(id) as any);
        break;
      case "/options":
        await dispatch(deleteOption(id) as any);
        break;
      case "/schedules":
        await dispatch(deleteSchedule(id) as any);
        break;
      case "/stocks":
        await dispatch(deleteStock(id) as any);
        break;
      case "/stock_categories":
        await dispatch(deleteStockCategory(id) as any);
        break;
      case "/daily_sales":
        await dispatch(deleteDaily_sales(id) as any);
        break;
      case "/monthly_sales":
        await dispatch(deleteMonthly_sales(id) as any);
        break;
      case "/yearly_sales":
        await dispatch(deleteYearly_sales(id) as any);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-4 py-2 text-center"
      >
        削除
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-xl">
          <div>
            <div
              className="flex justify-center items-center p-4 mb-4   text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
              style={{ flexDirection: "column" }}
            >
              <BasicAlert
                type="error"
                message="本当に削除しますか？このデータは消えてしまいます！"
                padding={4}
                space={4}
                size="1.5rem"
                iconSize="2rem"
              />
            </div>
            <div className="flex justify-center items-center lg:gap-24 lg:mt-8">
              <PrimaryButton
                onChanger={() => setOpen(false)}
                value="キャンセル"
              />
              <DeleteButton
                value="削除する"
                onClicker={() => {
                  handleDeleteMan();
                  setOpen(false);
                }}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteMan;
