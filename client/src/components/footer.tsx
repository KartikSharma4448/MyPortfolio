import { Link } from "wouter";
import { Linkedin, Github, Mail, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-card">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">
              Kartik<span className="text-primary">.</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Software Developer | Freelancer | Passionate About
              Coding & Problem-Solving
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link href="/about">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md -ml-2" data-testid="link-footer-about">
                  About
                </a>
              </Link>
              <Link href="/projects">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md -ml-2" data-testid="link-footer-projects">
                  Projects
                </a>
              </Link>
              <Link href="/services">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md -ml-2" data-testid="link-footer-services">
                  Services
                </a>
              </Link>
              <Link href="/contact">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md -ml-2" data-testid="link-footer-contact">
                  Contact
                </a>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Contact Info</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://linkedin.com/in/kartik-sharma06"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 hover-elevate px-2 py-1 rounded-md -ml-2"
                data-testid="link-footer-linkedin"
              >
                <Linkedin className="h-4 w-4" />
                linkedin.com/in/kartik-sharma06
              </a>
              <a
                href="mailto:kartik@example.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 hover-elevate px-2 py-1 rounded-md -ml-2"
                data-testid="link-footer-email"
              >
                <Mail className="h-4 w-4" />
                Get in touch
              </a>
              <div className="text-sm text-muted-foreground flex items-center gap-2 px-2 py-1 -ml-2">
                <MapPin className="h-4 w-4" />
                Jaipur, Rajasthan, India
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Kartik Sharma. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
