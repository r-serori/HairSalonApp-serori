import React, { useState } from "react";
import BasicTextField from "../../input/BasicTextField";
import PrimaryButton from "../../button/PrimaryButton";
import SingleCheckBox from "../../input/checkbox/SingleCheckbox";
import EmailField from "../../input/EmailField";
import BasicNumberField from "../../input/BasicNumberField";
import PasswordField from "../../input/PasswordField";

interface AuthStaffRegisterFormProps {
  onSubmitStaff: (formData: {
    name: string;
    email: string;
    password: string;
    role: string;
    isAttendance: boolean;
  }) => void;
}

const AuthStaffRegisterForm: React.FC<AuthStaffRegisterFormProps> = ({
  onSubmitStaff,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("スタッフ");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [nameValidate, setNameValidate] = useState<boolean>(false);
  const [emailValidate, setEmailValidate] = useState<boolean>(false);

  const [passwordValidate, setPasswordValidate] = useState<boolean>(false);
  const [confirmPasswordValidate, setConfirmPasswordValidate] =
    useState<boolean>(false);
  const [roleValidate, setRoleValidate] = useState<boolean>(true);

  const handleSubmitStaff = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("パスワードが一致しません");
      return;
    }

    if (
      !nameValidate ||
      !emailValidate ||
      !passwordValidate ||
      !confirmPasswordValidate ||
      !roleValidate
    ) {
      return;
    }

    onSubmitStaff({
      name: name,
      email: email,
      password: password,
      role: role,
      isAttendance: false,
    });
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-md w-full space-y-6 mt-4">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            スタッフ登録
          </h2>
        </div>

        <form onSubmit={handleSubmitStaff} className="mt-8 space-y-6">
          <BasicTextField
            id={0}
            placeholder="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onValidationChange={(isValid) => setNameValidate(isValid)}
          />

          <EmailField
            id={0}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onValidationChange={(isValid) => setEmailValidate(isValid)}
          />

          <PasswordField
            id={0}
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onValidationChange={(isValid) => setPasswordValidate(isValid)}
          />

          <PasswordField
            id={1}
            placeholder="パスワード確認"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onValidationChange={(isValid) =>
              setConfirmPasswordValidate(isValid)
            }
          />

          <SingleCheckBox
            value={role}
            onChange={(newValue: string) => setRole(newValue as string)}
            getOptions={["マネージャー", "スタッフ"]}
            onValidationChange={(isValid) => setRoleValidate(isValid)}
          />

          <PrimaryButton value="登録" />
        </form>
      </div>
    </div>
  );
};

export default AuthStaffRegisterForm;
