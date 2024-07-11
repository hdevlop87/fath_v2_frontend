import * as z from "zod";
import { createExpense, updateExpense, deleteExpense, bulkAddExpenses } from '@/services/expenseApi'

const statusesFilter = [
  {
    value: "All",
    label: "status.all",
  },
  {
    value: "Permits_and_Authorizations",
    label: "expense.type.Permits_and_Authorizations",
  },
  {
    value: "Development_Work",
    label: "expense.type.Development_Work",
  },
  {
    value: "Marketing_and_Advertising",
    label: "expense.type.Marketing_and_Advertising",
  },
  {
    value: "Property_Taxes_and_Duties",
    label: "expense.type.Property_Taxes_and_Duties",
  },
  {
    value: "Labor",
    label: "expense.type.Labor",
  },
  {
    value: "Miscellaneous",
    label: "expense.type.Miscellaneous",
  },
]

export const zodInputStringPipe = (zodPipe) =>
  z
    .string()
    .transform((value) => (value === '' ? null : value))
    .nullable()
    .refine((value) => value === null || !isNaN(Number(value)), {
      message: 'Nombre Invalide',
    })
    .transform((value) => (value === null ? 0 : Number(value)))
    .pipe(zodPipe);

export const expenseConfig = {

  schema: z.object({
    expenseId: z.number().optional(),
    amount: zodInputStringPipe(z.number().positive('Le Montant doit être supérieur à 0')),
    date: z.any({ required_error: "A date of payment is required." }),
    beneficiary: z.string().optional(),
    type: z.string(),
    method: z.string().trim().min(1, { message: "La méthode de paiement est obligatoire." }),
    reference: z.string().optional(),
    receipt: z.any().optional(),
    notes: z.string().optional(),
  }),

  fields: [
    {
      "type": "text",
      "name": "amount",
      "placeholder": "payment.amountPlaceholder",
      "label": "payment.amountLabel"
    },
    {
      "type": "text",
      "name": "beneficiary",
      "placeholder": "expense.beneficiaryPlaceholder",
      "label": "expense.beneficiaryLabel"
    },
    {
      "type": "date",
      "name": "date",
      "placeholder": "payment.datePlaceholder",
      "label": "payment.dateLabel"
    },
    {
      "type": "select",
      "name": "type",
      "placeholder": "expense.typePlaceholder",
      "label": "expense.typeLabel",
      "items": [
        {
          "label": "expense.type.Permits_and_Authorizations",
          "value": "Permits_and_Authorizations"
        },
        {
          "label": "expense.type.Development_Work",
          "value": "Development_Work"
        },
        {
          "label": "expense.type.Marketing_and_Advertising",
          "value": "Marketing_and_Advertising"
        },
        {
          "label": "expense.type.Property_Taxes_and_Duties",
          "value": "Property_Taxes_and_Duties"
        },
        {
          "label": "expense.type.Labor",
          "value": "Labor"
        },
        {
          "label": "expense.type.Miscellaneous",
          "value": "Miscellaneous"
        }
      ]
    },
    {
      "type": "select",
      "name": "method",
      "placeholder": "payment.methodPlaceholder",
      "label": "payment.methodLabel",
      "items": [
        "expense.paymentMethods.CreditCard",
        "expense.paymentMethods.BankTransfer",
        "expense.paymentMethods.Espece",
        "expense.paymentMethods.Cheque",
      ]
    },
    {
      "type": "text",
      "name": "reference",
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
    beneficiary: "",
    method: "",
    type: "",
    reference: "",
    receipt: "",
    notes: ""
  },

  filters: [
    {
      name: "beneficiary",
      type: "text",
      placeHolder: 'expense.beneficiaryPlaceholder'
    },
    {
      name: "type",
      type: "select",
      items: statusesFilter,
      placeHolder: 'expense.typePlaceholder'
    }
  ],

  mutationConfig: {
    queryKey: 'expenses',
    apiMethods: {
      delete: deleteExpense,
      create: createExpense,
      update: updateExpense,
      upload: bulkAddExpenses
    }
  },

  target: 'Expense'
};

export type ExpenseType = z.infer<typeof expenseConfig.schema>;
