import SectionTitle from "@/components/Common/SectionTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export function Faq() {
  const faqData = [
    {
      question: "What is Kuta?",
      answer:
        "Kuta is a platform designed for creators to showcase their photography, artwork, and images in a beautifully curated manner. It serves as an alternative to traditional link-sharing platforms, offering a focused space for sharing visual content.",
    },
    {
      question:
        'What is the difference between Kuta and other "link in bio" website?',
      answer:
        'Kuta sets itself apart from other "link in bio" websites like Linktree by its focus on image sharing, particularly for art and photography. It enables both amateurs and professionals to showcase their projects effectively.',
    },
    {
      question: "How can I use Kuta to showcase my work?",
      answer:
        "Signing up for Kuta allows you to create a personalized profile where you can upload and organize your photos, artwork, and images into collections. You can then share your unique Kuta link with your audience, providing them with a centralized hub to explore and appreciate your creations.",
    },
    {
      question: "Is Kuta suitable for both professionals and hobbyists?",
      answer:
        "Yes, absolutely! Whether you're a professional photographer, digital artist, or simply passionate about sharing your visual creations, Kuta welcomes creators of all levels. Our platform provides the tools and flexibility to showcase your work in a professional and engaging manner, regardless of your background or experience.",
    },
    {
      question: "Is there a limit to the number of photos I can upload?",
      answer:
        "Yes, currently there is a limit of 15 photos per user. We believe this limit encourages users to curate their best work, maintaining a high-quality experience for both creators and viewers.",
    },
  ];

  return (
    <section className="relative bg-gray-light dark:bg-bg-color-dark z-10 py-16 md:py-20 lg:py-28">
      <Card className="container bg-opacity-40 py-10">
        <CardContent className="flex flex-col items-center justify-center">
          <SectionTitle
            title="FAQ"
            paragraph="Some questions usually asked"
            center
            mb="80px"
          />
          <Accordion type="single" collapsible className="w-full max-w-[600px]">
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer} </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
}
