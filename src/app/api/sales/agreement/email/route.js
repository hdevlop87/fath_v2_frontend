import { NextResponse } from 'next/server';
import { prepareSaleData } from '@/controllers/documentController';
import { generateDocument } from '@/controllers/documentController';
import nodemailer from 'nodemailer';
import withAuth from '@/lib/withAuth';

export const POST = withAuth(async (req) => {

    try {
        const preparedData = await prepareSaleData(req);
        const docBuffer = generateDocument(preparedData);

        let { firstName, lastName } = preparedData;
        let fileName = `${firstName}_${lastName}.docx`;

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'lotissement.sb@gmail.com',
                pass: 'bvhmjhtzktsqrwcs',
            },
        });

        let mailOptions = {
            from: 'lotissement.sb@gmail.com',
            to: 'lotissement.sb@gmail.com',
            subject: 'Compromis de vente',
            text: `Veuillez trouver ci-joint le fichier du compromis de vente de Mr (Mme):  ${firstName} ${lastName}`,
            attachments: [
                {
                    filename: fileName,
                    content: docBuffer,
                },
            ],
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'sale.toast.emailSentSuccess' }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }

}, ['admin']);
