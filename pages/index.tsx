import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const index = () => {
  const [user, setUser] = useState<any>();
  const [randomMovie, setRandomMovie] = useState<any>();
  const [movies, setMovies] = useState<any>();

  useEffect(() => {
    axios
      .all([
        axios.get("/api/current"),
        axios.get("/api/random"),
        axios.get("/api/movies"),
      ])
      .then(([res1, res2, res3]) => {
        const { currentUser } = res1.data;
        setUser(currentUser);
        const { movie } = res2.data;
        setRandomMovie(movie);
        const { movies } = res3.data;
        setMovies(movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar user={user} />
      <Billboard randomMovie={randomMovie} />
      <MovieList movies={movies} />
    </div>
  );
};

export default index;
