import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function SheetMenuMobile() {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu size={28} />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>Sheet description</SheetDescription>
                </SheetHeader>
                <SheetContent>
                    <p>Sheet content</p>
                </SheetContent>
            </SheetContent>
        </Sheet>
    )
}