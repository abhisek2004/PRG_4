import Image from 'next/image';
import React, { useState } from 'react';

interface Language {
  name: string;
  svgPath: string;
}

const languages: Language[] = [
  {
    name: 'Java',
    svgPath: '/svg/java.svg',
  },
  {
    name: 'Python',
    svgPath: '/svg/python.svg',
  },
  {
    name: 'Cpp',
    svgPath: '/svg/c++.svg',
  },
  {
    name: 'C',
    svgPath: '/svg/c.svg',
  },
  {
    name: 'JavaScript',
    svgPath: '/svg/javascript.svg',
  },
  {
    name: 'R',
    svgPath: '/svg/r.svg',
  },
  {
    name: 'Rust',
    svgPath: '/svg/rust.svg',
  },
  {
    name: 'Go',
    svgPath: '/svg/go.svg',
  },
  {
    name: 'PHP',
    svgPath: '/svg/php.svg',
  },
  {
    name: 'Swift',
    svgPath: '/svg/swift.svg',
  },
];

export const LeftNavbar: React.FC = () => {
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);

  const handleLanguageClick = (languageName: string) => {
    const url = `/compiler/${languageName.toLowerCase()}`;
    window.open(url, '_blank');
  };

  return (
    <div className=" hidden lg:flex flex-col items-center bg-muted/50 dark:bg-card rounded-2xl min-h-[85vh] h-[85vh] overflow-y-scroll overflow-hidden scrollbar-hide w-[4.25rem] p-4 space-y-6 border border-secondary ">
      {languages.map((language, index) => (
        <div
          key={index}
          className="relative group flex flex-col items-center cursor-pointer "
          onMouseEnter={() => setHoveredLang(language.name)}
          onMouseLeave={() => setHoveredLang(null)}
          onClick={() => handleLanguageClick(language.name)}
        >
          
          <Image
            height={1000}
            width={1000}
            src={language.svgPath}
            alt={`${language.name} logo`}
            className="mt-4 h-9 w-12 transition-transform transform hover:scale-110  "
          />

          
          {hoveredLang === language.name && (
            <div className="absolute bottom-0 mb-12 bg-card text-card-foreground text-xs rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {language.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
