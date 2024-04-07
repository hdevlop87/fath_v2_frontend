import { NextResponse } from 'next/server';
import { prepareSaleData } from '@/controllers/documentController';
import { generateDocument } from '@/controllers/documentController';
import withAuth from '@/lib/withAuth';

export const POST = withAuth(async (req) => {

    try {

        const preparedData = await prepareSaleData(req);
        const docBuffer = generateDocument(preparedData);

        return new NextResponse(docBuffer, {
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'Content-Disposition': 'attachment; filename=generated.docx'
            }
        });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }

}, ['admin']);
