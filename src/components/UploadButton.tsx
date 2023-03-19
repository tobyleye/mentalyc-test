import { useState } from "react";
import { Button } from "./Button";
import { UploadForm, UploadFormProps } from "./UploadForm";

export function UploadButton({
  onSubmit,
}: {
  onSubmit: UploadFormProps["onSubmit"];
}) {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm((show) => !show);
  return (
    <>
      <UploadForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={onSubmit}
      />
      <Button data-testid="upload" className="w-full" onClick={toggleForm}>
        Upload
      </Button>
    </>
  );
}
