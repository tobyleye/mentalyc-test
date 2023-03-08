import { Uploads as TUploads } from "@/types";
import { Table } from "./Table";

export function Uploads({
  uploads,
  onDelete,
}: {
  uploads: TUploads;
  onDelete: (index: number) => void;
}) {
  if (uploads.length === 0) {
    return null;
  }

  const runningUploads = uploads.filter(
    (upload) => upload.isRunning === true
  ).length;

  return (
    <div>
      <div className="mb-6 gap-4 rounded-xl flex items-center border border-gray-200 py-2 px-6">
        <span className="inline-grid place-items-center w-6 h-6 rounded-full bg-primary-400 text-white">
          {runningUploads}
        </span>
        <div>Notes in progress</div>
      </div>
      <Table uploads={uploads} onDelete={onDelete} />
    </div>
  );
}
