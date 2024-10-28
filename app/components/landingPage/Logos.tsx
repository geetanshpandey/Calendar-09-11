import Image from "next/image";
import NylasLogo from "@/public/nylas-logo.png";
import NextjsLogo from "@/public/nextjs-logo.svg";
import vercelLogo from "@/public/vercel.svg";

export function Logos() {
  return (
    <div>
      <h2>Trusted by the best companies in the world</h2>
      <div>
        <Image src={NylasLogo} alt="Logo" />
        <Image src={NextjsLogo} alt="Logo" />
        <Image src={vercelLogo} alt="Logo" />
        <Image src={NylasLogo} alt="Logo" />
        <Image src={NextjsLogo} alt="Logo" />
      </div>
    </div>
  );
}
