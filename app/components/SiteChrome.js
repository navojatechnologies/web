'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { services, industries, engineering, insights } from '../data';

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
  const [subscriptionPrepared, setSubscriptionPrepared] = useState(false);
  function requestUpdates(event) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('email');
    const subject = encodeURIComponent('Request for Navoja updates');
    const body = encodeURIComponent(`Hello Navoja,\n\nPlease send updates to: ${email}\n\nThank you.`);
    window.location.href = `mailto:info@navojatech.com?subject=${subject}&body=${body}`;
    setSubscriptionPrepared(true);
  }
  const practiceLinks = [
    ['AI & intelligent systems', '/services/ai-intelligent-systems/'],
    ['Digital product engineering', '/services/digital-product-engineering/'],
    ['Enterprise modernization', '/services/modernization-cloud/'],
    ['Digital customer experience', '/services/experience-design/'],
    ['Web development', '/services/web-development/'],
    ['App development', '/services/app-development/'],
  ];
  const quickLinks = [
    ['Case studies', '/insights/case-studies/'],
    ['Open source', '/resources/open-source/'],
    ['Products', '/resources/products/'],
    ['Hire us', '/contact/'],
    ['Testimonials', '/resources/testimonials/'],
    ['Developer resources', '/resources/developer-resources/'],
  ];
  return <footer className="footer site-footer"><div className="footer-shell"><div className="footer-columns">
    <div className="footer-brand"><Logo light/><p>Innovate · Collaborate · Build</p><form className="footer-subscribe" onSubmit={requestUpdates}><label htmlFor="footer-email">Request email updates</label><div><input id="footer-email" name="email" type="email" autoComplete="email" placeholder="Your email address" required/><button type="submit" aria-label="Prepare an email requesting updates"><ArrowRight size={18}/></button></div><small role="status">{subscriptionPrepared ? 'Review and send the request in your email app.' : 'Opens your email app to request updates.'}</small></form></div>
    <div className="footer-column"><h2>Our practices</h2><div className="footer-link-list">{practiceLinks.map(([label,href])=><Link href={href} key={href}>{label}</Link>)}</div></div>
    <div className="footer-column footer-engineering"><h2>Engineering</h2><div className="footer-engineering-grid">{engineering.map(item=><Link key={item.slug} href={`/engineering/${item.slug}/`}>{item.title}</Link>)}</div></div>
    <div className="footer-column"><h2>Quick links</h2><div className="footer-link-list">{quickLinks.map(([label,href])=><Link href={href} key={label}>{label}</Link>)}</div></div>
  </div><div className="footer-legal"><div><h2>Copyright</h2><p>© {new Date().getFullYear()} Navoja Technolgies. All rights reserved.</p></div><div><h2>Legal</h2><div className="footer-legal-links"><Link href="/resources/privacy/">Privacy information</Link><Link href="/resources/terms/">Terms of use</Link><Link href="/resources/financial-reports/">Financial reports</Link></div></div><div><h2>Get in touch</h2><p>Surat, India</p><a href="mailto:info@navojatech.com">info@navojatech.com</a></div></div></div></footer>;
}
