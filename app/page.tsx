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
import { FaAward, FaUsers, FaProjectDiagram, FaDollarSign } from "react-icons/fa";
import { sectionTitles } from "./data/sectionTitles";
import { coreValues } from "./data/values";
import { coreServicesData } from "./data/coreServices";
import TriangleIcon from "./components/ui/TriangleIcon";

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
    description: "Our roots are important to us as we evolve and grow. We understand that maintaining the integrity of our past through a commitment to quality service, employees appreciation, and delivering innovative. Practical solutions to our clients is the key to our success.",
    imageSrc: "/man-1.png"
  },
  {
    name: "ENG. MOHAMED IBRAHIM",
    title: "Chief Executive Officer",
    company: "PCE Industrial",
    description: "We have earned the trust and respect of our clients because we have great and hard working people who serve all client needs in all aspects ,They are experts in their fields bringing a strong service ethos to everything they do. Our clients are fully aware that we have the skills, resources and expertise, and most importantly, the ability to complete their projects to the highest standards on time and on budget.",
    imageSrc: "/man-2.png"
  }
];

const holdingCompanies = [
  { 
    name: "Precision Consulting Engineering", 
    logo: "/logos/2.png", 
    abbrev: "PCE", 
  },
  { 
    name: "PCE Industrial", 
    logo: "/logos/3.png", 
    abbrev: "PCE", 
  },
  { 
    name: "Greenfield Consulting Corporation", 
    logo: "/logos/4.png", 
    abbrev: "GCC", 
  },
  { 
    name: "Hospitality & Facility Management", 
    logo: "/logos/6.png", 
    abbrev: "HFM", 
  },
  { 
    name: "PCE Academy", 
    logo: "/logos/5.png", 
    abbrev: "PCE", 
  },
  { 
    name: "Precision Development", 
    logo: "/logos/7.png", 
    abbrev: "PD", 
  }
];



export default function Home() {
  return (
    <div className=" min-h-screen items-center justify-center ">
      <HeroSection/>
      <ValuesMarqueeSection
        items={coreValues}
        separatorIcon={<TriangleIcon />}
        speed={100}
      />
      <WhoWeAreSection data={whoWeAreData} />
      <ClientsSection />
      
      {/* <CEOSection
        eyebrow={sectionTitles.ceos.eyebrow}
        title={sectionTitles.ceos.title}
        background={sectionTitles.ceos.background}
        outlineColor={sectionTitles.ceos.outlineColor}
        titleColor={sectionTitles.ceos.titleColor}
        ceos={ceos}
        companies={companyDescriptions}
      /> */}
      <CoreServicesOverview
        title={sectionTitles.coreServices.title}
        eyebrow={sectionTitles.coreServices.eyebrow}
        backgroundText={sectionTitles.coreServices.background}
        services={coreServicesData.services}
      />
      
      <FeaturedProjectsPreview />
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
        holdingLogo="/logos/ph.png"
        holdingName="PRECISION HOLDING"
        holdingDescription="A diversified holding company driving excellence across engineering, consulting, and development sectors throughout the MENA region."
        holdingEstablished="Est. 2008"
      />
      
      <CTAComponent />
    </div>
  );
}
