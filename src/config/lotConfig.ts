import * as z from "zod";
import { createLot, updateLot, deleteLot, bulkAddLots } from '@/services/lotApi';

const statusesFilter = [
    {
        value: "All",
        label: "status.all",
     },
    {
        value: "Available",
        label: "status.available",
    },
    {
        value: "Reserved",
        label: "status.reserved",
    },
    {
        value: "Ongoing",
        label: "status.ongoing",
    },
    {
        value: "Sold",
        label: "status.sold",
    },
    {
        value: "Canceled",
        label: "status.canceled",
    },
]

export const lotConfig = {

    schema: z.object({
        lotId: z.any().optional(),
        lotRef: z.string().trim().min(1, { message: "lotRef est obligatoire." }),
        status: z.string().trim().min(1, { message: "Le statut est obligatoire." }),
        size: z.string().trim().min(1, { message: "La taille est obligatoire." }),
        pricePerM2: z.string().trim().min(1, { message: "La prix par m2 est obligatoire." }),
        zoningCode: z.string().trim().min(1, { message: "Le code de zonage est obligatoire." }),
        description: z.string().optional(),
    }),

    fields: [
        {
            "type": "text",
            "name": "lotRef",
            "placeholder": "lot.lotRefPlaceholder",
            "label": "lot.lotRefLabel"
        },
        {
            "type": "select",
            "name": "status",
            "placeholder": "lot.statusPlaceholder",
            "label": "lot.statusLabel",
            "items": [
                {
                    "value": "Available",
                    "label": "status.available"
                },
                {
                    "value": "Reserved",
                    "label": "status.reserved"
                },
                {
                    "value": "Sold",
                    "label": "status.sold"
                }
            ]
        },
        {
            "type": "text",
            "name": "size",
            "placeholder": "lot.sizePlaceholder",
            "label": "lot.sizeLabel"
        },
        {
            "type": "text",
            "name": "pricePerM2",
            "placeholder": "lot.pricePerM2Placeholder",
            "label": "lot.pricePerM2Label"
        },
        {
            "type": "select",
            "name": "zoningCode",
            "placeholder": "lot.zoningCodePlaceholder",
            "label": "lot.zoningCodeLabel",
            "items": [
                "lot.zoningCodes.EQ1",
                "lot.zoningCodes.R+2",
                "lot.zoningCodes.R+2-C-",
                "lot.zoningCodes.EQ2",
                "lot.zoningCodes.R+3",
                "lot.zoningCodes.R+4"
            ]
        },
        {
            "type": "text",
            "name": "description",
            "placeholder": "lot.descPlaceholder",
            "label": "lot.descLabel"
        },
    ],

    defaultValues: {
        lotRef: "",
        status: 'Available',
        size: '10000',
        pricePerM2: '1000',
        zoningCode: 'EQ1',
        description: ""
    },

    queryKey: "lots",
    filters: [
        {
            name: "status",
            type: "select",
            items: statusesFilter,
            placeHolder: 'lot.statusLabel'
        }
    ],
    mutationConfig: {
        queryKey: 'lots',
        apiMethods: {
            delete: deleteLot,
            create: createLot,
            update: updateLot,
            upload: bulkAddLots
        },
    },
    target: 'Lot'
};

export type LotType = z.infer<typeof lotConfig.schema>;
