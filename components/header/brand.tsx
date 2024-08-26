import React from "react";
import Config from "@/content/config";
import Link from "next/link";
import Image from "next/image";
import avatar from "@/public/avatar.jpg";

function Brand() {
  if (Config.settings.header.brand.format === "name") {
    return (
      <Link
        href="/"
        className="flex items-center space-x-2 w-[200px] font-cursive text-2xl"
      >
        {Config.user.name}
      </Link>
    );
  } else if (Config.settings.header.brand.format === "avatar") {
    return (
      <>
        <Link href="/" className="flex items-center space-x-2 w-[200px]">
          <Image
            src={avatar}
            alt="logo"
            width={40}
            height={40}
            priority={true}
            className="rounded-[35%] border object-cover"
          />
        </Link>
      </>
    );
  }
}

export default Brand;
