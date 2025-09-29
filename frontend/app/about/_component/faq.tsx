import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Can I upload a CV?',
    answer:
      'Yes, you can easily upload your CV in multiple formats including PDF, DOC, and DOCX. Our system will automatically parse your information and help you create a professional profile.',
  },
  {
    question: 'How long are the recruitment process take?',
    answer:
      "The recruitment process typically takes 2-4 weeks depending on the position and company. We'll keep you updated throughout the entire process and provide feedback at each stage.",
  },
  {
    question: 'Do you recruit for Graduates, Apprentices and Students?',
    answer:
      'We work with companies that actively recruit graduates, apprentices, and students. We have dedicated programs and partnerships with educational institutions.',
  },
  {
    question: 'What does the recruitment and selection process involve?',
    answer:
      'Our process typically involves initial screening, skills assessment, interviews with our team and the hiring company, and final selection. We guide you through each step.',
  },
  {
    question:
      'Can I receive notifications for any future jobs that may interest me?',
    answer:
      "Yes, you can set up job alerts based on your preferences including location, salary, industry, and job type. You'll receive notifications as soon as matching positions become available.",
  },
];

export function FAQSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Find answers to common questions about our recruitment process
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                <span className="text-primary font-bold mr-3">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
