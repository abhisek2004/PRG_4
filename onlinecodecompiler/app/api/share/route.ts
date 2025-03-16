import prisma from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
  const {code, language} = await request.json();

  const shareID = await prisma.shareCode.create({
    data:{
      code:btoa(code),
      language:language
    }
  })

  return NextResponse.json({
    success: true,
    ShareID: shareID.id
  }, { status: 200 })
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const codeID = searchParams.get("codeID");
    
    if (!codeID) {
      return NextResponse.json(
        { message: "codeID is required" },
        { status: 400 }
      );
    }
    
    const codeData = await prisma.shareCode.findUnique({
      where: {
        id: codeID as string,
      },
    });
    
    if (!codeData) {
      return NextResponse.json(
        { message: "Code not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { codeData: codeData },
      { status: 200 }
    );

  } catch (error: any) {
    // console.error("Error retrieving codes:", error);
    return NextResponse.json(
      {
        message: "Failed to retrieve codes",
        error: error.message,
      },
      { status: 500 }
    );
  }
}