// import { NextRequest, NextResponse } from "next/server";
// import { supabase } from '@/db/supabaseClient';
// import withAuth from '@/lib/withAuth';

// export const POST = withAuth(async (req:NextRequest) => {

//    const formData = await req.formData();
//    const file = formData.get("file") as Blob | null;

//    if (!file) {
//       return NextResponse.json({ error: "File blob is required." }, { status: 400 });
//    }

//    try {
//    const { data, error } = await supabase
//       .storage
//       .from('images')
//       .upload(file.name, file);

//       return NextResponse.json({ fileUrl: data });
//    }
//    catch (e) {
//       console.error("Error while trying to upload a file\n", e);
//       return NextResponse.json(
//          { error: "Something went wrong." },
//          { status: 500 }
//       );
//    }
// }, ['admin']);


