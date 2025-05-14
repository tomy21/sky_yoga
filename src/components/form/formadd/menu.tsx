"use client";
import IconSelect from "@/components/select/icon-select";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import SuccessModal from "@/components/ui/modal/success-modal";
import { useAllMenus, useCreateMenu, useUpdateMenu } from "@/hooks/useMenu";
import React, { useState, useEffect } from "react";

interface MenuFormProps {
    isOpen: boolean;
    onClose: () => void;
    isAdd: boolean;
    isParent: boolean;
    initialData?: {
        id: number;
        parentId: number | null;
        name: string;
        path: string;
        icon: string;
        position: number;
        status: "ACTIVE" | "INACTIVE";
        createdAt: string;
    };
}

type Menu = {
    id: number;
    parentId: number | null;
    name: string;
    path: string;
    icon: string;
    position: number;
    status: "ACTIVE" | "INACTIVE";
    createdAt: string;
};

const MenuFormModal: React.FC<MenuFormProps> = ({
    isOpen,
    onClose,
    isAdd,
    isParent,
    initialData,
}) => {
    const [name, setName] = useState("");
    const [parentId, setParentId] = useState<number | null>(null);
    const [icon, setIcon] = useState("");
    const [position, setPosition] = useState(0);
    const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [selectedIcon, setSelectedIcon] = useState<keyof typeof import("@/icons")>("GridIcon");
    const [selectTypeMenu, setSelectTypeMenu] = useState("");
    const [perentMenu, setParentMenu] = useState<Menu[]>([]);
    const [path, setPath] = useState(""); 

    const createMenu = useCreateMenu();
    const updateMenu = useUpdateMenu();
    const menus = useAllMenus();
    

    useEffect(() => {
        const formattedName = name.trim().toLowerCase().replace(/\s+/g, "-");
        setPath(`/admin/${formattedName}`);

        if(selectedIcon){
            const icon = `<${selectedIcon}/>`
            setIcon(icon);
        }
    }, [name, selectedIcon]);

    

    useEffect(() => {
        if (!isAdd && initialData) {
            setName(initialData.name);
            setStatus(initialData.status);
            setParentId(initialData.parentId);
            setIcon(initialData.icon);
            setPosition(initialData.position);
        } else {
            setName("");
            setParentId(null);
            setIcon("");
            setPosition(0);
            setStatus("ACTIVE");
        }

        if (isParent && initialData) {
            if (initialData?.parentId === null) {
                setSelectTypeMenu("Parent");
            } else {
                setSelectTypeMenu("Children");
            }
        } else {
            setSelectTypeMenu("");
        }
    }, [isAdd, initialData, isParent]);

    useEffect(() => {
        const allMenus: Menu[] = (menus.data?.data ?? []) as Menu[];

        if (isAdd && allMenus.length > 0 && selectTypeMenu) {
            let relatedMenus: Menu[] = [];

            if (selectTypeMenu === "Parent") {
                relatedMenus = allMenus.filter((m) => m.parentId === null || m.parentId === 0);
            } else if (selectTypeMenu === "Children" && parentId !== undefined) {
                relatedMenus = allMenus.filter((m) => m.parentId === parentId);
                setParentMenu(allMenus.filter((m) => m.parentId === null || m.parentId === 0));
            }

            const maxPosition = Math.max(...relatedMenus.map((m) => Number(m.position)), 0);
            setPosition(maxPosition + 1);
        }
    }, [isAdd, selectTypeMenu, parentId, menus.data?.data]);

    const handleCloseModal = () => {
        setSelectTypeMenu("");
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isAdd) {
            const payload = { name, parentId, path, icon, position, status };
            console.log(payload)
            createMenu.mutate(payload, {
                onSuccess: (response) => {
                    console.log("✅ Create Success Response:", response);
                    setIsSuccessModalOpen(true);
                    setMessage("Menu added successfully.");
                    setName("");
                    setStatus("ACTIVE");
                    onClose();
                },
                onError: () => alert("Failed to add menu."),
            });
        } else if (initialData) {
            const payload = {
                parentId,
                name,
                path,
                icon,
                position,
                status,
            };

            updateMenu.mutate(
                { id: initialData.id, data: payload },
                {
                    onSuccess: () => {
                        setIsSuccessModalOpen(true);
                        setMessage("Menu updated successfully.");
                        setName("");
                        setStatus("ACTIVE");
                        onClose();
                    },
                    onError: () => alert("Failed to update menu."),
                }
            );
        }
    };

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setName(e.target.value);
    // };

    console.log(perentMenu);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={handleCloseModal}
                className="bg-black/50"
                width="w-1/3"
                showCloseButton={false}
            >
                <div className="w-full rounded-lg bg-white p-6 shadow-lg">
                    <h2 className="mb-4 text-xl font-semibold">
                        {isAdd ? "Add Menu" : "Edit Menu"}
                    </h2>

                    <div className="mb-3">
                        <label className="block font-medium text-gray-700">Type Menu</label>
                        <select
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                            value={selectTypeMenu}
                            onChange={(e) => setSelectTypeMenu(e.target.value)}
                            required
                        >
                            <option value="">Select type menu</option>
                            <option value="Parent">Parent</option>
                            <option value="Children">Children</option>
                        </select>
                    </div>

                    {selectTypeMenu !== "" && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Jika Parent, tampilkan input Parent Menu */}
                            {selectTypeMenu === "Children" && (
                                <div>
                                    <label className="block font-medium text-gray-700">
                                        Parent Menu
                                    </label>
                                    <select
                                        className="w-full rounded-md border border-gray-300 px-4 py-2"
                                        value={parentId === null ? "" : parentId}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setParentId(value === "" ? null : Number(value));
                                        }}
                                        required
                                    >
                                        <option value="">Select parent menu</option>
                                        {perentMenu.map((menu) => (
                                            <option key={menu.id} value={menu.id}>
                                                {menu.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Menu Name */}
                            <div>
                                <label className="block font-medium text-gray-700">Menu Name</label>
                                <input
                                    type="text"
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-200"
                                    placeholder="Enter menu name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700">Path</label>
                                <input
                                    type="text"
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 bg-gray-100 text-gray-500"
                                    value={path}
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700">Position</label>
                                <input
                                    type="number"
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-200"
                                    value={position}
                                    onChange={(e) => setPosition(Number(e.target.value))}
                                />
                            </div>

                            {/* Icon */}
                            <div>
                                <label className="block font-medium text-gray-700">Icon</label>
                                <IconSelect value={selectedIcon} onChange={setSelectedIcon} />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block font-medium text-gray-700">Status</label>
                                <select
                                    className="w-full rounded-md border border-gray-300 px-4 py-2"
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(e.target.value as "ACTIVE" | "INACTIVE")
                                    }
                                    required
                                >
                                    <option value="ACTIVE">Active</option>
                                    <option value="INACTIVE">Inactive</option>
                                </select>
                            </div>

                            {/* Tombol */}
                            <div className="flex justify-end space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={handleCloseModal}
                                    className="rounded-md border border-gray-400 px-4 py-2"
                                >
                                    Close
                                </Button>
                                <Button
                                    type="submit"
                                    className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                                    disabled={createMenu.isPending || updateMenu.isPending}
                                >
                                    {createMenu.isPending || updateMenu.isPending
                                        ? "Saving..."
                                        : isAdd
                                          ? "Add Menu"
                                          : "Save Changes"}
                                </Button>
                            </div>
                        </form>
                    )}
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

export default MenuFormModal;
