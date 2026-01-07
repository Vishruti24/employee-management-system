export default function Alert({ message, type = "success" }) {
  return (
    <div
      className={`p-3 rounded mb-3 ${
        type === "error"
          ? "bg-red-100 text-red-700"
          : "bg-green-100 text-green-700"
      }`}
    >
      {message}
    </div>
  );
}
