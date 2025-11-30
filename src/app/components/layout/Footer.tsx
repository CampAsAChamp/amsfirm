import Link from 'next/link';
import { CopyButton } from '@/app/components/ui';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-on-primary">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-on-primary">Anna M Schneider Law</h3>
            <p className="text-footer mb-4">
              Professional legal services specializing in estate planning, wills, trusts, and probate. 
              Protecting your family&apos;s future with expert legal guidance.
            </p>
            <div className="text-footer">
              <p className="mb-2">
                <strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 4:00 PM
              </p>
              <p className="mb-2">
                <strong>Saturday & Sunday:</strong> Closed
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-on-primary">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-footer-muted hover:text-on-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-footer-muted hover:text-on-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-footer-muted hover:text-on-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-footer-muted hover:text-on-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-on-primary">Contact Info</h4>
            <div className="text-footer space-y-2">
              <p>21250 Hawthorne Blvd.</p>
              <p>Suite 500</p>
              <p>Torrance, CA 90503</p>
              <p className="mt-4 flex items-center gap-2">
                <strong>Phone:</strong>{' '}
                <a 
                  href="tel:3107927454" 
                  className="text-footer-muted hover:text-on-primary transition-colors hover:underline"
                >
                  (310) 792-7454
                </a>
                <CopyButton textToCopy="(310) 792-7454" label="Copy phone number" className="text-footer-muted hover:text-on-primary" />
              </p>
              <p className="flex items-center gap-2">
                <strong>Email:</strong>{' '}
                <a 
                  href="mailto:amschneiderlaw@gmail.com" 
                  className="text-footer-muted hover:text-on-primary transition-colors hover:underline"
                >
                  amschneiderlaw@gmail.com
                </a>
                <CopyButton textToCopy="amschneiderlaw@gmail.com" label="Copy email address" className="text-footer-muted hover:text-on-primary" />
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-hover mt-8 pt-8 text-center text-footer-muted">
          <p>&copy; 2025 Anna M. Schneider Law. All rights reserved.</p>
          <p className="mt-2 text-sm">
            This website is for informational purposes only and does not constitute legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
