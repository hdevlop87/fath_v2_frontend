import { formatNumber, formatDate } from '@/lib/utils';
import { format } from 'date-fns';
import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import path from 'path';

export const prepareSaleData = async (req) => {
   const saleData = await req.json();
   const {
      customer: { firstName, lastName, phone, email, address, CIN },
      lot: { lotRef, size, zoningCode },
      sale: { totalPrice, pricePerM2 },
      payments
   } = saleData;

   const sortedPayments = payments.sort((a, b) => new Date(a.date) - new Date(b.date));

   const newPayments = sortedPayments.map((payment, index) => ({
      index: (index + 1),
      amount: formatNumber(payment.amount),
      date: formatDate(payment.date),
      paymentReference: payment.paymentReference
   }));

   return {
      ...{
         firstName, lastName, phone, email, address, CIN,
         lotRef,
         size: formatNumber(size),
         zoningCode,
         totalPrice: formatNumber(totalPrice),
         pricePerM2: formatNumber(pricePerM2),
         timeStamp: format(new Date(), 'yyyy-MM-dd')
      },
      payments: newPayments
   };
};



export const generateDocument = (data) => {
   const filePath = path.join(process.cwd(), 'public', 'agreement.docx');
   const content = fs.readFileSync(filePath, 'binary');
   const zip = new PizZip(content);
   const doc = new Docxtemplater();
   doc.loadZip(zip);

   doc.setData(data); 
   doc.render();

   return doc.getZip().generate({ type: 'nodebuffer' });
};