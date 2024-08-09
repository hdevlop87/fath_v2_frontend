import * as z from "zod";
import { createFolder, updateFolder, deleteFolder } from '@/services/folderApi';

export const folderConfig = {

    schema: z.object({
        id: z.any().optional(),
        name: z.string().min(1, { message: "Folder name is required" }),
        type: z.any().optional(),
        icon: z.any().optional(),
        maxSize: z.any().optional(),
        password: z.any().optional(),
        filesCount: z.any().optional(),
        size: z.any().optional(),
        parentId: z.any().optional(),
        path: z.any().optional(),
        isLocked: z.any().optional(),
        updatedAt: z.any().optional(),
    }),

    fields: [
        {
            "type": "text",
            "name": "name",
            "placeholder": "folder.folderNamePlaceholder",
            "label": "folder.folderNameLabel",
        },
        {
            "type": "text",
            "name": "maxSize",
            "placeholder": "folder.maxSizePlaceholder",
            "label": "folder.maxSizeLabel",
        }
    ],

    defaultValues: {
        name: '',
        maxSize: '20',
        type:'folder'
    },

    filters: [
        {
            name: "name",
            type: "text",
            placeHolder: 'folder.filterByFolderName'
        }
    ],

    mutationConfig: {
        queryKey: "folders",
        apiMethods: {
            delete: deleteFolder,
            create: createFolder,
            update: updateFolder,
        },
    }, 

    getPossibleActions: ['Star','Delete', 'Update', 'Download', 'Move'],
    target: 'Folder'

};

export type FolderType = z.infer<typeof folderConfig.schema>; 
