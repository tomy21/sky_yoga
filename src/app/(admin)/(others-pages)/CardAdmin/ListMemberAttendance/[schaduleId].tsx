"use client";

import AttendanceFilter from "@/components/AttendanceFilter";
import { useBookingScheduleId } from "@/hooks/useBooking";

type BookingItem = {
  id: string;
  user: {
    username: string;
  };
  presence: "NOT_STARTED" | "ABSENT" | "PRESENT";
};

export default function ListAttendance({
  schaduleId,
}: {
  schaduleId: number | undefined;
}) {
  const {
    data: booking,
    isLoading,
    isError,
  } = useBookingScheduleId(schaduleId ?? 0, 1, 10);
  const dataBooking = booking && booking.data;

  return (
    <>
      <div className="my-4">
        <AttendanceFilter idSchadule={schaduleId ?? undefined} />
      </div>

      <table className="mt-4 w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-start">#</th>
            <th className="p-2 text-start">Nama</th>
            <th className="p-2 text-start">Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={3} className="p-2 text-center text-gray-500 italic">
                Loading...
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan={3} className="p-2 text-center text-red-500">
                Terjadi kesalahan saat mengambil data.
              </td>
            </tr>
          ) : dataBooking?.length === 0 ? (
            <tr>
              <td colSpan={3} className="p-2 text-center text-gray-400">
                Tidak ada data pengguna hari ini.
              </td>
            </tr>
          ) : (
            dataBooking.map((p: BookingItem, i: number) => (
              <tr key={p.id} className="border-b">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{p.user.username}</td>
                <td className="p-2">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      p.presence === "NOT_STARTED"
                        ? "bg-yellow-100 text-yellow-700"
                        : p.presence === "ABSENT"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {p.presence === "NOT_STARTED"
                      ? "Belum Mulai"
                      : p.presence === "ABSENT"
                        ? "Tidak Hadir"
                        : "Hadir"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
