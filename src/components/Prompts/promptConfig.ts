import React, { useEffect } from 'react';

const renameAction = {
   component: React.lazy(() => import('@/components/Forms/renameForm')),
   title: 'Rename',
};

const deleteAction = {
   component: React.lazy(() => import('@/components/Prompts/MessagePrompt')),
   title: 'Delete',
};

const moveAction = {
   component: React.lazy(() => import('@/components/Forms/moveForm')),
   title: 'Move',
};

const csvUploadAction = {
   component: React.lazy(() => import('@/components/Forms/csvUploadForm')),
   title: 'Upload',
};

const promptConfig = {
   
   folder: {
      Create: {
         component: React.lazy(() => import('@/components/Forms/folderForm')),
      },
      Update: {
         component: React.lazy(() => import('@/components/Forms/folderForm')),
      },
      Upload: {
         component: React.lazy(() => import('@/components/Forms/FileUploadForm')),
      },
      Rename: renameAction,
      Delete: deleteAction,
      Move:moveAction,
   },

   file: {
      Create: {
         component: React.lazy(() => import('@/components/Forms/fileForm')),
      },
      Update: {
         component: React.lazy(() => import('@/components/Forms/fileForm')),
      },
      Upload: {
         component: React.lazy(() => import('@/components/Forms/FileUploadForm')),
      },
      Preview: {
         component: React.lazy(() => import('@/components/Prompts/PreviewPrompt')),
      },
      Rename: renameAction,
      Delete: deleteAction,
      Move:moveAction,
   },

   user: {
      Create: {
         component: React.lazy(() => import('@/components/Forms/userForm')),
      },
      Update: {
         component: React.lazy(() => import('@/components/Forms/userForm')),
      },
      Upload: {
         component: React.lazy(() => import('@/components/Forms/FileUploadForm')),
      },
      Preview: {
         component: React.lazy(() => import('@/components/Prompts/PreviewPrompt')),
      },
      Crop: {
         component: React.lazy(() => import('@/components/Forms/CropImageForm')),
      },
      Delete: deleteAction,
   },

   customer: {
      Create: {
         component: React.lazy(() => import('@/components/Forms/customerForm')),
      },
      Update: {
         component: React.lazy(() => import('@/components/Forms/customerForm')),
      },
      Preview: {
         component: React.lazy(() => import('@/components/Prompts/PreviewPrompt')),
      },
      Upload: csvUploadAction,
      Delete: deleteAction,
   },

   lot: {
      Create: {
         component: React.lazy(() => import('@/components/Forms/lotForm')),
      },
      Update: {
         component: React.lazy(() => import('@/components/Forms/lotForm')),
      },
      Preview: {
         component: React.lazy(() => import('@/components/Prompts/PreviewPrompt')),
      },
      Upload: csvUploadAction,
      Delete: deleteAction,
   },

   expense: {
      Create: {
         component: React.lazy(() => import('@/components/Forms/expenseForm')),
      },
      Update: {
         component: React.lazy(() => import('@/components/Forms/expenseForm')),
      },
      Upload: {
         component: React.lazy(() => import('@/components/Forms/FileUploadForm')),
      },
      Preview: {
         component: React.lazy(() => import('@/components/Prompts/PreviewPrompt')),
      },
      Delete: deleteAction,
   },

   wizardSale: {
      Create: {
         component: React.lazy(() => import('@/components/Forms/wizardSaleForm')),
      },
      Update: {
         component: React.lazy(() => import('@/components/Forms/wizardSaleForm')),
      },
      Preview: {
         component: React.lazy(() => import('@/components/Prompts/PreviewPrompt')),
      },
      Upload: csvUploadAction,
      Delete: deleteAction,
   },

   sale: {
      Update: {
         component: React.lazy(() => import('@/components/Forms/saleForm')),
      },
      Preview: {
         component: React.lazy(() => import('@/components/Prompts/PreviewPrompt')),
      },
      Upload: csvUploadAction,
   },

   payment: {
      Create: {
         component: React.lazy(() => import('@/components/Forms/paymentForm')),
      },
      Update: {
         component: React.lazy(() => import('@/components/Forms/paymentForm')),
      },
      Preview: {
         component: React.lazy(() => import('@/components/Prompts/PreviewPrompt')),
      },
      Upload: csvUploadAction,
      Delete: deleteAction,
   }
}

export default promptConfig;
