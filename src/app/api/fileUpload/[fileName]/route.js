import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from 'fs';

export const GET = async (req, { params }) => {
    const fileName = params.fileName;
    const filePath = path.join(process.cwd(), "external_storage/gallery", fileName);
    try {
        const fileContent = await fs.readFile(filePath);
        return new NextResponse(fileContent, {
            headers: {
                'Content-Type': 'application/octet-stream',
            },
            status: 200
        });
    } catch (error) {
        console.log("Error occurred ", error);
        return NextResponse.json({ Message: "File not found" }, { status: 404 });
    }
};
