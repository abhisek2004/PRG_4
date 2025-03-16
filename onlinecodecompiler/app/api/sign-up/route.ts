import prisma from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';



export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();

    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashPassword = await bcrypt.hash(password, 10);
    let userID;

    if (existingUserByEmail) {

      if (existingUserByEmail.isVerified) {
        return NextResponse.json({
          success: false,
          message: "User already exists with this email"
        }, { status: 400 })
      }
      else {
        const UpdateExistingUserByEmail = await prisma.user.update({
          where: { email: email },
          data: {
            password: hashPassword,
            verifyCode: verifyCode,
            verifyCodeExpiry: new Date(Date.now() + 3600000)
          }
        })
        userID = UpdateExistingUserByEmail.id
      }
    }
    else {
      //saving new user
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
          verifyCode: verifyCode,
          verifyCodeExpiry: expiryDate
        },
      });
      userID = newUser.id
    }

    const emailResponse = await sendVerificationEmail(email, name, verifyCode)

    if (!emailResponse.success) {
      return NextResponse.json({
        success: false,
        message: emailResponse.message
      }, { status: 500 })
    }

    // Return a success response
    return NextResponse.json({
      success: true,
      userID,
      message: "User registered successfully. Please verify your email"
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      {
        success: false,
        message: "Error registering user"
      },
      {
        status: 500
      }
    )
  }
}
