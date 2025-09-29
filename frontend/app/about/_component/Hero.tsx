import { Card } from '@/components/ui/card';
import Image from 'next/image';
import about from '@/public/about.jpg';

export function HeroSection() {
  return (
    <section className="py-20 bg-[var(--background)]">
      <div className="container mx-auto px-4">
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

        {/* Card Section */}
        <Card className="p-10 bg-[var(--card)] border-2 border-dashed border-[var(--primary)/20] shadow-lg">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-3xl font-bold mb-4 text-[var(--foreground)]">
                Empowering Careers, One Connection at a Time
              </h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                Our platform is dedicated to bridging the gap between talented
                professionals and top employers. We believe every individual
                deserves an opportunity to grow and thrive in their chosen
                career path.
              </p>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                With a focus on innovation, quality, and trust, we strive to
                create a seamless job discovery experience. Join us as we build
                a future where talent meets opportunity effortlessly.
              </p>
            </div>

            {/* Image */}
            <div className="bg-[var(--muted)] rounded-lg aspect-video flex items-center justify-center overflow-hidden shadow-md">
              <Image
                src={about}
                alt="About us hero image"
                className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
