import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { Card, CardContent } from "../ui/card";

export default function DonationsSection() {
  return (
    <section className="relative bg-gray-light dark:bg-bg-color-dark z-10 py-16 md:py-20 lg:py-28">
      <Card className="container bg-opacity-40 py-10">
        <CardContent className="flex flex-col items-center justify-center">
          <SectionTitle
            title="Support Me"
            paragraph="
This website is completely free, but if you'd like to support its improvement, you're welcome to make a donation."
            center
            mb="80px"
          />
          <a
            target="_blank"
            href="https://www.buymeacoffee.com/niamorweb"
            className="rounded-2xl mx-auto bg-blue-500 text-white px-4 py-1.5 text-sm font-medium"
          >
            Buy Me A Coffee ;)
          </a>
        </CardContent>
      </Card>
    </section>
  );
}
