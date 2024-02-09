import Image from "next/image";
import SectionTitle from "../../Common/SectionTitle";
import { useState } from "react";

interface dataFeatures {
  title: string;
  description: string;
  img: string;
}

const data: Array<dataFeatures> = [
  {
    title: "Edit your informations",
    description:
      "Quickly edit your visible informations: name, description, social links, and username.",
    img: "/images/home/dashboard_profile-min.png",
  },
  {
    title: "Manage your photos",
    description: "Add your top photos to showcase them to everyone.",
    img: "/images/home/dashboard_gallery-min.png",
  },
  {
    title: "Change the appearance of your page",
    description: "Adjust your page's theme to best suit your style.",
    img: "/images/home/dashboard_appearance-min.png",
  },
];

const DashboardFeature = () => {
  const [imgSelected, setImgSelected] = useState<Number>(0);

  return (
    <section
      id="features"
      className="relative bg-gray-light dark:bg-bg-color-dark z-10 py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="Create your page in 2 minutes"
          paragraph="Customize your hub in a few simple steps. A user-friendly experience to share your photos and links in a unique and elegant way"
          center
          mb="80px"
        />

        <div className="flex gap-10">
          <div className="grid gap-8 h-[300px] w-2/5">
            {data.map((elem, index) => (
              <div
                key={index}
                onClick={() => setImgSelected(index)}
                className={`grid gap-2 px-4 py-4 duration-100 cursor-pointer ${
                  imgSelected == index &&
                  " outline-2 rounded-md outline outline-neutral-400"
                }`}
              >
                <h3 className="font-bold">{elem.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {elem.description}
                </p>
              </div>
            ))}
          </div>
          {data.map((elem, index) => (
            <Image
              key={index}
              className={`w-3/5 shadow-md rounded-md border-neutral-400 ${
                imgSelected == index ? "block" : "hidden"
              } `}
              src={elem.img}
              width={1200}
              height={800}
              alt={elem.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardFeature;
