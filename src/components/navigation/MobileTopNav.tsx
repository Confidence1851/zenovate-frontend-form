import React from "react";
import Logo from "./Logo";
import { HambergerMenu } from "iconsax-react";

const MobileTopNav = () => {
  return (
    <nav className="bg-OffWhite-100 lg:hidden p-4 sticky top-0">
      <div className="flex justify-between items-center sticky top-0">
        <Logo className="lowercase" />
        <HambergerMenu className="text-Black-100" size={30} />
      </div>
    </nav>
  );
};

export default MobileTopNav;
