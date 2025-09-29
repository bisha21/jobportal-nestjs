import { Card } from '@/components/ui/card';
import { Star, Shield, Users, Trophy } from 'lucide-react';
import Image from 'next/image';

const partners = [
  {
    image: '/tech-company-logo.jpg',
    alt: 'Partner company 1',
  },
  {
    image: '/startup-logo.png',
    alt: 'Partner company 2',
  },
  {
    image: '/corporate-logo.png',
    alt: 'Partner company 3',
  },
  {
    image: '/enterprise-company-logo.png',
    alt: 'Partner company 4',
  },
];

const badges = [
  { icon: Star, label: 'Quality Job' },
  { icon: Shield, label: 'Secure Profiles' },
  { icon: Users, label: 'Top Companies' },
  { icon: Trophy, label: 'Top Talents' },
];

export function PartnersSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            {partners.map((partner, index) => (
              <Card
                key={index}
                className="aspect-square bg-muted/50 flex items-center justify-center p-4"
              >
                <Image
                  src={partner.image || '/placeholder.svg'}
                  alt={partner.alt}
                  className="w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </Card>
            ))}
          </div>

          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6 text-balance">
              We're Only Working With The Best
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We partner with industry-leading companies to provide you with the
              best career opportunities. Our network includes startups, Fortune
              500 companies, and everything in between.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <badge.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
