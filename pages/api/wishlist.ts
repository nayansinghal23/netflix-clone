import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function wishlist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      res.status(405).end();
    }
    const { movieId, user } = req.body;
    let newUser;
    if (user?.favoriteIds?.includes(movieId)) {
      const updatedFavouriteIds = user?.favoriteIds?.filter(
        (item: string) => item !== movieId
      );
      newUser = await prismadb.user.update({
        where: {
          id: user?.id,
        },
        data: {
          favoriteIds: updatedFavouriteIds,
        },
      });
    } else {
      newUser = await prismadb.user.update({
        where: {
          id: user?.id,
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });
    }
    if (!newUser) {
      res.status(404).send({ message: "User not found. Try login again" });
    }
    // console.log(newUser);
    res.status(200).send({ message: "POSTED", newUser });
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
