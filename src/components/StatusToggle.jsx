export default function StatusToggle({ status, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`px-3 py-1 rounded-full text-sm font-medium
        ${
          status === "Active"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
    >
      {status}
    </button>
  );
}
