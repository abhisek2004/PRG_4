import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

interface RouteProps {
  href: string;
  label: string;
  route: string;
}

const routeList: RouteProps[] = [
  {
    href: "#team",
    label: "Team",
    route: "/teams",
  },
  {
    href: "#contact",
    label: "Contact",
    route: "/contact",
  },
  {
    href: "#faq",
    label: "FAQ",
    route: "/faq",
  },
];

export const FooterSection = () => {
  return (
    <footer id="footer" className="container py-20 lg:py-24">
      <div className="p-10 bg-card border border-secondary rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4  gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <Link href="#" className="flex font-bold items-center ">
              <Image src="/logo.png" width={1000} height={1000} alt="logo" className="w-16 h-14"/>

              <h3 className="text-2xl text-end">Online Code Compiler</h3>
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Contact</h3>
            <div>
              <Link href="https://github.com/Pal-Yogesh/onlinecodecompiler" className="opacity-60 hover:opacity-100">
                Github
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Twitter
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Instagram
              </Link>
            </div>
          </div>

        

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Queries</h3>
            <div>
              <Link href="#contact" className="opacity-60 hover:opacity-100">
                Contact Us
              </Link>
            </div>

            <div>
              <Link href="#faq" className="opacity-60 hover:opacity-100">
                FAQ
              </Link>
            </div>

            {/* <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Feedback
              </Link>
            </div> */}
          </div>

        
        </div>

        <Separator className="my-6" />
        <section className="">
          <h3 className="">
            &copy; 2024 Designed and developed by
            <Link
              target="_blank"
              href=""
              className="text-primary transition-all border-primary hover:border-b-2 ml-1"
            >
              Yogesh And Yash
            </Link>
          </h3>
        </section>
      </div>
    </footer>
  );
};
