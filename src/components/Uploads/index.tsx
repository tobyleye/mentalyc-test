import { ReactNode } from "react";
import { Uploads as TUploads } from "@/types";
import { DeleteButton } from "./DeleteButton";
import { UploadProgress } from "./UploadProgress";

function DesktopTableRow({ children }: { children: ReactNode[] }) {
  return (
    <div className="flex py-2 gap-8 items-center">
      <div className="w-4/12 flex-1">{children[0]}</div>
      <div className="w-3/12">{children[1]}</div>
      <div className="w-3/12">{children[2]}</div>
      <div className="w-10">{children[3]}</div>
    </div>
  );
}

type TableProps = {
  uploads: TUploads;
  onDelete: (index: number) => void;
};

function DesktopTable({ uploads, onDelete }: TableProps) {
  return (
    <div className="hidden md:block">
      <DesktopTableRow>
        <div>Client</div>
        <div>Type</div>
        <div>ETA</div>
        <div></div>
      </DesktopTableRow>
      <div>
        {uploads.map((upload: any, index: number) => (
          <div key={`upload-${index}`} className="uploads-body-row-wrap">
            <DesktopTableRow>
              <div className="px-2">{upload.clientName}</div>
              <div>{upload.noteType}</div>
              <div className="w-4/5">
                <UploadProgress
                  isRunning={upload.isRunning}
                  eta={upload.eta}
                  elapsed={upload.elapsed}
                />
              </div>
              <DeleteButton onConfirm={() => onDelete?.(index)} />
            </DesktopTableRow>
          </div>
        ))}
      </div>
      <style jsx>{`
        .uploads-body-row-wrap {
          box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}

function MobileTable({ uploads }: TableProps) {
  return (
    <div className="md:hidden">
      <header className="table-header px-4">Client</header>
      <div className="table-body">
        {uploads.map((upload, index) => (
          <div key={`table-${index}`} className="py-2 px-4 flex gap-4">
            <div className="flex-1">{upload.clientName}</div>
            <div className="w-4/12 mx-auto">
              <UploadProgress
                isRunning={upload.isRunning}
                eta={upload.eta}
                elapsed={upload.elapsed}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
      <div className="mb-4 gap-4 rounded-lg flex items-center border border-gray-200 py-2 px-6">
        <span className="inline-grid place-items-center w-6 h-6 rounded-full bg-primary-400 text-white">
          {runningUploads}
        </span>
        <div>Notes in progress</div>
      </div>
      <DesktopTable uploads={uploads} onDelete={onDelete} />
      <MobileTable uploads={uploads} onDelete={onDelete} />
    </div>
  );
}
