import Image from "next/image";
import SectionTitle from "../../Common/SectionTitle";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 bg-gray-light dark:bg-bg-color-dark md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/about/about-image-2.svg"
                alt="about image"
                fill
                className="drop-shadow-three dark:hidden dark:drop-shadow-none"
              />
              <Image
                src="/images/about/about-image-2-dark.svg"
                alt="about image"
                fill
                className="hidden drop-shadow-three dark:block dark:drop-shadow-none"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <SectionTitle
              title="The best alternative to Linktree"
              paragraph="Unlike the other usual sharing sites such as linktree, bento and others, here we keep the advantages of the other applications but can publish photos."
              mb="44px"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
