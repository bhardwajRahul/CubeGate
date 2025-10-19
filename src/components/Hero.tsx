import { poppins } from "@/app/layout";

export default function Hero() {
  return (
    <section
      className={`${poppins.className} bg-[url('/minebg.png')] bg-cover bg-center h-screen flex items-center bg-black/50 bg-blend-multiply`}
    >
      <div className="w-7xl mx-auto h-[50%] flex justify-center flex-col">
        <h1 className="text-center text-7xl font-bold tracking-tight text-white">
          Host your server and take full control of your gaming experience
        </h1>
        <p className="text-zinc-300 pt-8 text-center text-lg">
          Experience seamless Minecraft hosting with BlockGate - where
          performance meets simplicity.
        </p>
      </div>
    </section>
  );
}
