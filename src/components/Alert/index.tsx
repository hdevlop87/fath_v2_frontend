import { Alert } from "@/components/ui/alert"
import { Icon } from '@iconify-icon/react';

interface AlertProps {
  variant: "loading" |"success" | "error" | "default";
  msg: string;
  show: boolean;
}


export default function AlertDestructive({ variant = 'error', msg, show }: AlertProps) {
  if (!show) return null;
  const icon = variant === 'error' ? "mdi:alert-outline" : "mdi:success-bold";

  return (
    <Alert variant={variant} className="flex justify-center items-center w-full gap-2">
      <Icon icon={icon} width={20} />
      <h3>{msg}</h3>
    </Alert>
  )
}
