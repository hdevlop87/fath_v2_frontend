import { timestamp, pgTable, text, varchar, serial, numeric, primaryKey,integer, pgEnum, uuid, date } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const LotStatusEnum = pgEnum('LotStatus', ['Available', 'Reserved','Ongoing', 'Sold', 'Canceled']);
export const PaymentMethodEnum = pgEnum('PaymentMethod', ['Cheque', 'Espece', 'CreditCard', 'BankTransfer']);
export const SaleStatusEnum = pgEnum('SaleStatus', ['Initiated', 'Ongoing', 'Completed', 'Canceled']);
export const PaymentStatusEnum = pgEnum('PaymentStatus', ['Pending', 'Verified', 'Failed']);
export const ExpenseTypeEnum = pgEnum('ExpenseType', [
    'Permits_and_Authorizations', 
    'Development_Work',  
    'Marketing_and_Advertising', 
    'Property_Taxes_and_Duties', 
    'Labor', 
    'Miscellaneous'
]);

export const users = pgTable("users", {
    userID: uuid("userID").default(sql`uuid_generate_v4()`).primaryKey(),
    name: text("name"),
    username: text("username").notNull(),
    password: text("password"),
    role: text('role', { enum: ['admin', 'observer'] }).notNull(),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const lots = pgTable("lots", {
    lotID: serial("lotID").primaryKey(),
    lotRef: varchar("lotRef", { length: 15 }).unique().notNull(),
    status: LotStatusEnum("status").notNull(),
    size: numeric("size", { precision: 10, scale: 2 }).notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    address: text("address"),
    zoningCode: varchar("zoningCode", { length: 50 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const customers = pgTable("customers", {
    customerID: uuid("customerID").default(sql`uuid_generate_v4()`).primaryKey(),
    firstName: varchar("firstName", { length: 100 }).notNull(),
    lastName: varchar("lastName", { length: 100 }).notNull(),
    phone: varchar("phone", { length: 15 }).unique().notNull(),
    email: varchar("email", { length: 100 }).unique().notNull(),
    address: text("address"),
    CIN: varchar("CIN", { length: 50 }).unique().notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const sales = pgTable("sales", {
    saleID: serial("saleID").primaryKey(),
    lotID: integer("lotID").references(() => lots.lotID, { onDelete: 'cascade' }),
    customerID: uuid("customerID").notNull().references(() => customers.customerID, { onDelete: 'cascade' }),
    pricePerM2: numeric("pricePerM2", { precision: 10, scale: 2 }).notNull(),
    totalPrice: numeric("totalPrice", { precision: 10, scale: 2 }),
    balanceDue: numeric("balanceDue", { precision: 10, scale: 2 }),
    paidPercentage: numeric("paidPercentage", { precision: 10, scale: 2 }),
    date: date("date").defaultNow(),
    status: SaleStatusEnum("status").notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const payments = pgTable("payments", {
    paymentID: serial("paymentID").primaryKey(),
    saleID: integer("saleID").references(() => sales.saleID, { onDelete: 'cascade' }),
    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
    date: date("date").defaultNow(),
    method: PaymentMethodEnum("method").notNull(),
    paymentReference: text("paymentReference"),
    status: PaymentStatusEnum("status").default('Pending'),
    receipt: text("receipt"),
    notes: text("notes"),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const expenses = pgTable("expenses", {
    expenseID: serial("expenseID").primaryKey().notNull(),
    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
    beneficiary: text("beneficiary"),
    date: date("date").defaultNow(),
    type: ExpenseTypeEnum("type").notNull().default('Miscellaneous'), 
    paymentMethod: PaymentMethodEnum("paymentMethod").notNull(),
    paymentReference: text("paymentReference"),
    paymentImage: text("paymentImage"),
    notes: text("notes"),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});