import { supabase } from "@/lib/supabase";
import { ChevronRight } from "lucide-react";
import Footer from "@/components/gallery/Footer";
import Image from "next/image";
import { Work_Sans } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useDeviceType from "@/hooks/useDeviceType";
import CarouselSection from "@/components/gallery/Carousel";

interface link {
  name: String;
  url: String;
}
interface userInfos {
  bio: String | null;
  created_at: String;
  email: String | null;
  full_name: String | null;
  language: String | null;
  links: Array<link> | null;
  theme: String;
  user_id: String;
  username: String;
}

const work_sans = Work_Sans({ subsets: ["latin"] });

const fetchPhotos = async (userId: string) => {
  const { data: dataItems, error } = await supabase
    .from("items")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return dataItems;
};

const Gallery = ({ userInfos, photos }: any) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Number | null>(null);
  const deviceType = useDeviceType();
  const backgroundRef = useRef<any>(null); // Référence pour l'élément du fond

  // Fonction pour gérer le défilement et ajuster la position du fond
  const handleScroll = () => {
    const background = backgroundRef.current;
    if (background) {
      const scrollValue = window.scrollY;
      background.style.top = -scrollValue * -0.5 + "px"; // Vous pouvez ajuster le facteur pour un effet de parallaxe plus ou moins prononcé
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // Ajouter un écouteur d'événements pour le défilement
    return () => {
      window.removeEventListener("scroll", handleScroll); // Nettoyer l'écouteur d'événements lors du démontage du composant
    };
  }, []);

  if (!userInfos) {
    return (
      <div className="h-screen w-screen flex flex-col gap-2 justify-center items-center">
        <p>User unknown</p>
        <Link href="/" className="underline underline-offset-2">
          Go to home page
        </Link>
      </div>
    );
  } else {
    return (
      <>
        <Head>
          <title>{userInfos.full_name}</title>
          <meta name="description" content={userInfos.description} />
          <meta name="author" content="niamorweb" />
          <meta
            name="keywords"
            content="photos, sharing, links, social network, media, website"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" href="/favicon.ico" />
          {photos.map((photo: any) => (
            <link
              key={photo.id}
              rel="preload"
              href={photo.image_url}
              as="image"
            />
          ))}
        </Head>

        <div className={`bg-[#F3F3F3] ${work_sans.className}`}>
          <Link
            className="hidden absolute gap-2 top-3 right-3  items-center bg-greenDark text-greenLight px-4 py-2 rounded-lg"
            href="/"
          >
            <Image
              src="/logo32.jpg"
              className="rounded-full"
              width={20}
              height={20}
              alt=""
            />
            <span>Created via Kuta</span>
          </Link>
          <div className={`min-w-screen min-h-screen`}>
            {userInfos && (
              <main className={`mx-auto grid w-full min-h-screen `}>
                <div
                  className={` max-h-[900px] text-white overflow-hidden flex flex-col gap-2 relative px-4 lg:px-24 pt-16 pb-10 lg:pt-24 lg:pb-32 shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight`}
                >
                  <div className="absolute  z-[6] left-0 top-0 h-full w-full bg-black/30 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#00000094] lg:to-[#0000000d]"></div>
                  {userInfos.background ? (
                    <Image
                      ref={backgroundRef}
                      className="absolute object-center max-h-[1000px] h-full w-screen top-0 left-0 right-0 bottom-0 object-cover z-[5]"
                      src={userInfos.background}
                      width={deviceType === "mobile" ? 800 : 1600}
                      height={deviceType === "mobile" ? 600 : 1000}
                      alt=""
                    />
                  ) : (
                    <div className="absolute bg-[url('/images/home/noise.png')] bg-greenDark  h-full w-full top-0 left-0 right-0 bottom-0 object-cover -z-10"></div>
                  )}

                  <Footer />
                  <div className="w-full z-10 flex items-center justify-start max-w-[1960px] mx-auto px-4 lg:px-24">
                    <div className="flex flex-col gap-3">
                      {userInfos.avatar ? (
                        <Image
                          className={`w-24 lg:w-44 duration-150 h-24 lg:h-44 mb-4 object-cover rounded-full border-greenDark border-2`}
                          src={userInfos.avatar}
                          width={deviceType === "mobile" ? 100 : 200}
                          height={deviceType === "mobile" ? 100 : 200}
                          alt=""
                        />
                      ) : (
                        <Image
                          className={`w-24 lg:w-44 cursor-pointer  duration-150  h-24 lg:h-44 mb-4 object-cover rounded-full border-greenDark border-2`}
                          src="/logo-large.jpg"
                          width={deviceType === "mobile" ? 100 : 200}
                          height={deviceType === "mobile" ? 100 : 200}
                          alt=""
                        />
                      )}
                      <h1 className="max-w-[500px] text-lg md:text-2xl lg:text-6xl font-extrabold tracking-widest">
                        {userInfos.full_name}
                      </h1>
                      <p className={`max-w-[500px] mb-4 `}>{userInfos.bio}</p>
                      {userInfos.links && (
                        <div className="flex flex-col items-start md:flex-row md:flex-wrap gap-4 md:items-centers mt-4">
                          {userInfos.links &&
                            userInfos.links.map((link: any, index: any) => (
                              <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                className="inline-flex uppercase font-medium h-10 items-center rounded-full bg-black bg-opacity-20 px-4 backdrop-blur-md transition duration-700 ease-in-out hover:bg-white hover:text-black hover:duration-300"
                              >
                                <Image
                                  className="mr-2"
                                  height={16}
                                  width={16}
                                  src={`http://www.google.com/s2/favicons?domain=${link.url}`}
                                  alt=""
                                />

                                <span className="">{link.name}</span>
                                <ChevronRight className="w-5 h-5" />
                              </a>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" pb-40 max-w-[1960px] mx-auto pt-20 flex flex-col gap-28">
                  <div className=" flex flex-col gap-14">
                    {userInfos.is_text_section && (
                      <div className="flex flex-col gap-6 px-4 lg:px-24">
                        <h2 className="text-7xl font-bold">
                          {userInfos.intro_title}
                        </h2>
                        <p>{userInfos.intro_description}</p>
                      </div>
                    )}

                    <div className="px-4 lg:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-2 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
                      {photos &&
                        photos.map((photo: any, index: number) => (
                          /// <AnimTranslate key={index}>
                          <motion.div
                            key={index}
                            layoutId={photo.url}
                            className={`after:content bg-white border-[1px] h-[400px] border-black rounded-md overflow-hidden cursor-zoom-in group relative flex flex-col w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight `}
                            onClick={() => setSelectedPhoto(index)}
                          >
                            <Image
                              placeholder="blur"
                              blurDataURL={`/_next/image?url=${photo.image_url}?width=100&height=100/&w=16&q=1`}
                              alt="Next.js Conf photo"
                              className="transform transition will-change-auto object-cover h-full flex-grow "
                              style={{ transform: "translate3d(0, 0, 0)" }}
                              src={photo.image_url}
                              width={deviceType === "mobile" ? 1000 : 3500}
                              height={deviceType === "mobile" ? 1000 : 3500}
                            />
                            {photo.title !== "" && photo.title !== null && (
                              <motion.p className=" text-black px-4 py-5 rounded-lg">
                                {photo.title}
                              </motion.p>
                            )}
                          </motion.div>
                          // </AnimTranslate>
                        ))}
                    </div>
                  </div>
                </div>
              </main>
            )}
          </div>
          <AnimatePresence>
            {selectedPhoto !== null && (
              <CarouselSection
                photos={photos}
                selectedPhoto={selectedPhoto}
                setSelectedPhoto={setSelectedPhoto}
              />
            )}
          </AnimatePresence>
        </div>
      </>
    );
  }
};

Gallery.getInitialProps = async ({ query }: any) => {
  const { username } = query;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (error) {
    return { userInfos: null, photosUrl: [] };
  }

  const photos = data ? await fetchPhotos(data.id) : [];

  return { userInfos: data, photos };
};

export default Gallery;
