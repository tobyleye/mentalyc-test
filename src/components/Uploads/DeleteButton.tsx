import { useState } from "react";
import { Button } from "../Button";
import { BaseModal } from "../BaseModal";
import TrashIcon from "@/icons/Trash";

export function DeleteButton({ onConfirm }: { onConfirm: () => void }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const closeConfirm = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <BaseModal
        showDismissButton={false}
        size="small"
        open={showConfirm}
        onClose={() => {}}
      >
        <div className="mb-6 text-center">
          <h3 className="font-bold text-xl mb-1">Are you sure?</h3>
          <p className="text-gray-400"> This action cannot be undone</p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={() => {
              onConfirm();
              closeConfirm();
            }}
          >
            Yes
          </Button>
          <Button color="default" onClick={closeConfirm}>
            Uhm, No
          </Button>
        </div>
      </BaseModal>
      <button
        onClick={() => {
          setShowConfirm(true);
        }}
      >
        <TrashIcon />
      </button>
    </>
  );
}
