import Image from "next/image";
import SectionTitle from "../../Common/SectionTitle";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface dataFeatures {
  title: string;
  description: string;
  img: string | null;
}

const data: Array<dataFeatures> = [
  {
    title: "Simple dashboard",
    description:
      "Customize your profile effortlessly! Easily edit your name, biography, social links, and username in a snap. Showcase the real you and share your passions with the world. Connect with us and stay updated on our latest news and exciting projects.",
    img: "/images/home/edit_profile_demo.png",
  },
  {
    title: "Manage your photos",
    description:
      "Effortlessly manage your photos! Add your top photos to showcase them to everyone. Build your personalized gallery and share your most memorable moments. Explore, discover, and share your love for photography with the world!",
    img: "/images/home/illustration_home1.png",
  },
  {
    title: "Change the appearance of your page",
    description:
      "Revamp the appearance of your page with ease! Personalize every aspect of your page's theme to reflect your unique style and personality.",
    img: null,
  },
];

const DashboardFeature = () => {
  const [imgSelected, setImgSelected] = useState<Number>(0);

  return (
    <section
      id="features"
      className="relative bg-gray-light dark:bg-bg-color-dark z-10 py-16 md:py-20 lg:py-28"
    >
      <Card className="container bg-opacity-40 py-10">
        <CardContent className="flex flex-col items-center justify-center">
          <SectionTitle
            title="Manage your page"
            paragraph="Manage your page easily, add your photos, edit your personnal informations and the page appearance"
            center
            mb="80px"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {data.map((elem, index) => (
              <div
                key={index}
                onClick={() => setImgSelected(index)}
                className={`flex flex-col h-full gap-2 px-4 py-4 duration-150 outline-2 rounded-md outline outline-neutral-200 hover:outline-neutral-400 "
               ${
                 index === 0
                   ? "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2"
                   : index === 1
                   ? "md:col-span-2 md:row-span-4 lg:col-span-2 lg:row-span-4"
                   : "md:col-span-1 md:row-span-2 lg:col-span-2 lg:row-span-2"
               }`}
              >
                <h3 className="font-bold">{elem.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {elem.description}
                </p>

                {elem.img && (
                  <Image
                    src={elem.img}
                    className="w-full mt-4"
                    width={400}
                    height={300}
                    alt=""
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default DashboardFeature;
