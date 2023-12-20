import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end();
  }
  try {
    const { name, email, password } = req.body;
    const userExists = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      res.status(422).send({ message: "Email Present" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    res.status(200).send({ message: "NEW USER REGISTERED", user });
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
