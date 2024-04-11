import prisma from "@/app/lib/prismadb";
import bcrypt from "bcrypt";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    if (!name || !email || !password) {
      return new NextResponse("Missing Data", { status: 400 });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashPassword: hashPassword,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
