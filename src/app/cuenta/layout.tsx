import SidebarAccount from "@/components/Account/Sidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-4 lg:px-8 lg:py-12 lg:flex">
        <SidebarAccount />
      {children}
    </main>
  );
}