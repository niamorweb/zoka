import { motion, AnimatePresence, useInView } from "framer-motion";
import { Inter, Work_Sans } from "next/font/google";
import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import DemoProfile from "@/components/home/DemoProfile";
import DashboardFeature from "@/components/home/DashboardFeatures";
import Head from "next/head";
import { DataContext } from "@/utlis/userContext";
import DonationsSection from "@/components/home/DonationsSection";
import { Faq } from "@/components/home/Faq/Faq";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });
const work_sans = Work_Sans({ subsets: ["latin"] });

function Section({ children }: any) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref}>
      <div
        style={{
          transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        {children}
      </div>
    </section>
  );
}

export default function Home({}: any) {
  const { data } = React.useContext(DataContext);
  const [currentIndexTestimonial, setCurrentIndexTestimonial] =
    React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexTestimonial((prevIndex: any) =>
        prevIndex === dataTestimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const dataFeatures = [
    {
      title: "Photography",
      paragraph:
        "Explore a platform dedicated to showcasing your visual creations. Share your finest photographs with a passionate community and discover inspiration with every captured moment.",
      img: "https://images.pexels.com/photos/5091121/pexels-photo-5091121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Art",
      paragraph:
        "Unleash your creativity without bounds. Our platform provides a space to exhibit your unique artworks, whether they're paintings, drawings, or any other form of artistic expression.",
      img: "/images/auth/illustration.jpg",
    },
    {
      title: "Socials Network",
      paragraph:
        "Connect with artists from around the globe. Our art and photography-focused social network allows you to build connections, exchange ideas, and collaborate with other people.",
      img: "https://images.pexels.com/photos/1624255/pexels-photo-1624255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const dataTestimonials = [
    {
      citation:
        "Absolutely love the platform! It's been a game-changer for my photography journey. The community support is phenomenal",
      author: "Sarah H.",
    },
    {
      citation:
        "As an artist, I've found a home for my work and connected with like-minded creatives. The features are intuitive and the interface is sleek",
      author: "Max B.",
    },
    {
      citation:
        "Great for networking and discovering new talent. The social aspect adds a layer of inspiration I didn't know I needed",
      author: "Emily M.",
    },
  ];

  return (
    <>
      <Head>
        <title>KUTA - Share your photos</title>
        <meta
          name="description"
          content="A website for sharing your photos and links with the world."
        />
        <meta
          name="keywords"
          content="photos, sharing, links, social network, media, website"
        />
        <meta name="author" content="niamorweb" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`min-h-screen bg-[url('/images/home/noise.png')]  bg-greenDark text-greenLight relative pt-5 px-5 lg:px-10 ${work_sans.className}`}
      >
        <Header />
        <Section>
          <section className="max-w-[1400px] mx-auto flex flex-col-reverse lg:flex-row items-center gap-3 lg:gap-10 py-16">
            <div className="lg:w-1/2 flex flex-col gap-4 items-start">
              <h1 className="text-3xl lg:text-7xl font-bold">
                The platform for sharing your photos and links.
              </h1>
              <p>
                Welcome to Kuta, where artists and photographers converge to
                unleash their creativity. Dive into a vibrant community where
                every image sparks inspiration. Join Kuta today and share your
                story with the world.
              </p>
              <button className="bg-greenLight mt-4 py-2 px-6 rounded-3xl text-greenDark font-semibold duration-150 hover:scale-105">
                Sign up
              </button>
            </div>
            <Image
              className="lg:w-1/2 h-[200px] lg:h-[600px] object-cover rounded-3xl"
              width={2000}
              height={2000}
              src="https://cdn.pixabay.com/photo/2024/01/25/12/30/forest-8531787_1280.jpg"
              alt=""
            />
          </section>
        </Section>

        <Section>
          <section
            id="features"
            className="max-w-[1400px] mx-auto bg-greenLight text-greenDark mt-20 bg-[url('/images/home/noise.png')]  flex flex-col lg:flex-row items-start gap-8 rounded-3xl py-32 px-14"
          >
            <div className="flex lg:w-1/4 flex-col gap-3 items-start">
              <h4 className="uppercase">Features</h4>
              <h2 className="text-4xl font-semibold">
                Share your <br /> artistic side
              </h2>
              <Link
                href="/s/signin"
                className="bg-greenDark mt-4 py-2 px-6 rounded-3xl text-greenLight font-semibold duration-150 hover:scale-105"
              >
                Discover
              </Link>{" "}
            </div>
            <div className="flex lg:w-3/4 flex-col lg:flex-row items-start gap-4">
              {dataFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 h-[500px] lg:w-1/3 lg:hover:w-2/3 duration-500"
                >
                  <Image
                    className="w-full h-[300px] object-cover rounded-2xl duration-150"
                    width={700}
                    height={700}
                    src={feature.img}
                    alt=""
                  />
                  <div className="flex flex-col gap-2">
                    <h4 className="font-medium">{feature.title}</h4>
                    <p>{feature.paragraph}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Section>

        <Section>
          <section
            id="testimonials"
            className="max-w-[1400px] mx-auto py-[200px] flex flex-col gap-4"
          >
            <h3 className="uppercase">Testimonials</h3>
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              <p className="text-4xl font-semibold max-w-[1000px] mb-3 ">
                "{dataTestimonials[currentIndexTestimonial].citation}"{" "}
              </p>
              <p>- {dataTestimonials[currentIndexTestimonial].author}</p>
            </motion.blockquote>
          </section>
        </Section>

        <Section>
          <section
            id="features"
            className="max-w-[1400px] mx-auto bg-greenLight text-greenDark mt-20 bg-[url('/images/home/noise.png')]  flex flex-col lg:flex-row items-start gap-8 rounded-3xl py-32 px-14"
          >
            <div className="flex lg:w-1/4 flex-col gap-3 items-start">
              <h4 className="uppercase">Easy and Fast</h4>
              <h2 className="text-4xl font-semibold">
                Create your page <br /> in few minutes
              </h2>
              <Link
                href="/demo"
                className="bg-greenDark mt-4 py-2 px-6 rounded-3xl text-greenLight font-semibold duration-150 hover:scale-105"
              >
                View demo page
              </Link>{" "}
            </div>
            <Image
              className="lg:w-3/4  rounded-2xl"
              width={1400}
              height={1400}
              src="/images/home/demo_img3.png"
              alt=""
            />
          </section>
        </Section>

        <Section>
          <section
            id="support"
            className="max-w-[1400px] mx-auto py-[200px] flex flex-col items-center gap-4"
          >
            <h3 className="uppercase">Support</h3>
            <h2 className="text-4xl font-semibold">Support me here</h2>
            <a
              href="https://www.buymeacoffee.com/niamorweb"
              target="_blank"
              className="bg-greenLight mt-4 py-2 px-6 rounded-3xl text-greenDark font-semibold duration-150 hover:scale-105"
            >
              Buy me a coffee
            </a>
          </section>
        </Section>

        <Section>
          <Footer />
        </Section>
      </div>
    </>
  );
}
