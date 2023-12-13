import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ChevronDown, UserCircle } from "lucide-react";

export default function MenuAccountHeader() {
  return (
    <Menubar className="">
      <MenubarMenu>
        <MenubarTrigger>
          <UserCircle size={28} className="mr-1" />
          <div className="flex items-center">
            Cesar
            <ChevronDown size={16} />
          </div>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
