import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-base font-semibold text-slate-900">{siteConfig.siteName}</p>
          <p className="mt-2 text-sm text-slate-600">{siteConfig.siteTagline}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Quick links</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link href="/services" className="hover:text-slate-900">Services</Link></li>
            <li><Link href="/blog" className="hover:text-slate-900">Blog</Link></li>
            <li><Link href="/about" className="hover:text-slate-900">About</Link></li>
            <li><Link href="/contact" className="hover:text-slate-900">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Social</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><a href={siteConfig.socialLinks.x} className="hover:text-slate-900">X / Twitter</a></li>
            <li><a href={siteConfig.socialLinks.instagram} className="hover:text-slate-900">Instagram</a></li>
            <li><a href={siteConfig.socialLinks.linkedin} className="hover:text-slate-900">LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
