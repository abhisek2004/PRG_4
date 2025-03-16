import { sendContactUsEmail } from "@/helpers/sendContactUsEmail";
import { createResponse } from "@/helpers/responseHelper";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, message } = await request.json();
    await sendContactUsEmail(firstName, lastName, email, message);

    return createResponse(true, "Contact us email sent successfully", 200);

  } catch (error: any) {
    return createResponse(false, error.message, 500);
  }
}