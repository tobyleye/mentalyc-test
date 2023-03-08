import { Upload } from "@/types";
import { useEffect, useState } from "react";
import { randomRange } from "@/utils";

export function useUploads() {
  const [uploads, setUploads] = useState<Array<Upload>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setUploads((uploads) => {
        return uploads.map((upload) => {
          if (upload.isRunning) {
            const elapsed = upload.elapsed + 1;
            return {
              ...upload,
              elapsed,
              isRunning: elapsed === upload.eta ? false : true,
            };
          }
          return upload;
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const newUpload = (noteType: string, clientName: string) => {
    return {
      noteType,
      clientName,
      eta: randomRange(20, 120), // generate a random eta between 20 seconds & 120 seconds
      elapsed: 0,
      isRunning: true,
    };
  };
  const addNewUpload = (noteType: string, clientName: string) => {
    const upload = newUpload(noteType, clientName);
    setUploads(uploads.concat(upload));
  };

  const deleteUpload = (uploadIndex: number) => {
    setUploads((uploads) => {
      return uploads.filter((_, index) => index !== uploadIndex);
    });
  };

  return {
    uploads,
    addNewUpload,
    deleteUpload,
  };
}
