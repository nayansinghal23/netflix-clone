import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import {
  MdOutlinePlaylistAdd,
  MdOutlinePlaylistAddCheck,
} from "react-icons/md";

interface MovieListProps {
  movies: any;
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const [present, setPresent] = useState<string[]>();
  const imgArr: string[] = [
    "thumbnail.webp",
    "sintel.webp",
    "steel.webp",
    "elephants.webp",
  ];

  const isAdded = useCallback(async (movieId: string) => {
    try {
      const user = await axios.get("/api/current");
      const { currentUser } = user.data;
      const res = await axios.post("/api/wishlist", {
        movieId,
        user: currentUser,
      });
      axios
        .get("/api/favourites")
        .then((res) => {
          const { user } = res.data;
          setPresent([...user?.favoriteIds]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // used to check whether the movie is in wishlist or not at the initial load of page
  useEffect(() => {
    axios
      .get("/api/favourites")
      .then((res) => {
        const { user } = res.data;
        setPresent([...user?.favoriteIds]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isAdded]);

  return (
    <div className="text-white ml-3 mt-3 pb-3 flex flex-col gap-4">
      <h1>All Movies</h1>
      <div className="flex flex-wrap gap-2">
        {movies &&
          movies?.map((movie: any, index: number) => (
            <div
              key={movie?.id}
              style={{
                border: "1px solid",
              }}
              className="flex flex-col justify-between p-3 w-60 h-50"
            >
              {/* <img
                src={movie?.thumbnailUrl}
                alt="movie-img"
                className="w-30 h-30 rounded-md"
              /> */}
              <Image
                alt="movie-img"
                height={300}
                width={300}
                src={`/images/${imgArr[index]}`}
                className="w-30 h-30 rounded-md"
              />
              <h2>{movie?.title}</h2>
              <div className="flex flex-row gap-3">
                <Link href={`/movie/${movie?.id}`}>
                  <FaPlayCircle className="hover:cursor-pointer" />
                </Link>
                <div
                  onClick={() => {
                    isAdded(movie?.id);
                  }}
                  className="hover:cursor-pointer"
                >
                  {present?.includes(movie?.id) ? (
                    <MdOutlinePlaylistAddCheck />
                  ) : (
                    <MdOutlinePlaylistAdd />
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieList;
// Big Buck Bunny -> thumbnail.jpg
