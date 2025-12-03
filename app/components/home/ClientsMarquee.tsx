"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

export interface Client {
  id: number;
  name: string;
  logo: string;
}

interface ClientsMarqueeProps {
  clients: Client[];
}

export default function ClientsMarquee({ clients }: ClientsMarqueeProps) {
  return (
    <div className="relative">
      <Marquee pauseOnHover={true} autoFill={true}>
        {clients.map((client) => (
          <div
            key={client.id}
            className="group inline-flex w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-36 items-center justify-center transition-all duration-300 cursor-pointer lg:mx-3 shrink-0 relative overflow-hidden"
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={90}
              height={90}
              className="max-w-24 max-h-20 sm:max-w-28 sm:max-h-24 md:max-w-32 md:max-h-24 object-contain transition-all duration-500"
              priority={false}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
