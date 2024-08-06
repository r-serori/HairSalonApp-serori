import React, { useState, useEffect } from "react";
import BasicTextField from "../../input/BasicTextField";
import SingleCheckBox from "../../input/checkbox/SingleCheckbox";
import PrimaryButton from "../../button/PrimaryButton";
import { useSelector } from "react-redux";
import { StockState } from "../../../../slices/stocks/stockSlice";
import { stock_categoriesStore } from "../../../../hooks/selector";
import { Stock_categoryState } from "../../../../slices/stocks/stock_categories/stock_categorySlice";
import BasicNumberField from "../../input/BasicNumberField";

interface StockFormProps {
  node?: StockState;
  createStock: (formData: StockState) => void;
  edit?: boolean;
}

const StockForm: React.FC<StockFormProps> = ({ node, createStock, edit }) => {
  const stockCategories: Stock_categoryState[] = useSelector(
    stock_categoriesStore
  );

  const stockCategoryNames = stockCategories.map(
    (category) => category.category
  );

  const [product_name, setProductName] = useState<string>(
    node ? node.product_name : ""
  );
  const [product_price, setProductPrice] = useState<number>(
    node ? node.product_price : 0
  );
  const [quantity, setQuantity] = useState<number>(node?.quantity || 0);
  const [remarks, setRemark] = useState<string>(node?.remarks || "");
  const [supplier, setSupplier] = useState<string>(node?.supplier || "");
  const [notice, setNotice] = useState<number>(node?.notice || 0);
  const [stockCategoryIdName, setStockCategoryIdName] = useState<string>(
    node?.stock_category_id && stockCategories.length > 0
      ? stockCategories.find(
          (category) => category.id === node.stock_category_id
        )?.category ?? ""
      : stockCategoryNames[0]
  );

  const [productNameValidate, setProductNameValidate] = useState<boolean>(
    node?.product_name ? true : false
  );
  const [productPriceValidate, setProductPriceValidate] = useState<boolean>(
    node?.product_price ? true : false
  );
  const [quantityValidate, setQuantityValidate] = useState<boolean>(
    node?.quantity ? true : false
  );
  const [noticeValidate, setNoticeValidate] = useState<boolean>(
    node?.notice ? true : false
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !productNameValidate ||
      !productPriceValidate ||
      !quantityValidate ||
      !noticeValidate
    ) {
      return;
    }

    const stockCategoryId: number | null =
      stockCategories?.find(
        (category) => category.category === stockCategoryIdName
      )?.id || null;

    createStock({
      id: node ? node.id : 0,
      product_name: product_name,
      product_price: product_price,
      quantity: quantity,
      remarks: remarks,
      supplier: supplier,
      notice: notice,
      stock_category_id: stockCategoryId,
    });
  };

  return (
    <div className="flex items-center justify-center h-full ">
      <div className="max-w-md w-full ">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {edit ? "在庫情報編集" : "在庫情報新規作成"}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <BasicTextField
            id={node ? node.id : 0}
            placeholder="商品名"
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
            onValidationChange={(isValid) => setProductNameValidate(isValid)}
          />

          <BasicNumberField
            id={node ? node.id : 0}
            placeholder="価格"
            value={String(product_price)}
            onChange={(e) => setProductPrice(Number(e.target.value))}
            onValidationChange={(isValid) => setProductPriceValidate(isValid)}
            format={true}
          />

          <BasicNumberField
            id={node ? node.id : 0}
            placeholder="数量"
            value={String(quantity)}
            onChange={(e) => setQuantity(Number(e.target.value))}
            onValidationChange={(isValid) => setQuantityValidate(isValid)}
            format={true}
          />

          <BasicTextField
            id={node ? node.id : 0}
            placeholder="備考"
            value={remarks}
            onChange={(e) => setRemark(e.target.value)}
            multiline={true}
            decideLength={150}
            rows={4}
            required={false}
          />

          <BasicTextField
            id={node ? node.id : 0}
            placeholder="仕入れ先"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            required={false}
          />

          <BasicNumberField
            id={node ? node.id : 0}
            placeholder="設定した数量を下回った場合通知します"
            value={String(notice)}
            onChange={(e) => setNotice(Number(e.target.value))}
            onValidationChange={(isValid) => setNoticeValidate(isValid)}
            format={true}
          />

          <SingleCheckBox
            getOptions={stockCategoryNames}
            value={stockCategoryIdName}
            nodeId={node ? node.id.toString() : "stock_category_id"}
            onChange={(newValue: string) => setStockCategoryIdName(newValue)}
          />
          <PrimaryButton value={"作成"} />
        </form>
      </div>
    </div>
  );
};

export default StockForm;
