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

  useEffect(() => {
    axios
      .get("/api/current")
      .then((res) => {
        const { currentUser } = res.data;
        setUser(currentUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="h-screen">
      <Navbar user={user} />
    </div>
  );
};

export default index;
