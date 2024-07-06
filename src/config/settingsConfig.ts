// config/settingsConfig.js
import { z } from 'zod';

export const settingsSchema = z.object({
    appName: z.string().min(1, 'Website Name is required'),
    appLogo: z.string(),
    timeZone: z.string(),
    dateFormat: z.string(),
});

export const settingsConfig = {
    schema: settingsSchema,

    defaultValues: {
        appName: '',
        appLogo: null,
        timeZone: 'UTC',
        dateFormat: 'MM/DD/YYYY',
    },

    fields: [
        {
            type: 'text',
            name: 'appName',
            label: 'settings.appNameLabel',
            placeholder: 'settings.appNamePlaceholder'
        },
        {
            type: 'file',
            name: 'appLogo',
            label: 'settings.appLogoLabel',
            placeholder: 'settings.appLogoPlaceholder'
        },
        {
            type: 'select',
            name: 'timeZone',
            label: 'settings.timeZoneLabel',
            placeholder: 'settings.timeZonePlaceholder',
            items: [
                { value: 'UTC', label: 'UTC' },
                { value: 'GMT', label: 'GMT' },
                { value: 'EST', label: 'Eastern Standard Time (EST)' },
                { value: 'PST', label: 'Pacific Standard Time (PST)' },
            ]
        },
        {
            type: 'select',
            name: 'dateFormat',
            label: 'settings.dateFormatLabel',
            placeholder: 'settings.dateFormatPlaceholder',
            items: [
                { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
            ]
        },
    ],
};

export type SettingsType = z.infer<typeof settingsSchema>;
