"use client";
import React from "react";
import { Modal } from ".";
import { GoCheckCircle } from "react-icons/go";
import Button from "../button/Button";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="bg-black/50"
            width="w-1/4"
            showCloseButton={false}
        >
            <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-lg">
                <GoCheckCircle size={50} className="mb-3 text-green-600" />
                <h2 className="mb-4 text-xl font-semibold text-green-600">Success</h2>
                <p className="text-gray-700">{message}</p>
                <div className="mt-4 flex justify-center">
                    <Button
                        onClick={onClose}
                        className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                    >
                        OK
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default SuccessModal;
