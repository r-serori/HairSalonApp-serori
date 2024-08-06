import React, { useState } from "react";
import BasicTextField from "../../input/BasicTextField";
import PrimaryButton from "../../button/PrimaryButton";
import EmailField from "../../input/EmailField";
import BasicNumberField from "../../input/BasicNumberField";
import PasswordField from "../../input/PasswordField";

interface AuthRegisterFormProps {
  onSubmitOwner: (formData: {
    name: string;
    email: string;
    phone_number: string;
    password: string;
    role: string;
    isAttendance: boolean;
    password_confirmation: string;
  }) => void;
}

const AuthRegisterForm: React.FC<AuthRegisterFormProps> = ({
  onSubmitOwner,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone_number, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [nameValidate, setNameValidate] = useState<boolean>(false);
  const [emailValidate, setEmailValidate] = useState<boolean>(false);
  const [phone_numberValidate, setPhoneNumberValidate] =
    useState<boolean>(false);
  const [passwordValidate, setPasswordValidate] = useState<boolean>(false);
  const [confirmPasswordValidate, setConfirmPasswordValidate] =
    useState<boolean>(false);

  const handleSubmitOwner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("パスワードが一致しません");
      return;
    }

    if (
      !nameValidate ||
      !emailValidate ||
      !phone_numberValidate ||
      !passwordValidate ||
      !confirmPasswordValidate
    ) {
      return;
    }

    onSubmitOwner({
      name: name,
      email: email,
      phone_number: phone_number,
      password: password,
      role: "オーナー",
      isAttendance: false,
      password_confirmation: confirmPassword,
    });
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-md w-full space-y-6">
        <div>
          <h2 className=" text-center text-3xl font-extrabold text-gray-900">
            ユーザー登録
          </h2>
        </div>

        <form onSubmit={handleSubmitOwner} className="mt-6 space-y-6">
          <BasicTextField
            id={0}
            placeholder="名前"
            value={name}
            decideLength={50}
            onChange={(e) => setName(e.target.value)}
            onValidationChange={(isValid) => setNameValidate(isValid)}
          />

          <EmailField
            id={1}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onValidationChange={(isValid) => setEmailValidate(isValid)}
          />

          <BasicNumberField
            id={2}
            placeholder="電話番号"
            value={phone_number}
            maxNumber={999999999999999}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onValidationChange={(isValid) => setPhoneNumberValidate(isValid)}
            format={false}
          />

          <PasswordField
            id={3}
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onValidationChange={(isValid) => setPasswordValidate(isValid)}
          />

          <PasswordField
            id={4}
            placeholder="パスワード確認"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onValidationChange={(isValid) =>
              setConfirmPasswordValidate(isValid)
            }
          />

          <PrimaryButton value="登録" />
        </form>
      </div>
    </div>
  );
};

export default AuthRegisterForm;
