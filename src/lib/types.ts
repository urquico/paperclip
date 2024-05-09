export type PaperClipHistory = {
  paperclip: number;
  wire: number;
  timestamp: Date;
};

export type PaperclipStore = {
  wire: number;
  wireCost: number;
  paperclip: number;
  paperclipPrice: number;
  paperclipHistory: PaperClipHistory[];
  autoClippers: number;
  autoClipperCost: number;
};
