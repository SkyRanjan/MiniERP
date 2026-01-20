export default function Table({ headers, children }) {
  return (
    <table className="w-full border mt-4">
      <thead className="bg-gray-100">
        <tr>
          {headers.map(h => <th key={h} className="p-2">{h}</th>)}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
