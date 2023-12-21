import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).end();
  }
  try {
    const session = await getSession({
      req,
    });
    if (!session?.user?.email) {
      res.status(404).send({ message: "Email Unavailable" });
    }
    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session?.user?.email || "",
      },
    });
    if (!currentUser) {
      res.status(404).send({ message: "Email Unavailable" });
    }
    const movies = await prismadb.movie.findMany();
    res.status(200).send({ movies });
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
