import React, { useState } from "react";
import BasicTextField from "../../input/BasicTextField";
import SingleCheckBox from "../../input/checkbox/SingleCheckbox";
import PrimaryButton from "../../button/PrimaryButton";
import { UserState } from "../../../../slices/auth/userSlice";
import BasicNumberField from "../../input/BasicNumberField";

interface UserUpdateFormProps {
  onSubmit: (formData: { id: number; role: string }) => void;
  node: UserState;
}

const UserUpdateForm: React.FC<UserUpdateFormProps> = ({ onSubmit, node }) => {
  const [name, setName] = useState<string>(node?.name || "");

  const [role, setRole] = useState<string>(node?.role || "スタッフ");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (node.id === 0 || node.id === undefined) return;

    onSubmit({
      id: node.id,
      role: role,
    });
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-md w-full space-y-6 mt-4">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ユーザー情報編集
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <BasicTextField
            id={node.id}
            placeholder="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={true}
            decideLength={50}
          />

          <SingleCheckBox
            value={role}
            onChange={(newValue) => setRole(newValue)}
            getOptions={["マネージャー", "スタッフ"]}
          />

          <PrimaryButton value="スタッフ情報更新" />
        </form>
      </div>
    </div>
  );
};

export default UserUpdateForm;
