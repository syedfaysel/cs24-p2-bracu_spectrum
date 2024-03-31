import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Management Dashboard",
  description: "Admin panel",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <div className={`items-start justify-between`}>
        <Sidebar />
        <div className="w-full h-full">{children}</div>
      </div>

  );
}
