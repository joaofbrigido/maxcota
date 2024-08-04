"use client";

import { usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  BarChart4,
  ChevronDown,
  CircleUserRound,
  LogOut,
  TrendingUp,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";
import { MenuMobile } from "./MenuMobile";
import { toast } from "sonner";
import { signOut } from "@/actions/login";

export const Header = () => {
  const pathname = usePathname();

  function pageName() {
    switch (pathname) {
      case "/":
        return "Home";
      case "/wallet":
        return "Carteira";
      case "/myaccount":
        return "Minha conta";
    }
  }

  async function logout() {
    const response = await signOut();
    if (response?.error) {
      toast.error("Erro ao sair", {
        description: response.error,
      });
    }
  }

  function getFirstTwoLetters() {
    return "João Fernando Amaral Brígido"
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .slice(0, 2);
  }

  function getFirstTwoNames() {
    const namesArray = "João Fernando Amaral Brígido".split(" ");
    if (namesArray.length >= 2) {
      namesArray[0] += " ";
    }
    return namesArray.slice(0, 2);
  }

  function getPlanName() {
    // switch (user.plan) {
    //   case 1:
    //     return "Free";
    //   case 2:
    //     return "Pro";
    // }
    return "Free";
  }

  return (
    <header className="flex justify-between gap-5 items-center px-5 py-3 border-b border-b-stone-200">
      <div className="flex items-center gap-4">
        <button className="md:hidden">
          <MenuMobile />
        </button>
        <h1>{pageName()}</h1>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-3">
            <span className="text-amber-50 primary-color-y py-2 px-3 rounded-full font-bold text-lg max-sm:hidden">
              {getFirstTwoLetters()}
            </span>
            <div>
              <h3 className="font-bold text-left">{getFirstTwoNames()}</h3>
              <p className="flex gap-2 items-center text-stone-950/70 text-left">
                Plano: Free
              </p>
            </div>
            <ChevronDown size={20} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="text-stone-950 border-none w-full right-5 rounded-2xl">
          <h3 className="font-medium">João Fernando Amaral Brígido</h3>
          <p className="mt-1 text-stone-950/70">Plano: {getPlanName()}</p>
          <span className="bg-stone-200 h-[1px] block my-4" />
          <nav>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href={"/myaccount"}
                  className="flex items-center gap-2 hover:text-amber-500 transition"
                >
                  <CircleUserRound size={16} />
                  Minha Conta
                </Link>
              </li>
              <li>
                <Link
                  href={"/plans"}
                  className="flex items-center gap-2 hover:text-amber-500 transition"
                >
                  <TrendingUp size={16} />
                  Alterar para Vitalício
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 hover:text-amber-500 transition"
                >
                  <LogOut size={16} />
                  Sair
                </button>
              </li>
            </ul>
          </nav>
        </PopoverContent>
      </Popover>
    </header>
  );
};
