import { Card } from '@/components/ui/card';
import { UserPlus, Upload, Briefcase, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Create Account',
    description: 'Sign up and create your professional profile',
  },
  {
    icon: Upload,
    title: 'Upload Resume',
    description: 'Upload your resume and showcase your skills',
  },
  {
    icon: Briefcase,
    title: 'Find Jobs',
    description: 'Browse and apply to relevant job opportunities',
  },
  {
    icon: CheckCircle,
    title: 'Apply Job',
    description: 'Submit applications and track your progress',
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
            How it works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our simple and efficient process helps you find your dream job in
            just a few steps. Start your career journey today.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-6 text-center bg-card hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
