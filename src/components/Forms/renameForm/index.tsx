'use client';

import React from 'react';
import AutoInput from '@/components/AutoInput';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useTranslations } from '@/hooks/useTranslations';
import { usePromptStore } from '@/store/promptStore';


const renameSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1, { message: "Name is required" }),
});

export type RenameType = z.infer<typeof renameSchema>;

const RenameForm = ({ target, handleSubmit }) => {

	const t = useTranslations();
	const initialValues = usePromptStore.use.initialValues();

	const form = useForm<RenameType>({
		resolver: zodResolver(renameSchema),
		defaultValues: initialValues || { name: '' }
	});

	const onSubmit = (data) => {
		handleSubmit(data);
	};

	return (
		<div className='flex flex-col gap-4 w-[400px] '>
			<Form {...form}>
				<form id={`form-${target}`} onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full" autoComplete="off">
					<div className='flex w-full gap-6 h-full'>
						<div className='flex flex-col flex-1 space-y-6'>
							<FormField
								name="name"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<AutoInput
											type="text"
											placeholder={t('file.fileNamePlaceholder')}
											field={field}
											label={t('file.fileNameLabel')}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
}

export default RenameForm;
