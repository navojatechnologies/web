'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export function Logo({ light = false }) {
  return <Link href="/" className={`logo ${light ? 'logo-light' : ''}`} aria-label="Navoja Technolgies home"><span className="logo-mark"><i></i><i></i><i></i></span><span className="logo-word">navoja<span>TECHNOLGIES</span></span></Link>;
}
export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="header"><div className="nav-wrap"><Logo/><nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Main navigation"><Link onClick={() => setOpen(false)} href="/services/">What we do</Link><Link onClick={() => setOpen(false)} href="/industries/">Industries</Link><Link onClick={() => setOpen(false)} href="/approach/">Our approach</Link><Link onClick={() => setOpen(false)} href="/about/">About</Link><Link onClick={() => setOpen(false)} className="mobile-contact" href="/contact/">Let’s talk <ArrowUpRight size={16}/></Link></nav><Link className="nav-cta" href="/contact/">Let’s talk <ArrowUpRight size={16}/></Link><button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div></header>;
}
export function Footer() {
  return <footer className="footer"><div className="wrap"><div className="footer-main"><div><Logo light/><p>Ideas made real.<br/>Possibilities made endless.</p></div><div><span className="footer-label">EXPLORE</span><Link href="/services/">What we do</Link><Link href="/industries/">Industries</Link><Link href="/approach/">Our approach</Link><Link href="/about/">About us</Link><Link href="/contact/">Contact</Link></div><div><span className="footer-label">SAY HELLO</span><a href="mailto:info@navojatech.com">info@navojatech.com <ArrowUpRight size={14}/></a><p>Surat, Gujarat<br/>India</p></div><div className="footer-big">N<span>✳</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} NAVOJA TECHNOLGIES. ALL RIGHTS RESERVED.</span><span>THOUGHTFULLY BUILT IN SURAT, INDIA.</span><a href="#top">BACK TO TOP ↑</a></div></div></footer>;
}
