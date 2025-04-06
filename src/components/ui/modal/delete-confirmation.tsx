"use client";
import React from "react";
import { Modal } from ".";
import { IoTrashOutline } from "react-icons/io5";
import Button from "../button/Button";

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
    isLoading?: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    itemName,
    isLoading = false,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="bg-black/50"
            width="w-[350px]"
            showCloseButton={false}
        >
            <div className="flex w-[350px] flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-lg">
                <IoTrashOutline size={50} className="mb-3 text-red-600" />
                <p className="text-gray-700">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">{itemName}</span>?
                </p>
                <div className="mt-4 flex justify-center space-x-3">
                    <Button
                        onClick={onClose}
                        className="rounded-md border border-gray-400 px-4 py-2"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        className={`flex items-center rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="mr-2 h-5 w-5 animate-spin rounded-full border-4 border-white border-t-transparent"
                                    viewBox="0 0 24 24"
                                ></svg>
                                Deleting...
                            </>
                        ) : (
                            "Delete"
                        )}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteConfirmationModal;
