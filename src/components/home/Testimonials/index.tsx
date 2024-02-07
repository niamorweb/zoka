"use client";
import React, { useEffect } from "react";
import SectionTitle from "../../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const testimonialData = [
  {
    id: 1,
    name: "Sophie Martin",
    designation: "Photographer @CaptureVisions",
    content:
      "Creating my hub on Zoka was a game-changer. The platform is incredibly user-friendly, and it allows me to showcase my photography in a stylish and organized way.",
    image: "/images/testimonials/auth-01.png",
    star: 5,
  },
  {
    id: 2,
    name: "Alex Turner",
    designation: "Blogger @TechInsights",
    content:
      "Zoka has revolutionized the way I share links and photos with my audience. The clean and distraction-free design is perfect for anyone looking to build a unique and elegant online presence.",
    image: "/images/testimonials/auth-02.png",
    star: 5,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    designation: "Artist @CreativeCanvas",
    content:
      "I'm impressed by the simplicity and elegance of Zoka. As an artist, it allows me to curate my work and share it with the world effortlessly. A fantastic platform for creative expression.",
    image: "/images/testimonials/auth-03.png",
    star: 5,
  },
  {
    id: 4,
    name: "David Peterson",
    designation: "Entrepreneur @InnovateHub",
    content:
      "Zoka exceeded my expectations. It's not just a photo-sharing platform; it's a versatile tool that combines visual appeal with practical link sharing. A must-try for anyone building an online presence.",
    image: "/images/testimonials/author-01.png",
    star: 5,
  },
  {
    id: 5,
    name: "Emily Baker",
    designation: "Traveler @WanderlustJourney",
    content:
      "As a frequent traveler, Zoka has become my go-to for sharing my adventures. The mobile responsiveness is outstanding, ensuring my hub looks great on any device. Highly recommended!",
    image: "/images/testimonials/author-02.png",
    star: 5,
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
};

const Testimonials = () => {
  // const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);

  return (
    <section
      id="testimonials"
      className="relative z-10 bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="What Our Users Says"
          paragraph="Explore the experiences of Zoka users. Read their testimonials to discover how our platform has transformed the way they showcase their content online."
          center
        />

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-[1200px] mx-auto"
        >
          <CarouselContent>
            {testimonialData.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <SingleTestimonial
                        key={testimonial.id}
                        testimonial={testimonial}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
