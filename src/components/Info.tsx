import { Database, Gauge, Cog } from "lucide-react";
import { poppins } from "@/app/layout";
import InfoCard from "./InfoCard";
export default function Info() {
  return (
    <section className={`${poppins.className} w-full h-screen bg-[#101522]`}>
      <div className="w-[80%] h-full mx-auto">
        <div className="h-full w-full grid grid-cols-12 gap-6 pt-24">
          <div className="col-span-12 md:col-span-4 h-84 bg-[#1f273b] rounded-xl">
            <InfoCard
              icon={
                <Database className="text-[#aab2c6] absolute inset-0 m-auto" />
              }
              title="Scalable"
              description="Configure your server with your own needs, reliable performance, and seamless scalability."
            />
          </div>
          <div className="col-span-12 md:col-span-4 h-84 bg-[#1f273b] rounded-xl">
            <InfoCard
              icon={
                <Gauge className="text-[#aab2c6] absolute inset-0 m-auto" />
              }
              title="Performance"
              description="Play with your friends lag-free on high-performance servers designed for optimal gaming experiences."
            />
          </div>
          <div className="col-span-12 md:col-span-4 h-84 bg-[#1f273b] rounded-xl">
            <InfoCard
              icon={<Cog className="text-[#aab2c6] absolute inset-0 m-auto" />}
              title="User Friendly"
              description="Easily manage and customize your server settings with our intuitive control panel."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
