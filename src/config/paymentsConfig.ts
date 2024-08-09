import * as z from "zod";
import { createPayment, updatePayment, deletePayment,bulkAddPayments } from '@/services/paymentApi';

const statusesFilter = [
  {
    value: "All",
    label: "status.all",
 },
  {
     value: "Pending",
     label: "status.pending",
  },
  {
     value: "Verified",
     label: "status.verified",
  },
  {
     value: "Failed",
     label: "status.failed",
  },
]

export const zodInputStringPipe = (zodPipe) =>
  z
    .any()
    .transform((value) => (value === '' ? null : value))
    .nullable()
    .refine((value) => value === null || !isNaN(Number(value)), {
      message: 'Nombre Invalide',
    })
    .transform((value) => (value === null ? 0 : Number(value)))
    .pipe(zodPipe);

const baseSchema = z.object({
  paymentId: z.any().optional(),
  lotRef: z.string().optional(),
  amount:  zodInputStringPipe(z.number().positive('Le Montant doit être supérieur à 0')),
  date: z.any({ required_error: "A date of payment is required." }),
  method: z.string().trim().min(1, { message: "La méthode de paiement est obligatoire." }),
  paymentReference: z.string().optional(),
  receipt: z.any(),
  notes: z.string().optional()
});

export const paymentConfig = {

  baseSchema,

  fields: [
    {
      "type": "number",
      "name": "amount",
      "placeholder": "payment.amountPlaceholder",
      "label": "payment.amountLabel"
    },
    {
      "type": "date",
      "name": "date",
      "placeholder": "payment.datePlaceholder",
      "label": "payment.dateLabel"
    },
    {
      "type": "select",
      "name": "method",
      "placeholder": "payment.methodPlaceholder",
      "label": "payment.methodLabel",
      "items": [
        "CreditCard",
        "BankTransfer",
        "Espece",
        "Cheque"
      ]
    },
    {
      "type": "text",
      "name": "paymentReference",
      "placeholder": "payment.referencePlaceholder",
      "label": "payment.referenceLabel"
    },
    {
      "type": "file",
      "name": "receipt",
      "placeholder": "payment.receiptPlaceholder",
      "label": "payment.receiptLabel"
    },
    {
      "type": "textarea",
      "name": "notes",
      "placeholder": "payment.notesPlaceholder",
      "label": "payment.notesLabel"
    }
  ],

  defaultValues: {
    amount: "",
    date: "",
    method: "",
    paymentReference:"",
    receipt: "",
    notes: ""
  },

  filters: [
    {
      name: "status",
      type: "select",
      items: statusesFilter,
      placeHolder: 'payment.statusLabel'
    }
  ],
  mutationConfig: {
    queryKey: 'payments',
    apiMethods: {
      delete: deletePayment,
      create: createPayment,
      update: updatePayment,
      upload:bulkAddPayments
    },
  },

  target: 'Payment',
  mobileColumns : ["amount", "date","status", "actions"]
};

export type PaymentType = z.infer<typeof paymentConfig.baseSchema>;
