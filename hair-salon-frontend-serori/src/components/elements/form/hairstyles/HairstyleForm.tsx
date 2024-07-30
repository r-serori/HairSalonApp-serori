import React, { use, useState } from "react";
import BasicTextField from "../../input/BasicTextField";
import PrimaryButton from "../../button/PrimaryButton";
import { HairstyleState } from "../../../../slices/hairstyles/hairstyleSlice";

interface HairstyleFormProps {
  node?: HairstyleState;
  createHairstyle: (formData: HairstyleState) => void;
  edit?: boolean;
}

const HairstyleForm: React.FC<HairstyleFormProps> = ({
  node,
  createHairstyle,
  edit,
}) => {
  const [hairstyle_name, setHairstyleName] = useState<string>(
    node?.hairstyle_name || ""
  );

  const [hairstyleNameValidate, setHairstyleNameValidate] = useState<boolean>(
    node?.hairstyle_name ? true : false
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hairstyleNameValidate) {
      return;
    }
    createHairstyle({
      id: node?.id || 0,
      hairstyle_name: hairstyle_name,
    });
  };

  return (
    <div className="flex items-center justify-center h-full ">
      <div className="max-w-md w-full ">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {edit ? "髪型情報編集" : "髪型情報新規作成"}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <BasicTextField
            id={node ? node.id : 0}
            placeholder="髪型名"
            value={hairstyle_name}
            onChange={(e) => setHairstyleName(e.target.value)}
            onValidationChange={(isValid) => setHairstyleNameValidate(isValid)}
          />

          <PrimaryButton value={"髪型情報作成"} />
        </form>
      </div>
    </div>
  );
};

export default HairstyleForm;
