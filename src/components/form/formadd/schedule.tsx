"use client";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import SuccessModal from "@/components/ui/modal/success-modal";
import { useClassMaster } from "@/hooks/useClassMaster";
import { useCoachMaster } from "@/hooks/useCoachMaster";
import {
  SchedulePayloadCreate,
  useCreateSchedule,
  useUpdateSchedule,
} from "@/hooks/useSchedule";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "../date-picker";

interface ScheduleFormProps {
  isOpen: boolean;
  onClose: () => void;
  isAdd: boolean;
  initialData?: {
    id: number;
    classId: number;
    coachId: number;
    date: Date;
    time: string;
    quota: number;
    status: "AVAILABLE" | "FULL_BOOKED";
  };
}

interface Class {
  id: number;
  name: string;
}

interface Coach {
  id: number;
  name: string;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({
  isOpen,
  onClose,
  isAdd,
  initialData,
}) => {
  const [classId, setClassId] = useState<number | null>(null);
  const [coachId, setCoachId] = useState<number | null>(null);
  const [dateSchedule, setDateSchedule] = useState<string>("");
  const [timeSchedule, setTimeSchedule] = useState("");
  const [quota, setQuota] = useState<number | null>(null);
  const [status, setStatus] = useState<"AVAILABLE" | "FULL_BOOKED">(
    "AVAILABLE",
  );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { data: dataCoach } = useCoachMaster();
  const { data: dataClass } = useClassMaster();

  const createSchedule = useCreateSchedule();
  const updateSchedule = useUpdateSchedule();

  const handleDateChange = (selectedDates: Date[]) => {
    if (selectedDates.length > 0) {
      const selectedDate = selectedDates[0];
      const formattedDate = selectedDate.toLocaleString().split("T")[0]; // Format ke yyyy-mm-dd
      setDateSchedule(formattedDate);
    }
  };

  useEffect(() => {
    if (!isAdd && initialData) {
      setClassId(initialData.classId);
      setCoachId(initialData.coachId);
      setDateSchedule(initialData.date.toString());
      setTimeSchedule(initialData.time);
      setQuota(initialData.quota);
      setStatus(initialData.status);
    } else {
      setClassId(null);
      setCoachId(null);
      setDateSchedule("");
      setTimeSchedule("");
      setQuota(null);
      setStatus("AVAILABLE");
    }
  }, [isAdd, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi manual untuk field yang tidak boleh null
    if (
      classId === null ||
      coachId === null ||
      dateSchedule === null ||
      quota === null ||
      !timeSchedule
    ) {
      alert("Semua field wajib diisi.");
      return;
    }

    const payload: SchedulePayloadCreate = {
      classId,
      coachId,
      date: new Date(dateSchedule),
      time: timeSchedule,
      quota,
      status,
    };

    if (isAdd) {
      createSchedule.mutate(payload, {
        onSuccess: () => {
          setIsSuccessModalOpen(true);
          setMessage("Class added successfully.");
          setClassId(null);
          setCoachId(null);
          setDateSchedule("");
          setTimeSchedule("");
          setQuota(null);
          setStatus("AVAILABLE");
          onClose();
        },
        onError: () => alert("Failed to add class."),
      });
    } else if (initialData) {
      updateSchedule.mutate(
        { id: initialData.id, data: payload },
        {
          onSuccess: () => {
            setIsSuccessModalOpen(true);
            setMessage("Class updated successfully.");
            setClassId(null);
            setCoachId(null);
            setDateSchedule("");
            setTimeSchedule("");
            setQuota(null);
            setStatus("AVAILABLE");
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
        width="w-4/5 md:w-1/4 sm:w-1/4 "
        showCloseButton={false}
      >
        <div className="w-full rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold">
            {isAdd ? "Add Schadule Class" : "Edit Schadule Class"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Class ID */}
            <div>
              <label className="block font-medium text-gray-700">Class</label>
              <Select
                options={
                  dataClass?.data.map((cls: Class) => ({
                    value: cls.id,
                    label: cls.name,
                  })) || []
                }
                value={
                  classId
                    ? {
                        value: classId,
                        label: dataClass?.data.find(
                          (c: Class) => c.id === classId,
                        )?.name,
                      }
                    : null
                }
                onChange={(selected) =>
                  setClassId(selected ? selected.value : null)
                }
                isClearable
                placeholder="Select class"
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            {/* Input Coach ID */}
            <div>
              <label className="block font-medium text-gray-700">Coach</label>
              <Select
                options={
                  dataCoach?.data.map((coach: Coach) => ({
                    value: coach.id,
                    label: coach.name,
                  })) || []
                }
                value={
                  coachId
                    ? {
                        value: coachId,
                        label: dataCoach?.data.find(
                          (c: Coach) => c.id === coachId,
                        )?.name,
                      }
                    : null
                }
                onChange={(selected) =>
                  setCoachId(selected ? selected.value : null)
                }
                isClearable
                placeholder="Select coach"
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            {/* Input Date */}

            <div>
              <label className="block font-medium text-gray-700">Date</label>
              <DatePicker
                id="scheduleDate"
                mode="single"
                onChange={handleDateChange}
                placeholder="Pilih tanggal"
                defaultDate={dateSchedule ? new Date(dateSchedule) : undefined}
              />
            </div>

            {/* Input Time */}
            <div>
              <label className="block font-medium text-gray-700">Time</label>
              <input
                type="time"
                className="w-full rounded-md border border-gray-300 px-4 py-2"
                value={timeSchedule}
                onChange={(e) => setTimeSchedule(e.target.value)}
                required
              />
            </div>

            {/* Input Quota */}
            <div>
              <label className="block font-medium text-gray-700">Quota</label>
              <input
                type="number"
                min={1}
                className="w-full rounded-md border border-gray-300 px-4 py-2"
                placeholder="Enter quota"
                value={quota ?? ""}
                onChange={(e) =>
                  setQuota(e.target.value ? parseInt(e.target.value) : null)
                }
                required
              />
            </div>

            {/* Select Status */}
            <div>
              <label className="block font-medium text-gray-700">Status</label>
              <select
                className="w-full rounded-md border border-gray-300 px-4 py-2"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "AVAILABLE" | "FULL_BOOKED")
                }
                required
              >
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="FULL_BOOKED">FULL_BOOKED</option>
              </select>
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end space-x-2 pt-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="rounded-md border border-gray-400 px-4 py-2"
              >
                Close
              </Button>
              <Button
                type="submit"
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                disabled={createSchedule.isPending || updateSchedule.isPending}
              >
                {createSchedule.isPending || updateSchedule.isPending
                  ? "Saving..."
                  : isAdd
                    ? "Add Schedule"
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

export default ScheduleForm;
