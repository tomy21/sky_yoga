"use client";

import { formatRupiah, parseRupiah } from "@/components/helper/formatRupiah";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import SuccessModal from "@/components/ui/modal/success-modal";
import {
  useCreateMemberType,
  useUpdateMemberType,
} from "@/hooks/useMemberType";

import React, { useState, useEffect } from "react";

interface MemberTypePayload {
  isOpen: boolean;
  onClose: () => void;
  isAdd: boolean;
  initialData?: { id: number; type: string; duration: number; amount: number };
}

const MemberTypeForm: React.FC<MemberTypePayload> = ({
  isOpen,
  onClose,
  isAdd,
  initialData,
}) => {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState(0);
  const [amount, setAmount] = useState(0);
  const [amountText, setAmountText] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const createMemberType = useCreateMemberType();
  const updateMemberType = useUpdateMemberType();

  useEffect(() => {
    if (!isAdd && initialData) {
      setType(initialData.type);
      setDuration(initialData.duration);
      setAmount(initialData.amount);
      setAmountText(formatRupiah(initialData.amount.toString()));
    } else {
      setType("");
      setDuration(0);
      setAmount(0);
      setAmountText("");
    }
  }, [isAdd, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { type, duration, amount };
    if (isAdd) {
      createMemberType.mutate(payload, {
        onSuccess: () => {
          setIsSuccessModalOpen(true);
          setMessage("Member type added successfully.");
          setType("");
          setDuration(0);
          setAmount(0);
          onClose();
        },
        onError: () => alert("Failed to add coach."),
      });
    } else if (initialData) {
      updateMemberType.mutate(
        { id: initialData.id, data: payload },
        {
          onSuccess: () => {
            setIsSuccessModalOpen(true);
            setMessage("Coach updated successfully.");
            setType("");
            setDuration(0);
            setAmount(0);
            onClose();
          },
          onError: () => alert("Failed to update coach."),
        },
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
            {isAdd ? "Add Coach Master" : "Edit Coach Master"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Nama Role */}
            <div>
              <label className="block font-medium text-gray-700">
                Coach Name
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-200"
                placeholder="Enter type name"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>

            {/* Duration */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Duration (in Month)
              </label>
              <input
                type="number"
                min={1}
                step={1}
                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g. 30"
                value={duration === 0 ? "" : duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Amount (in Rupiah)
              </label>
              <div className="relative">
                {/* <span className="absolute left-3 top-2.5 text-gray-500 text-sm">Rp</span> */}
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-300 py-2 pl-4 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g. Rp 100.000"
                  value={amountText}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const parsed = parseRupiah(raw); // hasilnya angka
                    setAmount(parsed); // ini untuk dipakai saat submit
                    setAmountText(formatRupiah(parsed.toString())); // ini yang ditampilkan ke user
                  }}
                  required
                />
              </div>
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
                disabled={
                  createMemberType.isPending || updateMemberType.isPending
                }
              >
                {createMemberType.isPending || updateMemberType.isPending
                  ? "Saving..."
                  : isAdd
                    ? "Add Type"
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

export default MemberTypeForm;
