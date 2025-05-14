"use client";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import SuccessModal from "@/components/ui/modal/success-modal";
import { useCreateRole, useUpdateRole } from "@/hooks/useRoleMaster";

import React, { useState, useEffect } from "react";

interface RoleFormProps {
    isOpen: boolean;
    onClose: () => void;
    isAdd: boolean;
    initialData?: { id: number; name: "HO" | "ADMIN" | "CUSTOMER", status: "ACTIVE" | "INACTIVE" };
}

const RoleFormModal: React.FC<RoleFormProps> = ({ isOpen, onClose, isAdd, initialData }) => {
    const [name, setName] = useState<"HO" | "ADMIN" | "CUSTOMER">("HO");
    const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [message, setMessage] = useState("");

    const createRole = useCreateRole();
    const updateRole = useUpdateRole();

    useEffect(() => {
        if (!isAdd && initialData) {
            setName(initialData.name);
            setStatus(initialData.status);
        } else {
            setName("HO");
            setStatus("ACTIVE");
        }
    }, [isAdd, initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { name, status };

        if (isAdd) {
            createRole.mutate(payload, {
                onSuccess: () => {
                    setIsSuccessModalOpen(true);
                    setMessage("Role added successfully.");
                    setName("HO");
                    setStatus("ACTIVE");
                    onClose();
                },
                onError: () => alert("Failed to add role."),
            });
        } else if (initialData) {
            updateRole.mutate(
                { id: initialData.id, data: payload },
                {
                    onSuccess: () => {
                        setIsSuccessModalOpen(true);
                        setMessage("Role updated successfully.");
                        setName("HO");
                        setStatus("ACTIVE");
                        onClose();
                    },
                    onError: () => alert("Failed to update role."),
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
                width="w-4/5 md:w-1/3 sm:w-1/3 "
                showCloseButton={false}
            >
                <div className="w-full rounded-lg bg-white p-6 shadow-lg">
                    <h2 className="mb-4 text-xl font-semibold">
                        {isAdd ? "Add Role" : "Edit Role"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Input Nama Role */}
                        <div>
                            <label className="block font-medium text-gray-700">Role Name</label>
                            <select
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-200"
                                value={name}
                                onChange={(e) => setName(e.target.value as "HO" | "ADMIN" | "CUSTOMER")}
                                required
                            >
                                <option value="HO">Head Office</option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="CUSTOMER">CUSTOMER</option>
                            </select>
                        </div>

                        {/* Select Status */}
                        <div>
                            <label className="block font-medium text-gray-700">Status</label>
                            <select
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-200"
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
                                disabled={createRole.isPending || updateRole.isPending}
                            >
                                {createRole.isPending || updateRole.isPending
                                    ? "Saving..."
                                    : isAdd
                                      ? "Add Role"
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

export default RoleFormModal;
