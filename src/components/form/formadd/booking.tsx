"use client";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import SuccessModal from "@/components/ui/modal/success-modal";
import { useCreateBooking, useUpdateBooking } from "@/hooks/useBooking";
import { useCustomerAll } from "@/hooks/useUsers";

import React, { useState, useEffect } from "react";
import Select, { SingleValue } from "react-select";

interface ClassFormProps {
  isOpen: boolean;
  onClose: () => void;
  isAdd: boolean;
  initialData?: {
    id: number;
    userId: number;
    scheduleId: number;
    status: "BOKEED" | "CANCEL";
  };
}

type BookingCreatePayload = {
  userId: number;
  classId: number;
  scheduleId: number;
  status: "BOKEED" | "CANCEL";
};

type BookingUpdatePayload = {
  userId: number;
  scheduleId: number;
  status: "BOKEED" | "CANCEL";
  presence: "NOT_STARTED" | "PRESENT" | "ABSENT";
};

const BookingForm: React.FC<ClassFormProps> = ({
  isOpen,
  onClose,
  isAdd,
  initialData,
}) => {
  const [scheduleId, setScheduleId] = useState<number | undefined>();
  const [classId, setClassId] = useState<number | undefined>();
  const [userId, setUserId] = useState<number>();
  const [type, setType] = useState("PRIVATE");
  const [status, setStatus] = useState<"BOKEED" | "CANCEL">("BOKEED");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const userLIst = useCustomerAll();
  // console.log(userLIst);
  const createBooking = useCreateBooking();
  const updateBooking = useUpdateBooking();

  type OptionType = {
    value: number;
    label: string;
  };

  useEffect(() => {
    if (!isAdd && initialData) {
      setScheduleId(initialData.scheduleId ?? undefined);
      setUserId(initialData.userId ?? undefined);
      setStatus(initialData.status);
    } else {
      setClassId(undefined);
      setScheduleId(undefined);
      // setType("PRIVATE");
      setStatus("BOKEED");
    }
  }, [isAdd, initialData]);

  console.log(type);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      userId === undefined ||
      classId === undefined ||
      scheduleId === undefined
    ) {
      alert("Pastikan semua data terisi!");
      return;
    }

    const payload: BookingCreatePayload = {
      userId,
      classId,
      scheduleId,
      status,
    };

    const payloadUpdate: BookingUpdatePayload = {
      userId,
      scheduleId,
      status,
      presence: "NOT_STARTED",
    };

    if (isAdd) {
      createBooking.mutate(payload, {
        onSuccess: () => {
          setIsSuccessModalOpen(true);
          setMessage("Class added successfully.");
          setClassId(undefined);
          setScheduleId(undefined);
          setStatus("BOKEED");
          onClose();
        },
        onError: () => alert("Failed to add class."),
      });
    } else if (initialData) {
      updateBooking.mutate(
        { id: initialData.id, data: payloadUpdate },
        {
          onSuccess: () => {
            setIsSuccessModalOpen(true);
            setMessage("Class updated successfully.");
            setClassId(undefined);
            setScheduleId(undefined);
            setStatus("BOKEED");
            onClose();
          },
          onError: () => alert("Failed to update class."),
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
        width="w-3/4 md:w-1/4 sm:w-1/4 "
        showCloseButton={false}
      >
        <div className="w-full rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold">
            {isAdd ? "Add Class Master" : "Edit Class Master"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Nama Role */}
            <div>
              <label className="block font-medium text-gray-700">User</label>
              <Select
                options={
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  userLIst.data?.data.map((cls: any) => ({
                    value: Number(cls.id),
                    label: cls.name,
                  })) || []
                }
                value={
                  classId
                    ? {
                        value: classId,
                        label:
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          userLIst.data?.data.find((c: any) => c.id === classId)
                            ?.name || "",
                      }
                    : null
                }
                onChange={(selected: SingleValue<OptionType>) =>
                  setClassId(selected ? selected.value : undefined)
                }
                isClearable
                placeholder="Select user"
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            {/* Select Status */}
            <div>
              <label className="block font-medium text-gray-700">
                Type Class
              </label>
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
                onChange={(e) =>
                  setStatus(e.target.value as "BOKEED" | "CANCEL")
                }
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
                disabled={createBooking.isPending || updateBooking.isPending}
              >
                {createBooking.isPending || updateBooking.isPending
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

export default BookingForm;
