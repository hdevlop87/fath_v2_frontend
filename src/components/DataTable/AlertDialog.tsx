"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useTranslations } from 'next-intl';
import useDialogStore from '@/store/dialogStore';

export default function AlertDialogDemo({ onConfirm }) {
  const t = useTranslations();
  const setAlertOpen = useDialogStore(state => state.setAlertOpen);

  return (
    <AlertDialog open={useDialogStore(state => state.alertOpen)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('alertDialog.title')}</AlertDialogTitle>
          <AlertDialogDescription>{t('alertDialog.description')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setAlertOpen(false)}>{t('button.cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{t('button.continue')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}