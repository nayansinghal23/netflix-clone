import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import { getSession } from "next-auth/react";

export default async function current(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).end();
  }
  try {
    const sessions = await getSession({
      req,
    });
    if (!sessions?.user?.email) {
      res.status(404).send({ message: "Email Unavailable" });
    }
    const currentUser = await prismadb.user.findUnique({
      where: {
        email: sessions?.user?.email || "",
      },
    });
    if (!currentUser) {
      res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ currentUser });
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
