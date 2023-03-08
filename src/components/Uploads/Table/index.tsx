import { Uploads } from "@/types";
import styles from "./table.module.scss";
import cx from "clsx";
import { DeleteButton } from "../DeleteButton";
import { UploadProgress } from "../UploadProgress";
import CheckmarkIcon from "@/icons/Checkmark";

type TableProps = {
  uploads: Uploads;
  onDelete: (index: number) => void;
};

export function Table({ uploads, onDelete }: TableProps) {
  return (
    <div>
      <header className={styles.table_header}>
        <div className={cx(styles.table_row, styles.table_header_row)}>
          <div className={styles.client_column}>Client</div>
          <div className={styles.type_column}>Type</div>
          <div className={styles.eta_column}>ETA</div>
          <div className={styles.action_column}>
            <span className="sr-only">Action</span>
          </div>
        </div>
      </header>
      <div className={styles.table_body}>
        {uploads.map((upload, index) => (
          <div
            data-testid={`note-${index}`}
            key={`table_row_${index}`}
            className={cx(styles.table_row, styles.table_body_row)}
          >
            <div className={styles.client_column}>{upload.clientName}</div>
            <div className={styles.type_column}>{upload.noteType}</div>
            <div className={styles.eta_column}>
              {upload.isRunning ? (
                <div className={styles.upload_progress_wrapper}>
                  <UploadProgress eta={upload.eta} elapsed={upload.elapsed} />
                </div>
              ) : (
                <div className="text-green-500 text-xl">
                  <CheckmarkIcon />
                </div>
              )}
            </div>
            <div className={styles.action_column}>
              <DeleteButton index={index} onConfirm={() => onDelete(index)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
