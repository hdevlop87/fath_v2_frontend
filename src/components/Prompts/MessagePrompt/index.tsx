'use client';

import React from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { Label } from '@/components/ui/label';
import { useForm } from "react-hook-form";
import { usePromptStore } from '@/store/promptStore';

interface MessagePromptProps {
  target: string;
  handleSubmit: any;
}

const MessagePrompt: React.FC<MessagePromptProps> = ({ handleSubmit }) => {
  
  const t = useTranslations();

  const title = usePromptStore.use.title();
  const description = usePromptStore.use.description();
  const target = usePromptStore.use.target();

  const form = useForm({});

  return (
    <form id={`form-${target}`} onSubmit={form.handleSubmit(handleSubmit)} className="w-full h-full" autoComplete="off">
      <div className='flex flex-col gap-2 w-[450px]'>
        <Label className='text-lg font-semibold'>{title}</Label>
        <Label className='text-sm text-muted-foreground'>{description}</Label>
      </div>
    </form>
  );
};

export default MessagePrompt;
