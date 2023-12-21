import { signOut } from "next-auth/react";
import React, { useCallback, useState } from "react";

interface NavbarProps {
  user: any;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [showSignOutModal, setShowSignOutModal] = useState<boolean>(false);

  const toggleSignOutBar = useCallback(() => {
    setShowSignOutModal((prevShowSignOutModal) => !prevShowSignOutModal);
  }, []);

  return (
    <div
      className="bg-black fixed w-full flex items-center justify-between px-2 text-white z-30"
      style={{ height: "5%" }}
    >
      <p>Navbar</p>
      <div className="hover:cursor-pointer" onClick={toggleSignOutBar}>
        <img
          src={user?.image === "" ? "/images/default-blue.png" : user?.image}
          alt="user-logo"
          className="w-5 h-5 rounded-md"
        />
      </div>
      {showSignOutModal && (
        <div className="bg-black w-56 absolute top-14 right-2 py-5 flex-col border-2 border-gray-800 flex z-40">
          <div className="flex flex-col gap-3">
            <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
              <img
                className="w-8 rounded-md"
                src={
                  user?.image === "" ? "/images/default-blue.png" : user?.image
                }
                alt="user-logo"
              />
              <p className="text-white text-sm group-hover/item:underline">
                {user?.name}
              </p>
            </div>
          </div>
          <hr className="bg-gray-600 border-0 h-px my-4" />
          <div
            onClick={() => signOut()}
            className="px-3 text-center text-white text-sm hover:underline hover:cursor-pointer"
          >
            Sign out of Netflix
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
