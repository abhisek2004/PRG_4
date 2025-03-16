import { NextResponse } from "next/server";

type MessageType = string | any[] | object;

export function createResponse(success: boolean, message: MessageType, status: number) {
  return NextResponse.json(
    {
      success,
      message
    },
    {
      status
    }
  );
}