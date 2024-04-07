import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req, res) => {
    const formData = await req.formData();
    const file = formData.get("file");
    
    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    try {
        const destinationPath = path.join(process.cwd(), "external_storage/gallery", file.name);
        await writeFile(destinationPath, buffer);
        
        return NextResponse.json({ Message: "Success", status: 201 });
    } catch (error) {
        return NextResponse.json({ Message: "Failed", status: 500 });
    }
};
