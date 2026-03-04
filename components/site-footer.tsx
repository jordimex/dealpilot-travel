import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-brand-muted bg-brand-bg">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-base font-semibold text-brand-primary">{siteConfig.siteName}</p>
          <p className="mt-2 text-sm text-brand-secondary">{siteConfig.siteTagline}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-brand-primary">Quick links</p>
          <ul className="mt-3 space-y-2 text-sm text-brand-secondary">
            <li><Link href="/services" className="hover:text-brand-primary">Services</Link></li>
            <li><Link href="/blog" className="hover:text-brand-primary">Blog</Link></li>
            <li><Link href="/about" className="hover:text-brand-primary">About</Link></li>
            <li><Link href="/contact" className="hover:text-brand-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-brand-primary">Social</p>
          <ul className="mt-3 space-y-2 text-sm text-brand-secondary">
            <li><a href={siteConfig.socialLinks.x} className="hover:text-brand-primary">X / Twitter</a></li>
            <li><a href={siteConfig.socialLinks.instagram} className="hover:text-brand-primary">Instagram</a></li>
            <li><a href={siteConfig.socialLinks.linkedin} className="hover:text-brand-primary">LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
