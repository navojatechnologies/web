'use client';

import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Plus, Minus, Menu, X } from 'lucide-react';

const services = [
  { number: '01', title: 'AI & intelligent systems', intro: 'Make intelligence part of the way you work.', text: 'From identifying the right opportunities to integrating intelligent workflows, we help turn emerging technology into practical value.', tags: ['AI strategy', 'Intelligent automation', 'Data solutions'] },
  { number: '02', title: 'Digital product engineering', intro: 'Great ideas deserve great execution.', text: 'We design and build thoughtful digital products, bringing strategy, experience, and engineering together from the first sketch to launch.', tags: ['Product strategy', 'Web applications', 'Mobile applications'] },
  { number: '03', title: 'Experience & design', intro: 'Make every interaction feel effortless.', text: 'We create clear, compelling digital experiences that connect human needs with business goals across every touchpoint.', tags: ['UX research', 'Product design', 'Design systems'] },
  { number: '04', title: 'Modernization & cloud', intro: 'Build a stronger foundation for what comes next.', text: 'We help evolve existing systems with modern architecture, cloud technologies, and a focus on long-term adaptability.', tags: ['Cloud engineering', 'Modern architecture', 'DevOps'] },
];
const industries = ['Financial services', 'Healthcare', 'Retail & commerce', 'Real estate', 'Education', 'Manufacturing'];

function Logo({ light = false }) {
  return <a href="#top" className={`logo ${light ? 'logo-light' : ''}`} aria-label="Navoja Technolgies home"><span className="logo-mark"><i></i><i></i><i></i></span><span className="logo-word">navoja<span>TECHNOLGIES</span></span></a>;
}

export default function Home() {
  const [openService, setOpenService] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  return <main id="top">
    <header className="header">
      <div className="nav-wrap"><Logo /><nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
        <a onClick={() => setMenuOpen(false)} href="#services">What we do</a><a onClick={() => setMenuOpen(false)} href="#industries">Industries</a><a onClick={() => setMenuOpen(false)} href="#approach">Our approach</a><a onClick={() => setMenuOpen(false)} href="#about">About</a>
        <a onClick={() => setMenuOpen(false)} className="mobile-contact" href="mailto:info@navojatech.com">Let’s talk <ArrowUpRight size={16}/></a>
      </nav><a className="nav-cta" href="mailto:info@navojatech.com">Let’s talk <ArrowUpRight size={16}/></a><button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
    </header>

    <section className="hero">
      <div className="hero-grid"></div><div className="hero-glow"></div>
      <div className="hero-content wrap"><div className="eyebrow hero-label"><span className="pulse"></span> INDEPENDENT THINKING. INTENTIONAL ENGINEERING.</div>
        <h1>Bringing bold<br/>ideas <em>to life.</em></h1>
        <div className="hero-bottom"><p>We bring strategy, design and technology together to build digital experiences that move businesses forward.</p><a className="round-link" href="mailto:info@navojatech.com"><span>START A CONVERSATION</span><span className="arrow-circle"><ArrowUpRight size={21}/></span></a></div>
      </div>
      <div className="hero-foot wrap"><span>STRATEGY &nbsp; / &nbsp; DESIGN &nbsp; / &nbsp; ENGINEERING</span><a href="#intro">SCROLL TO EXPLORE <ArrowDown size={14}/></a><span>BASED IN SURAT, INDIA</span></div>
      <div className="hero-orb" aria-hidden="true"><div className="orb-inner"></div><div className="orb-ring ring-one"></div><div className="orb-ring ring-two"></div><div className="orb-ring ring-three"></div><span className="orb-dot dot-one"></span><span className="orb-dot dot-two"></span></div>
    </section>

    <section className="intro section" id="intro"><div className="wrap intro-layout"><div><p className="eyebrow dark-label"><span className="small-square"></span> THE NAVOJA PERSPECTIVE</p></div><div><h2>The future isn’t something<br className="desktop"/> you wait for. <span>You build it.</span></h2><div className="intro-bottom"><p>Big ambitions need more than a good idea. They need the right people, a clear perspective, and the craft to make them real.</p><p>That’s where we come in. We partner with businesses to turn complex challenges into useful, beautifully considered digital products.</p></div></div></div></section>

    <section className="services section" id="services"><div className="wrap"><div className="section-head"><div><p className="eyebrow"><span className="small-square purple"></span> WHAT WE DO</p><h2>One partner.<br/><span>Many possibilities.</span></h2></div><p>From the first question to the final detail, we bring the thinking and the doing together.</p></div><div className="service-list">{services.map((service, index) => <div className={`service-row ${openService === index ? 'active' : ''}`} key={service.number}><button onClick={() => setOpenService(openService === index ? -1 : index)} aria-expanded={openService === index}><span className="service-num">{service.number} /</span><span className="service-title">{service.title}</span><span className="service-toggle">{openService === index ? <Minus size={20}/> : <Plus size={20}/>}</span></button>{openService === index && <div className="service-detail"><div><strong>{service.intro}</strong><p>{service.text}</p><div className="tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><a href="mailto:info@navojatech.com?subject=Let%27s%20talk%20about%20a%20project">Discuss your project <ArrowUpRight size={17}/></a></div>}</div>)}</div></div></section>

    <section className="statement"><div className="statement-image"></div><div className="statement-overlay"></div><div className="wrap statement-content"><p className="eyebrow"><span className="small-square"></span> BUILT FOR WHAT’S NEXT</p><h2>Good ideas are<br/>only the <em>beginning.</em></h2><div className="statement-bottom"><p>The real magic happens when a vision meets the people who know how to bring it to life.</p><a href="#approach" className="light-link">GET TO KNOW OUR APPROACH <ArrowUpRight size={20}/></a></div></div><span className="statement-index">N / 01</span></section>

    <section className="industries section" id="industries"><div className="wrap"><div className="section-head"><div><p className="eyebrow dark-label"><span className="small-square"></span> WHERE WE FOCUS</p><h2>Different worlds.<br/><span>Shared ambition.</span></h2></div><p>Every industry has its own challenges. We bring fresh thinking and deep curiosity to each one.</p></div><div className="industry-grid">{industries.map((name, i) => <a href={`mailto:info@navojatech.com?subject=${encodeURIComponent(name + ' enquiry')}`} className="industry-card" key={name}><span>0{i + 1}</span><h3>{name}</h3><ArrowUpRight size={20}/></a>)}</div></div></section>

    <section className="approach section" id="approach"><div className="wrap"><div className="section-head"><div><p className="eyebrow"><span className="small-square purple"></span> HOW WE WORK</p><h2>Thoughtful at every step.<br/><span>Better by design.</span></h2></div><p>We believe the best work comes from asking better questions, working closely, and caring about the details.</p></div><div className="approach-grid"><article><span>01 / LISTEN</span><h3>Start with<br/>the why.</h3><p>We take the time to understand your business, your people, and the problem behind the problem.</p></article><article><span>02 / CREATE</span><h3>Make the<br/>complex simple.</h3><p>We turn insights into focused strategies and intuitive experiences with purpose at their core.</p></article><article><span>03 / BUILD</span><h3>Bring it<br/>to life.</h3><p>We combine craft and technology to create scalable solutions built for the real world.</p></article><article><span>04 / EVOLVE</span><h3>Keep moving<br/>forward.</h3><p>We learn, refine, and grow alongside your business as new opportunities come into view.</p></article></div></div></section>

    <section className="about section" id="about"><div className="wrap about-grid"><div className="about-image"><img src="/images/team.jpg" alt="A team collaborating around a table"/><span className="image-caption">BETTER TOGETHER &nbsp; ↗</span></div><div className="about-copy"><p className="eyebrow dark-label"><span className="small-square"></span> A LITTLE ABOUT US</p><h2>Made of curiosity.<br/><span>Driven by possibility.</span></h2><p>We’re Navoja Technolgies, a technology partner based in Surat, India. We believe meaningful progress starts with people who care enough to look closer, think bigger, and build better.</p><a href="mailto:info@navojatech.com" className="text-link">GET TO KNOW US <ArrowUpRight size={19}/></a></div></div></section>

    <section className="contact" id="contact"><div className="contact-orb"></div><div className="wrap contact-content"><p className="eyebrow"><span className="small-square"></span> HAVE SOMETHING IN MIND?</p><h2>Let’s make<br/><em>something matter.</em></h2><div className="contact-bottom"><p>Have an idea, a challenge, or just a question?<br/>We’d love to hear about it.</p><a href="mailto:info@navojatech.com" className="contact-button">START A CONVERSATION <ArrowUpRight size={20}/></a></div></div></section>
    <footer className="footer"><div className="wrap"><div className="footer-main"><div><Logo light/><p>Ideas made real.<br/>Possibilities made endless.</p></div><div><span className="footer-label">EXPLORE</span><a href="#services">What we do</a><a href="#industries">Industries</a><a href="#approach">Our approach</a><a href="#about">About us</a></div><div><span className="footer-label">SAY HELLO</span><a href="mailto:info@navojatech.com">info@navojatech.com <ArrowUpRight size={14}/></a><p>Surat, Gujarat<br/>India</p></div><div className="footer-big">N<span>✳</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} NAVOJA TECHNOLGIES. ALL RIGHTS RESERVED.</span><span>THOUGHTFULLY BUILT IN SURAT, INDIA.</span><a href="#top">BACK TO TOP ↑</a></div></div></footer>
  </main>;
}
