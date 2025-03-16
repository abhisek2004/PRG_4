import prisma from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { filename, code, userID, language } = await request.json();
    // console.log(filename, code, userID, language);

    // Save the code to the database
    const savecode = await prisma.code.create({
      data: {
        fileName: filename,
        code: code,
        language: language,
        userId: userID,
      },
    });

    return NextResponse.json({
      message: "Code saved successfully",
      codeID: savecode.id,
    },{ status: 200 });

  } catch (error: any) {
    // console.error("Error saving code:", error);
    return NextResponse.json({
      message: "Failed to save code",
      error: error.message,
    }, { status: 500 });
  }
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
    
    const codeData = await prisma.code.findUnique({
      where: {
        id: codeID as string,
      },
    });
    // console.log(codeData)
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

export async function DELETE(request: Request) {
  try {
    // Extract userID from query parameters
    const { searchParams } = new URL(request.url);
    const codeID = searchParams.get("codeID");
    
    if (!codeID) {
      return NextResponse.json(
        { message: "codeID is required" },
        { status: 400 }
      );
    }

    // Fetch all codes for the given codeID
    const codeData = await prisma.code.delete({
      where: {
        id: codeID as string,
      },
    });
    // console.log(codeData)
    if (!codeData) {
      // return request.status(404).json({ message: 'Code not found' });
      return NextResponse.json(
        { message: "Code not found" },
        { status: 404 }
      );
    }

    // return request.status(200).json(codeData);
    return NextResponse.json(
      {
        message: "Code is Deleted",
        codeData: codeData
      },
      { status: 200 }
    );

  } catch (error: any) {
    // console.error("Error retrieving codes:", error);
    return NextResponse.json(
      {
        message: "Failed to delete codes",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { codeID, code, filename } = await request.json();

    if (!codeID) {
      return NextResponse.json(
        { message: "codeID is required" },
        { status: 400 }
      );
    }

    if(filename){
      
      const codeData = await prisma.code.update({
        where: {
          id: codeID as string,
        },
        data:{
          fileName:filename
        }
      });

      if (!codeData) {
        return NextResponse.json(
          { message: "filename not update" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          message: "filename is updated",
        },
        { status: 200 }
      );
    }

    

    const codeData = await prisma.code.update({
      where: {
        id: codeID as string,
      },
      data:{
        code:code
      }
    });


    if (!codeData) {
      return NextResponse.json(
        { message: "Code not update" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      {
        message: "Code is updated",
      },
      { status: 200 }
    );

  } catch (error: any) {
    // console.error("Error retrieving codes:", error);
    return NextResponse.json(
      {
        message: "Failed to delete codes",
        error: error.message,
      },
      { status: 500 }
    );
  }
}