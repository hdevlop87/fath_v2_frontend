import * as z from "zod";
import { createFile, updateFile, deleteFile, downloadFile } from '@/services/fileApi';

export const fileConfig = {
    schema: z.object({
        id: z.any().optional(),
        fieldname: z.any().optional(),
        filename: z.any().optional(),
        mimetype: z.any().optional(),
        name: z.any().optional(),
        destination: z.any().optional(),
        size: z.any().optional(),
        type: z.any().optional(),
        icon: z.any().optional(),
        path: z.any().optional(),
        encoding: z.any().optional(),
        password: z.any().optional(),
        isLocked: z.any().optional(),
        parentId: z.any().optional(),
        updatedAt: z.any().optional(),
    }),

    fields: [
        {
            "type": "text",
            "name": "name",
            "placeholder": "file.fileNamePlaceholder",
            "label": "file.fileNameLabel",
        },
    ],

    defaultValues: {
        name: '',
    },

    filters: [
        {
            name: "name",
            type: "text",
            placeHolder: 'file.filterByName'
        }
    ],

    mutationConfig: {
        queryKey: "files",
        apiMethods: {
            delete: deleteFile,
            create: createFile,
            update: updateFile,
            download: downloadFile,
        },
    },

    possibleActions: ['Preview', 'Delete', 'Rename', 'Download', 'Move'],

    target: 'File'
};

export type FileType = z.infer<typeof fileConfig.schema>; 

