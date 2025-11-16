import PageHero from "../components/ui/PageHero";
import WhoWeAreSection from "../components/home/WhoWeAreSection";
import CEOSection from "../components/home/CEOSection";
import Statistics from "../components/home/Statistics";
import OurBranchesSection from "../components/home/OurBranchesSection";
import MissionVisionValues from "../components/about/MissionVisionValues";
import LeadershipLists from "../components/about/LeadershipLists";
import AwardsCertifications from "../components/about/AwardsCertifications";
import { whoWeAreData } from "../components/home/WhoWeAreData";
import { sectionTitles } from "../data/sectionTitles";
import { FaAward, FaUsers, FaProjectDiagram, FaDollarSign } from "react-icons/fa";

const pageHero = {
  title: "About Us",
  subtitle: "Precision Consulting Engineering",
  imageSrc: "/1.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
  ],
};

const stats = [
  { icon: <FaAward />, value: "16+", label: "Years of experience" },
  { icon: <FaUsers />, value: "400+", label: "Staff" },
  { icon: <FaProjectDiagram />, value: "600+", label: "Completed Projects" },
  { icon: <FaDollarSign />, value: "10 Billion $", label: "Projects Value" },
];

const leaders = [
  {
    name: "DR. Waleed El Sweedy",
    title: "Chairman",
    company: "PCE Consulting",
    description:
      "Our roots are important to us as we evolve and grow. We understand that maintaining the integrity of our past through a commitment to quality service, employees appreciation, and delivering innovative. Practical solutions to our clients is the key to our success.",
    imageSrc: "/man-1.png",
  },
  {
    name: "ENG. MOHAMED IBRAHIM",
    title: "Chief Executive Officer",
    company: "PCE Industrial",
    description:
      "We have earned the trust and respect of our clients because we have great and hard working people who serve all client needs in all aspects ,They are experts in their fields bringing a strong service ethos to everything they do. Our clients are fully aware that we have the skills, resources and expertise, and most importantly, the ability to complete their projects to the highest standards on time and on budget.",
    imageSrc: "/man-2.png",
  },
];

const story = {
  title: "Our Philosophy",
  background: "Philosophy",
  mission: [
    "Deliver engineering excellence across design and supervision",
    "Drive sustainable impact through innovation and precision",
    "Empower clients with reliable, cost-effective solutions",
  ],
  vision: [
    "Be a trusted regional leader in consulting engineering",
    "Elevate industry standards for safety and quality",
    "Expand global footprint with consistent service delivery",
  ],
  values: ["Integrity", "Innovation", "Accountability", "Responsibility", "Passion"],
};


const directors = [
  {
    name: "Tarek Nasr",
    role: "Projects Management Division Head",
    title: "Projects Management Division Head",
    imageSrc: "/Tarek-Nasr.png",
    description: "Leads project management across multi-sector programs with strong governance.",
    stats: { projects: 120, years: 40, scope: ["Industrial", "Pharmaceutical", "Administrative", "Residential", "Healthcare"] },
    locations: ["Egypt", "UAE", "KSA", "Syria", "Yemen", "Ethiopia"],
  },
  {
    name: "Rania Hegazy",
    role: "Architecture Division Head",
    title: "Architecture Division Head",
    imageSrc: "/Rania-Hegazy.png",
    description: "Architectural leadership for complex commercial and cultural developments.",
    stats: { projects: 85, years: 30, scope: ["Commercial", "Administrative", "Residential", "Touristic", "Pharmaceutical", "Historical", "Healthcare", "Religious"] },
    locations: ["Egypt", "UAE", "KSA", "Syria", "Yemen", "Qatar", "Lebanon", "Sudan"],
  },
  {
    name: "Hatem Alaasar",
    role: "Structural Division Head",
    title: "Structural Division Head",
    imageSrc: "/Hatem-Alaasar.png",
    description: "Directs structural engineering and delivery for industrial and infrastructure assets.",
    stats: { projects: 80, years: 40, scope: ["Industrial", "Pharmaceutical", "Residential", "Healthcare", "Sports", "Infrastructure"] },
    locations: ["Egypt", "UAE", "KSA", "Syria", "Yemen", "Ethiopia"],
  },
  {
    name: "Ayman Elsaid",
    role: "Mechanical Division Head",
    title: "Mechanical Division Head",
    imageSrc: "/Ayman-Elsaid.png",
    description: "Heads mechanical systems across industrial, hospitality, and infrastructure projects.",
    stats: { projects: 130, years: 40, scope: ["Industrial", "Commercial", "Hospitality", "Sports", "Touristic", "Infrastructure", "Administrative", "Medical", "Residential"] },
    locations: ["Egypt", "KSA", "Kuwait"],
  },
  {
    name: "Hossam Ebaid",
    role: "Electrical Division Head",
    title: "Electrical Division Head",
    imageSrc: "/Hossam-Ebaid.png",
    description: "Leads electrical design and supervision with focus on safety and reliability.",
    stats: { projects: 46, years: 20, scope: ["Industrial", "Pharmaceutical", "Administrative", "Residential", "Healthcare", "Sports", "Touristic"] },
    locations: ["Egypt", "UAE", "KSA", "Iraq"],
  },
  {
    name: "Tamer Kamal",
    role: "HVAC Division Head",
    title: "HVAC Division Head",
    imageSrc: "/Tamer-Kamal.png",
    description: "Directs HVAC strategy and execution for complex multi-use facilities.",
    stats: { projects: 100, years: 20, scope: ["Industrial", "Pharmaceutical", "Administrative", "Residential", "Healthcare", "Sports", "Touristic"] },
    locations: ["Egypt", "UAE", "KSA", "Syria", "Yemen", "Ethiopia"],
  },
  {
    name: "Hesham Hassan",
    role: "Head of Construction Supervision",
    title: "Head of Construction Supervision",
    imageSrc: "/Hesham-Hassan.png",
    description: "Oversees construction supervision, quality control, and contractor compliance.",
    stats: { projects: 100, years: 35, scope: ["Residential", "Hospitality", "Industrial", "Administrative", "Commercial", "Infrastructure"] },
    locations: ["Egypt", "Qatar"],
  },
  {
    name: "Marwa Afifi",
    role: "Project Control Head",
    title: "Project Control Head",
    imageSrc: "/Marwa-Afifi.png",
    description: "Project controls specialist across scheduling, cost, and performance management.",
    stats: { projects: 0, years: 15, scope: ["Industrial", "Pharmaceutical", "Administrative", "Residential", "Healthcare"] },
    locations: ["Egypt", "KSA", "UAE"],
  },
  {
    name: "Moamen Mohamed",
    role: "Tendering Division Head",
    title: "Tendering Division Head",
    imageSrc: "/Moamen-Mohamed.png",
    description: "Leads tendering and bids across sectors ensuring competitive propositions.",
    stats: { projects: 60, scope: ["Industrial", "Commercial", "Hospitality", "Sports", "Touristic", "Infrastructure", "Administrative", "Medical", "Residential"] },
    locations: ["Egypt"],
  },
  {
    name: "Mohamed Ibrahim",
    role: "Business Unit Manager Industrial",
    title: "Business Unit Manager Industrial",
    imageSrc: "/Mohamed-Ibrahim.png",
    description: "Industrial unit leadership with global delivery in pharmaceutical field.",
    stats: { projects: 0, years: 30, scope: ["Industrial (Pharmaceutical)"] },
    locations: ["Egypt", "UK", "Germany", "Switzerland", "Italy", "France", "Spain", "Argentina", "India", "China", "Japan"],
  },
];

const awards = [
  { year: "2021", title: "Excellence in Engineering", issuer: "Regional Council" },
  { year: "2022", title: "Top Supervision Firm", issuer: "Industry Association" },
];

const certifications = [
  { code: "ISO 9001", title: "Quality Management", issuer: "Certified Body" },
  { code: "ISO 14001", title: "Environmental Management", issuer: "Certified Body" },
  { code: "ISO 45001", title: "Occupational Health & Safety", issuer: "Certified Body" },
];

const branches = [
  {
    country: "Egypt",
    flag: "🇪🇬",
    flagImage: "https://flagcdn.com/w320/eg.png",
    locations: [
      "39 Babel St from Shooting club St., Dokki, Giza",
      "New Administrative Capital, Golden Tower 6th floor Office 615",
    ],
    contacts: ["+20 100 686 8963", "+20 100 012 7211"],
    branchCount: 2,
    isHeadquarters: true,
    region: "mena",
  },
  {
    country: "Saudi Arabia",
    flag: "🇸🇦",
    flagImage: "https://flagcdn.com/w320/sa.png",
    locations: [
      "4321 Othman Ibn Affan, Al Tawun, Riyadh",
      "3910-8349, Qabbani Tower, Al-Dubbat, Riyadh",
    ],
    contacts: ["+966 55 587 2422", "+966 55 587 2422"],
    branchCount: 2,
    region: "mena",
  },
  {
    country: "UAE",
    flag: "🇦🇪",
    flagImage: "https://flagcdn.com/w320/ae.png",
    locations: [
      "1502 Al Taawun St, Al-Maha, A-Block 15 Floor, Sharjah",
      "Sharjah Media City, Sharjah",
    ],
    contacts: ["+971 52 420 3858", "+971 56 933 9189"],
    branchCount: 2,
    region: "mena",
  },
  {
    country: "Italy",
    flag: "🇮🇹",
    flagImage: "https://flagcdn.com/w320/it.png",
    locations: ["100/3 VAI DON ELOI MONARI, Modena, Italy"],
    contacts: ["+39 3200477680"],
    branchCount: 1,
    region: "europe",
  },
  {
    country: "Iraq",
    flag: "🇮🇶",
    flagImage: "https://flagcdn.com/w320/iq.png",
    locations: ["Ainkawa 44003, Erbil, Iraq"],
    contacts: ["+964 7508310697"],
    branchCount: 1,
    region: "mena",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-primary-dark">
      <PageHero title={pageHero.title} subtitle={pageHero.subtitle} breadcrumbs={pageHero.breadcrumbs} imageSrc={pageHero.imageSrc} />

      <WhoWeAreSection data={whoWeAreData} />
      <MissionVisionValues title={story.title} background={story.background} mission={story.mission} vision={story.vision} values={story.values} />


      <CEOSection
        title={sectionTitles.ceos.title}
        background={sectionTitles.ceos.background}
        ceos={leaders}
      />

      <LeadershipLists title="Management Team" background="Management Team" directors={directors} />

      <AwardsCertifications title="Awards & Certifications" background="AWARDS" awards={awards} certifications={certifications} />

      <Statistics title={sectionTitles.statistics.title} stats={stats} />

      <OurBranchesSection
        sectionTitle="Global Presence"
        sectionSubtitle="Strategic locations across key markets"
        branches={branches}
      />
    </div>
  );
}
