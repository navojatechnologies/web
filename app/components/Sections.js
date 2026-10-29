import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export function ContactBanner() {
 return <section className="contact"><div className="contact-orb"></div><div className="wrap contact-content"><p className="eyebrow"><span className="small-square"></span> HAVE SOMETHING IN MIND?</p><h2>Let’s make<br/><em>something matter.</em></h2><div className="contact-bottom"><p>Have an idea, a challenge, or just a question?<br/>We’d love to hear about it.</p><Link href="/contact/" className="contact-button">START A CONVERSATION <ArrowUpRight size={20}/></Link></div></div></section>;
}
export function PageHero({ eyebrow, title, description }) {
 return <section className="page-hero"><div className="wrap"><p className="eyebrow"><span className="small-square purple"></span> {eyebrow}</p><h1>{title}</h1><p className="page-hero-copy">{description}</p></div></section>;
}
