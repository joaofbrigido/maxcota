"use client";

import Image from "next/image";
import { MenuLinks } from "./MenuLinks";
import Link from "next/link";

export const MenuLateral = () => {
  return (
    <aside className="p-6 bg-stone-200 min-h-screen max-md:hidden flex flex-col">
      <div className="fixed">
        <Link href="/">
          <Image
            src="/logo-precoteto-black.png"
            alt="Logo Arcto"
            width={150}
            height={37}
            className="m-auto"
            sizes="150px"
          />
        </Link>

        <MenuLinks />
      </div>
    </aside>
  );
};
