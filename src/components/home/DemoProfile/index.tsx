import Image from "next/image";
import SectionTitle from "../../Common/SectionTitle";

const DemoProfile = () => {
  return (
    <section
      id="demo"
      className="relative bg-gray-light dark:bg-bg-color-dark z-10 py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="Create your page in 2 minutes"
          paragraph="Customize your hub in a few simple steps. A user-friendly experience to share your photos and links in a unique and elegant way"
          center
          mb="80px"
        />

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp mx-auto max-w-[1200px] overflow-hidden rounded-md"
              data-wow-delay=".15s"
            >
              <Image
                className="rounded-lg"
                width={1200}
                height={1000}
                src="/images/home/demo_profile_page.png"
                alt="video image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoProfile;
