import React, { useEffect, useState } from "react";
import BasicTextField from "../../../input/BasicTextField";
import PrimaryButton from "../../../button/PrimaryButton";
import { Daily_salesState } from "../../../../../slices/daily_sales/daily_saleSlice";
import BasicNumberField from "../../../input/BasicNumberField";
import { useRouter } from "next/router";

interface DailySalesFormProps {
  node: Daily_salesState;
  createDailySales: (formData: Daily_salesState) => void;
}

const DailySalesForm: React.FC<DailySalesFormProps> = ({
  createDailySales,
  node,
}) => {
  useEffect(() => {
    if (!node) {
      router.push("/daily_sales");
    }
  }, []);

  const router = useRouter();
  const [date, setDate] = useState<string>(node?.date || "");
  const [daily_sales, setDaily_sales] = useState<number>(
    node?.daily_sales || 0
  );

  const [dailySalesValidate, setDailySalesValidate] = useState<boolean>(
    node?.daily_sales ? true : false
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dailySalesValidate || !date || !daily_sales) {
      return;
    }

    createDailySales({
      id: node.id,
      date: date,
      daily_sales: daily_sales,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center pt-12  px-4 sm:px-6 lg:px-8 min-h-full ">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              日次売上編集
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <BasicTextField
              id={0}
              placeholder="日付"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={true}
            />

            <BasicNumberField
              id={0}
              placeholder="日次売上"
              value={String(daily_sales)}
              onChange={(e) => setDaily_sales(Number(e.target.value))}
              format={true}
              required={true}
              onValidationChange={setDailySalesValidate}
            />

            <PrimaryButton value={"作成"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default DailySalesForm;
