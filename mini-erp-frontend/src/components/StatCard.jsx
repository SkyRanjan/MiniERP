export default function StatCard({ title, value, danger }) {
  return (
    <div className={`p-4 rounded shadow ${danger && "bg-red-50"}`}>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
