import prisma from "@/lib/dbConnect";
import { createResponse } from "@/helpers/responseHelper";

export async function POST(request: Request) {
  try {
    const { userID, code } = await request.json();
    const decodeUserID = decodeURIComponent(userID);

    const user = await prisma.user.findUnique({
      where: { id: decodeUserID }
    });

    if (!user) {
      return createResponse(false, "User not found", 404);
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpire = new Date(user.verifyCodeExpiry!!) > new Date();

    if (isCodeValid && isCodeNotExpire) {
      await prisma.user.update({
        where: { id: decodeUserID },
        data: { isVerified: true }
      });
      return createResponse(true, 'Account Verified successfully', 200);
    } else if (!isCodeNotExpire) {
      return createResponse(false, 'Verification code has expired. Please sign up again to get a new code.', 400);
    } else {
      return createResponse(false, 'Incorrect verification code', 200);
    }

  } catch (error) {
    return createResponse(false, 'Error verifying user', 500);
  }
}
