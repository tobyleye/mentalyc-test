import { Button } from "@/components/Button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { UploadModal } from "@/components/UploadModal";
import { Uploads } from "@/components/Uploads";
import HelpIcon from "@/icons/Help";
import Head from "next/head";
import { useState } from "react";
import { useUploads } from "./hooks/useUploads";
import { toast } from "react-hot-toast";

export default function DashboardHomePage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { uploads, addNewUpload, deleteUpload } = useUploads();

  const handleNewUpload = (noteType: string, clientName: string) => {
    addNewUpload(noteType, clientName);
    toast.success("new recording session added");
  };

  const handleDelete = (index: number) => {
    deleteUpload(index);
    toast.success("recording session deleted");
  };
  return (
    <>
      <DashboardLayout>
        <Head>
          <title>Mentalyc Dashboard</title>
        </Head>
        <div className="pb-6">
          <UploadModal
            onSubmit={handleNewUpload}
            open={showUploadModal}
            onClose={() => setShowUploadModal(false)}
          />

          <section className="mb-24">
            <div className="flex justify-between  mb-6 items-center">
              <div className="md:text-[20px]">Hi, Maria</div>
              <HelpIcon />
            </div>
            <h2 className="h3 mb-6">Upload your session’s recordings</h2>
            <Button
              data-testid="upload"
              className="w-full"
              onClick={() => setShowUploadModal(true)}
            >
              Upload
            </Button>
          </section>

          <Uploads uploads={uploads} onDelete={handleDelete} />
        </div>
      </DashboardLayout>
    </>
  );
}
