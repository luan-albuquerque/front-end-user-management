import React, { useState } from "react";
import { Modal } from "antd";
import { FormCreateUserComponent } from "./FormCreateUserComponent";

interface CreateModalComponentProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  updateUserList: () => void;
}

export const CreateModalComponent: React.FC<CreateModalComponentProps> = ({
  isModalOpen,
  setIsModalOpen,
  updateUserList,
}) => {
  const [formKey, setFormKey] = useState(Date.now());

  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const onUserCreationSuccess = () => {
    setIsModalOpen(false);
    resetForm();
    updateUserList();
  };

  const resetForm = () => {
    setFormKey(Date.now());
  };

  return (
    <Modal
      title="Cadastrar um novo usuário"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <FormCreateUserComponent
        key={formKey}
        onUserCreationSuccess={onUserCreationSuccess}
      />
    </Modal>
  );
};
