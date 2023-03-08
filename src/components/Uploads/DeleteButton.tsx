import { useState } from "react";
import { Button } from "../Button";
import { BaseModal } from "../BaseModal";
import TrashIcon from "@/icons/Trash";

export function DeleteButton({
  onConfirm,
  index,
}: {
  onConfirm: () => void;
  index: number;
}) {
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
        onClose={closeConfirm}
      >
        <div className="mb-6 text-center">
          <h3 className="font-bold text-xl mb-1">Are you sure?</h3>
          <p className="text-gray-400"> This action cannot be undone</p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            data-testid={`note-delete-button-${index}-yes`}
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
        data-testid={`note-delete-button-${index}`}
        aria-label="delete"
        onClick={() => {
          setShowConfirm(true);
        }}
      >
        <TrashIcon />
      </button>
    </>
  );
}
