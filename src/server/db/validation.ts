import Joi from 'joi'

const userSchema = Joi.object({
    userID: Joi.string().required(),
    name: Joi.string().required(),
    role: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const lotSchema = Joi.object({
    lotRef: Joi.string().required(),
    status: Joi.string().valid('Available', 'Reserved', 'Sold').required(), // Replace with your actual LotStatus values
    size: Joi.number().required(),
    price: Joi.number().optional(),
    address: Joi.string().allow('').optional(),
    zoningCode: Joi.string().max(50).required()
});

const customerSchema = Joi.object({
    customerID: Joi.string(),
    firstName: Joi.string().max(100).required(),
    lastName: Joi.string().max(100).required(),
    phone: Joi.string().required(),
    email: Joi.string().email().max(100).required(),
    address: Joi.string().allow('').optional(),
    CIN: Joi.string().max(50).required(),
    checkOnly: Joi.boolean().allow('').optional()
});

const saleSchema = Joi.object({
    lotRef: Joi.any().required().messages({ 'string.empty': "Lot Ref is required." }),
    customerID: Joi.string().guid({ version: 'uuidv4' }).required().messages({ 'string.guid': "Customer ID must be a valid UUID." }),
    pricePerM2: Joi.number().required().messages({ 'number.base': "Price per m2 is required." }),
    totalPrice: Joi.number().optional().messages({ 'number.base': "Total Price must be a number." }),
    balanceDue: Joi.number().optional().messages({ 'number.base': "Balance Due must be a number." }),
    paidPercentage: Joi.number().optional().messages({ 'number.base': "Percentage Due must be a number." }),
    date: Joi.date().optional().messages({ 'date.base': "Invalid date format." }),
    status: Joi.string().valid('Initiated', 'Ongoing', 'Completed', 'Canceled').default('Initiated').messages({ 'string.valid': "Invalid Sale Status." }),
    notes: Joi.string().allow('').optional()
});

const paymentSchema = Joi.object({
    saleID: Joi.number().required(),
    amount: Joi.number().required(),
    date: Joi.date(),
    method: Joi.string().valid('Cheque', 'Espece', 'CreditCard', 'BankTransfer').required(),
    paymentReference: Joi.string().allow('').optional(),
    status: Joi.string().valid('Pending', 'Completed', 'Failed').default('Pending'),
    receipt: Joi.string().allow('').optional(),
    notes: Joi.string().allow('').optional()
});

const expenseSchema = Joi.object({
    expenseID: Joi.number(),
    amount: Joi.number().required(),
    beneficiary: Joi.string().allow('').optional(),
    date: Joi.date().default('now').required(),
    type: Joi.string().allow('').required(),
    paymentMethod: Joi.string().valid('Cheque', 'Espece', 'CreditCard', 'BankTransfer').required(),
    paymentReference: Joi.string().allow('').optional(),
    paymentImage: Joi.string().allow('').optional(),
    notes: Joi.string().allow('').optional(),
});

const schemas = {
    user: userSchema,
    lot: lotSchema,
    customer: customerSchema,
    sale: saleSchema,
    payment: paymentSchema,
    expense: expenseSchema
};

const validateSchema = async (schemaName, data) => {
    const schema = schemas[schemaName];
    if (!schema) {
        throw new Error(`No schema found for ${schemaName}`);
    }

    try {
        await schema.validateAsync(data);

    } catch (error) {
        if (error instanceof Joi.ValidationError) {
            throw new Error(error.details[0].message);
        } else {
            throw error;
        }
    }
};

export default validateSchema

