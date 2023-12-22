import prismadb from "@/lib/prismadb";
import { NextApiResponse, NextApiRequest } from "next";
import { getSession } from "next-auth/react";

export default async function favourites(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).end();
  }
  try {
    const session = await getSession({ req });
    if (!session?.user?.email) {
      res.status(404).send({ message: "Email not found" });
    }
    const user = await prismadb.user.findUnique({
      where: {
        email: session?.user?.email || "",
      },
    });
    if (!user) {
      res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ user });
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
