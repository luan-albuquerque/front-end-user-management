import React, { useState } from "react";
import { Modal } from "antd";
import { User } from "../../services/models/User.model";
import { EditUserFormComponent } from "./FormEditUserComponent";

interface FormEditModalComponentProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  updateUserList: () => void;
  selectedUser: User;
}

export const FormEditModalComponent: React.FC<FormEditModalComponentProps> = ({
  isModalOpen,
  setIsModalOpen,
  updateUserList,
  selectedUser,
}) => {
  const [formKey, setFormKey] = useState(Date.now());

  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const onUserEditSuccess = () => {
    setIsModalOpen(false);
    resetForm();
    updateUserList();
  };

  const resetForm = () => {
    setFormKey(Date.now());
  };

  return (
    <Modal
      title="Editar usuário"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
     <EditUserFormComponent
        key={formKey}
        onUserEditSuccess={onUserEditSuccess}
        selectedUser={selectedUser}
      />
    </Modal>
  );
};
