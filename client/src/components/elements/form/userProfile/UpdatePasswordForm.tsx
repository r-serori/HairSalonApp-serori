import React, { useState } from "react";
import PrimaryButton from "../../button/PrimaryButton";
import PasswordField from "../../input/PasswordField";

interface UpdatePasswordFormProps {
  onSubmitUpdatePassword: (formData: {
    current_password: string;
    password: string;
    password_confirmation: string;
  }) => void;
}

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({
  onSubmitUpdatePassword,
}) => {
  const [current_password, setCurrentPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const handleSubmitStaff = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("新しいパスワードと確認用パスワードが一致しません");
      return;
    }

    if (
      !isCurrentPasswordValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    ) {
      return;
    }

    onSubmitUpdatePassword({
      current_password: current_password,
      password: password,
      password_confirmation: confirmPassword,
    });
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-md w-full space-y-6 mt-4">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            パスワード更新
          </h2>
        </div>

        <form onSubmit={handleSubmitStaff} className="mt-8 space-y-6">
          <PasswordField
            id={0}
            placeholder="現在のパスワード"
            value={current_password}
            onChange={(e) => setCurrentPassword(e.target.value)}
            onValidationChange={(isValid) => setIsCurrentPasswordValid(isValid)}
          />

          <PasswordField
            id={1}
            placeholder="新しいパスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onValidationChange={(isValid) => setIsPasswordValid(isValid)}
          />

          <PasswordField
            id={2}
            placeholder="新しいパスワード確認"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onValidationChange={(isValid) => setIsConfirmPasswordValid(isValid)}
          />

          <PrimaryButton value="登録" />
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
