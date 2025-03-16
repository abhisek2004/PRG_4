import { LanguageIcons } from "@/components/layout/sections/languageicons";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { TeamSection } from "@/components/layout/sections/team";
import { Navbar } from "@/components/layout/Navbar1";

// export const metadata = {
//   title: "Online Code Compiler",
//   description: "Online Code Compiler",
//   openGraph: {
//     type: "website",
//     url: "https://github.com/Pal-Yogesh/onlinecodecompiler",
//     title: "Online Code Compiler",
//     description: "Online Code Compiler",
//     images: [
//       {
//         url: "/logo.png",
//         width: 1200,
//         height: 630,
//         alt: "Online Code Compiler",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     site: "https://github.com/Pal-Yogesh/onlinecodecompiler",
//     title: "Online Code Compiler",
//     description: "Online Code Compiler",
//     images: [
//       "/logo.png",
//     ],
//   },
// };

export default function Home() {
  return (
    <>
      <Navbar homepage={true} />
      <HeroSection />
      <LanguageIcons />
      <FeaturesSection />
      {/* <TeamSection /> */}
      {/* <ContactSection /> */}
      <FAQSection />
      <FooterSection />
    </>
  );
}
