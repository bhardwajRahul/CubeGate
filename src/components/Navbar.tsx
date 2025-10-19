import { Inter, Poppins } from "next/font/google";
import { Box } from "lucide-react";
import Link from "next/link";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: "400",
});

export default function Navbar() {
  return (
    <nav
      className={`bg-[#141b2a] w-full h-24 ${poppins.className} fixed drop-shadow-xl text-white z-50`}
    >
      <div className="w-[90%] mx-auto h-full flex items-center justify-between border-b border-gray-700">
        <Link href="/">
          <p className={`font-inter text-2xl flex gap-2 items-center`}>
            <Box />
            BlockGate
          </p>
        </Link>
        <div className="flex gap-4">
          {/* <button className="px-4 py-2 bg-blue-500 rounded-xl text-md cursor-pointer hover:bg-blue-600">
            Sign Up
          </button> */}
          <Link href="/login">
            <button className="px-4 py-2 bg-blue-500 rounded-xl text-md cursor-pointer hover:bg-blue-600 transition-all">
              Log In
            </button>
          </Link>
          <Link href="/register">
            <button className="px-4 py-2 border hover:bg-white hover:text-black rounded-xl text-md cursor-pointer transition-all">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
