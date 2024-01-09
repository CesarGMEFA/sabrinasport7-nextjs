// ui
import { Separator } from "@/components/ui/separator";

// icons
import { UserCircle } from "lucide-react";
import NavLinks from "@/components/Account/NavLinks";
import EmailUsername from "@/components/Account/Sidebar/EmailUsername";

function SidebarAccount() {
  return (
    <section className="h-max shadow-md hidden lg:flex items-center justify-start flex-col lg:bg-white lg:w-72 lg:py-12">

        <section className="flex items-center">
          <UserCircle size={36}/>
          <div className="ml-4">
            <h4 className="font-bold text-lg">Username</h4>
            <EmailUsername />
          </div>
        </section>
        <Separator className="my-5 w-4/5 hidden lg:block" />
        <nav className="hidden lg:flex lg:flex-col lg:space-y-4">
          <NavLinks/>
        </nav>
      </section>
  )
}

export default SidebarAccount