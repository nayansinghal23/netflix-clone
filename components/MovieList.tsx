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
              <img
                src={movie?.thumbnailUrl}
                alt="movie-img"
                className="w-30 h-30 rounded-md"
              />
              <h2>{movie?.title}</h2>
              <div className="flex flex-row gap-3">
                <Link href={`/movie/${movie?.id}`}>
                  <FaPlayCircle className="hover:cursor-pointer" />
                </Link>
                <div onClick={() => {}} className="hover:cursor-pointer">
                  {false ? (
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
