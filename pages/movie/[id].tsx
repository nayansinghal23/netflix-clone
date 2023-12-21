import axios from "axios";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const MovieDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<any>();
  const vidRef = useRef<any>();
  const [stop, setStop] = useState<boolean>(false);

  const handlePause = () => {
    setStop(!stop);
    if (stop === true) {
      vidRef.current.pause();
    } else {
      vidRef.current.play();
    }
  };

  useEffect(() => {
    axios
      .get("/api/movies")
      .then((res) => {
        const { movies } = res.data;
        const filteredMovie = movies?.filter((item: any) => item?.id === id);
        setMovie(filteredMovie[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-black min-h-screen text-white flex flex-col gap-10 p-5">
      <h1 className="text-4xl text-center">{movie?.title}</h1>
      <video
        ref={vidRef}
        poster={movie?.thumbnailUrl}
        className="w-50 h-50 object-cover brightness-[60%] transition duration-500"
        onClick={handlePause}
        controls
        src={movie?.videoUrl}
        style={{ border: "2px solid" }}
      ></video>
      <p className="text-white text-2xl">{movie?.description}</p>
    </div>
  );
};

export default MovieDetailPage;

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
