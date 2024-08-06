import React, { useState } from "react";
import BasicTextField from "../../../input/BasicTextField";
import PrimaryButton from "../../../button/PrimaryButton";
import { Yearly_salesState } from "../../../../../slices/yearly_sales/yearly_saleSlice";
import BasicNumberField from "../../../input/BasicNumberField";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface YearlySalesFormProps {
  node: Yearly_salesState;
  createYearlySales: (formData: Yearly_salesState) => void;
}

const Yearly_salesForm: React.FC<YearlySalesFormProps> = ({
  node,
  createYearlySales,
}) => {
  useEffect(() => {
    if (!node) {
      router.push("/yearly_sales");
    }
  }, []);
  const router = useRouter();
  const [year, setYear] = useState(node?.year || "");
  const [yearly_sales, setYearly_sales] = useState(node?.yearly_sales || 0);

  const [yearlySalesValidate, setYearlySalesValidate] = useState<boolean>(
    node?.yearly_sales ? true : false
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!yearlySalesValidate || !year || !yearly_sales) {
      return;
    }
    createYearlySales({
      id: node?.id || 0,
      year: year,
      yearly_sales: yearly_sales,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center pt-12 px-4 sm:px-6 lg:px-8 min-h-full ">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              年次売上編集
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <BasicTextField
              id={0}
              placeholder="年"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              disabled={true}
            />

            <BasicNumberField
              id={1}
              placeholder="日次売上"
              value={String(yearly_sales)}
              onChange={(e) => setYearly_sales(Number(e.target.value))}
              format={true}
              onValidationChange={setYearlySalesValidate}
            />

            <PrimaryButton value={"作成"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Yearly_salesForm;
