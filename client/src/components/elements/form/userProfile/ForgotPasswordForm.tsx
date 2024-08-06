import React, { useState } from "react";
import PrimaryButton from "../../button/PrimaryButton";
import EmailField from "../../input/EmailField";

interface ForgotPasswordFormProps {
  onSubmitForgotPassword: (email: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmitForgotPassword,
}) => {
  const [email, setEmail] = useState<string>("");

  const [emailValidate, setEmailValidate] = useState<boolean>(false);

  const handleSubmitForgotPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailValidate) {
      return;
    }
    onSubmitForgotPassword(email);
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-lg w-full mt-12">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            パスワードをリセットする為に、
            <br /> メールアドレスを入力してください。
          </h2>
        </div>

        <form onSubmit={handleSubmitForgotPassword} className="mt-24 space-y-6">
          <EmailField
            id={0}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onValidationChange={(isValid) => setEmailValidate(isValid)}
          />

          <PrimaryButton value="送信" />
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
