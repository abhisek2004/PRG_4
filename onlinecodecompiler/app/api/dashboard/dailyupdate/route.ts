import { createResponse } from "@/helpers/responseHelper";
import prisma from "@/lib/dbConnect";

export async function POST(request: Request) {
  try {

    const { userID } = await request.json();
    const dailyStatus = await prisma.dailyActivity.create({
      data: {
        userId: userID,
        isActive: true
      }
    })
    return createResponse(true, "Daily Status Updated", 200);

  } catch (error) {
    console.error(error)
    return createResponse(false, "Failed to update daily status", 400);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userID = searchParams.get("userID");

    if (!userID) {
      return createResponse(false, "userID is required", 400);
    }

    const UserDailyStatus = await prisma.dailyActivity.findMany({
      where: {
        userId: userID
      }
    })

    const today = new Date();
    const transformedValues = UserDailyStatus.map((item: any) => ({
      date: item.date.toISOString().slice(0, 10), // Format to YYYY-MM-DD
      count: 1,
    }));
    const startDate = new Date(today.getFullYear(), 0, 1);
    const endDate = new Date(today.getFullYear() + 1, 1, 1);
    const allDates = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const formattedDate = d.toISOString().slice(0, 10); // Format to YYYY-MM-DD
      const existingEntry = transformedValues.find(
        (item: any) => item.date === formattedDate // Compare in the same format
      );
      allDates.push({
        date: formattedDate,
        count: existingEntry ? existingEntry.count : 0,
      });
    }

    return createResponse(true, allDates, 200);

  } catch (error) {
    console.error(error)
    return createResponse(false, "Failed to fetch dailyUpdates", 400);
  }
}