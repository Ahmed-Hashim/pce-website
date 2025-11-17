export interface WhoWeAreData {
  sectionTitle: string;
  sectionSubtitle: string;
  sectionDescription: string;
  backgroundImage?: string;
  backgroundOpacity?: number;
  leftColumn: {
    title: string;
    description: string;
    image: {
      src: string;
      alt: string;
      caption: string;
      subCaption: string;
    };
  };
  rightColumn: {
    title: string;
    description: string;
    video: {
      src: string;
      poster: string;
      title: string;
      subTitle: string;
      fallbackTitle: string;
      fallbackDescription: string;
    };
  };
  stats: StatItem[];
  videoErrorFallback: {
    icon: string;
    title: string;
    description: string;
    refreshLabel: string;
  };
}

export interface StatItem {
  id: string;
  value: number;
  label: string;
  subLabel: string;
  suffix: string;
}

export const whoWeAreData: WhoWeAreData = {
  sectionTitle: "Who We Are",
  sectionSubtitle: "Driving digital transformation through strategic innovation and operational excellence",
  sectionDescription: "PRECISION CONSULTING ENGINEERING: is a professional company for consultancy services founded in 2008 in Egypt offering a wide range of technical services led by a group of highly qualified consultants and technical engineers, whose expertise in engineering projects covers all major disciplines of design and construction supervision.",
  backgroundImage: "/bg-comp.png",
  backgroundOpacity: 0.8,
  
  leftColumn: {
    title: "Our Corporate Mission",
    description: "We partner with forward-thinking enterprises to architect and implement comprehensive digital solutions that drive measurable business outcomes. Our strategic approach combines deep industry expertise with cutting-edge technology to deliver scalable, secure, and future-ready platforms that transform operations and accelerate growth.",
    image: {
      src: "/4.png",
      alt: "Corporate Leadership Team",
      caption: "Executive Leadership",
      subCaption: "Strategic excellence in action"
    }
  },
  
  rightColumn: {
    title: "Corporate Excellence in Motion",
    description: "Experience our commitment to innovation, quality, and client success through our comprehensive service portfolio and proven delivery methodology.",
    video: {
      src: "/video.mp4",
      poster: "/4.png",
      title: "Enterprise Solutions Showcase",
      subTitle: "Corporate Innovation • Strategic Growth",
      fallbackTitle: "Corporate Video",
      fallbackDescription: "Learn more about our enterprise solutions and strategic partnerships"
    }
  },
  
  stats: [
    {
      id: "projects",
      value: 150,
      label: "Enterprise Projects",
      subLabel: "Successfully Delivered",
      suffix: "+"
    },
    {
      id: "clients",
      value: 75,
      label: "Corporate Clients",
      subLabel: "Across Industries",
      suffix: "+"
    },
    {
      id: "years",
      value: 8,
      label: "Years of Excellence",
      subLabel: "Proven Track Record",
      suffix: "+"
    }
  ],
  
  videoErrorFallback: {
    icon: "M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z",
    title: "Corporate Video",
    description: "Learn more about our enterprise solutions and strategic partnerships",
    refreshLabel: "Refresh Page"
  }
};
