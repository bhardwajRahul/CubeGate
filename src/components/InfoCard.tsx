import { Database } from "lucide-react";

interface props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function InfoCard(props: props) {
  return (
    <div className="col-span-12 md:col-span-4 h-84 bg-[#1f273b] rounded-xl p-4">
      <div className="w-full h-[40%] flex items-center justify-center">
        <div className="rounded-full bg-[#414b67] w-14 h-14 relative">
          {props.icon}
        </div>
      </div>
      <p className="text-center text-2xl text-white">{props.title}</p>
      <p className="text-center pt-4 text-zinc-400">{props.description}</p>
    </div>
  );
}
