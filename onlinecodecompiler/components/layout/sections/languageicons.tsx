"use client";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface Language {
  name: string;
  logo: string;
}



const languages = [
  { name: "Java", logo: "/svg/java.svg", route:"/compiler/java" },
  { name: "Python", logo: "/svg/python.svg", route: "/compiler/python" },
  { name: "Cpp", logo: "/svg/c++.svg", route: "/compiler/cpp" },
  { name: "C", logo: "/svg/c.svg", route: "/compiler/c" },
  { name: "JavaScript", logo: "/svg/javascript.svg", route: "/compiler/javascript" },
  { name: "R", logo: "/svg/r.svg", route: "/compiler/r" },
  { name: "Rust", logo: "/svg/rust.svg", route: "/compiler/rust" },
  { name: "Go", logo: "/svg/go.svg", route: "/compiler/go" },
  { name: "PHP", logo: "/svg/php.svg", route: "/compiler/php" },
  { name: "Swift", logo: "/svg/swift.svg", route: "/compiler/swift" },
];

export const LanguageIcons: React.FC = () => (
  <>
    <section id="sponsors" className="max-w-[75%] mx-auto pb-10 sm:pb-16">
      <h2 className="text-xl text-center mb-6">
        Our Compiler Supports
      </h2>
    </section>

    <div className="w-[100%] grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center gap-4 lg:gap-10 px-4 lg:px-24">
      {languages.map((language, index) => (
                <Link href={language.route} key={index}>

        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="flex justify-center items-center"
        >
          <Badge variant="outline" className="cursor-pointer py-2 h-20 w-48 lg:w-56 flex justify-center items-center gap-2">
            <Image width={1000} height={1000} src={language.logo} alt={language.name} className="h-8 w-8 lg:h-10 lg:w-12 " />
            <span className="text-xl lg:text-3xl">{language.name}</span>
          </Badge>
        </motion.div>
        </Link>

      ))}
    </div>
  </>
);

export default LanguageIcons;
