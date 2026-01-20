import { useState } from "react";
import { backupData, restoreData } from "../services/systemApi";

export default function BackupRestore() {
  const [status, setStatus] = useState("");

  const handleBackup = async () => {
    setStatus("Backing up...");
    try {
      await backupData();
      setStatus("✅ Backup completed successfully");
    } catch {
      setStatus("❌ Backup failed");
    }
  };

  const handleRestore = async () => {
    if (!window.confirm("This will overwrite current data. Continue?")) return;

    setStatus("Restoring...");
    try {
      await restoreData();
      setStatus("✅ Restore completed successfully");
    } catch {
      setStatus("❌ Restore failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-fit">
      <div className="flex gap-4">
        <button
          onClick={handleBackup}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
        >
          Backup
        </button>

        <button
          onClick={handleRestore}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded"
        >
          Restore
        </button>
      </div>

      {status && (
        <p className="mt-4 text-sm font-medium text-gray-700">
          {status}
        </p>
      )}
    </div>
  );
}
