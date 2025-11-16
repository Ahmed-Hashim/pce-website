"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import SectionTitle from "../ui/SectionTitle";

interface Client {
  id: string;
  name: string;
  logo: string;
}

interface ClientsSectionData {
  title: string;
  subtitle?: string;
  clients: Client[];
  anchorId?: string;
  gradientColor?: string;
  gradientWidth?: number;
}

interface ClientsSectionProps {
  data?: ClientsSectionData;
}

const defaultData: ClientsSectionData = {
  title: "Our Clients",
  subtitle: "Trusted by forward-thinking teams across industries.",
  clients: [
    { id: "1", name: "TechCorp", logo: "/pce-logo.png" },
    { id: "2", name: "Global Finance", logo: "/pce-logo.png" },
    { id: "3", name: "Innovate Solutions", logo: "/pce-logo.png" },
    { id: "4", name: "Future Systems", logo: "/pce-logo.png" },
    { id: "5", name: "Elite Partners", logo: "/pce-logo.png" },
    { id: "6", name: "Digital Dynamics", logo: "/pce-logo.png" },
    { id: "7", name: "Strategic Insights", logo: "/pce-logo.png" },
    { id: "8", name: "Cloud Pioneers", logo: "/pce-logo.png" },
    { id: "9", name: "DataFlow", logo: "/pce-logo.png" },
    { id: "10", name: "SecureNet", logo: "/pce-logo.png" },
    { id: "11", name: "GrowthLabs", logo: "/pce-logo.png" },
    { id: "12", name: "SmartChain", logo: "/pce-logo.png" }
  ],
  anchorId: "our-clients",
  gradientColor: "var(--color-white)",
  gradientWidth: 25
};

export default function ClientsSection({ data = defaultData }: ClientsSectionProps) {
  const title = data.title;

  return (
    <section id={data.anchorId} className="">
      <div className="mx-auto border-0 lg:border-y md:border-y lg:border-primary-medium">
        <div className="grid grid-cols-1 lg:grid-cols-3  items-center pl-10">
          {/* Left Column: Title/Copy */}
          <div className="lg:col-span-1 relative border-0 lg:border-r lg:border-primary-medium text-center ">
            <SectionTitle
              title={title}
              titleColor="accent"
              outlineColor="var(--color-primary-medium)"
              background={title.split(" ").pop()}
              align="center"
            />
            {/* {subtitle && (
              <p className="mt-4 text-primary-dark text-base md:text-lg">
                {subtitle}
              </p>
            )} */}
          </div>

          {/* Right Column: Wide Marquee of Logos */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Marquee
                pauseOnHover={true}
                
                autoFill={true}
              >
                {data.clients.map((client) => (
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
          </div>
        </div>
      </div>
    </section>
  );
}
