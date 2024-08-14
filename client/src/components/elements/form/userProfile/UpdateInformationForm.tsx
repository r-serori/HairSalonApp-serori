import React, { useState } from "react";
import BasicTextField from "../../input/BasicTextField";
import PrimaryButton from "../../button/PrimaryButton";
import EmailField from "../../input/EmailField";
import BasicNumberField from "../../input/BasicNumberField";

interface UpdateInformationFormProps {
  node: {
    name: string;
    email: string;
  };
  onSubmitUserInformation: (formData: { name: string; email: string }) => void;
}

const UpdateInformationForm: React.FC<UpdateInformationFormProps> = ({
  node,
  onSubmitUserInformation,
}) => {
  const [name, setName] = useState<string>(node.name || "");
  const [email, setEmail] = useState<string>(node.email || "");

  const [edit, setEdit] = useState(false);

  const [nameValidate, setNameValidate] = useState<boolean>(
    node && node.name ? true : false
  );
  const [emailValidate, setEmailValidate] = useState<boolean>(
    node && node.email ? true : false
  );

  const handleSubmitStaff = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nameValidate || !emailValidate) {
      return;
    }
    onSubmitUserInformation({
      name: name,
      email: email,
    });
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-lg w-full ">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {edit
              ? "あなたのプロフィール情報を編集"
              : "あなたのプロフィール情報"}
          </h2>
        </div>
        <div className="flex justify-center items-center text-center mx-auto pb-1">
          <button
            className="mt-6 items-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2 text-center "
            onClick={() => setEdit(!edit)}
          >
            編集
          </button>
        </div>

        <form onSubmit={handleSubmitStaff} className="mt-8 space-y-6">
          <BasicTextField
            id={0}
            placeholder="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={edit ? false : true}
            onValidationChange={(isValid) => setNameValidate(isValid)}
          />

          <EmailField
            id={0}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={edit ? false : true}
            onValidationChange={(isValid) => setEmailValidate(isValid)}
          />

          <PrimaryButton value="プロフィール更新" />
        </form>
      </div>
    </div>
  );
};

export default UpdateInformationForm;
