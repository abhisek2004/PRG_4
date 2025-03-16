import GithubIcon from "@/components/icons/github-icon";
import LinkedInIcon from "@/components/icons/linkedin-icon";
import XIcon from "@/components/icons/x-icon";
import { FaGlobe } from "react-icons/fa6";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
interface TeamProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  positions: string[];
  socialNetworks: SocialNetworkProps[];
}
interface SocialNetworkProps {
  name: string;
  url: string;
}
export const TeamSection = () => {
  const teamList: TeamProps[] = [
    {
      imageUrl: "https://avatars.githubusercontent.com/u/94790300?v=4",
      firstName: "Yogesh",
      lastName: "Pal",
      positions: ["Next.js", "Full Stack Developer"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/yogesh-pal-7118a023b/",
        },
        {
          name: "Github",
          url: "https://github.com/Pal-Yogesh",
        },
        {
          name: "X",
          url: "https://x.com/Yogesh_18_Pal",
        },
        {
          name: "Portfolio",
          url: "https://www.yogeshpal.site/",
        },
      ],
    },
    {
      imageUrl:
        "https://avatars.githubusercontent.com/u/88927053?v=4",
      firstName: "Yash",
      lastName: "Agrawal",
      positions: ["MERN stack", "Backend Developer"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/yash946/",
        },
        {
          name: "Github",
          url: "https://github.com/Yash-946",
        },
        {
          name: "X",
          url: "https://x.com/YashAgr83526008",
        },
        {
          name: "Portfolio",
          url: "https://www.yashagrawal.top/",
        },
      ],
    },

  ];
  const socialIcon = (socialName: string) => {
    switch (socialName) {
      case "LinkedIn":
        return <LinkedInIcon />;
      case "Github":
        return <GithubIcon />;
      case "X":
        return <XIcon />;
      case "Portfolio":
        return <FaGlobe className="w-5 h-5" />;
    }
  };

  return (
    <section id="team" className="container  lg:w-[75%]  ">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Team
        </h2>
        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Collaboration For This Project.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2  w-full lg:w-[60%]  lg:mx-auto gap-7">
        {teamList.map(
          ({ imageUrl, firstName, lastName, positions, socialNetworks }, index) => (
            <Card
              key={index}
              className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg"
            >
              <CardHeader className="p-0 gap-0">
                <div className="flex justify-center h-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt=""
                    width={300}
                    height={300}
                    className="w-full max-w-[300px] aspect-square object-cover saturate-0 transition-all duration-200 ease-linear group-hover/hoverimg:saturate-100 group-hover/hoverimg:scale-[1.01]"
                  />
                </div>
                <CardTitle className="py-4 pb-4 px-6">
                  {firstName}
                  <span className="text-primary ml-2">{lastName}</span>
                </CardTitle>
              </CardHeader>
              {positions.map((position, index) => (
                <CardContent
                  key={index}
                  className={`pb-0 text-muted-foreground ${index === positions.length - 1 && "pb-4"
                    }`}
                >
                  {position}
                  {index < positions.length - 1 && <span>,</span>}
                </CardContent>
              ))}

              <CardFooter className="space-x-4 mt-auto">
                {socialNetworks.map(({ name, url }, index) => (
                  <Link
                    key={index}
                    href={url}
                    target="_blank"
                    className="hover:opacity-80 transition-all"
                  >
                    {socialIcon(name)}
                  </Link>
                ))}
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>

  );
};
