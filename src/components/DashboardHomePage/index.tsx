import { DashboardLayout } from "@/components/DashboardLayout";
import { Uploads } from "@/components/Uploads";
import HelpIcon from "@/icons/Help";
import Head from "next/head";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { randomRange } from "@/utils";
import { useTick } from "./hooks/useTick";
import { Upload } from "@/types";
import { UploadButton } from "@/components/UploadButton";

export default function DashboardHomePage() {
  const [uploads, setUploads] = useState<Array<Upload>>([]);

  useTick(() => {
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
  });

  const newUpload = (noteType: string, clientName: string) => {
    return {
      noteType,
      clientName,
      eta: randomRange(20, 120), // generate a random eta between 20 seconds & 120 seconds
      elapsed: 0,
      isRunning: true,
    };
  };
  const handleNewUpload = (noteType: string, clientName: string) => {
    const upload = newUpload(noteType, clientName);
    setUploads(uploads.concat(upload));
    toast.success("new recording session added");
  };

  const handleDelete = (uploadIndex: number) => {
    setUploads((uploads) => {
      return uploads.filter((_, index) => index !== uploadIndex);
    });
    toast.success("recording session deleted");
  };

  return (
    <>
      <DashboardLayout>
        <Head>
          <title>Mentalyc Dashboard</title>
        </Head>
        <div className="pb-6">
          <section className="mb-24">
            <div className="flex justify-between  mb-6 items-center">
              <div className="md:text-[20px]">Hi, Maria</div>
              <HelpIcon />
            </div>
            <h2 className="h3 mb-6">Upload your session’s recordings</h2>
            <UploadButton onSubmit={handleNewUpload} />
          </section>
          <Uploads uploads={uploads} onDelete={handleDelete} />
        </div>
      </DashboardLayout>
    </>
  );
}
