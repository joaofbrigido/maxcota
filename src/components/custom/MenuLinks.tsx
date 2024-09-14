"use client";

import { CircleArrowUp, CircleUserRound, Home, Wallet } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Profile } from "@/types/types";

type MenuLinksProps = {
  setOpenMenu?: React.Dispatch<React.SetStateAction<boolean>>;
  profile: Profile;
};

export const MenuLinks = ({ setOpenMenu, profile }: MenuLinksProps) => {
  const pathname = usePathname();

  return (
    <nav className="mt-16 flex-auto h-[calc(100vh-150px)]">
      <ul className="space-y-5 relative">
        <li
          className={`px-8 py-2 ${
            pathname === "/"
              ? "before:content-[''] before:w-1.5 before:h-12 before:primary-color-y before:block before:absolute before:-left-6 before:-top-1 before:rounded-r-lg before:shadow-md before:shadow-amber-500/50"
              : ""
          }`}
          onClick={() => setOpenMenu && setOpenMenu(false)}
        >
          <Link
            href="/"
            className={`flex items-center gap-3 hover:text-amber-500 transition hover:opacity-100 ${
              pathname === "/" ? "font-bold" : "opacity-60"
            }`}
          >
            <Home size={20} />
            Home
          </Link>
        </li>
        <li
          className={`px-8 py-2 ${
            pathname === "/wallet"
              ? "before:content-[''] before:w-1.5 before:h-12 before:primary-color-y before:block before:absolute before:-left-6 before:top-14 before:rounded-r-lg before:shadow-md before:shadow-amber-500/50"
              : ""
          }`}
          onClick={() => setOpenMenu && setOpenMenu(false)}
        >
          <Link
            href="/wallet"
            className={`flex items-center gap-3 hover:text-amber-500 transition hover:opacity-100 ${
              pathname === "/wallet" ? "font-bold" : "opacity-60"
            }`}
          >
            <Wallet size={20} />
            Carteira
          </Link>
        </li>
        <li
          className={`px-8 py-2 ${
            pathname === "/myaccount"
              ? "before:content-[''] before:w-1.5 before:h-12 before:primary-color-y before:block before:absolute before:-left-6 before:top-[114px] before:rounded-r-lg before:shadow-md before:shadow-amber-500/50"
              : ""
          }`}
          onClick={() => setOpenMenu && setOpenMenu(false)}
        >
          <Link
            href="/myaccount"
            className={`flex items-center gap-3 hover:text-amber-500 transition hover:opacity-100 ${
              pathname === "/myaccount" ? "font-bold" : "opacity-60"
            }`}
            onClick={() => setOpenMenu && setOpenMenu(false)}
          >
            <CircleUserRound size={20} />
            Minha Conta
          </Link>
        </li>
      </ul>
      {profile.plan_id === 1 && (
        <Link
          href="/plans"
          className="flex gap-3 items-center justify-center rounded-md w-full absolute bottom-0 right-0 text-stone-700 hover:bg-black/10 hover:text-stone-950 transition py-2"
        >
          <CircleArrowUp size={20} className="text-stone-700" />
          Alterar para Pro
        </Link>
      )}
    </nav>
  );
};
