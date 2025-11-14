import HeroSection from "./components/home/HeroSection";
import WhoWeAreSection from "./components/home/WhoWeAreSection";
import OurBranchesSection from "./components/home/OurBranchesSection";
import ClientsSection from "./components/home/ClientsSection";
import CoreServicesOverview from "./components/home/CoreServicesOverview";
import FeaturedProjectsPreview from "./components/home/FeaturedProjectsPreview";
import CTAComponent from "./components/home/CTAComponent";
import { whoWeAreData } from "./components/home/WhoWeAreData";
import Statistics from "./components/home/Statistics";
import CEOSection from "./components/home/CEOSection";
import HoldingGroupSection from "./components/home/HoldingGroupSection";
import ValuesMarqueeSection from "./components/home/ValuesMarqueeSection";
import ValueIcon from "./components/ui/ValueIcon";
import { FaAward, FaUsers, FaProjectDiagram, FaDollarSign } from "react-icons/fa";
import { sectionTitles } from "./data/sectionTitles";
import { coreValues } from "./data/values";

const stats = [
  { icon: <FaAward />, value: "16+", label: "Years of experience" },
  { icon: <FaUsers />, value: "400+", label: "Staff" },
  { icon: <FaProjectDiagram />, value: "600+", label: "Completed Projects" },
  { icon: <FaDollarSign />, value: "10 Billion $", label: "Projects Value" },
];

const companyDescriptions = [
  {
    name: "PRECISION CONSULTING ENGINEERING",
    description: "Precision Consulting Engineering, founded in Egypt in 2008, is a consultancy firm providing a wide range of technical services in engineering design and construction supervision, supported by a team of highly qualified experts."
  },
  {
    name: "PCE INDUSTRIAL",
    description: "PCE Industrial focuses on optimizing industrial processes and systems, aiming to boost efficiency, productivity, and sustainability through innovative engineering solutions. Key Offerings: Process Optimization and Systems Engineering."
  }
];

const ceos = [
  {
    name: "DR. Waleed El Sweedy",
    title: "Chairman",
    company: "PCE Consulting",
    description: "Our roots are important to us as we evolve and grow. We understand that maintaining the integrity of our past through a commitment to quality service, employee appreciation, and delivering innovative. Practical solutions to our clients is the key to our success.",
    imageSrc: "/man-2.jpg"
  },
  {
    name: "ENG. MOHAMED IBRAHIM",
    title: "Chief Executive Officer",
    company: "PCE Industrial",
    description: "Excellence is not merely achieved it is cultivated through unwavering dedication and exceptional talent. Our distinguished team of industry experts brings unparalleled expertise and an uncompromising commitment to service excellence across every dimension of our operations. We have earned the distinguished trust of our clientele by consistently demonstrating our comprehensive capabilities, extensive resources, and profound technical expertise. Most critically, we possess the proven ability to deliver sophisticated projects to the most exacting standards, ensuring timely completion and precise budget adherence while maintaining the highest levels of quality and innovation.",
    imageSrc: "/man-1.jpg"
  }
];

const holdingCompanies = [
  { 
    name: "Precision Consulting Engineering", 
    logo: "/pce-logo.png", 
    abbrev: "PCE", 
  },
  { 
    name: "PCE Industrial", 
    logo: "/pce-logo.png", 
    abbrev: "PCE", 
  },
  { 
    name: "Greenfield Consulting Corporation", 
    logo: "/pce-logo.png", 
    abbrev: "GCC", 
  },
  { 
    name: "Hospitality & Facility Management", 
    logo: "/pce-logo.png", 
    abbrev: "HFM", 
  },
  { 
    name: "PCE Academy", 
    logo: "/pce-logo.png", 
    abbrev: "PCE", 
  },
  { 
    name: "Precision Development", 
    logo: "/pce-logo.png", 
    abbrev: "PD", 
  }
];



export default function Home() {
  return (
    <div className=" min-h-screen items-center justify-center  font-sans  bg-foreground">
      <HeroSection/>
      <WhoWeAreSection data={whoWeAreData} />
      
      <CEOSection
        eyebrow={sectionTitles.ceos.eyebrow}
        title={sectionTitles.ceos.title}
        background={sectionTitles.ceos.background}
        outlineColor={sectionTitles.ceos.outlineColor}
        titleColor={sectionTitles.ceos.titleColor}
        ceos={ceos}
        companies={companyDescriptions}
      />
      
      <CoreServicesOverview />
      <ValuesMarqueeSection
        items={coreValues}
        separatorIcon={<ValueIcon />}
        speed={100}
      />
      <FeaturedProjectsPreview />
      <ClientsSection />
      <OurBranchesSection />
      
      <Statistics 
        title={sectionTitles.statistics.title}
        eyebrow={sectionTitles.statistics.eyebrow}
        background={sectionTitles.statistics.background}
        stats={stats}
        titleColor={sectionTitles.statistics.titleColor}
        backgroundTextColor={sectionTitles.statistics.backgroundTextColor}
        outlineColor={sectionTitles.statistics.outlineColor}
      />
      
      <HoldingGroupSection
        title={sectionTitles.holdingGroup.title}
        subtitle="Corporate Portfolio"
        companies={holdingCompanies}
        holdingLogo="/pce-logo.png"
        holdingName="PRECISION HOLDING"
        holdingDescription="A diversified holding company driving excellence across engineering, consulting, and development sectors throughout the MENA region."
        holdingEstablished="Est. 2008"
      />
      
      <CTAComponent />
    </div>
  );
}
