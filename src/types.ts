export type Upload = {
  noteType: string;
  clientName: string;
  eta: number;
  elapsed: number;
  isRunning: boolean;
};

export type Uploads = Upload[];
