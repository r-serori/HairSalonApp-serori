import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SaleForm from "../../form/sales/SaleFrom";
import { CalendarEvent } from "../calender/CalendarComponent";
import { CourseState } from "../../../../store/courses/courseSlice";
import { OptionState } from "../../../../store/options/optionSlice";
import { MerchandiseState } from "../../../../store/merchandises/merchandiseSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "80%",
  maxHeight: "80%", // ブラウザの高さの80%に設定
  width: "600px",
  height: "600px", // ブラウザの高さの80%に設定
  overflowY: "auto", // 縦方向のスクロールを可能にする
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  paddingTop: "20px",
};

interface SalesModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  events: CalendarEvent[];
  whatSales: string;
  nodes: any;
  courses: CourseState[];
  options: OptionState[];
  merchandises: MerchandiseState[];
}

const SalesModal: React.FC<SalesModalProps> = ({
  showModal,
  setShowModal,
  events,
  whatSales,
  nodes,
  courses,
  options,
  merchandises,
}) => {
  return (
    <div>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
        className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-bold text-md rounded-lg px-4 py-2 text-center cursor-pointer"
      >
        {whatSales === "日次"
          ? "日次売上作成"
          : whatSales === "月次"
          ? "月次売上作成"
          : "年次売上作成"}
      </Button>
      <Modal
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-xl">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <SaleForm
              events={events}
              whatSales={whatSales}
              showModal={showModal}
              setShowModal={setShowModal}
              nodes={nodes}
              courses={courses}
              options={options}
              merchandises={merchandises}
            />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default SalesModal;
