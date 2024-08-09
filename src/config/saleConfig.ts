import * as z from "zod";
import { createSale, updateSale, deleteSale, bulkAddSales } from '@/services/saleApi';

const statusesFilter = [
   {
      value: "All",
      label: "status.all",
   },
   {
      value: "Initiated",
      label: "status.initiated",
   },
   {
      value: "Ongoing",
      label: "status.ongoing",
   },
   {
      value: "Completed",
      label: "status.completed",
   },
   {
      value: "Canceled",
      label: "status.canceled",
   },
]

export const saleConfig = { 

   schema: z.object({
      saleId: z.any().optional(),
      lotRef: z.string().trim().min(1, { message: "lotRef est obligatoire." }),
      customerId: z.any().optional(),
      pricePerM2: z.string().min(1, { message: 'price cannot be empty.' }),
      date: z.any({required_error: "A date of sale is required."}),
      status: z.string().default("Initiated").optional(),
      isActif: z.any().optional(),
   }),

   fields: [
      {
         "type": "select",
         "name": "lotRef",
         "placeholder": "sale.lotRefPlaceholder",
         "label": "sale.lotRefLabel",
         "items": []
       },
       {
         "type": "select",
         "name": "customerId",
         "placeholder": "sale.customerNamePlaceholder",
         "label": "sale.customerNameLabel",
         "items": []
       },
       {
         "type": "text",
         "name": "pricePerM2",
         "placeholder": "sale.pricePerM2Placeholder",
         "label": "sale.pricePerM2Label"
       },
       {
         "type": "date",
         "name": "date",
         "placeholder": "sale.datePlaceholder",
         "label": "sale.dateLabel"
       },
       {
         "type": "switch",
         "name": "isActif",
         "placeholder": "sale.venteActif",
         "label": ""
       }
   
   ],

   defaultValues: {
      lotRef: "",
      pricePerM2: "",
      date:"",
      isActif: true,
   },

   queryKey: "sales",
   filters: [
      {
         name: "customerName",
         type: "text",
         placeHolder: 'customer.filterByCustomer'
      },
      {
         name: "status",
         type: "select",
         items: statusesFilter,
         placeHolder: 'sale.statusLabel'
      }
   ],
   mutationConfig: {
      queryKey: 'sales',
      apiMethods: {
         delete: deleteSale,
         create: createSale,
         update: updateSale,
         upload:bulkAddSales
      },
   },
   target: 'Sale',
   mobileColumns : ["customerName", "lotRef", "status", "actions"]
};

export type SaleType = z.infer<typeof saleConfig.schema>;
