"use client";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import SuccessModal from "@/components/ui/modal/success-modal";
import {
  useCreateUser,
  useUpdateUser,
  UserPayloadCreate,
} from "@/hooks/useUsers";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface UsersFormPayload {
  isOpen: boolean;
  onClose: () => void;
  isAdd: boolean;
  initialData?: {
    id: number;
    username: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    status?: "ACTIVE" | "INACTIVE";
    roleMasterId?: number;
    userDetail?: {
      fullName?: string;
      nickName?: string;
      email?: string;
      phoneWa?: string;
      address?: string;
      emergencyContact?: string;
    };
  };
}

const UsersForm: React.FC<UsersFormPayload> = ({
  isOpen,
  onClose,
  isAdd,
  initialData,
}) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [fullname, setFullname] = useState<string>("");
  const [phoneWa, setPhoneWa] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [emergencyContact, setEmergencyContact] = useState<string>("");

  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  console.log("initialData", initialData);

  useEffect(() => {
    if (!isAdd && initialData) {
      setUsername(initialData.username);
      setEmail(initialData.email);
      setPhone(initialData.phone);
      setPassword(initialData.password ?? "");
      setStatus(initialData.status ?? "ACTIVE");
      setFullname(initialData.userDetail?.fullName ?? "");
      setPhoneWa(initialData.userDetail?.phoneWa ?? "");
      setAddress(initialData.userDetail?.address ?? "");
      setEmergencyContact(initialData.userDetail?.emergencyContact ?? "");
    } else {
      setUsername("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setStatus("ACTIVE");
      setFullname("");
      setPhoneWa("");
      setAddress("");
      setEmergencyContact("");
    }
  }, [isAdd, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !phone || !role) {
      toast.error("Semua field wajib diisi.");
      return;
    }

    const payload: UserPayloadCreate = {
      username,
      email,
      phone,
      password,
      roleMasterId: parseInt(role),
      status,
      userDetail: {
        fullName: fullname,
        nickName: username,
        email,
        phoneWa,
        address,
        emergencyContact,
      },
    };

    const onSuccessHandler = () => {
      setIsSuccessModalOpen(true);
      setUsername("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setStatus("ACTIVE");
      setFullname("");
      setPhoneWa("");
      setAddress("");
      setEmergencyContact("");
      setMessage(
        isAdd ? "User added successfully." : "User updated successfully.",
      );
      onClose();
    };

    const onErrorHandler = () =>
      alert(isAdd ? "Failed to add user." : "Failed to update user.");

    if (isAdd) {
      createUser.mutate(payload, {
        onSuccess: onSuccessHandler,
        onError: onErrorHandler,
      });
    } else if (initialData) {
      updateUser.mutate(
        { id: initialData.id, data: payload },
        { onSuccess: onSuccessHandler, onError: onErrorHandler },
      );
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="bg-black/50"
        width="w-4/5 md:w-3/5 lg:w-1/2"
        showCloseButton={false}
      >
        <div className="max-h-[80vh] w-[350px] overflow-auto rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl sm:w-full md:w-full">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            {isAdd ? "Add New User" : "Edit User"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {/* Username */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* Role - now a select */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="1">Admin</option>
                <option value="2">HO</option>
                <option value="3">Customer</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Full Name */}
            {isAdd && (
              <>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                  />
                </div>

                {/* Phone WA */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Phone WA
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    value={phoneWa}
                    onChange={(e) => setPhoneWa(e.target.value)}
                  />
                </div>

                {/* Emergency Contact */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                  />
                </div>

                {/* Address (biar 1 kolom saja) */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Status */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "ACTIVE" | "INACTIVE")
                }
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>

            {/* Tombol */}
            <div className="flex justify-end space-x-3 border-t border-gray-200 pt-4 md:col-span-2">
              <Button
                variant="outline"
                className="rounded-lg border-gray-300 text-gray-600 hover:bg-gray-500 hover:text-white"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white transition hover:from-blue-600 hover:to-indigo-600"
              >
                {isAdd ? "Add User" : "Save Changes"}
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

export default UsersForm;
