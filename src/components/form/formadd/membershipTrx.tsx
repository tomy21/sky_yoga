/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import SuccessModal from "@/components/ui/modal/success-modal";
import {
  useCreateMembership,
  useUpdateMembership,
} from "@/hooks/useMembership";
import { useMemberType } from "@/hooks/useMemberType";
import { MembershipRequest } from "@/app/api/controller/membershipController";
import { useUserDetailByRole } from "@/hooks/useUsersDetail";

interface MemberTypePayload {
  isOpen: boolean;
  onClose: () => void;
  isAdd: boolean;
  initialData?: {
    id: number;
    userId: number;
    memberTypeId: number;
    startDate: Date;
    endDate: Date;
    status: "ACTIVE" | "EXPIRED";
  };
}

const MembershipTrxForm: React.FC<MemberTypePayload> = ({
  isOpen,
  onClose,
  isAdd,
  initialData,
}) => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amountText, setAmountText] = useState("");

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const createMembership = useCreateMembership();
  const updateMembership = useUpdateMembership();
  const { data: userResponse } = useUserDetailByRole(); // Ambil list user
  const { data: memberTypes = [] } = useMemberType();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const users = userResponse?.data || [];

  useEffect(() => {
    if (!isAdd && initialData) {
      const user = users.find((u: any) => u.id === initialData.userId);
      const type = memberTypes.data?.find(
        (t: any) => t.id === initialData.memberTypeId,
      );

      setSelectedUser(
        user ? { value: user.userId, label: `${user.fullName}` } : null,
      );

      if (type) {
        const formattedType = {
          value: type.id,
          label: type.type,
          duration: type.duration,
          amount: type.amount,
        };
        setSelectedType(formattedType);
        setAmountText(`Rp ${type.amount.toLocaleString("id-ID")}`);
      } else {
        setSelectedType(null);
        setAmountText("");
      }

      setStartDate(new Date(initialData.startDate).toISOString().split("T")[0]);
      setEndDate(new Date(initialData.endDate).toISOString().split("T")[0]);
    } else {
      setSelectedUser(null);
      setSelectedType(null);
      setStartDate("");
      setEndDate("");
    }
    setMounted(true);
  }, [isAdd, initialData, users, memberTypes.data]);

  const handleTypeChange = (option: any) => {
    setSelectedType(option);
    setAmountText(`Rp ${option.amount.toLocaleString("id-ID")}`);

    const now = new Date();
    const start = now;
    const end = new Date(start);
    end.setMonth(end.getMonth() + option.duration); // Gunakan duration dari memberType

    end.setDate(end.getDate() - 1); // agar 13 Mei → 12 Juni (durasi penuh)

    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !selectedType) return;

    const payload: MembershipRequest = {
      userId: selectedUser.value,
      memberTypeId: selectedType.value,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: "ACTIVE",
    };

    const mutation = isAdd
      ? createMembership.mutateAsync(payload)
      : updateMembership.mutateAsync({
          id: Number(initialData?.id),
          data: payload,
        });

    mutation
      .then(() => {
        setIsSuccessModalOpen(true);
        setMessage("Membership successfully saved.");
        onClose();
      })
      .catch(() => alert("Failed to submit."));
  };

  if (!mounted) {
    // selama SSR dan sebelum mount, tolak render interaktif
    return null;
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="bg-black/50"
        width="w-4/5 md:w-1/3 sm:w-1/3"
      >
        <div className="w-full rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold">
            {isAdd ? "Add Membership" : "Edit Membership"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Select User */}
            <div>
              <label className="mb-1 block font-medium text-gray-700">
                User
              </label>
              <Select
                options={users.map((u: any) => ({
                  value: u.userId,
                  label: `${u.fullName}`,
                }))}
                value={selectedUser}
                onChange={setSelectedUser}
                placeholder="Search user..."
                isSearchable
              />
            </div>

            {/* Select Member Type */}
            <div>
              <label className="mb-1 block font-medium text-gray-700">
                Member Type
              </label>
              <Select
                options={
                  memberTypes.data &&
                  memberTypes?.data.map((t: any) => ({
                    value: t.id,
                    label: t.type,
                    duration: t.duration,
                    amount: t.amount,
                  }))
                }
                value={selectedType}
                onChange={handleTypeChange}
              />
            </div>

            {/* Auto-filled Amount */}
            <div>
              <label className="mb-1 block font-medium text-gray-700">
                Amount
              </label>
              <input
                type="text"
                className="w-full rounded border bg-gray-100 px-3 py-2"
                value={amountText}
                readOnly
              />
            </div>

            {/* Auto-filled Start and End Date */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full rounded border px-2 py-1"
                  value={startDate}
                  readOnly
                />
              </div>
              <div>
                <label className="mb-1 block font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full rounded border px-2 py-1"
                  value={endDate}
                  readOnly
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 text-white"
                disabled={
                  createMembership.isPending || updateMembership.isPending
                }
              >
                {createMembership.isPending || updateMembership.isPending
                  ? "Saving..."
                  : isAdd
                    ? "Submit"
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

export default MembershipTrxForm;
