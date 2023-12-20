import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import React from "react";

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
  return (
    <div className="bg-black">
      <h1 className="text-white">index</h1>
      <button
        className="w-20 h-10 text-white bg-yellow-500"
        onClick={() => signOut()}
      >
        Log out
      </button>
    </div>
  );
};

export default index;
