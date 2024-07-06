'use client';

import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { usePromptStore } from '@/store/promptStore';
import { Button } from '@/components/ui/button';
import SubmitButton from '@/components/loadingButton';
import { useTranslations } from '@/hooks/useTranslations';
import { useLoaderStore } from '@/store/loaderStore';
import promptConfig from './promptConfig';
import MessagePrompt from './MessagePrompt'

const PromptLayout = () => {

	const t = useTranslations();
	const actionName = usePromptStore.use.actionName();
	const target = usePromptStore.use.target();
	const onSubmit = usePromptStore.use.onSubmit();
	const isOpen = usePromptStore.use.isOpen();
	const closePrompt = usePromptStore.use.closePrompt();
	const queryLoading = useLoaderStore.use.queryLoading();
	const showHeader = usePromptStore.use.showHeader();
	const submitButtonVariant = usePromptStore.use.submitButtonVariant();
	const showButtons = usePromptStore.use.showButtons();
	const showCloseIcon = usePromptStore.use.showCloseIcon();
	const cleanAction = usePromptStore.use.cleanAction();
	const promptType = usePromptStore.use.promptType();
	const selectedModal = promptConfig[target]?.[actionName];
	const SelectedComponent = selectedModal?.component;

	const handleClose = () => {
		closePrompt();
		cleanAction(); 
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className='bg-card flex flex-col items-center gap-8' showCloseIcon={showCloseIcon}>
				{
					showHeader &&
					<DialogHeader>
						<DialogTitle className='font-medium'>{t(`prompts.${actionName}`)} {t(`target.${target}`)}</DialogTitle>
					</DialogHeader>
				}

				{promptType === 'form' && SelectedComponent ?
					<SelectedComponent
						target={target}
						handleSubmit={onSubmit}
					/> :
					<MessagePrompt
						target={target}
						handleSubmit={onSubmit}
					/>
				}


				{showButtons && (
					<div className='flex gap-4 w-full justify-end'>
						<Button variant='outline' onClick={handleClose}>{t('button.cancel')}</Button>
						<SubmitButton
							submitText={t('button.submit')}
							loadingText={t('button.pleaseWait')}
							className={`gap-1 hover:bg-primary-hover`}
							loading={queryLoading}
							form={`form-${target}`}
							variant={submitButtonVariant}
						/>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default PromptLayout;
