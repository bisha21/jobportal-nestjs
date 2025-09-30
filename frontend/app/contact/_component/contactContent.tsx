'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { contactInput, contactSchema } from '@/schemas/contact';
import FormInput from '@/components/reusable/form-input';
export default function ContactContent() {
  const form = useForm<contactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = (data: contactInput) => {
    console.log('✅ Form Submitted:', data);
  };

  return (
    <section className="py-16 bg-background">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[var(--foreground)]">
            About Us
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-[var(--muted-foreground)]">
            Discover our mission, values, and the passion that drives us to
            connect talent with opportunity.
          </p>
        </div>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
                You Will Grow, You Will Succeed. We Promise That
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe in your growth. Get in touch with us today to explore
                opportunities and collaboration.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Call for inquiry
                  </h3>
                  <p className="text-primary font-medium">+257 388-6895</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Send us an email
                  </h3>
                  <p className="text-primary font-medium">
                    contact@abcglobal.net
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Office Hours
                  </h3>
                  <p className="text-muted-foreground">
                    Mon - Fri: 10AM - 10PM
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Office</h3>
                  <p className="text-muted-foreground">
                    19 North Road, Piscataway, NY 08854
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <Card className="border-2 border-dashed border-primary/30">
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Contact Us
                </h3>
                <p className="text-muted-foreground text-sm">
                  Fill out the form below and we will get back to you shortly.
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormInput
                      label="First Name"
                      name="firstName"
                      placeholder="Your first name"
                      type="text"
                      form={form}
                      required
                    />
                    <FormInput
                      label="Last Name"
                      name="lastName"
                      placeholder="Your last name"
                      type="text"
                      form={form}
                      required
                    />
                  </div>

                  <FormInput
                    label="Email Address"
                    name="email"
                    placeholder="Your email address"
                    type="email"
                    form={form}
                    required
                  />

                  <FormInput
                    label="Message"
                    name="message"
                    form={form}
                    required
                    render={({ onChange, value }) => (
                      <Textarea
                        placeholder="Your message..."
                        rows={4}
                        className="bg-muted/50 border-border resize-none"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Send Message
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
