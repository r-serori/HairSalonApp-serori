import React from "react";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  IconName: React.ComponentType<any>;
  iconSrc: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  iconSrc,
  IconName,
  label,
}) => {
  return (
    <li className="lg:w-40 lg:h-40 md:w-32 md:h-32 w-24 h-24 bg-gray-400 flex justify-center items-center rounded-lg">
      <Link href={href}>
        <IconName
          src={iconSrc}
          className="lg:w-20 lg:h-20 md:w-16 md:h-16 w-12 h-12 "
        />
        <span className="mt-2 block text-center font-medium lg:text-lg sm:text-sm  ">
          {label}
        </span>
      </Link>
    </li>
  );
};

export default NavLink;
