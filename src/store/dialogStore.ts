import { create } from 'zustand';
import createSelectors from "./selectors";
import { devtools } from 'zustand/middleware';

interface DialogState {
  dialogOpen: boolean;
  dialogTitle: string;
  dialogDescription: string;

  setDialogOpen: (dialogOpen: boolean) => void;
  setDialogTitle: (dialogTitle: string) => void;
  setDialogDescription: (dialogDescription: string) => void;
  setDialog: (data: any) => void;
}


const dialogStore = create<DialogState>()(
  devtools((set, get) => ({
    dialogOpen: false,
    dialogTitle: "Edit profile",
    dialogDescription: "",

    setDialogOpen: (dialogOpen) => set({ dialogOpen }),
    setDialogTitle: (dialogTitle) => set({ dialogTitle }),
    setDialogDescription: (dialogDescription) => set({ dialogDescription }),

    setDialog: (data) => set({
      dialogOpen: data.open,
      dialogTitle:data.title,
      dialogDescription:data.description,
    }),

  }))
);


export const useDialogStore = createSelectors(dialogStore);