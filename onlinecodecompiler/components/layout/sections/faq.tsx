import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What programming languages does the online code compiler support?",
    answer: "Our compiler supports a wide range of programming languages, including Java, Python, C++, JavaScript, and more. You can easily switch between languages in the interface.",
    value: "item-1",
  },
  {
    question: "Do I need to create an account to use the code compiler?",
    answer:
      "You can start coding without an account, but creating one allows you use AI functionality and to save your code, access it later, and utilize additional features like code sharing.",
    value: "item-2",
  },
  {
    question:
      "How do I save and download my code?",
    answer:
      "Your code can be saved automatically every 10-20 seconds, and you can also manually save or download your code as a file with a single click.",
    value: "item-3",
  },
 
  {
    question:
      "What happens if I refresh the page?",
    answer: "Don't worry! Your code will be cached, and you can resume where you left off even after refreshing the page.",
    value: "item-4",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container md:w-[700px]  ">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          FAQS
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Common Questions
        </h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
