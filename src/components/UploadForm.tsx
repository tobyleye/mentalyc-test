import { useState } from "react";
import { BaseModal } from "./BaseModal";
import { Button } from "./Button";
import { SelectField } from "./SelectField";
import { TextField } from "./TextField";

export type UploadFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (noteType: string, clientName: string) => void;
};

const noteOptions = [
  { label: "Progress note - 80 left", value: "Progress note" },
  { label: "Soap note - 80 left", value: "Soap note" },
  { label: "EMDR note - 80 left", value: "EMDR note" },
  {
    label: "Couples therapy note - 80 left",
    value: "Couples therapy note",
  },
  {
    label: "Family therapy note - 80 left",
    value: "Family therapy note",
  },
];

export function UploadForm({ open, onClose, onSubmit }: UploadFormProps) {
  const [noteType, setNoteType] = useState("");
  const [clientName, setClientName] = useState("");

  const disabled = !noteType || !clientName;

  const clearForm = () => {
    setNoteType("");
    setClientName("");
  };

  const handleClose = () => {
    clearForm();
    onClose();
  };

  return (
    <>
      <BaseModal
        open={open}
        onClose={handleClose}
        title={"Complete Your Upload"}
        description="Fill in the details below to complete your upload"
      >
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(noteType, clientName);
              handleClose();
            }}
          >
            <div className="grid gap-10">
              <SelectField
                placeholder="Select note type"
                value={noteType}
                onChange={setNoteType}
                options={noteOptions}
              />
              <TextField
                placeholder="Enter client name"
                value={clientName}
                onInputChange={setClientName}
              />
              <div className="flex justify-center">
                <Button disabled={disabled}>Finish Upload</Button>
              </div>
            </div>
          </form>
        </div>
      </BaseModal>
    </>
  );
}
