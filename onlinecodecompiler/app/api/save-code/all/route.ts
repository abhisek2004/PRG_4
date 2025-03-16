import prisma from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userID = searchParams.get("userID");

    if (!userID) {
      return NextResponse.json(
        { message: "userID is required" },
        { status: 400 }
      );
    }

    const codes = await prisma.code.findMany({
      where: {
        userId: userID,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      message: "Codes retrieved successfully",
      codes,
    });

  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to retrieve codes",
        error: error.message,
      },
      { status: 500 }
    );
  }
}