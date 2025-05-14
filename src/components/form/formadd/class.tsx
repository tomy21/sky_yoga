"use client";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import SuccessModal from "@/components/ui/modal/success-modal";
import { useCreateClass, useUpdateClass } from "@/hooks/useClassMaster";

import React, { useState, useEffect } from "react";

interface ClassFormProps {
    isOpen: boolean;
    onClose: () => void;
    isAdd: boolean;
    initialData?: { id: number; name: string; status: "ACTIVE" | "INACTIVE" };
}

const ClassFormModal: React.FC<ClassFormProps> = ({ isOpen, onClose, isAdd, initialData }) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("PRIVATE");
    const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [message, setMessage] = useState("");

    const createClass = useCreateClass();
    const updateClass = useUpdateClass();

    useEffect(() => {
        if (!isAdd && initialData) {
            setName(initialData.name);
            setStatus(initialData.status);
        } else {
            setName("");
            setType("PRIVATE");
            setStatus("ACTIVE");
        }
    }, [isAdd, initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { name, type, status };
        console.log(payload);
        if (isAdd) {
            createClass.mutate(payload, {
                onSuccess: () => {
                    setIsSuccessModalOpen(true);
                    setMessage("Class added successfully.");
                    setName("");
                    setStatus("ACTIVE");
                    onClose();
                },
                onError: () => alert("Failed to add class."),
            });
        } else if (initialData) {
            updateClass.mutate(
                { id: initialData.id, data: payload },
                {
                    onSuccess: () => {
                        setIsSuccessModalOpen(true);
                        setMessage("Class updated successfully.");
                        setName("");
                        setStatus("ACTIVE");
                        onClose();
                    },
                    onError: () => alert("Failed to update class."),
                }
            );
        }
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                className="bg-black/50"
                width="w-4/5 md:w-1/3 sm:w-1/3"
                showCloseButton={false}
            >
                <div className="w-full rounded-lg bg-white p-6 shadow-lg">
                    <h2 className="mb-4 text-xl font-semibold">
                        {isAdd ? "Add Class Master" : "Edit Class Master"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Input Nama Role */}
                        <div>
                            <label className="block font-medium text-gray-700">Class Name</label>
                            <input
                                type="text"
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-200"
                                placeholder="Enter class name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        {/* Select Status */}
                        <div>
                            <label className="block font-medium text-gray-700">Type Class</label>
                            <select
                                className="w-full rounded-md border border-gray-300 px-4 py-2"
                                value={status}
                                onChange={(e) => setType(e.target.value)}
                                required
                            >
                                <option value="PRIVATE">Private</option>
                                <option value="PUBLIC">Public</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Status</label>
                            <select
                                className="w-full rounded-md border border-gray-300 px-4 py-2"
                                value={status}
                                onChange={(e) => setStatus(e.target.value as "ACTIVE" | "INACTIVE")}
                                required
                            >
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="INACTIVE">INACTIVE</option>
                            </select>
                        </div>

                        {/* Tombol Submit & Close */}
                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                className="rounded-md border border-gray-400 px-4 py-2"
                            >
                                Close
                            </Button>
                            <Button
                                type={"submit"}
                                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                                disabled={createClass.isPending || updateClass.isPending}
                            >
                                {createClass.isPending || updateClass.isPending
                                    ? "Saving..."
                                    : isAdd
                                      ? "Add Class"
                                      : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>

            <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                message={message}
            />
        </>
    );
};

export default ClassFormModal;
