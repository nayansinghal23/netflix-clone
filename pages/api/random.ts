import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prismadb from "@/lib/prismadb";

export default async function random(
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
    const movieCount = await prismadb.movie.count();
    const randomNumber = Math.floor(Math.random() * movieCount);
    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomNumber,
    });
    res.status(200).send({ movie: randomMovies[0] });
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
