import { createClient } from "@/utils/supabase/supabaseServer";
import PageHero from "../components/ui/PageHero";
import LegalPageLayout from "../components/ui/LegalPageLayout";

export const metadata = {
  title: "Terms & Conditions | PCE",
  description: "Terms and conditions of use for Precision Consulting Engineering.",
};

const pageHero = {
  title: "Terms & Conditions",
  subtitle: "Legal Information",
  imageSrc: "/4.png", // Using a generic image or one from existing assets
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
};

function processContent(htmlContent: string) {
  const toc: { id: string; text: string; level: number }[] = [];
  
  // Improved regex to handle:
  // 1. Both h2 and h3
  // 2. Case insensitive (h2, H2, h3, H3)
  // 3. Attributes in the tag (e.g. <h2 class="foo">)
  const processedContent = htmlContent.replace(/<(h[23])(?:[^>]*)>(.*?)<\/\1>/gi, (match, tag, text) => {
    // Strip HTML tags from text for the TOC label if any exist nested
    const cleanText = text.replace(/<[^>]*>/g, "");
    
    // Determine level
    const level = parseInt(tag.charAt(1), 10);
    
    // Generate slug
    const id = cleanText
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special chars
      .replace(/[\s_-]+/g, "-") // Replace spaces with dashes
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
      
    toc.push({ id, text: cleanText, level });
    
    // Return with ID injected
    return `<${tag} id="${id}">${text}</${tag}>`;
  });
  
  return { processedContent, toc };
}

export default async function TermsAndConditionsPage() {
  "use cache";
  const supabase = createClient();
  
  // Try to find the page by title
  // We'll search for 'Terms & Conditions' or 'terms&conditions'
  const { data: pageData, error } = await supabase
    .from("pages")
    .select("*")
    .or("title.eq.Terms & Conditions,title.eq.terms&conditions")
    .single();

  if (error || !pageData) {
    console.error("Error fetching terms page:", error);
    return (
      <div className="min-h-screen">
        <PageHero
          title={pageHero.title}
          subtitle={pageHero.subtitle}
          breadcrumbs={pageHero.breadcrumbs}
          imageSrc={pageHero.imageSrc}
        />
        <div className="py-20 text-center text-gray-500">
          Content not found.
        </div>
      </div>
    );
  }

  // Process content to extract TOC and inject IDs
  const { processedContent, toc } = processContent(pageData.body || "");

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        title={pageHero.title}
        subtitle={pageHero.subtitle}
        breadcrumbs={pageHero.breadcrumbs}
        imageSrc={pageHero.imageSrc}
      />

      <LegalPageLayout 
        title={pageData.title}
        content={processedContent}
        toc={toc}
      />
    </div>
  );
}
