import { Card } from '@/components/ui/card';
import { Play, Users, Award, TrendingUp } from 'lucide-react';
import about from '@/public/about.jpg'
import Image from 'next/image';

const features = [
  {
    icon: Users,
    title: '5.8 million people about getting',
    description: 'their dream job',
  },
  {
    icon: Award,
    title: "Advertise the world's most cutting",
    description: 'edge technology',
  },
  {
    icon: TrendingUp,
    title: 'Streamlined Facebook-style',
    description: 'social network interface',
  },
];

export function VideoSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 p-8 rounded-2xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                <Image
                  src={about}
                  alt="Company video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6 text-balance">
                Good Life Begins With A Good Company
              </h2>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
