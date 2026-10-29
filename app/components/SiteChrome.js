'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { services, industries, engineering, insights, companyPages } from '../data';

export function Logo({ light = false }) {
  return <Link href="/" className={`logo ${light ? 'logo-light' : ''}`} aria-label="Navoja Technolgies home"><span className="logo-mark"><i></i><i></i><i></i></span><span className="logo-word">navoja<span>TECHNOLGIES</span></span></Link>;
}
const menus = [
 {label:'What we do', href:'/services/', items:services.map(s=>({title:s.title, description:s.intro, href:`/services/${s.slug}/`}))},
 {label:'Industries', href:'/industries/', items:industries.map(s=>({title:s.title, href:`/industries/${s.slug}/`}))},
 {label:'Engineering', href:'/engineering/', items:engineering.map(s=>({title:s.title, href:`/engineering/${s.slug}/`}))},
 {label:'Insights', href:'/insights/', items:insights.map(s=>({title:s.title,description:s.description,href:`/insights/${s.slug}/`}))},
 {label:'About', href:'/about/', items:[{title:'About us',description:'Meet Navoja Technolgies',href:'/about/'},{title:'Culture',description:'What guides the way we work',href:'/company/culture/'},{title:'Team',description:'The people behind the work',href:'/company/team/'},{title:'Join us',description:'Explore opportunities to connect',href:'/company/careers/'},{title:'How we work',description:'Our process and approach',href:'/approach/'},{title:'Security & quality',description:'Our approach to quality',href:'/company/security/'}]},
];
export function Header() {
 const [mobileOpen,setMobileOpen]=useState(false); const [active,setActive]=useState(null); const ref=useRef(null);
 useEffect(()=>{function key(e){if(e.key==='Escape'){setActive(null);setMobileOpen(false)}}function outside(e){if(ref.current&&!ref.current.contains(e.target))setActive(null)}document.addEventListener('keydown',key);document.addEventListener('pointerdown',outside);return()=>{document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',outside)}},[]);
 const close=()=>{setActive(null);setMobileOpen(false)};
 return <header className="header" ref={ref}><div className="nav-wrap"><Logo light/><Link className="nav-ai" href="/services/ai-intelligent-systems/" onClick={close}>Navoja AI<span>✦</span></Link><nav className={mobileOpen?'nav-links open':'nav-links'} aria-label="Main navigation"><Link className="mobile-ai" href="/services/ai-intelligent-systems/" onClick={close}>Navoja AI ✦</Link>{menus.map(menu=><div className="nav-group" key={menu.label}><button className={active===menu.label?'nav-trigger selected':'nav-trigger'} aria-expanded={active===menu.label} aria-controls={`menu-${menu.label.replaceAll(' ','-')}`} onClick={()=>setActive(active===menu.label?null:menu.label)}>{menu.label} <ChevronDown size={14}/></button><div id={`menu-${menu.label.replaceAll(' ','-')}`} className={`mega-menu ${active===menu.label?'visible':''}`} hidden={active!==menu.label}><div className="mega-inner"><div className="mega-grid">{menu.items.map(item=><Link className="mega-item" key={item.title} href={item.href} onClick={close}><span><strong>{item.title}</strong>{item.description&&<small>{item.description}</small>}</span><ArrowUpRight size={19}/></Link>)}</div><Link className="mega-all" href={menu.href} onClick={close}>View all {menu.label.toLowerCase()} <ArrowRight size={15}/></Link></div></div></div>)}<Link onClick={close} className="mobile-contact" href="/contact/">Contact us <ArrowRight size={16}/></Link></nav><Link className="nav-cta" href="/contact/">Contact us <ArrowRight size={16}/></Link><button className="menu-button" aria-label={mobileOpen?'Close menu':'Open menu'} aria-expanded={mobileOpen} onClick={()=>{setMobileOpen(!mobileOpen);setActive(null)}}>{mobileOpen?<X/>:<Menu/>}</button></div></header>;
}
export function Footer() {
  return <footer className="footer"><div className="wrap"><div className="footer-main"><div><Logo light/><p>Ideas made real.<br/>Possibilities made endless.</p></div><div><span className="footer-label">EXPLORE</span><Link href="/services/">What we do</Link><Link href="/industries/">Industries</Link><Link href="/engineering/">Engineering</Link><Link href="/insights/">Insights</Link><Link href="/about/">About us</Link><Link href="/contact/">Contact</Link></div><div><span className="footer-label">SAY HELLO</span><a href="mailto:info@navojatech.com">info@navojatech.com <ArrowUpRight size={14}/></a><p>Surat, Gujarat<br/>India</p></div><div className="footer-big">N<span>✳</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} NAVOJA TECHNOLGIES. ALL RIGHTS RESERVED.</span><span>THOUGHTFULLY BUILT IN SURAT, INDIA.</span><a href="#top">BACK TO TOP ↑</a></div></div></footer>;
}
