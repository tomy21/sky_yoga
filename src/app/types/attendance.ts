// types/attendance.ts
export type ParticipantStatus = "Hadir" | "Tidak Hadir" | "Belum Dikonfirmasi";

export type Participant = {
  id: number;
  name: string;
  status: ParticipantStatus;
};

export type ClassInfo = {
  className: string;
  coach: string;
  date: string;
  time: string;
  quota: number;
  attended: number;
};
