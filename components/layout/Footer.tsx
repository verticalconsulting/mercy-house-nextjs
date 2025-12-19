import Link from 'next/link'
import { Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  programs: [
    { name: 'Men\'s Program', href: '/programs/mens' },
    { name: 'Women\'s Program', href: '/programs/womens' },
    { name: 'Teen Program', href: '/programs/teen' },
    { name: 'Family Program', href: '/programs/family' },
  ],
  getInvolved: [
    { name: 'Donate Now', href: '/donate' },
    { name: 'Donate a Car', href: '/donate-a-car' },
    { name: 'Volunteer', href: '/volunteer' },
    { name: 'Chapel Bricks', href: '/donate/chapel-bricks' },
  ],
  resources: [
    { name: 'Get Help', href: '/get-help' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Mission', href: '/about/mission' },
    { name: 'Success Stories', href: '/success-stories' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Organization Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-primary">MERCY HOUSE</h3>
            <p className="mt-2 text-sm text-gray-400">Adult & Teen Challenge</p>
            <p className="mt-4 text-sm text-gray-300">
              Providing faith-based recovery and rehabilitation services in Mississippi since our founding.
              We believe in the power of transformation through Christ.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <a href="tel:6018582256" className="flex items-center gap-2 text-sm hover:text-primary">
                <Phone className="h-4 w-4" />
                (601) 858-2256
              </a>
              <a href="mailto:info@mercyhouseatc.com" className="flex items-center gap-2 text-sm hover:text-primary">
                <Mail className="h-4 w-4" />
                info@mercyhouseatc.com
              </a>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>
                  Mercy House ATC<br />
                  Mississippi
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              <a href="https://facebook.com/mercyhouseatc" target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-primary">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://youtube.com/mercyhouseatc" target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-primary">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">Programs</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">Get Involved</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">Resources</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Mercy House Adult & Teen Challenge. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary">
                Terms of Service
              </Link>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-gray-500">
            Designed by NameBrandLLC
          </p>
        </div>
      </div>
    </footer>
  )
}