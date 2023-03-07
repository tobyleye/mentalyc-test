import { Button } from "@/components/Button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { UploadModal } from "@/components/UploadModal";
import { Uploads } from "@/components/Uploads";
import HelpIcon from "@/icons/Help";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Upload } from "@/types";

const random = (start: number, end: number) => {
  return Math.floor(Math.random() * (end - start)) + start;
};

export default function DashboardHomePage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
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
      eta: random(20, 120),
      elapsed: 0,
      isRunning: true,
    };
  };
  const handleNewUpload = (noteType: string, clientName: string) => {
    const upload = newUpload(noteType, clientName);
    setUploads(uploads.concat(upload));
  };

  const handleDelete = (uploadIndex: number) => {
    setUploads((uploads) => {
      return uploads.filter((_, index) => index !== uploadIndex);
    });
  };
  return (
    <>
      <DashboardLayout>
        <Head>
          <title>Mentalyc Dashboard</title>
        </Head>
        {showUploadModal ? (
          <UploadModal
            onSubmit={handleNewUpload}
            open={showUploadModal}
            onClose={() => setShowUploadModal(false)}
          />
        ) : null}
        <section className="mb-24">
          <div className="flex justify-between  mb-6 items-center">
            <div className="text-xl">Hi, Maria</div>
            <HelpIcon />
          </div>
          <h2 className="text-xl font-bold mb-4">
            Upload your session’s recordings
          </h2>
          <Button className="w-full" onClick={() => setShowUploadModal(true)}>
            Upload
          </Button>
        </section>
        <Uploads uploads={uploads} onDelete={handleDelete} />
      </DashboardLayout>
    </>
  );
}
