"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useState } from "react";
import { MenuLinks } from "./MenuLinks";

export const MenuMobile = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Sheet open={openMenu} onOpenChange={setOpenMenu}>
      <SheetTrigger asChild>
        <Menu />
      </SheetTrigger>
      <SheetContent className="bg-stone-200 border-none" side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div>
          <MenuLinks setOpenMenu={setOpenMenu} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
