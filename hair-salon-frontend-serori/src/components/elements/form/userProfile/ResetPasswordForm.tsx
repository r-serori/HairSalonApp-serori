import React, { useEffect, useState } from "react";
import PrimaryButton from "../../button/PrimaryButton";
import PasswordField from "../../input/PasswordField";
import EmailField from "../../input/EmailField";

interface ResetPasswordFormProps {
  onSubmitResetPassword: (formData: {
    email: string;
    password: string;
    password_confirmation: string;
  }) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmitResetPassword,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [emailValidate, setEmailValidate] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const handleSubmitResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("パスワードが一致しません");
      return;
    }

    if (!isPasswordValid || !isConfirmPasswordValid || !emailValidate) {
      return;
    }

    onSubmitResetPassword({
      email: email,
      password: password,
      password_confirmation: confirmPassword,
    });
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-md w-full space-y-6 mt-4">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            パスワードリセット
          </h2>
        </div>

        <form onSubmit={handleSubmitResetPassword} className="mt-8 space-y-6">
          <EmailField
            id={0}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onValidationChange={(isValid) => setEmailValidate(isValid)}
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

          <PrimaryButton value="パスワードリセット" />
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
