type ClassInfo = {
  className: string;
  coach: string;
  date: string;
  time: string;
  attended: number;
  quota: number;
};

export default function ClassInfoCard({ info }: { info: ClassInfo }) {
  return (
    <div className="bg-white shadow p-4 rounded-xl mb-4">
      <h2 className="text-xl font-semibold">{info.className}</h2>
      <p className="text-sm text-gray-500">
        {info.coach} • {info.date} • {info.time}
      </p>
      <p className="mt-2 text-sm">Kuota: {info.attended}/{info.quota}</p>
    </div>
  );
}
