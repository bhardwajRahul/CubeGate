"use client";
import Link from "next/link";
import { House } from "lucide-react";
import { usePathname } from "next/navigation";

interface props {
  label: string;
  href: string;
  icon: React.ReactElement;
  className?: string;
}

export default function MenuOption({ label, href, icon, className }: props) {
  const pathname = usePathname();
  const isCurrentPath = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link href={href} className={`w-[90%] ${className}`}>
      <div
        className={`hover:bg-blue-600/30 transition-all rounded-md h-12 flex items-center px-4 ${
          isCurrentPath ? "bg-blue-600/30" : ""
        }`}
      >
        {icon}
        <p className="">{label}</p>
      </div>
    </Link>
  );
}
