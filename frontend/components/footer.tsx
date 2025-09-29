'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Newsletter Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Job Portal</h3>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
              Connect with top employers and find your dream job. We're here to
              help you take the next step in your career journey.
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter your email"
                className="bg-muted border border-border text-foreground placeholder:text-muted-foreground"
              />
              <Button
                variant="secondary"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Subscribe
              </Button>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              {['About Us', 'Careers', 'Press', 'Blog'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              {[
                'Help Center',
                'Contact Us',
                'Privacy Policy',
                'Terms of Service',
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Job Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
