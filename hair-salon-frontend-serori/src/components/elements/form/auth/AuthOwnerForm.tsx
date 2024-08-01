import React, { useState } from "react";
import BasicTextField from "../../input/BasicTextField";
import PrimaryButton from "../../button/PrimaryButton";
import { useRouter } from "next/router";
import BasicNumberField from "../../input/BasicNumberField";
import { getUserId } from "../../../../hooks/getLocalStorage";
import { useSelector } from "react-redux";
import { userKey } from "../../../../hooks/authSelector";
import { fetchAddressApi } from "../../../../api_backend/auth/fetchAddressApi";
import { useDispatch } from "react-redux";
import { changeMessage } from "../../../../slices/auth/userSlice";
import { KeyState } from "../../../../slices/auth/keySlice";
import { OwnerState } from "../../../../slices/auth/ownerSlice";

interface AuthOwnerFormProps {
  node?: OwnerState;
  onSubmit: (formData: OwnerState) => void;
}

const AuthOwnerForm: React.FC<AuthOwnerFormProps> = ({ node, onSubmit }) => {
  const [store_name, setStoreName] = useState<string>(node?.store_name || "");
  const [postal_code, setPostalCode] = useState<string>(
    node?.postal_code || ""
  );
  const [prefecture, setPrefecture] = useState<string>(node?.prefecture || "");
  const [city, setCity] = useState<string>(node?.city || "");
  const [addressLine1, setAddressLine1] = useState<string>(
    node?.addressLine1 || ""
  );
  const [addressLine2, setAddressLine2] = useState<string>(
    node?.addressLine2 || ""
  );
  const [phone_number, setPhoneNumber] = useState<string>(
    node?.phone_number || ""
  );

  const [storeNameValidate, setStoreNameValidate] = useState<boolean>(
    node?.store_name ? true : false
  );
  const [postalCodeValidate, setPostalCodeValidate] = useState<boolean>(
    node?.postal_code ? true : false
  );
  const [prefectureValidate, setPrefectureValidate] = useState<boolean>(
    node?.prefecture ? true : false
  );
  const [cityValidate, setCityValidate] = useState<boolean>(
    node?.city ? true : false
  );
  const [addressLine1Validate, setAddressLine1Validate] = useState<boolean>(
    node?.addressLine1 ? true : false
  );
  const [phoneNumberValidate, setPhoneNumberValidate] = useState<boolean>(
    node?.phone_number ? true : false
  );

  const router = useRouter();
  const dispatch = useDispatch();

  const key: KeyState = useSelector(userKey);

  const handlePostalCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const newPostalCode = e.target.value;
      setPostalCode(newPostalCode);

      if (newPostalCode.length === 7) {
        // 郵便番号が7桁になったらAPIを呼び出す
        const address = await fetchAddressApi(newPostalCode);
        if (address) {
          setPrefecture(address.prefecture);
          setCity(address.city);
          setAddressLine1(address.address_line1);
          setPostalCodeValidate(true);
          setPrefectureValidate(true);
          setCityValidate(true);
          setAddressLine1Validate(true);
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(
        changeMessage(
          "住所の取得に失敗しました！もう一度お試しください！失敗が続く場合、申し訳ありませんがご自身でご入力お願いいたします。"
        )
      );
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userId = getUserId(String(key));
    if (!userId) {
      router.push("/auth/register");
      return;
    }

    if (
      !storeNameValidate ||
      !postalCodeValidate ||
      !prefectureValidate ||
      !cityValidate ||
      !addressLine1Validate ||
      !phoneNumberValidate
    ) {
      return;
    }

    onSubmit({
      id: node ? node.id : 0,
      store_name: store_name,
      postal_code: postal_code,
      prefecture: prefecture,
      city: city,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      phone_number: phone_number,
      user_id: Number(userId),
    });
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-md w-full space-y-4">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {node ? "店舗情報更新" : "店舗情報登録"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <BasicTextField
            id={0}
            placeholder="店舗名"
            value={store_name}
            onChange={(e) => setStoreName(e.target.value)}
            onValidationChange={(isValid) => setStoreNameValidate(isValid)}
          />

          <BasicNumberField
            id={1}
            placeholder="郵便番号"
            value={postal_code}
            onChange={handlePostalCodeChange}
            onValidationChange={(isValid) => setPostalCodeValidate(isValid)}
            format={false}
          />

          <BasicTextField
            id={2}
            placeholder="都道府県"
            value={prefecture}
            onChange={(e) => setPrefecture(e.target.value)}
            onValidationChange={(isValid) => setPrefectureValidate(isValid)}
          />

          <BasicTextField
            id={3}
            placeholder="市区町村"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onValidationChange={(isValid) => setCityValidate(isValid)}
          />

          <BasicTextField
            id={4}
            placeholder="町名・番地"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            onValidationChange={(isValid) => setAddressLine1Validate(isValid)}
            regex={/[<>&'"\\;\s]|--/g}
          />

          <BasicTextField
            id={5}
            placeholder="建物名・部屋番号"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            required={false}
            regex={/[<>&'"\\;\s]|--/g}
          />

          <BasicNumberField
            id={6}
            placeholder="電話番号"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            maxNumber={999999999999999}
            onValidationChange={(isValid) => setPhoneNumberValidate(isValid)}
            format={false}
          />

          <PrimaryButton value="オーナー情報登録" />
        </form>
      </div>
    </div>
  );
};

export default AuthOwnerForm;
